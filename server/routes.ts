
import type { Express } from "express";
import { createServer, type Server } from "http";
import eventsRouter from "./routes/events.routes";
import usersRouter from "./routes/users.routes";
import staffProfilesRouter from "./routes/staff-profiles.routes";
import shiftsRouter from "./routes/shifts.routes";
import rolesRouter from "./routes/roles.routes";
import enquiriesRouter from "./routes/enquiries.routes";
import shiftAssignmentsRouter from "./routes/shift-assignments.routes";
import calendarRouter from "./routes/calendar.routes";
import remindersRouter from "./routes/reminders.routes";

export async function registerRoutes(app: Express): Promise<Server> {
  app.use("/api/events", eventsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/staff-profiles", staffProfilesRouter);
  app.use("/api/shifts", shiftsRouter);
  app.use("/api/roles", rolesRouter);
  app.use("/api/enquiries", enquiriesRouter);
  app.use("/api/shift-assignments", shiftAssignmentsRouter);
  app.use("/api/calendar", calendarRouter);
  app.use("/api/reminders", remindersRouter);

  const httpServer = createServer(app);
  return httpServer;
}
