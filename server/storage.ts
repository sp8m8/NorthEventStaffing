import { 
  staff, 
  serviceRequests, 
  testimonials,
  staffApplications,
  staffSchedule,
  type Staff, 
  type InsertStaff,
  type ServiceRequest,
  type InsertServiceRequest,
  type Testimonial,
  type InsertTestimonial,
  type StaffApplication,
  type InsertStaffApplication,
  type StaffSchedule,
  type InsertStaffSchedule
} from "@shared/schema";

export interface IStorage {
  // Staff methods
  getAllStaff(): Promise<Staff[]>;
  getStaffByCategory(category: string): Promise<Staff[]>;
  getStaffById(id: number): Promise<Staff | undefined>;
  createStaff(staff: InsertStaff): Promise<Staff>;

  // Service request methods
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
  getAllServiceRequests(): Promise<ServiceRequest[]>;
  getServiceRequestById(id: number): Promise<ServiceRequest | undefined>;

  // Testimonials methods
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Staff application methods
  createStaffApplication(application: InsertStaffApplication): Promise<StaffApplication>;
  getAllStaffApplications(): Promise<StaffApplication[]>;
  getStaffApplicationById(id: number): Promise<StaffApplication | undefined>;
  updateStaffApplicationStatus(id: number, status: string, reviewedBy?: string, notes?: string): Promise<StaffApplication | undefined>;

  // Staff schedule methods
  createStaffSchedule(schedule: InsertStaffSchedule): Promise<StaffSchedule>;
  getStaffScheduleByStaffId(staffId: number): Promise<StaffSchedule[]>;
  getAllStaffSchedule(): Promise<StaffSchedule[]>;
}

export class MemStorage implements IStorage {
  private staff: Map<number, Staff>;
  private serviceRequests: Map<number, ServiceRequest>;
  private testimonials: Map<number, Testimonial>;
  private staffApplications: Map<number, StaffApplication>;
  private staffSchedule: Map<number, StaffSchedule>;
  private currentStaffId: number;
  private currentRequestId: number;
  private currentTestimonialId: number;
  private currentApplicationId: number;
  private currentScheduleId: number;

