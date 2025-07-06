import { pgTable, serial, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const staffApplications = pgTable("staff_applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 256 }).notNull(),
  dateOfBirth: varchar("date_of_birth", { length: 256 }).notNull(),
  address: text("address").notNull(),
  postcode: varchar("postcode", { length: 10 }).notNull(),
  category: text("category").notNull(),
  experience: text("experience").notNull(),
  siaLicenseNumber: text("sia_license_number"),
  siaLicenseExpiry: varchar("sia_license_expiry", { length: 256 }),
  firstAidCertified: boolean("first_aid_certified").default(false),
  foodHygieneCertified: boolean("food_hygiene_certified").default(false),
  rightToWork: boolean("right_to_work").notNull(),
  availableWeekdays: boolean("available_weekdays").default(false),
  availableWeekends: boolean("available_weekends").default(false),
  availableEvenings: boolean("available_evenings").default(false),
  expectedHourlyRate: integer("expected_hourly_rate"),
  previousExperience: text("previous_experience"),
  "references": text("references"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStaffApplicationSchema = createInsertSchema(staffApplications, {
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    address: z.string().min(1, "Address is required"),
    postcode: z.string().min(1, "Postcode is required"),
    experience: z.string().min(1, "Experience is required"),
});
