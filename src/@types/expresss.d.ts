// File: src/types/express.d.ts

import { UserResponse } from '@supabase/supabase-js';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse; // Replace 'any' with your user type if available
    }
  }
}
