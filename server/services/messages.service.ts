import { db } from "../db";
import { messages } from "../../shared/schema";
import { eq, and, or } from "drizzle-orm";

export const getMessages = async (eventId: number) => {
  return await db
    .select()
    .from(messages)
    .where(eq(messages.eventId, eventId))
    .orderBy(messages.sentAt);
};

export const createMessage = async (data: {
  eventId: number;
  senderId: number;
  receiverId: number;
  message: string;
}) => {
  const [newMessage] = await db.insert(messages).values(data).returning();
  // In a real application, you would emit a socket.io event here
  // to notify the receiver of the new message.
  return newMessage;
};
