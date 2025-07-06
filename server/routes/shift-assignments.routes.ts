
import { Router } from 'express';
import { shiftAssignmentsController } from '../controllers/shift-assignments.controller';

const shiftAssignmentsRouter = Router();

shiftAssignmentsRouter.get('/shift/:shiftId', shiftAssignmentsController.getAssignmentsByShiftId);
shiftAssignmentsRouter.get('/staff/:staffId', shiftAssignmentsController.getAssignmentsByStaffId);
shiftAssignmentsRouter.post('/apply', shiftAssignmentsController.applyForShift);
shiftAssignmentsRouter.post('/assign', shiftAssignmentsController.assignStaffToShift);
shiftAssignmentsRouter.patch('/:id/status', shiftAssignmentsController.updateAssignmentStatus);

export default shiftAssignmentsRouter;
