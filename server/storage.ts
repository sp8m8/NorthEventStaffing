import { 
  staff, 
  serviceRequests, 
  testimonials,
  type Staff, 
  type InsertStaff,
  type ServiceRequest,
  type InsertServiceRequest,
  type Testimonial,
  type InsertTestimonial
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
}

export class MemStorage implements IStorage {
  private staff: Map<number, Staff>;
  private serviceRequests: Map<number, ServiceRequest>;
  private testimonials: Map<number, Testimonial>;
  private currentStaffId: number;
  private currentRequestId: number;
  private currentTestimonialId: number;

  constructor() {
    this.staff = new Map();
    this.serviceRequests = new Map();
    this.testimonials = new Map();
    this.currentStaffId = 1;
    this.currentRequestId = 1;
    this.currentTestimonialId = 1;

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
        content: "Yorkshire Events Staffing provided exceptional bar staff for our corporate event. Professional, punctual, and incredibly skilled. Will definitely use them again.",
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
    const newStaff: Staff = { ...insertStaff, id };
    this.staff.set(id, newStaff);
    return newStaff;
  }

  async createServiceRequest(insertRequest: InsertServiceRequest): Promise<ServiceRequest> {
    const id = this.currentRequestId++;
    const newRequest: ServiceRequest = { 
      ...insertRequest, 
      id, 
      status: "pending",
      createdAt: new Date()
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
    const newTestimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
}

export const storage = new MemStorage();
