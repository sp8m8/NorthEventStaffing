import { pgTable, text, serial, integer, boolean, timestamp, varchar, decimal, date, time, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // "bar-staff", "sound-technician", "brand-ambassador", "steward", "security"
  experience: text("experience").notNull(),
  rating: integer("rating").notNull().default(5),
  reviews: integer("reviews").notNull().default(0),
  location: text("location").notNull(),
  image: text("image").notNull(),
  specializations: text("specializations").array(),
  hourlyRate: integer("hourly_rate").notNull(), // in pounds
  certifications: text("certifications").array(), // SIA License, First Aid, Food Hygiene, etc.
  licenseNumber: text("license_number"), // SIA License Number for security staff
  licenseExpiry: text("license_expiry"), // License expiry date
  available: boolean("available").notNull().default(true),
  phoneNumber: text("phone_number"),
  email: text("email"),
});

export const serviceRequests = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone"),
  eventDate: text("event_date").notNull(),
  eventLocation: text("event_location").notNull(),
  staffTypes: text("staff_types").array().notNull(),
  staffCount: text("staff_count"),
  eventDuration: text("event_duration"),
  eventDetails: text("event_details"),
  status: text("status").notNull().default("pending"), // "pending", "contacted", "quoted", "booked"
  createdAt: timestamp("created_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  image: text("image").notNull(),
});

export const staffApplications = pgTable("staff_applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  address: text("address").notNull(),
  postcode: text("postcode").notNull(),
  category: text("category").notNull(), // "bar-staff", "sound-technician", "brand-ambassador", "steward", "security"
  experience: text("experience").notNull(),
  siaLicenseNumber: text("sia_license_number"),
  siaLicenseExpiry: text("sia_license_expiry"),
  firstAidCertified: boolean("first_aid_certified").notNull().default(false),
  foodHygieneCertified: boolean("food_hygiene_certified").notNull().default(false),
  rightToWork: boolean("right_to_work").notNull().default(false),
  availableWeekdays: boolean("available_weekdays").notNull().default(false),
  availableWeekends: boolean("available_weekends").notNull().default(false),
  availableEvenings: boolean("available_evenings").notNull().default(false),
  expectedHourlyRate: integer("expected_hourly_rate"),
  previousExperience: text("previous_experience"),
  references: text("references"),
  status: text("status").notNull().default("pending"), // "pending", "approved", "rejected", "interview"
  submittedAt: timestamp("submitted_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: text("reviewed_by"),
  notes: text("notes"),
});

// Users and Authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: text("role").notNull().default("staff"), // "staff", "supervisor", "manager", "admin"
  staffId: integer("staff_id"), // Link to staff table for staff users
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Session storage table
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: text("sess").notNull(), // Changed from jsonb to text for compatibility
    expire: timestamp("expire").notNull(),
  }
);

