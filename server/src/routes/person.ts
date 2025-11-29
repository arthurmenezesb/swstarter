import { Router } from 'express';
import { getPerson } from '../controllers/personController';

const router = Router();

router.get('/person', getPerson);

export default router;