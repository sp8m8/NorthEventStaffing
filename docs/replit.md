# Yorkshire Events Staffing

## Overview

NORTH STAFF is a comprehensive full-stack web application providing music event staffing solutions across West Yorkshire and North England. Founded in 2025, the platform serves as a "fair to staff and affordable one-stop shop for music event staffing up north" covering all essential roles for music-based events. The application features 10 comprehensive staff categories, competitive package deals, staff portal functionality, and full UK regulation compliance. Built with a modern React frontend and Node.js/Express backend, utilizing PostgreSQL for data persistence.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

- **Frontend**: React SPA built with Vite, TypeScript, and Tailwind CSS
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming

## Key Components

### Frontend Architecture
- **React SPA**: Single-page application with component-based architecture
- **TypeScript**: Full type safety across the application
- **Vite**: Modern build tool with fast HMR and optimized builds
- **Tailwind CSS**: Utility-first CSS framework with design system
- **shadcn/ui**: High-quality, accessible component library
- **Wouter**: Lightweight client-side routing
- **TanStack Query**: Server state management and caching

### Backend Architecture
- **Express.js**: Web framework handling API routes and middleware
- **TypeScript**: Type-safe server-side development
- **REST API**: RESTful endpoints for staff, testimonials, and service requests
- **Memory Storage**: In-memory data storage with IStorage interface for future database migration
- **Development Server**: Integrated Vite development server for seamless full-stack development

### Database Schema
- **staff**: Professional staff profiles with categories, ratings, and specializations
- **serviceRequests**: Customer inquiries and booking requests
- **testimonials**: Client testimonials and reviews
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect

### UI/UX Design
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: ARIA-compliant components from Radix UI
- **Design System**: Consistent color palette, typography, and spacing
- **Dark Mode Support**: CSS variables for theme switching capability

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle HTTP requests and validate data
3. **Business Logic**: Storage layer abstracts data operations
4. **Data Persistence**: Currently in-memory, configured for PostgreSQL migration
5. **Response Handling**: JSON responses with proper error handling
6. **Client Updates**: Query invalidation and optimistic updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling with validation
- **@hookform/resolvers**: Form validation with Zod integration
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives for complex components
- **lucide-react**: Consistent icon library
- **class-variance-authority**: Type-safe component variants
- **tailwind-merge**: Intelligent Tailwind class merging

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundling for production builds
- **drizzle-kit**: Database migration and schema management

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Type Checking**: TypeScript compilation validation
4. **Database Migrations**: Drizzle Kit for schema updates

### Environment Configuration
- **Development**: Node.js with tsx for TypeScript execution
- **Production**: Compiled JavaScript with Node.js runtime
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (currently configured for Neon Database)
- Static file serving for frontend assets
- Environment variables for configuration

## Changelog
```
Changelog:
- July 06, 2025. Initial setup
- July 06, 2025. Added comprehensive packages page with 3-tier pricing structure (Starter £180, Professional £420, Premium £850) including customizable add-ons and competitive deals for events of varying scales
- July 06, 2025. Updated navigation to include packages page, updated hero CTA buttons to prioritize packages
```

## User Preferences

Preferred communication style: Simple, everyday language.