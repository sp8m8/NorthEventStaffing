
import { Request, Response } from 'express';
import { rolesService } from '../services/roles.service';
import { insertRoleSchema } from '@shared/schema';

export const rolesController = {
  async getAllRoles(req: Request, res: Response): Promise<void> {
    try {
      const allRoles = await rolesService.getAllRoles();
      res.status(200).json(allRoles);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch roles' });
    }
  },

  async getRoleById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const role = await rolesService.getRoleById(id);
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch role' });
    }
  },

  async createRole(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = insertRoleSchema.parse(req.body);
      const newRole = await rolesService.createRole(validatedData);
      res.status(201).json(newRole);
    } catch (error) {
      res.status(400).json({ message: 'Invalid role data', error });
    }
  },

  async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updatedRole = await rolesService.updateRole(id, req.body);
      if (updatedRole) {
        res.status(200).json(updatedRole);
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid role data', error });
    }
  },

  async deleteRole(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await rolesService.deleteRole(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete role' });
    }
  },
};
