import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // "bar-staff", "sound-technician", "brand-ambassador"
  experience: text("experience").notNull(),
  rating: integer("rating").notNull().default(5),
  reviews: integer("reviews").notNull().default(0),
  location: text("location").notNull(),
  image: text("image").notNull(),
  specializations: text("specializations").array(),
  hourlyRate: integer("hourly_rate").notNull(), // in pounds
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

export type InsertStaff = z.infer<typeof insertStaffSchema>;
export type Staff = typeof staff.$inferSelect;

export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;
export type ServiceRequest = typeof serviceRequests.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
