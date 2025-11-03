import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: string };
    (req as any).user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ 
      tokenStatus: "Failed",
      message: 'Token is not valid' });
  }
};
