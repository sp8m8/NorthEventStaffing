import { Request, Response } from "express";
import * as messageService from "../services/messages.service";

export const getMessages = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const messages = await messageService.getMessages(parseInt(eventId));
  res.json(messages);
};

export const createMessage = async (req: Request, res: Response) => {
  const { eventId, receiverId, message } = req.body;
  const senderId = (req as any).user.id;
  const newMessage = await messageService.createMessage({
    eventId,
    senderId,
    receiverId,
    message,
  });
  res.status(201).json(newMessage);
};
