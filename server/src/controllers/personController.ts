import { Request, Response, NextFunction } from 'express';
import { getPersonFromSwapi } from '../services/personService';

export const getPerson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const person = await getPersonFromSwapi();
    res.json(person);
  } catch (error) {
    next(error);
  }
};