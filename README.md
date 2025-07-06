# North Event Staffing

## Overview

North Event Staffing (NORTH STAFF) is a website designed to provide music event staffing solutions across West Yorkshire and North England. Established in 2025, the platform aims to be a "fair to staff and affordable one-stop shop for music event staffing up north," offering services for all essential roles in music-based events. The application includes 10 comprehensive staff categories, competitive package deals, a staff portal, and compliance with full UK regulations.

## Features

- **Comprehensive Staffing**: Covers all essential roles for music-based events.
- **Competitive Packages**: Offers affordable and customizable package deals.
- **Staff Portal**: Provides a dedicated portal for staff management.
- **Regulation Compliance**: Fully adheres to UK regulations.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

### Frontend
- **Framework**: React SPA built with Vite.
- **Language**: TypeScript for type safety.
- **Styling**: Tailwind CSS with CSS variables for theming.
- **UI Components**: shadcn/ui components built on Radix UI primitives.
- **State Management**: TanStack Query for server state.
- **Routing**: Wouter for client-side routing.

### Backend
- **Framework**: Express.js REST API.
- **Language**: TypeScript for type-safe server-side development.
- **API**: RESTful endpoints for staff, testimonials, and service requests.
- **Storage**: In-memory data storage with an IStorage interface for future database migration.
- **Development Server**: Integrated Vite development server for seamless full-stack development.

### Database
- **Database**: PostgreSQL with Drizzle ORM.
- **Schema**:
  - `staff`: Professional staff profiles with categories, ratings, and specializations.
  - `serviceRequests`: Customer inquiries and booking requests.
  - `testimonials`: Client testimonials and reviews.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/north-event-staffing.git
   cd north-event-staffing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npm run db:push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run check`: Runs TypeScript checks.
- `npm run db:push`: Pushes the database schema using Drizzle ORM.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For inquiries, please contact [your-email@example.com](mailto:your-email@example.com).
