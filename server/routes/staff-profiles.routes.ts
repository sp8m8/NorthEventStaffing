
import { Router } from 'express';
import { staffProfilesController } from '../controllers/staff-profiles.controller';

const staffProfilesRouter = Router();

staffProfilesRouter.get('/', staffProfilesController.getAllStaffProfiles);
staffProfilesRouter.get('/:id', staffProfilesController.getStaffProfileById);
staffProfilesRouter.post('/', staffProfilesController.createStaffProfile);
staffProfilesRouter.put('/:id', staffProfilesController.updateStaffProfile);
staffProfilesRouter.delete('/:id', staffProfilesController.deleteStaffProfile);

export default staffProfilesRouter;
