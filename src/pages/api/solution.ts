import { calculateSteps } from '@/services';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const steps = calculateSteps(
      parseInt(req.body.A, 10),
      parseInt(req.body.B, 10),
      parseInt(req.body.C, 10),
    );
    res.status(200).json(steps);
  } catch (error) {
    res.status(500).json({ error: 'Oops, that one is on us.' });
  }
}
