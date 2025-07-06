
import { Request, Response } from 'express';
import { remindersService } from '../services/reminders.service';

export const remindersController = {
  async triggerShiftReminders(req: Request, res: Response): Promise<void> {
    try {
      await remindersService.triggerShiftReminders();
      res.status(200).json({ message: 'Shift reminders triggered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to trigger shift reminders' });
    }
  },
};
