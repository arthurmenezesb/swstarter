import { Router } from 'express';
import { getMovies, getMovieById } from '../controllers/moviesController';

const router = Router();

router.get('/movie', getMovies)
router.get('/movie/:id', getMovieById);

export default router;