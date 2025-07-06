
# North Event Staffing: Backendless Architecture with Jazz

This document outlines the architectural shift of the North Event Staffing (NORTH STAFF) application from a traditional Express.js backend with PostgreSQL to a modern, backendless architecture powered by Jazz. This pivot accelerates development, simplifies infrastructure, and enables real-time, multiplayer features crucial for event staffing operations.

## 1. Architectural Overview: Replacing the Traditional Backend

**Before (Traditional Backend):**

```
[Client (React SPA)] <--- REST API (HTTP/JSON) ---> [Express.js Backend] <--- PostgreSQL Database
                                                              |^
                                                              | |
                                                              v |
                                                            [Auth/Permissions Logic]
```

In the traditional setup, the React frontend would communicate with an Express.js server via REST APIs. This server would handle business logic, interact with a PostgreSQL database for data persistence, and manage authentication and authorization. Real-time features would typically require additional technologies like WebSockets, adding complexity.

**After (Backendless with Jazz):**

```
[Client (React SPA)] <--- Real-time Sync (Jazz SDK) ---> [Jazz Cloud/Peer Network]
                                                              |^
                                                              | |
                                                              v |
                                                            [Jazz Auth/Permissions]
```

With Jazz, the Express.js backend and PostgreSQL database are largely replaced. The React frontend directly interacts with the Jazz SDK, which handles:

*   **Real-time Data Synchronization:** Co-JSON documents are automatically synchronized across all connected clients in real-time, eliminating the need for REST API polling or custom WebSocket implementations.
*   **Authentication:** Jazz provides built-in authentication mechanisms.
*   **Authorization & Permissions:** Fine-grained access control is defined directly within Jazz, governing who can read, write, or administer specific documents and collections.
*   **Offline Support & Conflict Resolution:** Jazz's CRDT (Conflict-free Replicated Data Type) foundation inherently supports offline work and automatically resolves concurrent edits.

This architecture significantly reduces server-side operational overhead, simplifies development, and inherently supports collaborative, real-time features.

## 2. Data Flow and Permission Model

Jazz's core concepts for data modeling and permissions are **Co-JSON Documents** and **Groups**. Documents store the application data, and Groups define collections of users who share specific access rights to those documents.

### 2.1. Core Jazz Document Schemas

(Refer to `shared/jazz-models.ts` for the complete TypeScript interfaces.)

*   **`UserProfile`**: Stores user details (name, email, role). Critical for identifying users and their roles within the permission system.
*   **`Event`**: Contains details for an event (name, date, location, assigned client/managers/staff). This is a central document around which much of the application's data revolves.
*   **`CommunicationChannel`**: Holds an array of messages for a specific event. Designed for real-time client-manager communication.
*   **`Timesheet`**: Records staff work hours for an event/shift. Undergoes a lifecycle of submission, review (approve/reject), and eventual processing for payroll.
*   **`PayrollRun`**: An administrative record of batch payroll processing, linking to processed timesheets.

### 2.2. Jazz Group Structure

Permissions in Jazz are primarily managed through groups. Users are added to groups, and documents grant permissions to these groups.

**a) Global Groups:**

These are static, application-wide groups that define broad roles:

*   **`admins`**: Members have full administrative control over the entire application's data. (e.g., `admin-001`)
*   **`managers`**: Members are event managers. They can review timesheets, manage events, and communicate with clients/staff. (e.g., `manager-001`, `manager-002`)
*   **`staff`**: Members are event staff. They can submit timesheets and view their assigned events. (e.g., `staff-001`, `staff-002`)
*   **`clients`**: Members are clients who organize events. They can view their events and communicate with assigned managers. (e.g., `client-001`, `client-002`)

**b) Dynamic Event-Specific Groups (`event-{eventId}`):**

For every `Event` document created, a corresponding Jazz Group is dynamically created (e.g., `event-uuid123`). This group is crucial for granular event-level access control.

*   **Members:** The `clientId`, all `managerIds`, and all `staffIds` associated with that specific `Event` document are added as members to its corresponding `event-{eventId}` group.
*   **Purpose:** This ensures that only users directly involved with a particular event have access to its sensitive details and related communications.

### 2.3. Document-Level Permissions Strategy

Permissions are set on each Jazz document, specifying which groups or individual users have `read`, `write`, or `admin` access.

*   **`UserProfile`**
    *   **Owner:** The user themselves.
    *   **Read:** `authenticated` (all logged-in users) for basic lookup, plus `managers`, `admins`.
    *   **Write:** Owner, `managers`, `admins`.
    *   **Admin:** `admins`.