// Events/Clients
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  contactPerson: text("contact_person"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  venue: text("venue").notNull(),
  address: text("address").notNull(),
  eventDate: date("event_date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  eventType: text("event_type").notNull(), // "festival", "concert", "private", "corporate"
  expectedAttendees: integer("expected_attendees"),
  budget: decimal("budget", { precision: 10, scale: 2 }),
  status: text("status").notNull().default("draft"), // "draft", "confirmed", "in-progress", "completed", "cancelled"
  specialRequirements: text("special_requirements"),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Shifts and Assignments
export const shifts = pgTable("shifts", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull(),
  role: text("role").notNull(), // "bar-staff", "sound-technician", etc.
  position: text("position"), // "head-bartender", "assistant", "lead-sound"
  requiredCount: integer("required_count").notNull().default(1),
  filledCount: integer("filled_count").notNull().default(0),
  shiftDate: date("shift_date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  hourlyRate: decimal("hourly_rate", { precision: 8, scale: 2 }).notNull(),
  description: text("description"),
  requirements: text("requirements").array(), // Specific qualifications needed
  supervisorId: integer("supervisor_id"), // Staff member supervising this shift
  status: text("status").notNull().default("open"), // "open", "filled", "in-progress", "completed", "cancelled"
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const shiftAssignments = pgTable("shift_assignments", {
  id: serial("id").primaryKey(),
  shiftId: integer("shift_id").notNull(),
  staffId: integer("staff_id").notNull(),
  assignedBy: varchar("assigned_by").notNull(),
  status: text("status").notNull().default("assigned"), // "assigned", "confirmed", "checked-in", "checked-out", "no-show", "cancelled"
  checkInTime: timestamp("check_in_time"),
  checkOutTime: timestamp("check_out_time"),
  actualHours: decimal("actual_hours", { precision: 5, scale: 2 }),
  notes: text("notes"),
  rating: integer("rating"), // 1-5 performance rating
  feedback: text("feedback"),
  assignedAt: timestamp("assigned_at").defaultNow(),
});

// Communication and Notifications
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // "shift_reminder", "shift_assignment", "shift_update", "general"
  read: boolean("read").notNull().default(false),
  relatedShiftId: integer("related_shift_id"),
  relatedEventId: integer("related_event_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const shiftReminders = pgTable("shift_reminders", {
  id: serial("id").primaryKey(),
  shiftId: integer("shift_id").notNull(),
  reminderType: text("reminder_type").notNull(), // "24h", "2h", "custom"
  scheduledTime: timestamp("scheduled_time").notNull(),
  sent: boolean("sent").notNull().default(false),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Staff Portal Enhanced
export const staffProfiles = pgTable("staff_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().unique(),
  staffId: integer("staff_id").notNull(),
  emergencyContactName: text("emergency_contact_name"),
  emergencyContactPhone: text("emergency_contact_phone"),
  bankAccountName: text("bank_account_name"),
  bankAccountNumber: text("bank_account_number"),
  bankSortCode: text("bank_sort_code"),
  nationalInsuranceNumber: text("national_insurance_number"),
  profileComplete: boolean("profile_complete").notNull().default(false),
  documentsUploaded: boolean("documents_uploaded").notNull().default(false),
  backgroundCheckStatus: text("background_check_status").default("pending"), // "pending", "approved", "rejected"
  availabilityNotes: text("availability_notes"),
  preferredRoles: text("preferred_roles").array(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const staffAvailability = pgTable("staff_availability", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id").notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0=Sunday, 1=Monday, etc.
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  available: boolean("available").notNull().default(true),
  notes: text("notes"),
});

export const staffDocuments = pgTable("staff_documents", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id").notNull(),
  documentType: text("document_type").notNull(), // "id", "sia_license", "first_aid", "food_hygiene", "dbs"
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  expiryDate: date("expiry_date"),
  verified: boolean("verified").notNull().default(false),
  verifiedBy: varchar("verified_by"),
  verifiedAt: timestamp("verified_at"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

// Legacy table for backwards compatibility
export const staffSchedule = pgTable("staff_schedule", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id").notNull(),
  eventId: integer("event_id"),
  eventName: text("event_name").notNull(),
  eventDate: text("event_date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  location: text("location").notNull(),
  hourlyRate: integer("hourly_rate").notNull(),
  status: text("status").notNull().default("scheduled"), // "scheduled", "confirmed", "cancelled", "completed"
  specialInstructions: text("special_instructions"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertStaffSchema = createInsertSchema(staff).omit({
  id: true,
});

export const insertServiceRequestSchema = createInsertSchema(serviceRequests).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertStaffApplicationSchema = createInsertSchema(staffApplications).omit({
  id: true,
  status: true,
  submittedAt: true,
  reviewedAt: true,
  reviewedBy: true,
  notes: true,
});

export const insertStaffScheduleSchema = createInsertSchema(staffSchedule).omit({
  id: true,
  createdAt: true,
});

export type InsertStaff = z.infer<typeof insertStaffSchema>;
export type Staff = typeof staff.$inferSelect;

export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;
export type ServiceRequest = typeof serviceRequests.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertStaffApplication = z.infer<typeof insertStaffApplicationSchema>;
export type StaffApplication = typeof staffApplications.$inferSelect;

// Database Relations
export const staffRelations = relations(staff, ({ many, one }) => ({
  assignments: many(shiftAssignments),
  availability: many(staffAvailability),
  documents: many(staffDocuments),
  profile: one(staffProfiles, {
    fields: [staff.id],
    references: [staffProfiles.staffId],
  }),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  client: one(clients, {
    fields: [events.clientId],
    references: [clients.id],
  }),
  shifts: many(shifts),
}));

export const shiftsRelations = relations(shifts, ({ one, many }) => ({
  event: one(events, {
    fields: [shifts.eventId],
    references: [events.id],
  }),
  supervisor: one(staff, {
    fields: [shifts.supervisorId],
    references: [staff.id],
  }),
  assignments: many(shiftAssignments),
  reminders: many(shiftReminders),
}));

export const shiftAssignmentsRelations = relations(shiftAssignments, ({ one }) => ({
  shift: one(shifts, {
    fields: [shiftAssignments.shiftId],
    references: [shifts.id],
  }),
  staff: one(staff, {
    fields: [shiftAssignments.staffId],
    references: [staff.id],
  }),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  staffProfile: one(staffProfiles, {
    fields: [users.id],
    references: [staffProfiles.userId],
  }),
  notifications: many(notifications),
}));

// Insert Schemas for new tables
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertShiftSchema = createInsertSchema(shifts).omit({
  id: true,
  filledCount: true,
  createdAt: true,
});

export const insertShiftAssignmentSchema = createInsertSchema(shiftAssignments).omit({
  id: true,
  assignedAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  read: true,
  createdAt: true,
});

export const insertStaffProfileSchema = createInsertSchema(staffProfiles).omit({
  id: true,
  profileComplete: true,
  documentsUploaded: true,
  updatedAt: true,
});

export const insertStaffAvailabilitySchema = createInsertSchema(staffAvailability).omit({
  id: true,
});

export const insertStaffDocumentSchema = createInsertSchema(staffDocuments).omit({
  id: true,
  verified: true,
  verifiedBy: true,
  verifiedAt: true,
  uploadedAt: true,
});

// Type exports for new tables
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertShift = z.infer<typeof insertShiftSchema>;
export type Shift = typeof shifts.$inferSelect;

export type InsertShiftAssignment = z.infer<typeof insertShiftAssignmentSchema>;
export type ShiftAssignment = typeof shiftAssignments.$inferSelect;

export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

export type InsertStaffProfile = z.infer<typeof insertStaffProfileSchema>;
export type StaffProfile = typeof staffProfiles.$inferSelect;

export type InsertStaffAvailability = z.infer<typeof insertStaffAvailabilitySchema>;
export type StaffAvailability = typeof staffAvailability.$inferSelect;

export type InsertStaffDocument = z.infer<typeof insertStaffDocumentSchema>;
export type StaffDocument = typeof staffDocuments.$inferSelect;

// Legacy types
export type InsertStaffSchedule = z.infer<typeof insertStaffScheduleSchema>;
export type StaffSchedule = typeof staffSchedule.$inferSelect;
