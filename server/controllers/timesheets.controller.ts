import { Request, Response } from "express";
import * as timesheetService from "../services/timesheets.service";

export const createTimesheet = async (req: Request, res: Response) => {
  const newTimesheet = await timesheetService.createTimesheet(req.body);
  res.status(201).json(newTimesheet);
};

export const getTimesheet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const timesheet = await timesheetService.getTimesheet(parseInt(id));
  res.json(timesheet);
};

export const updateTimesheetStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, managerNotes } = req.body;
  const updatedTimesheet = await timesheetService.updateTimesheetStatus(
    parseInt(id),
    status,
    managerNotes,
  );
  res.json(updatedTimesheet);
};
