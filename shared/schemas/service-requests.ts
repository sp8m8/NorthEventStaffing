import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const serviceRequests = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 256 }),
  eventDate: varchar("event_date", { length: 256 }).notNull(),
  eventLocation: text("event_location").notNull(),
  staffTypes: text("staff_types").notNull(),
  staffCount: text("staff_count"),
  eventDuration: text("event_duration"),
  eventDetails: text("event_details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertServiceRequestSchema = createInsertSchema(serviceRequests, {
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  eventDate: z.string().min(1, "Event date is required"),
  eventLocation: z.string().min(1, "Event location is required"),
});
