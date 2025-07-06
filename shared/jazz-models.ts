
// shared/jazz-models.ts

/**
 * This file defines the Jazz Co-JSON document schemas and outlines the Jazz Group
 * and permission structure for the North Event Staffing application.
 *
 * Jazz provides real-time synchronization, authentication, and fine-grained
 * permissions, allowing us to build a truly backendless application.
 */

// --- 1. Core Jazz Document Interfaces ---

/**
 * Represents a Jazz Co-JSON Document. All our application-specific documents
 * will extend this to include Jazz's internal metadata.
 */
interface JazzDocument {
  // Jazz internal properties (e.g., _id, _owner, _permissions) would be here
  // For the purpose of this design, we focus on the application data.
  id: string; // A unique identifier for the document
}

/**
 * UserProfile Document Schema
 * Stored within a global 'user-profiles' collection.
 * Permissions:
 * - Read: All authenticated users (for basic profile lookup, e.g., display name).
 * - Write: Only the user themselves, and members of the 'managers' or 'admins' group.
 * - Admin: Only members of the 'admins' group.
 */
export interface UserProfile extends JazzDocument {
  name: string;
  email: string;
  role: 'staff' | 'manager' | 'client' | 'admin';
  // Additional profile details can be added here
  contactNumber?: string;
  address?: string;
}

/**
 * Event Document Schema
 * Each Event is a top-level document.
 * Permissions:
 * - Read/Write: Members of the specific Event's Jazz Group (see Group Structure below).
 * - Admin: Only members of the 'admins' group.
 */
export interface Event extends JazzDocument {
  name: string;
  date: string; // ISO date string
  location: string;
  description: string;
  clientId: string; // UserProfile.id of the client who owns this event
  managerIds: string[]; // UserProfile.id of managers assigned to this event
  staffIds: string[]; // UserProfile.id of staff assigned to this event
  status: 'planning' | 'active' | 'completed' | 'cancelled';
}

/**
 * CommunicationChannel Document Schema
 * Linked to a specific Event. Contains an array of messages.
 * Permissions:
 * - Read/Write: Members of the associated Event's Jazz Group.
 * - Append-only for messages: Users can only add new messages, not modify old ones.
 *   (This would be a Jazz-specific permission or handled by application logic).
 */
export interface CommunicationChannel extends JazzDocument {
  eventId: string; // Links to the Event document
  messages: Array<{
    senderId: string; // UserProfile.id of the sender
    timestamp: string; // ISO date string
    content: string;
  }>;
}

/**
 * Timesheet Document Schema
 * Linked to a specific staff member and a shift (implicitly via event/staff context).
 * Permissions:
 * - Create: Only the staff member themselves.
 * - Read: Staff member, and members of the 'managers' and 'admins' groups.
 * - Write (status field only): Only members of the 'managers' or 'admins' group.
 * - Write (other fields): Only the staff member (if status is 'pending').
 */
export interface Timesheet extends JazzDocument {
  staffId: string; // UserProfile.id of the staff member
  eventId: string; // Links to the Event this timesheet is for
  date: string; // Date of work (ISO date string)
  startTime: string; // Time staff started (e.g., "09:00")
  endTime: string; // Time staff ended (e.g., "17:00")
  breakDurationMinutes: number; // Duration of breaks in minutes
  hoursWorked: number; // Calculated total hours
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string; // Timestamp of submission
  reviewedByManagerId?: string; // UserProfile.id of manager who reviewed
  reviewedAt?: string; // Timestamp of review
  managerNotes?: string; // Notes from manager on approval/rejection
}

/**
 * PayrollRun Document Schema
 * Admin-only document for tracking batch payroll processing.
 * Permissions:
 * - Read/Write/Admin: Only members of the 'admins' group.
 */
export interface PayrollRun extends JazzDocument {
  runDate: string; // Date of the payroll run (ISO date string)
  status: 'initiated' | 'processing' | 'completed' | 'failed';
  totalAmountPaid: number;
  processedTimesheetIds: string[]; // Array of Timesheet.id that were included in this run
  generatedReportUrl?: string; // URL to a generated payroll report (e.g., in cloud storage)
  notes?: string;
}

