import { Router } from 'express';
import { getPerson, getPersonById } from '../controllers/personController';

const router = Router();

router.get('/person', getPerson);
router.get('/person/:id', getPersonById);

export default router;