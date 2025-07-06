
import { Request, Response } from 'express';
import { staffProfilesService } from '../services/staff-profiles.service';
import { insertStaffProfileSchema } from '@shared/schema';

export const staffProfilesController = {
  async getAllStaffProfiles(req: Request, res: Response): Promise<void> {
    try {
      const allStaffProfiles = await staffProfilesService.getAllStaffProfiles();
      res.status(200).json(allStaffProfiles);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch staff profiles' });
    }
  },

  async getStaffProfileById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const staffProfile = await staffProfilesService.getStaffProfileById(id);
      if (staffProfile) {
        res.status(200).json(staffProfile);
      } else {
        res.status(404).json({ message: 'Staff profile not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch staff profile' });
    }
  },

  async createStaffProfile(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = insertStaffProfileSchema.parse(req.body);
      const newStaffProfile = await staffProfilesService.createStaffProfile(validatedData);
      res.status(201).json(newStaffProfile);
    } catch (error) {
      res.status(400).json({ message: 'Invalid staff profile data', error });
    }
  },

  async updateStaffProfile(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updatedStaffProfile = await staffProfilesService.updateStaffProfile(id, req.body);
      if (updatedStaffProfile) {
        res.status(200).json(updatedStaffProfile);
      } else {
        res.status(404).json({ message: 'Staff profile not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid staff profile data', error });
    }
  },

  async deleteStaffProfile(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await staffProfilesService.deleteStaffProfile(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete staff profile' });
    }
  },
};
