import { Router } from 'express';
import healthRouter from './health';
import moviesRouter from './movies';

const router = Router();

router.use('/health', healthRouter);
router.use(moviesRouter);

export default router;