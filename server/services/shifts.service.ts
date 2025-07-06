
import { db } from '../db';
import { shifts, NewShift, Shift } from '@shared/schema';
import { eq } from 'drizzle-orm';

export const shiftsService = {
  async getAllShifts(): Promise<Shift[]> {
    return db.select().from(shifts);
  },

  async getShiftById(id: number): Promise<Shift | undefined> {
    const result = await db.select().from(shifts).where(eq(shifts.id, id));
    return result[0];
  },

  async createShift(newShift: NewShift): Promise<Shift> {
    const result = await db.insert(shifts).values(newShift).returning();
    return result[0];
  },

  async updateShift(id: number, shiftData: Partial<NewShift>): Promise<Shift | undefined> {
    const result = await db.update(shifts)
      .set({ ...shiftData, updatedAt: new Date() })
      .where(eq(shifts.id, id))
      .returning();
    return result[0];
  },

  async deleteShift(id: number): Promise<void> {
    await db.delete(shifts).where(eq(shifts.id, id));
  },
};
