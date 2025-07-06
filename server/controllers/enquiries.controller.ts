
import { Request, Response } from 'express';
import { enquiriesService } from '../services/enquiries.service';
import { insertEnquirySchema } from '@shared/schema';

export const enquiriesController = {
  async getAllEnquiries(req: Request, res: Response): Promise<void> {
    try {
      const allEnquiries = await enquiriesService.getAllEnquiries();
      res.status(200).json(allEnquiries);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch enquiries' });
    }
  },

  async getEnquiryById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const enquiry = await enquiriesService.getEnquiryById(id);
      if (enquiry) {
        res.status(200).json(enquiry);
      } else {
        res.status(404).json({ message: 'Enquiry not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch enquiry' });
    }
  },

  async createEnquiry(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = insertEnquirySchema.parse(req.body);
      const newEnquiry = await enquiriesService.createEnquiry(validatedData);
      res.status(201).json(newEnquiry);
    } catch (error) {
      res.status(400).json({ message: 'Invalid enquiry data', error });
    }
  },

  async updateEnquiry(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updatedEnquiry = await enquiriesService.updateEnquiry(id, req.body);
      if (updatedEnquiry) {
        res.status(200).json(updatedEnquiry);
      } else {
        res.status(404).json({ message: 'Enquiry not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid enquiry data', error });
    }
  },

  async deleteEnquiry(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await enquiriesService.deleteEnquiry(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete enquiry' });
    }
  },
};
