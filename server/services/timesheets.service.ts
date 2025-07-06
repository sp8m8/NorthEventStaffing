import { db } from "../db";
import { timesheets } from "../../shared/schema";
import { eq } from "drizzle-orm";
import { createTimesheetSchema } from "../validation/timesheets";

export const createTimesheet = async (data: any) => {
  const validatedData = createTimesheetSchema.parse(data);
  const [newTimesheet] = await db
    .insert(timesheets)
    .values(validatedData)
    .returning();
  return newTimesheet;
};

export const getTimesheet = async (id: number) => {
  const [timesheet] = await db
    .select()
    .from(timesheets)
    .where(eq(timesheets.id, id));
  return timesheet;
};

export const updateTimesheetStatus = async (
  id: number,
  status: "approved" | "rejected",
  managerNotes?: string,
) => {
  const [updatedTimesheet] = await db
    .update(timesheets)
    .set({ status, managerNotes })
    .where(eq(timesheets.id, id))
    .returning();
  return updatedTimesheet;
};
