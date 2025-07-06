
import { Router } from 'express';
import { shiftsController } from '../controllers/shifts.controller';

const shiftsRouter = Router();

shiftsRouter.get('/', shiftsController.getAllShifts);
shiftsRouter.get('/:id', shiftsController.getShiftById);
shiftsRouter.post('/', shiftsController.createShift);
shiftsRouter.put('/:id', shiftsController.updateShift);
shiftsRouter.delete('/:id', shiftsController.deleteShift);

export default shiftsRouter;
