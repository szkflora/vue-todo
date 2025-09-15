import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
    userId?: string;
    firstName?: string;
    lastName?: string;
}

interface TokenPayload extends JwtPayload {
    userId: string;
    firstName: string;
    lastName: string;
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json('Unauthorized');
  try {
    const decoded = jwt.verify(token, 'secret') as TokenPayload;
    req.userId = decoded.userId;
    req.firstName = decoded.firstName;
    req.lastName = decoded.lastName;
    next();
  } catch (error) {
    return res.status(401).json('Unauthorized');
  }
}
