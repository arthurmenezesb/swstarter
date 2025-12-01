import { Router } from 'express';
import healthRouter from './health';
import moviesRouter from './movies';
import personRouter from './person';
import analyticsRouter from './analytics';

const router = Router();

router.use('/health', healthRouter);
router.use(moviesRouter);
router.use(personRouter);
router.use(analyticsRouter);

export default router;