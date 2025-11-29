import { Router } from 'express';
import { getMovies } from '../controllers/moviesController';

const router = Router();

router.get('/movie', getMovies);

export default router;