
import { Router } from 'express';
import { enquiriesController } from '../controllers/enquiries.controller';

const enquiriesRouter = Router();

enquiriesRouter.get('/', enquiriesController.getAllEnquiries);
enquiriesRouter.get('/:id', enquiriesController.getEnquiryById);
enquiriesRouter.post('/', enquiriesController.createEnquiry);
enquiriesRouter.put('/:id', enquiriesController.updateEnquiry);
enquiriesRouter.delete('/:id', enquiriesController.deleteEnquiry);

export default enquiriesRouter;
