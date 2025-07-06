import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
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

export type InsertStaffSchedule = z.infer<typeof insertStaffScheduleSchema>;
export type StaffSchedule = typeof staffSchedule.$inferSelect;
