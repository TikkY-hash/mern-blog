import { Request, Response } from 'express';

export const uploadImage = (req: Request, res: Response) =>
  res.json({
    url: `/uploads/${req?.file?.originalname}`,
  });
