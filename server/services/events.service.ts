
import { db } from '../db';
import { events, NewEvent, Event } from '@shared/schema';
import { eq } from 'drizzle-orm';

export const eventsService = {
  async getAllEvents(): Promise<Event[]> {
    return db.select().from(events);
  },

  async getEventById(id: number): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id));
    return result[0];
  },

  async createEvent(newEvent: NewEvent): Promise<Event> {
    const result = await db.insert(events).values(newEvent).returning();
    return result[0];
  },

  async updateEvent(id: number, eventData: Partial<NewEvent>): Promise<Event | undefined> {
    const result = await db.update(events)
      .set({ ...eventData, updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();
    return result[0];
  },

  async deleteEvent(id: number): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  },
};
