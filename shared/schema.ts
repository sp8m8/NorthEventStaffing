import { pgTable, text, serial, integer, boolean, timestamp, pgEnum, uniqueIndex, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Enum for user roles
export const userRoleEnum = pgEnum("user_role", ["staff", "supervisor", "admin"]);

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").notNull().default("staff"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Staff Profiles table for staff details
export const staffProfiles = pgTable("staff_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phoneNumber: text("phone_number"),
  address: text("address"),
  postcode: text("postcode"),
  dateOfBirth: text("date_of_birth"),
  skills: text("skills").array(),
  certifications: text("certifications").array(),
  availability: text("availability").array(),
  profilePictureUrl: text("profile_picture_url"),
  status: text("status").notNull().default("pending"), // "pending", "approved", "rejected"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: timestamp("date").notNull(),
  venue: text("venue").notNull(),
  clientInfo: text("client_info"),
  status: text("status").notNull().default("planned"), // "planned", "ongoing", "completed", "cancelled"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Roles table for defining job roles
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(), // e.g., "Sound Engineer", "Security", "Bartender"
  description: text("description"),
});

// Shifts table linked to events
export const shifts = pgTable("shifts", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => events.id, { onDelete: 'cascade' }),
  roleId: integer("role_id").notNull().references(() => roles.id, { onDelete: 'cascade' }),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  payRate: integer("pay_rate").notNull(), // in pence to avoid floating point issues
  status: text("status").notNull().default("open"), // "open", "filled", "in-progress", "completed", "cancelled"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Shift Assignments table to link staff to shifts
export const shiftAssignments = pgTable("shift_assignments", {
  id: serial("id").primaryKey(),
  shiftId: integer("shift_id").notNull().references(() => shifts.id, { onDelete: 'cascade' }),
  staffId: integer("staff_id").notNull().references(() => staffProfiles.id, { onDelete: 'cascade' }),
  status: text("status").notNull().default("pending"), // "pending", "confirmed", "declined", "completed"
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => {
  return {
    unq: uniqueIndex("unq_shift_staff").on(table.shiftId, table.staffId),
  };
});

// Enquiries table for customer service requests
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone"),
  eventDate: timestamp("event_date"),
  eventLocation: text("event_location"),
  staffTypes: text("staff_types").array(),
  staffCount: integer("staff_count"),
  eventDuration: text("event_duration"),
  eventDetails: text("event_details"),
  status: text("status").notNull().default("pending"), // "pending", "contacted", "quoted", "booked"
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertStaffProfileSchema = createInsertSchema(staffProfiles);
export const selectStaffProfileSchema = createSelectSchema(staffProfiles);

export const insertEventSchema = createInsertSchema(events);
export const selectEventSchema = createSelectSchema(events);

export const insertRoleSchema = createInsertSchema(roles);
export const selectRoleSchema = createSelectSchema(roles);

export const insertShiftSchema = createInsertSchema(shifts);
export const selectShiftSchema = createSelectSchema(shifts);

export const insertShiftAssignmentSchema = createInsertSchema(shiftAssignments);
export const selectShiftAssignmentSchema = createSelectSchema(shiftAssignments);

export const insertEnquirySchema = createInsertSchema(enquiries);
export const selectEnquirySchema = createSelectSchema(enquiries);

// Types for convenience
export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;

export type StaffProfile = z.infer<typeof selectStaffProfileSchema>;
export type NewStaffProfile = z.infer<typeof insertStaffProfileSchema>;

export type Event = z.infer<typeof selectEventSchema>;
export type NewEvent = z.infer<typeof insertEventSchema>;

export type Role = z.infer<typeof selectRoleSchema>;
export type NewRole = z.infer<typeof insertRoleSchema>;

export type Shift = z.infer<typeof selectShiftSchema>;
export type NewShift = z.infer<typeof insertShiftSchema>;

export type ShiftAssignment = z.infer<typeof selectShiftAssignmentSchema>;
export type NewShiftAssignment = z.infer<typeof insertShiftAssignmentSchema>;

export type Enquiry = z.infer<typeof selectEnquirySchema>;
export type NewEnquiry = z.infer<typeof insertEnquirySchema>;