import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
    userId?: string;
}

interface TokenPayload extends JwtPayload {
    userId: string;
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  console.log(token, 'n');
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, 'secret') as TokenPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
}
