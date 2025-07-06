
import { db } from '../db';
import { shiftAssignments, NewShiftAssignment, ShiftAssignment } from '@shared/schema';
import { eq, and } from 'drizzle-orm';

export const shiftAssignmentsService = {
  async getAssignmentsByShiftId(shiftId: number): Promise<ShiftAssignment[]> {
    return db.select().from(shiftAssignments).where(eq(shiftAssignments.shiftId, shiftId));
  },

  async getAssignmentsByStaffId(staffId: number): Promise<ShiftAssignment[]> {
    return db.select().from(shiftAssignments).where(eq(shiftAssignments.staffId, staffId));
  },

  async applyForShift(shiftId: number, staffId: number): Promise<ShiftAssignment> {
    const newAssignment: NewShiftAssignment = {
      shiftId,
      staffId,
      status: 'pending',
    };
    const result = await db.insert(shiftAssignments).values(newAssignment).returning();
    return result[0];
  },

  async assignStaffToShift(shiftId: number, staffId: number): Promise<ShiftAssignment> {
    const newAssignment: NewShiftAssignment = {
      shiftId,
      staffId,
      status: 'confirmed',
    };
    const result = await db.insert(shiftAssignments).values(newAssignment).returning();
    return result[0];
  },

  async updateAssignmentStatus(assignmentId: number, status: 'confirmed' | 'declined' | 'completed'): Promise<ShiftAssignment | undefined> {
    const result = await db.update(shiftAssignments)
      .set({ status })
      .where(eq(shiftAssignments.id, assignmentId))
      .returning();
    return result[0];
  },
};