*   **`Event`**
    *   **Owner:** The creating manager or an `admins` group member.
    *   **Read/Write:** The specific `event-{eventId}` group.
    *   **Admin:** `admins` group.

*   **`CommunicationChannel`**
    *   **Owner:** Linked to the `Event` owner.
    *   **Read/Write:** The specific `event-{eventId}` group.
    *   **Append-only for messages:** Jazz allows for more granular permissions like append-only. This would ensure users can add new messages but not alter historical ones. If not directly supported by Jazz's permission primitives, this would be enforced by client-side logic and Jazz's CRDTs would handle concurrent appends gracefully.

*   **`Timesheet`**
    *   **Owner:** The `staffId` who created it.
    *   **Read:** Owner, `managers` group, `admins` group.
    *   **Write:**
        *   **Staff (Owner):** Can write all fields *only if* `status` is `pending`.
        *   **Managers/Admins:** Can write `status`, `reviewedByManagerId`, `reviewedAt`, `managerNotes` fields, regardless of current status. This would ideally leverage Jazz's field-level permissions. If not available, client-side logic enforces this, relying on Jazz's conflict resolution for concurrent updates and its core permissions to prevent unauthorized writes entirely.

*   **`PayrollRun`**
    *   **Owner:** `admins` group.
    *   **Read/Write/Admin:** `admins` group.

## 3. Real-Time Client-Manager Communication System

*   **Data Model:** `CommunicationChannel` document, linked to an `Event`.
*   **Data Flow:**
    1.  When a client or manager opens an event, the frontend subscribes to the relevant `CommunicationChannel` document in Jazz using `useSync` (conceptual Jazz hook).
    2.  Messages are stored as an array within the `messages` field of the `CommunicationChannel` document.
    3.  When a user sends a message, the frontend updates the `messages` array in the local Co-JSON document. Jazz automatically synchronizes this change to all other subscribed clients in real-time.
    4.  Jazz's CRDTs handle concurrent message additions, ensuring eventual consistency.
*   **Permissions:** The `event-{eventId}` group grants read/write access to its `CommunicationChannel` document, ensuring only involved parties can see and send messages.

## 4. Frontend-Driven Timesheet and Payroll System

### 4.1. Timesheet Lifecycle

*   **Data Model:** `Timesheet` document.
*   **Data Flow (Staff Submission):**
    1.  Staff use `StaffTimesheetForm` to enter their work details.
    2.  Upon submission, a new `Timesheet` document is created in Jazz (e.g., via `jazz.createDocument`). The `status` is initially `pending`.
    3.  Jazz handles the persistence and synchronization of this new document.
*   **Data Flow (Manager Review):**
    1.  Managers access `ManagerTimesheetDashboard`, which subscribes to `Timesheet` documents (e.g., all `pending` ones, or those for their assigned events/staff).
    2.  When a manager approves or rejects a timesheet, the `status` field (and `reviewedByManagerId`, `reviewedAt`, `managerNotes`) of the `Timesheet` document is updated directly by the frontend (e.g., via `jazz.updateDocument`).
    3.  Jazz instantly syncs these updates to all other managers and the submitting staff member.
*   **Permissions:**
    *   Staff can *create* their own `Timesheet` documents and *write* to them only when `status` is `pending`.
    *   Managers/Admins can *read* all timesheets and *write* to the `status` and review-related fields.

### 4.2. Payroll Processing Engine

*   **Data Model:** `PayrollRun` document (admin-only).
*   **Data Flow:**
    1.  Admins use `AdminPayrollInterface` to view approved `Timesheet` documents (fetched via `useTimesheets` with admin privileges).
    2.  The payroll calculation (total hours, estimated pay) happens entirely on the client-side based on the approved timesheet data.
    3.  When an admin initiates a payroll run, a new `PayrollRun` document is created in Jazz, logging the run details (date, total amount, processed timesheet IDs).
    4.  This creates an auditable record of payroll batches directly in Jazz.
*   **Permissions:** Only members of the `admins` group have read/write/admin access to `PayrollRun` documents, ensuring high security for sensitive payroll data.

## 5. Conclusion

By leveraging Jazz, the North Event Staffing application achieves a robust, scalable, and real-time architecture without the complexities of managing a traditional backend. The direct client-to-Jazz interaction, coupled with Jazz's built-in authentication, fine-grained permissions, and CRDT-based synchronization, provides a powerful foundation for collaborative event management and operational workflows.