// --- 2. Jazz Group Structure and Permissions ---

/**
 * Jazz Group Structure Overview:
 * Jazz uses Groups to manage access control. Users are members of one or more groups,
 * and documents grant permissions to these groups.
 */

/**
 * Global Groups:
 * These groups would be created at the application's root level.
 */
export type GlobalGroup =
  | 'admins' // Members: Application administrators. Full access to all data.
  | 'managers' // Members: All managers. Can review timesheets, manage events.
  | 'staff' // Members: All staff. Can submit timesheets, view their events.
  | 'clients'; // Members: All clients. Can view their events, communicate with managers.

/**
 * Dynamic Event-Specific Groups:
 * For each Event document, a corresponding Jazz Group would be created.
 * This group's ID could be derived from the Event ID (e.g., `event-${eventId}`).
 *
 * Members of an `EventGroup`:
 * - The `clientId` associated with the event.
 * - All `managerIds` assigned to the event.
 * - All `staffIds` assigned to the event.
 *
 * Permissions granted to an `EventGroup`:
 * - `Event` Document: Read/Write access for the specific Event document.
 * - `CommunicationChannel` Document: Read/Write access for the specific CommunicationChannel document linked to the event.
 *
 * This ensures that only users directly involved with an event (client, assigned managers, assigned staff)
 * have access to its details and communication.
 */
export type EventGroup = `event-${string}`; // Example: 'event-uuid123'

/**
 * Document-Level Permissions Strategy:
 *
 * 1.  **UserProfile:**
 *     - Document Owner: The user themselves.
 *     - Read Access: 'authenticated' (all logged-in users) or specific groups like 'managers', 'admins'.
 *     - Write Access: Document owner, 'managers', 'admins'.
 *
 * 2.  **Event:**
 *     - Document Owner: Could be the creating manager or an 'admins' group.
 *     - Read/Write Access: The specific `EventGroup` (e.g., `event-uuid123`).
 *     - Admin Access: 'admins' group.
 *
 * 3.  **CommunicationChannel:**
 *     - Document Owner: Could be the creating manager or linked to the Event owner.
 *     - Read/Write Access: The specific `EventGroup`.
 *     - Append-only for messages: This is a more advanced Jazz permission or application-level logic.
 *       Users can add to the `messages` array but not modify existing entries.
 *
 * 4.  **Timesheet:**
 *     - Document Owner: The `staffId` who created it.
 *     - Read Access: Document owner, 'managers' group, 'admins' group.
 *     - Write Access:
 *       - Staff (owner): Can write all fields *if* `status` is 'pending'.
 *       - Managers/Admins: Can write the `status`, `reviewedByManagerId`, `reviewedAt`, `managerNotes` fields,
 *         regardless of current status. This would require field-level permissions in Jazz.
 *         If field-level permissions are not directly available, application logic on the client-side
 *         would enforce this, backed by server-side validation (if a server component existed, but here,
 *         Jazz's robust CRDTs and conflict resolution would handle concurrent updates, and permissions
 *         would prevent unauthorized writes).
 *
 * 5.  **PayrollRun:**
 *     - Document Owner: 'admins' group.
 *     - Read/Write/Admin Access: 'admins' group.
 */

// --- 3. Jazz Client Initialization (Conceptual) ---

// This would be how you might initialize Jazz in your main.tsx or App.tsx
// import { Jazz } from '@jazz-sdk/client'; // Placeholder for Jazz SDK import

/*
const jazz = new Jazz({
  // Configuration for your Jazz instance
  // e.g., peerId: '...', signalServer: '...', auth: '...'
});

// Example of how you might get a document or group
// const userProfiles = jazz.getCollection('user-profiles');
// const myProfile = userProfiles.get('my-user-id');

// const eventGroup = jazz.getGroup(`event-${eventId}`);
// const eventDoc = eventGroup.get('event-doc-id');
*/
