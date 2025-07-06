
import { Router } from 'express';
import { calendarController } from '../controllers/calendar.controller';

const calendarRouter = Router();

calendarRouter.get('/:staffId', calendarController.getShiftsForUser);

export default calendarRouter;
