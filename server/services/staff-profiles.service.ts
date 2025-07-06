
import { db } from '../db';
import { staffProfiles, NewStaffProfile, StaffProfile } from '@shared/schema';
import { eq } from 'drizzle-orm';

export const staffProfilesService = {
  async getAllStaffProfiles(): Promise<StaffProfile[]> {
    return db.select().from(staffProfiles);
  },

  async getStaffProfileById(id: number): Promise<StaffProfile | undefined> {
    const result = await db.select().from(staffProfiles).where(eq(staffProfiles.id, id));
    return result[0];
  },

  async createStaffProfile(newProfile: NewStaffProfile): Promise<StaffProfile> {
    const result = await db.insert(staffProfiles).values(newProfile).returning();
    return result[0];
  },

  async updateStaffProfile(id: number, profileData: Partial<NewStaffProfile>): Promise<StaffProfile | undefined> {
    const result = await db.update(staffProfiles)
      .set({ ...profileData, updatedAt: new Date() })
      .where(eq(staffProfiles.id, id))
      .returning();
    return result[0];
  },

  async deleteStaffProfile(id: number): Promise<void> {
    await db.delete(staffProfiles).where(eq(staffProfiles.id, id));
  },
};
