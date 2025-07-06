
import { Request, Response } from 'express';
import { eventsService } from './events.service';
import { insertEventSchema } from '@shared/schema';

export const eventsController = {
  async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const allEvents = await eventsService.getAllEvents();
      res.status(200).json(allEvents);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch events' });
    }
  },

  async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const event = await eventsService.getEventById(id);
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch event' });
    }
  },

  async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const newEvent = await eventsService.createEvent(validatedData);
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: 'Invalid event data', error });
    }
  },

  async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updatedEvent = await eventsService.updateEvent(id, req.body);
      if (updatedEvent) {
        res.status(200).json(updatedEvent);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid event data', error });
    }
  },

  async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await eventsService.deleteEvent(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete event' });
    }
  },
};
