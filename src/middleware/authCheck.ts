import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secret: string = process.env.JWT_SECRET!;

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl !== '/api/login/') {
        const token = req.headers['x-access-token'] as string;
    
        if (token) {
            jwt.verify(token, secret, function(err: any, decoded: any){
                if (err) {
                    res.status(401).send('Failed to authenticate token');
                } else {
                    next();
                }
            })
        } else {
            res.status(403).send('No token provided');
        }    
    } else {
        next();
    }
};