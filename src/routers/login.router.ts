import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as UserService from "../services/users.service";
import { BaseUserModel, UserModel, BaseUserRequestSchema } from "../models/user.interface";
import { contorllerErrorLogger } from '../utils/contorllerErrorLogger';
const secret: string = process.env.JWT_SECRET!;

export const loginRouter = express.Router();

loginRouter.post(
    "/", 
    async (req: Request, res: Response) => {
    try {
        const logingInUser: BaseUserModel = req.body;
        const loggedInUser: UserModel | null = await UserService.authenticate(logingInUser.login, logingInUser.password);
        
        if (!loggedInUser) {
            res.status(403).send('Bad username or password');
        } else {
            const payload = { "id": loggedInUser.id };
            const token = jwt.sign(payload, secret, { expiresIn: "1h" });
            res.send(token);
        }
    } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
    }
});