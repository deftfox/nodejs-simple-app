import { NextFunction, Request, Response } from "express";

export const serviceMethodLogger = (req: Request, res: Response, next: NextFunction) => {
    let method = req.method;
    let url = req.originalUrl;
    let query = JSON.stringify(req.query, null, 4);
    let body = JSON.stringify(req.body, null, 4);
    let log = 
    `${method} method was invoked on url ${url} with following:` + '\n' +
    `query: ${query}` + '\n' +
    `body: ${body}`;
    console.log(log);
    next();
};