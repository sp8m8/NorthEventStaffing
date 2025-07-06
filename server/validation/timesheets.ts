import { z } from "zod";

export const createTimesheetSchema = z.object({
  shiftAssignmentId: z.number(),
  checkInTime: z.string().datetime(),
  checkOutTime: z.string().datetime(),
  breakDuration: z.number().optional(),
  overtimeHours: z.number().optional(),
});
