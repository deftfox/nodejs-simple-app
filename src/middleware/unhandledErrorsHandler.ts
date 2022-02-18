import { Request, Response, NextFunction } from "express";
import { logger } from '../utils/logger'

export const unhandledErrorsHandler = (err:any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        logger.error(`Unhandled error: ${err.message}`);
        res.status(500).send(err.message);
    } else {
        next()
    }
};