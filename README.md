# North Event Staffing

## Overview

North Event Staffing (NORTH STAFF) is a website designed to provide music event staffing solutions across West Yorkshire and North England. Established in 2025, the platform aims to be a "fair to staff and affordable one-stop shop for music event staffing up north," offering services for all essential roles in music-based events. The application includes 10 comprehensive staff categories, competitive package deals, a staff portal, and compliance with full UK regulations.


## Features

- **Comprehensive Staffing**: Covers all essential roles for music-based events.
- **Competitive Packages**: Offers affordable and customizable package deals.
- **Staff Portal**: Dedicated portal for staff management and applications.
- **Testimonials**: Collect and display client reviews.
- **Modern UI/UX**: Built with shadcn/ui, Radix UI, and Tailwind CSS.
- **API Integration**: Uses TanStack Query for efficient data fetching and caching.
- **Mobile Responsive**: Custom React hooks for device detection and adaptive layouts.
- **Environment Config**: Supports `.env` for API keys (e.g., `GEMINI_API_KEY`).
- **Regulation Compliance**: Fully adheres to UK regulations.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:


### Frontend
- **Framework**: React SPA built with Vite.
- **Language**: TypeScript for type safety.
- **Styling**: Tailwind CSS with CSS variables for theming.
- **UI Components**: shadcn/ui, Radix UI primitives.
- **State Management**: TanStack Query for server state.
- **Routing**: Wouter for client-side routing.
- **Hooks**: Custom hooks for mobile detection and toast notifications.


### Backend
- **Framework**: Express.js REST API.
- **Language**: TypeScript for type-safe server-side development.
- **API**: RESTful endpoints for staff, testimonials, and service requests.
- **Validation**: Zod schemas for request validation.
- **Storage**: In-memory and PostgreSQL (via Drizzle ORM).
- **Development Server**: Integrated Vite development server for seamless full-stack development.


### Database
- **Database**: PostgreSQL with Drizzle ORM.
- **Schema**:
  - `staff`: Professional staff profiles with categories, ratings, specializations, certifications, and contact info.
  - `service_requests`: Customer inquiries and booking requests.
  - `testimonials`: Client testimonials and reviews.



## Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/north-event-staffing.git
   cd north-event-staffing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` (or create `.env` if not present).
   - Set your `DATABASE_URL` and `GEMINI_API_KEY` in `.env`.

4. **Set up the database:**
   ```bash
   npm run db:push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173` (frontend) and API at `http://localhost:3000` by default.

---

## Deployment Guide

### 1. Build the Application

```bash
npm run build
```

### 2. Set Environment Variables

- Ensure your production `.env` file contains the correct `DATABASE_URL` and `GEMINI_API_KEY`.

### 3. Run Database Migrations

```bash
npm run db:push
```

### 4. Start the Production Server

```bash
npm run start
```

### 5. (Optional) Deploy to Cloud

- Deploy the codebase to your preferred cloud provider (e.g., Vercel, Railway, Render, AWS, DigitalOcean).
- Set environment variables in your cloud dashboard.
- Ensure ports 5173 (frontend) and 3000 (API) are exposed or proxied as needed.

---


## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run check`: Runs TypeScript checks.
- `npm run db:push`: Pushes the database schema using Drizzle ORM.


## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `GEMINI_API_KEY`: API key for Gemini integration

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
