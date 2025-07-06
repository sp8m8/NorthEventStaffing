# North Event Staffing Codebase Documentation

This documentation provides a comprehensive reference for developers working on the North Event Staffing project. It covers the architecture, main modules, API, and key utilities to aid development and onboarding.

---

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Backend](#backend)
  - [Entry Point (`server/index.ts`)](#entry-point-serverindexts)
  - [API Routes (`server/routes.ts`)](#api-routes-serverroutests)
  - [Database Layer (`server/db.ts`)](#database-layer-serverdbts)
  - [Schema (`shared/schema.ts`)](#schema-sharedschemats)
- [Frontend](#frontend)
  - [App Structure (`client/src/App.tsx`)](#app-structure-clientsrcapptsx)
  - [Hooks](#hooks)
  - [Lib Utilities](#lib-utilities)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)

---

## Architecture Overview

- **Monorepo**: Contains `client` (React), `server` (Express), and `shared` (schema, types).
- **Frontend**: React (Vite, TypeScript, Tailwind CSS, shadcn/ui, Wouter, TanStack Query)
- **Backend**: Express.js (TypeScript, REST API, Zod validation)
- **Database**: PostgreSQL (Drizzle ORM, Neon serverless)

---

## Backend

### Entry Point (`server/index.ts`)
- Sets up Express app, JSON parsing, and URL encoding.
- Adds logging middleware for API requests.
- Registers all API routes via `registerRoutes`.
- Integrates with Vite for development.

### API Routes (`server/routes.ts`)
- **GET `/api/staff`**: List all staff.
- **GET `/api/staff/category/:category`**: List staff by category.
- **GET `/api/staff/:id`**: Get a single staff member.
- **POST `/api/service-requests`**: Submit a new service request (Zod validated).
- **POST `/api/staff-applications`**: Submit a staff application (Zod validated).
- **GET `/api/testimonials`**: List testimonials.
- (See file for more endpoints.)
- Uses Zod schemas for validation and type safety.

### Database Layer (`server/db.ts`)
- Connects to PostgreSQL using Neon serverless driver.
- Uses Drizzle ORM for type-safe queries.
- Loads schema from `shared/schema.ts`.
- Requires `DATABASE_URL` in environment.
- Supports serverless and local development.

### Schema (`shared/schema.ts`)
Defines main tables:
- **staff**: id, name, category, experience, rating, reviews, location, image, specializations, hourlyRate, certifications, license info, contact, availability.
- **service_requests**: id, name, company, email, phone, event details, staff types/count, status, createdAt.
- **testimonials**: id, name, company, testimonial, rating, createdAt.

All schemas are exported for use in both backend and frontend validation.

---

## Frontend

### App Structure (`client/src/App.tsx`)
- Uses Wouter for routing.
- Provides routes for Home, Services, Staff, About, Contact, Join Us, Staff Portal, Packages, NotFound.
- Wraps app in `QueryClientProvider` (TanStack Query) and `TooltipProvider`.
- Main layout: `<Header />`, `<main>`, `<Footer />`.
- Uses shadcn/ui and Radix UI for accessible, modern UI components.

### Hooks
- **`useIsMobile`** (`client/src/hooks/use-mobile.tsx`):
  - Returns `true` if viewport is mobile width (<768px).
  - Uses `window.matchMedia` and React state.
- **`useToast`** (`client/src/hooks/use-toast.ts`):
  - Manages toast notifications (add, update, dismiss, remove).
  - Supports custom actions and limits.
  - Used throughout the UI for feedback and alerts.

### Lib Utilities
- **`queryClient.ts`**:
  - Exports a configured TanStack Query client.
  - Provides `apiRequest` for fetch with error handling.
  - `getQueryFn` for custom query functions with 401 handling.
- **`utils.ts`**:
  - Exports `cn` utility for merging Tailwind/clsx class names.
  - Used for dynamic class composition in all UI components.

---

## API Reference

### Staff
- `GET /api/staff` — List all staff
- `GET /api/staff/category/:category` — List staff by category
- `GET /api/staff/:id` — Get staff member by ID

### Service Requests
- (See `server/routes.ts` for full endpoints)

### Testimonials
- (See `server/routes.ts` for full endpoints)

---

## Environment Variables
- `DATABASE_URL` — PostgreSQL connection string
- `GEMINI_API_KEY` — API key for Gemini integration (required for Gemini-powered features)

---

## Development Tips
- Use `npm run dev` to start both client and server in development mode.
- Use `npm run db:push` to sync schema with the database.
- All shared types and schemas are in `shared/schema.ts` for both client and server.
- Use `.env` to manage API keys and secrets securely.

---

For more details, see the code comments and individual module files.
