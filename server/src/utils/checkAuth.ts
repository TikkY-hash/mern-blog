import { Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { AuthRequest } from '../types/controllerTypes.js';

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const token: string = (req.headers.authorization || '').replace(/^Bearer\s*/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY as Secret) as JwtPayload;

      if (decoded && typeof decoded === 'object' && '_id' in decoded) {
        req.userId = decoded._id;

        return next();
      } else {
        throw new Error('Invalid token payload');
      }
    } catch (error) {
      return res.status(403).json({
        message: 'Invalid token',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Invalid token',
    });
  }
};
