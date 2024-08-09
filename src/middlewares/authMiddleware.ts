import { Request, Response, NextFunction } from 'express';
import { supabase } from '../providers/supabase/supabase';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const user = await supabase.auth.getUser(token);
  
    if(!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = user
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};