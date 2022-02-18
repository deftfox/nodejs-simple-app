import express, { Request, Response } from "express";

export const errorExampleRouter = express.Router();

errorExampleRouter.get("/unhandledError", (req: Request, res: Response) => {
    throw Error('Example unhandled error')
;});

errorExampleRouter.get("/unhandledRejection", async (req: Request, res: Response) => {
    throw Error('Example unhandled rejection')
;});