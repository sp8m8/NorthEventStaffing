
import { Request, Response } from 'express';
import { usersService } from '../services/users.service';
import { insertUserSchema } from '@shared/schema';

export const usersController = {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const allUsers = await usersService.getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  },

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await usersService.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  },

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const newUser = await usersService.createUser(validatedData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Invalid user data', error });
    }
  },

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updatedUser = await usersService.updateUser(id, req.body);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid user data', error });
    }
  },

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await usersService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
  },
};
