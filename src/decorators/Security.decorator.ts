import { Request, Response, NextFunction } from "express";
import { supabase } from "../providers/supabase/supabase";
import { BaseError, HttpStatusCode } from "../providers/errorProvider";

export function Secure(): MethodDecorator {
    return (target, propertyKey) => {
        const originalMethod = target[propertyKey];
        target[propertyKey] = async function (req: Request, res: Response, next: NextFunction) {
            const accessToken = req.headers.authorization?.split(' ')[1];
            const user=await supabase.auth.getUser(accessToken);
            
            if(!user.data.user) throw new BaseError('FORBIDDEN', HttpStatusCode.FORBIDDEN, false, 'User UnAuthenticated')
            return originalMethod.apply(this, [req, res, next]);
        };
    };
}
