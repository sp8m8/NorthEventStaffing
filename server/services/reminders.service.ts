
import { db } from '../db';
import { shifts, shiftAssignments, staffProfiles, users } from '@shared/schema';
import { and, eq, gte, lte } from 'drizzle-orm';

export const remindersService = {
  async triggerShiftReminders(): Promise<void> {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const upcomingShifts = await db
      .select()
      .from(shifts)
      .leftJoin(shiftAssignments, eq(shifts.id, shiftAssignments.shiftId))
      .leftJoin(staffProfiles, eq(shiftAssignments.staffId, staffProfiles.id))
      .leftJoin(users, eq(staffProfiles.userId, users.id))
      .where(
        and(
          eq(shiftAssignments.status, 'confirmed'),
          gte(shifts.startTime, now),
          lte(shifts.startTime, tomorrow)
        )
      );

    for (const result of upcomingShifts) {
      if (result.users && result.shifts) {
        console.log(`Reminder: ${result.users.email} has a shift at ${result.shifts.startTime}`);
      }
    }
  },
};
