import { Router } from 'express';
import { getMovies } from '../controllers/moviesController';

const router = Router();

router.get('/movies', getMovies);

export default router;