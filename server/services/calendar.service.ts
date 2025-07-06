
import { db } from '../db';
import { shifts, shiftAssignments } from '@shared/schema';
import { and, eq, gte, lte } from 'drizzle-orm';

export const calendarService = {
  async getShiftsForUser(staffId: number, startDate: Date, endDate: Date): Promise<any[]> {
    const assignedShifts = await db
      .select()
      .from(shifts)
      .leftJoin(shiftAssignments, eq(shifts.id, shiftAssignments.shiftId))
      .where(
        and(
          eq(shiftAssignments.staffId, staffId),
          gte(shifts.startTime, startDate),
          lte(shifts.endTime, endDate)
        )
      );

    return assignedShifts.map(result => ({
      ...result.shifts,
      assignmentStatus: result.shift_assignments?.status,
    }));
  },
};
