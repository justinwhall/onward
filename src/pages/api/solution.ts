import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Foo>,
) {
  let solution = {};
  try {
    // solution = await getSolution();
  } catch (error) {
    res.status(500).json({ error: 'message' });
  }
  res.status(200).json(solution);
}
