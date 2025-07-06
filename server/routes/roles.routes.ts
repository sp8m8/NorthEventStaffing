
import { Router } from 'express';
import { rolesController } from '../controllers/roles.controller';

const rolesRouter = Router();

rolesRouter.get('/', rolesController.getAllRoles);
rolesRouter.get('/:id', rolesController.getRoleById);
rolesRouter.post('/', rolesController.createRole);
rolesRouter.put('/:id', rolesController.updateRole);
rolesRouter.delete('/:id', rolesController.deleteRole);

export default rolesRouter;
