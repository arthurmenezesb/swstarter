import { Router } from 'express';
import healthRouter from './health';
import moviesRouter from './movies';
import personRouter from './person';

const router = Router();

router.use('/health', healthRouter);
router.use(moviesRouter);
router.use(personRouter);

export default router;