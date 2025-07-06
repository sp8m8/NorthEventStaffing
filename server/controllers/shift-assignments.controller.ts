
import { Request, Response } from 'express';
import { shiftAssignmentsService } from '../services/shift-assignments.service';

export const shiftAssignmentsController = {
  async getAssignmentsByShiftId(req: Request, res: Response): Promise<void> {
    try {
      const shiftId = parseInt(req.params.shiftId);
      const assignments = await shiftAssignmentsService.getAssignmentsByShiftId(shiftId);
      res.status(200).json(assignments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch assignments' });
    }
  },

  async getAssignmentsByStaffId(req: Request, res: Response): Promise<void> {
    try {
      const staffId = parseInt(req.params.staffId);
      const assignments = await shiftAssignmentsService.getAssignmentsByStaffId(staffId);
      res.status(200).json(assignments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch assignments' });
    }
  },

  async applyForShift(req: Request, res: Response): Promise<void> {
    try {
      const { shiftId, staffId } = req.body;
      const newAssignment = await shiftAssignmentsService.applyForShift(shiftId, staffId);
      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(400).json({ message: 'Failed to apply for shift', error });
    }
  },

  async assignStaffToShift(req: Request, res: Response): Promise<void> {
    try {
      const { shiftId, staffId } = req.body;
      const newAssignment = await shiftAssignmentsService.assignStaffToShift(shiftId, staffId);
      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(400).json({ message: 'Failed to assign staff to shift', error });
    }
  },

  async updateAssignmentStatus(req: Request, res: Response): Promise<void> {
    try {
      const assignmentId = parseInt(req.params.id);
      const { status } = req.body;
      const updatedAssignment = await shiftAssignmentsService.updateAssignmentStatus(assignmentId, status);
      if (updatedAssignment) {
        res.status(200).json(updatedAssignment);
      } else {
        res.status(404).json({ message: 'Assignment not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid assignment data', error });
    }
  },
};
