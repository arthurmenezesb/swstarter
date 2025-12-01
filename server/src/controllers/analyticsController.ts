import { Request, Response } from 'express';
import { getLatestAnalytics } from '../services/analyticsService';

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await getLatestAnalytics();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching analytics' });
  }
};