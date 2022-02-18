import { Request } from "express";
import { logger } from './logger'

export const contorllerErrorLogger = (err:any, req: Request,) => {
    let method = req.method;
    let url = req.originalUrl;
    let query = JSON.stringify(req.query, null, 4);
    let body = JSON.stringify(req.body, null, 4);
    let log = 
    `Error in ${method} ${url} with following:` + '\n' +
    `query: ${query}` + '\n' +
    `body: ${body}`;
    logger.error(log);
};