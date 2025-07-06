
import { Router } from 'express';
import { remindersController } from '../controllers/reminders.controller';

const remindersRouter = Router();

remindersRouter.post('/trigger', remindersController.triggerShiftReminders);

export default remindersRouter;
