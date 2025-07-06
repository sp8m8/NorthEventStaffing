
import { Request, Response } from 'express';
import { shiftsService } from '../services/shifts.service';
import { insertShiftSchema } from '@shared/schema';

export const shiftsController = {
  async getAllShifts(req: Request, res: Response): Promise<void> {
    try {
      const allShifts = await shiftsService.getAllShifts();
      res.status(200).json(allShifts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch shifts' });
    }
  },

  async getShiftById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const shift = await shiftsService.getShiftById(id);
      if (shift) {
        res.status(200).json(shift);
      } else {
        res.status(404).json({ message: 'Shift not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch shift' });
    }
  },

  async createShift(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = insertShiftSchema.parse(req.body);
      const newShift = await shiftsService.createShift(validatedData);
      res.status(201).json(newShift);
    } catch (error) {
      res.status(400).json({ message: 'Invalid shift data', error });
    }
  },

  async updateShift(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updatedShift = await shiftsService.updateShift(id, req.body);
      if (updatedShift) {
        res.status(200).json(updatedShift);
      } else {
        res.status(404).json({ message: 'Shift not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid shift data', error });
    }
  },

  async deleteShift(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await shiftsService.deleteShift(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete shift' });
    }
  },
};
