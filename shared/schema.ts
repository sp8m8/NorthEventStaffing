import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
  pgEnum,
  decimal,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Zod for schema validation
import { z } from "zod";


// USERS
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  phone: varchar("phone", { length: 256 }),
  address: text("address"),
  userType: text("user_type").notNull().default("client"), // 'client', 'staff', 'manager', 'admin'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod schema for user creation (insert)
export const insertUserSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  userType: z.string().optional(),
});

export const usersRelations = relations(users, ({ many }) => ({
  staffProfile: many(staffProfiles),
  sentMessages: many(messages, { relationName: "sender" }),
  receivedMessages: many(messages, { relationName: "receiver" }),
}));

// STAFF PROFILES
export const staffProfiles = pgTable("staff_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  bio: text("bio"),
  skills: text("skills"), // Comma-separated or JSON
  experience: text("experience"),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  payRate: decimal("pay_rate", { precision: 10, scale: 2 }).notNull(),
});

// Zod schema for staff profile creation (insert)
export const insertStaffProfileSchema = createInsertSchema(staffProfiles);
export const selectStaffProfileSchema = createSelectSchema(staffProfiles);

export const staffProfilesRelations = relations(staffProfiles, ({ one, many }) => ({
  user: one(users, { fields: [staffProfiles.userId], references: [users.id] }),
  shiftAssignments: many(shiftAssignments),
  payrollRecords: many(payrollRecords),
}));

// EVENTS
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  eventName: text("event_name").notNull(),
  clientName: text("client_name").notNull(),
  eventDate: date("event_date").notNull(),
  location: text("location").notNull(),
  status: text("status").default("planned"), // 'planned', 'ongoing', 'completed', 'cancelled'
});

// Zod schema for event creation (insert)
export const insertEventSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  clientName: z.string().min(1, "Client name is required"),
  eventDate: z.string().min(1, "Event date is required"),
  location: z.string().min(1, "Location is required"),
  status: z.string().optional(),
});

export const eventsRelations = relations(events, ({ many }) => ({
  shifts: many(shifts),
  messages: many(messages),
}));

// SHIFTS
export const shifts = pgTable("shifts", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .references(() => events.id)
    .notNull(),
  roleId: integer("role_id")
    .references(() => roles.id)
    .notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  requiredStaff: integer("required_staff").notNull(),
});

// Zod schema for shift creation (insert)
export const insertShiftSchema = createInsertSchema(shifts);
export const selectShiftSchema = createSelectSchema(shifts);

export const shiftsRelations = relations(shifts, ({ one, many }) => ({
  event: one(events, { fields: [shifts.eventId], references: [events.id] }),
  role: one(roles, { fields: [shifts.roleId], references: [roles.id] }),
  shiftAssignments: many(shiftAssignments),
}));

// ROLES
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  roleName: text("role_name").notNull(), // e.g., 'Bartender', 'Security', 'Waiter'
  description: text("description"),
});

// Zod schema for role creation (insert)
export const insertRoleSchema = createInsertSchema(roles);
export const selectRoleSchema = createSelectSchema(roles);

export const rolesRelations = relations(roles, ({ many }) => ({
  shifts: many(shifts),
}));

// SHIFT ASSIGNMENTS
export const shiftAssignments = pgTable("shift_assignments", {
  id: serial("id").primaryKey(),
  shiftId: integer("shift_id")
    .references(() => shifts.id)
    .notNull(),
  staffId: integer("staff_id")
    .references(() => staffProfiles.id)
    .notNull(),
  status: text("status").default("pending"), // 'pending', 'confirmed', 'cancelled'
});

// Zod schema for shift assignment creation (insert)
export const insertShiftAssignmentSchema = createInsertSchema(shiftAssignments);
export const selectShiftAssignmentSchema = createSelectSchema(shiftAssignments);

export const shiftAssignmentsRelations = relations(
  shiftAssignments,
  ({ one, many }) => ({
    shift: one(shifts, {
      fields: [shiftAssignments.shiftId],
      references: [shifts.id],
    }),
    staffProfile: one(staffProfiles, {
      fields: [shiftAssignments.staffId],
      references: [staffProfiles.id],
    }),
    timesheet: many(timesheets),
  }),
);

// ENQUIRIES
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod schema for enquiry creation (insert)
export const insertEnquirySchema = createInsertSchema(enquiries);
export const selectEnquirySchema = createSelectSchema(enquiries);

// New Communication Table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .references(() => events.id)
    .notNull(),
  senderId: integer("sender_id")
    .references(() => users.id)
    .notNull(),
  receiverId: integer("receiver_id")
    .references(() => users.id)
    .notNull(),
  message: text("message").notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
  read: boolean("read").default(false),
});

// Zod schema for message creation (insert)
export const insertMessageSchema = createInsertSchema(messages);
export const selectMessageSchema = createSelectSchema(messages);

export const messagesRelations = relations(messages, ({ one }) => ({
  event: one(events, { fields: [messages.eventId], references: [events.id] }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "sender",
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
    relationName: "receiver",
  }),
}));

// New Timesheet Table
export const timesheetStatusEnum = pgEnum("timesheet_status", [
  "pending",
  "approved",
  "rejected",
]);

export const timesheets = pgTable("timesheets", {
  id: serial("id").primaryKey(),
  shiftAssignmentId: integer("shift_assignment_id")
    .references(() => shiftAssignments.id)
    .notNull(),
  checkInTime: timestamp("check_in_time").notNull(),
  checkOutTime: timestamp("check_out_time").notNull(),
  breakDuration: integer("break_duration"), // in minutes
  overtimeHours: decimal("overtime_hours", { precision: 5, scale: 2 }),
  status: timesheetStatusEnum("status").default("pending"),
  managerNotes: text("manager_notes"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

// Zod schema for timesheet creation (insert)
export const insertTimesheetSchema = createInsertSchema(timesheets);
export const selectTimesheetSchema = createSelectSchema(timesheets);

export const timesheetsRelations = relations(timesheets, ({ one }) => ({
  shiftAssignment: one(shiftAssignments, {
    fields: [timesheets.shiftAssignmentId],
    references: [shiftAssignments.id],
  }),
}));

// New Payroll Table
export const payrollStatusEnum = pgEnum("payroll_status", [
  "pending",
  "processed",
  "paid",
]);

export const payrollRecords = pgTable("payroll_records", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id")
    .references(() => staffProfiles.id)
    .notNull(),
  payPeriodStart: date("pay_period_start").notNull(),
  payPeriodEnd: date("pay_period_end").notNull(),
  totalHours: decimal("total_hours", { precision: 10, scale: 2 }).notNull(),
  totalPay: decimal("total_pay", { precision: 10, scale: 2 }).notNull(),
  status: payrollStatusEnum("status").default("pending"),
  processedAt: timestamp("processed_at"),
  paymentDate: date("payment_date"),
});

// Zod schema for payroll record creation (insert)
export const insertPayrollRecordSchema = createInsertSchema(payrollRecords);
export const selectPayrollRecordSchema = createSelectSchema(payrollRecords);

export const payrollRecordsRelations = relations(payrollRecords, ({ one }) => ({
  staffProfile: one(staffProfiles, {
    fields: [payrollRecords.staffId],
    references: [staffProfiles.id],
  }),
}));
