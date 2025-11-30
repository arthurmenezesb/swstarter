import { Request, Response, NextFunction } from 'express';
import {
  getPersonFromSwapi,
  getPersonByIdFromSwapi,
  getPersonByName,
} from '../services/personService';

export const getPerson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.query;

    if (query) {
      const person = await getPersonByName(query as string);
      return res.json(person);
    }

    const person = await getPersonFromSwapi();
    res.json(person);
  } catch (error) {
    next(error);
  }
};

export const getPersonById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const person = await getPersonByIdFromSwapi(id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    next(error);
  }
};