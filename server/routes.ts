import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServiceRequestSchema, insertStaffApplicationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all staff
  app.get("/api/staff", async (_req, res) => {
    try {
      const allStaff = await storage.getAllStaff();
      res.json(allStaff);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch staff" });
    }
  });

  // Get staff by category
  app.get("/api/staff/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const staff = await storage.getStaffByCategory(category);
      res.json(staff);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch staff by category" });
    }
  });

  // Get single staff member
  app.get("/api/staff/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const staff = await storage.getStaffById(id);
      if (!staff) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      res.json(staff);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch staff member" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Create service request
  app.post("/api/service-requests", async (req, res) => {
    try {
      const validatedData = insertServiceRequestSchema.parse(req.body);
      const serviceRequest = await storage.createServiceRequest(validatedData);
      res.status(201).json(serviceRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid service request data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create service request" });
    }
  });

  // Get all service requests (for admin purposes)
  app.get("/api/service-requests", async (_req, res) => {
    try {
      const requests = await storage.getAllServiceRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service requests" });
    }
  });

  // Staff application routes
  app.post("/api/staff-applications", async (req, res) => {
    try {
      const validatedData = insertStaffApplicationSchema.parse(req.body);
      const application = await storage.createStaffApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid application data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create staff application" });
    }
  });

  app.get("/api/staff-applications", async (_req, res) => {
    try {
      const applications = await storage.getAllStaffApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch staff applications" });
    }
  });

  app.patch("/api/staff-applications/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, reviewedBy, notes } = req.body;
      const application = await storage.updateStaffApplicationStatus(id, status, reviewedBy, notes);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Failed to update application status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