  constructor() {
    this.staff = new Map();
    this.serviceRequests = new Map();
    this.testimonials = new Map();
    this.staffApplications = new Map();
    this.staffSchedule = new Map();
    this.currentStaffId = 1;
    this.currentRequestId = 1;
    this.currentTestimonialId = 1;
    this.currentApplicationId = 1;
    this.currentScheduleId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample staff data
    const sampleStaff: InsertStaff[] = [
      {
        name: "Sarah Mitchell",
        category: "bar-staff",
        experience: "8 years experience • Licensed • Cocktail specialist",
        rating: 5,
        reviews: 24,
        location: "Based in Leeds, covers West Yorkshire",
        image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        specializations: ["Licensed bartending", "Cocktail mixing", "Wine service"],
        hourlyRate: 18,
        certifications: ["Personal License", "First Aid", "Food Hygiene Level 2"],
        licenseNumber: null,
        licenseExpiry: null,
        available: true,
        phoneNumber: "07123 456789",
        email: "sarah.mitchell@northstaff.co.uk",
      },
      {
        name: "James Thompson",
        category: "sound-technician",
        experience: "12 years experience • Live sound specialist • Festival experience",
        rating: 5,
        reviews: 31,
        location: "Based in Bradford, covers North England",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        specializations: ["Live sound mixing", "Audio engineering", "Equipment setup"],
        hourlyRate: 25,
        certifications: ["City & Guilds Sound Engineering", "First Aid", "PAT Testing"],
        licenseNumber: null,
        licenseExpiry: null,
        available: true,
        phoneNumber: "07234 567890",
        email: "james.thompson@northstaff.co.uk",
      },
      {
        name: "Emma Richardson",
        category: "brand-ambassador",
        experience: "5 years experience • Marketing degree • Multilingual",
        rating: 5,
        reviews: 18,
        location: "Based in Sheffield, covers Yorkshire",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        specializations: ["Product promotion", "Customer engagement", "Lead generation"],
        hourlyRate: 16,
        certifications: ["Marketing Diploma", "First Aid"],
        licenseNumber: null,
        licenseExpiry: null,
        available: true,
        phoneNumber: "07345 678901",
        email: "emma.richardson@northstaff.co.uk",
      },
      {
        name: "Michael Chen",
        category: "bar-staff",
        experience: "6 years experience • Wine sommelier • Corporate events",
        rating: 5,
        reviews: 19,
        location: "Based in York, covers Yorkshire",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        specializations: ["Wine service", "Corporate events", "Bar management"],
        hourlyRate: 20,
        certifications: ["Personal License", "Wine Sommelier", "First Aid"],
        licenseNumber: null,
        licenseExpiry: null,
        available: true,
        phoneNumber: "07456 789012",
        email: "michael.chen@northstaff.co.uk",
      },
      {
        name: "Lucy Davis",
        category: "sound-technician",
        experience: "7 years experience • Concert sound • Live recording",
        rating: 5,
        reviews: 22,
        location: "Based in Manchester, covers North England",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        specializations: ["Concert sound", "Live recording", "System design"],
        hourlyRate: 23,
        certifications: ["Audio Engineering", "First Aid", "Working at Height"],
        licenseNumber: null,
        licenseExpiry: null,
        available: true,
        phoneNumber: "07567 890123",
        email: "lucy.davis@northstaff.co.uk",
      },
      {
        name: "Daniel Wilson",
        category: "brand-ambassador",
        experience: "4 years experience • Sales background • Event activation",
        rating: 5,
        reviews: 15,
        location: "Based in Leeds, covers West Yorkshire",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        specializations: ["Sales promotion", "Event activation", "Brand representation"],
        hourlyRate: 17,
        certifications: ["Sales Training", "First Aid"],
        licenseNumber: null,
        licenseExpiry: null,
        available: true,
        phoneNumber: "07678 901234",
        email: "daniel.wilson@northstaff.co.uk",
      },
      {
        name: "Marcus Johnson",
        category: "steward",
        experience: "6 years experience • Football stadium steward • Crowd management specialist",
        rating: 5,
        reviews: 28,
        location: "Based in Manchester, covers North England",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        specializations: ["Crowd control", "Emergency procedures", "Health & Safety"],
        hourlyRate: 14,
        certifications: ["NVQ Level 2 Spectator Safety", "First Aid", "Fire Marshal"],
        licenseNumber: null,
        licenseExpiry: null,
        available: true,
        phoneNumber: "07789 012345",
        email: "marcus.johnson@northstaff.co.uk",
      },
      {
        name: "Sophie Clarke",
        category: "security",
        experience: "8 years experience • Licensed security operative • Event security specialist",
        rating: 5,
        reviews: 35,
        location: "Based in Leeds, covers West Yorkshire",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        specializations: ["Door supervision", "Close protection", "CCTV monitoring"],
        hourlyRate: 22,
        certifications: ["SIA Door Supervision", "SIA CCTV", "First Aid", "Conflict Resolution"],
        licenseNumber: "SIA-123456789",
        licenseExpiry: "2025-08-15",
        available: true,
        phoneNumber: "07890 123456",
        email: "sophie.clarke@northstaff.co.uk",
      },
    ];

    sampleStaff.forEach(staffMember => {
      this.createStaff(staffMember);
    });

    // Sample testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Mark Stevens",
        title: "Event Manager",
        company: "Leeds Conference Centre",
        content: "NORTH STAFF provided exceptional bar staff for our corporate event. Professional, punctual, and incredibly skilled. Will definitely use them again.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      },
      {
        name: "Sarah Williams",
        title: "Festival Director",
        company: "Yorkshire Music Festival",
        content: "Their sound technicians saved our music festival. Expert knowledge, professional equipment handling, and great communication throughout.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      },
      {
        name: "David Parker",
        title: "Marketing Director",
        company: "TechStart Ltd",
        content: "Outstanding brand ambassadors for our product launch. They represented our brand perfectly and generated significant interest at the trade show.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      },
      {
        name: "Rachel Moore",
        title: "Security Manager",
        company: "Manchester Arena",
        content: "NORTH STAFF's security team is top-notch. Professional SIA licensed staff who handle crowd control expertly. Highly recommended for any large event.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      },
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  async getAllStaff(): Promise<Staff[]> {
    return Array.from(this.staff.values());
  }

  async getStaffByCategory(category: string): Promise<Staff[]> {
    return Array.from(this.staff.values()).filter(s => s.category === category);
  }

  async getStaffById(id: number): Promise<Staff | undefined> {
    return this.staff.get(id);
  }

  async createStaff(insertStaff: InsertStaff): Promise<Staff> {
    const id = this.currentStaffId++;
    const newStaff: Staff = { 
      ...insertStaff, 
      id,
      rating: insertStaff.rating ?? 5,
      reviews: insertStaff.reviews ?? 0,
      specializations: insertStaff.specializations ?? null,
      certifications: insertStaff.certifications ?? null,
      licenseNumber: insertStaff.licenseNumber ?? null,
      licenseExpiry: insertStaff.licenseExpiry ?? null,
      available: insertStaff.available ?? true,
      phoneNumber: insertStaff.phoneNumber ?? null,
      email: insertStaff.email ?? null
    };
    this.staff.set(id, newStaff);
    return newStaff;
  }

  async createServiceRequest(insertRequest: InsertServiceRequest): Promise<ServiceRequest> {
    const id = this.currentRequestId++;
    const newRequest: ServiceRequest = { 
      ...insertRequest, 
      id, 
      status: "pending",
      createdAt: new Date(),
      company: insertRequest.company ?? null,
      phone: insertRequest.phone ?? null,
      staffCount: insertRequest.staffCount ?? null,
      eventDuration: insertRequest.eventDuration ?? null,
      eventDetails: insertRequest.eventDetails ?? null
    };
    this.serviceRequests.set(id, newRequest);
    return newRequest;
  }

  async getAllServiceRequests(): Promise<ServiceRequest[]> {
    return Array.from(this.serviceRequests.values());
  }

  async getServiceRequestById(id: number): Promise<ServiceRequest | undefined> {
    return this.serviceRequests.get(id);
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const newTestimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      rating: insertTestimonial.rating ?? 5
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  // Staff application methods
  async createStaffApplication(application: InsertStaffApplication): Promise<StaffApplication> {
    const id = this.currentApplicationId++;
    const newApplication: StaffApplication = { 
      ...application, 
      id, 
      status: "pending",
      submittedAt: new Date(),
      reviewedAt: null,
      reviewedBy: null,
      notes: null,
      siaLicenseNumber: application.siaLicenseNumber ?? null,
      siaLicenseExpiry: application.siaLicenseExpiry ?? null,
      expectedHourlyRate: application.expectedHourlyRate ?? null,
      previousExperience: application.previousExperience ?? null,
      references: application.references ?? null,
      firstAidCertified: application.firstAidCertified ?? false,
      foodHygieneCertified: application.foodHygieneCertified ?? false,
      rightToWork: application.rightToWork ?? false,
      availableWeekdays: application.availableWeekdays ?? false,
      availableWeekends: application.availableWeekends ?? false,
      availableEvenings: application.availableEvenings ?? false
    };
    this.staffApplications.set(id, newApplication);
    return newApplication;
  }

  async getAllStaffApplications(): Promise<StaffApplication[]> {
    return Array.from(this.staffApplications.values());
  }

  async getStaffApplicationById(id: number): Promise<StaffApplication | undefined> {
    return this.staffApplications.get(id);
  }

  async updateStaffApplicationStatus(id: number, status: string, reviewedBy?: string, notes?: string): Promise<StaffApplication | undefined> {
    const application = this.staffApplications.get(id);
    if (!application) return undefined;
    
    const updatedApplication: StaffApplication = {
      ...application,
      status,
      reviewedAt: new Date(),
      reviewedBy: reviewedBy || null,
      notes: notes || application.notes
    };
    
    this.staffApplications.set(id, updatedApplication);
    return updatedApplication;
  }

  // Staff schedule methods
  async createStaffSchedule(schedule: InsertStaffSchedule): Promise<StaffSchedule> {
    const id = this.currentScheduleId++;
    const newSchedule: StaffSchedule = { 
      ...schedule, 
      id,
      createdAt: new Date(),
      status: schedule.status ?? "scheduled",
      eventId: schedule.eventId ?? null,
      specialInstructions: schedule.specialInstructions ?? null
    };
    this.staffSchedule.set(id, newSchedule);
    return newSchedule;
  }

  async getStaffScheduleByStaffId(staffId: number): Promise<StaffSchedule[]> {
    return Array.from(this.staffSchedule.values()).filter(s => s.staffId === staffId);
  }

  async getAllStaffSchedule(): Promise<StaffSchedule[]> {
    return Array.from(this.staffSchedule.values());
  }
}

export const storage = new MemStorage();
