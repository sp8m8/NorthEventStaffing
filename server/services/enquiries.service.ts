
import { db } from '../db';
import { enquiries, NewEnquiry, Enquiry } from '@shared/schema';
import { eq } from 'drizzle-orm';

export const enquiriesService = {
  async getAllEnquiries(): Promise<Enquiry[]> {
    return db.select().from(enquiries);
  },

  async getEnquiryById(id: number): Promise<Enquiry | undefined> {
    const result = await db.select().from(enquiries).where(eq(enquiries.id, id));
    return result[0];
  },

  async createEnquiry(newEnquiry: NewEnquiry): Promise<Enquiry> {
    const result = await db.insert(enquiries).values(newEnquiry).returning();
    return result[0];
  },

  async updateEnquiry(id: number, enquiryData: Partial<NewEnquiry>): Promise<Enquiry | undefined> {
    const result = await db.update(enquiries)
      .set(enquiryData)
      .where(eq(enquiries.id, id))
      .returning();
    return result[0];
  },

  async deleteEnquiry(id: number): Promise<void> {
    await db.delete(enquiries).where(eq(enquiries.id, id));
  },
};
