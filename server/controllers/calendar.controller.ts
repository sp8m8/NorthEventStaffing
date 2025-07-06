
import { Request, Response } from 'express';
import { calendarService } from '../services/calendar.service';

export const calendarController = {
  async getShiftsForUser(req: Request, res: Response): Promise<void> {
    try {
      const staffId = parseInt(req.params.staffId);
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        res.status(400).json({ message: 'startDate and endDate are required' });
        return;
      }

      const shifts = await calendarService.getShiftsForUser(
        staffId,
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(shifts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch shifts for user' });
    }
  },
};
