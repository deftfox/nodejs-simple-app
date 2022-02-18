/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as UserService from "../services/users.service";
import { BaseUserModel, UserModel, BaseUserRequestSchema } from "../models/user.interface";
import { userValidationSchema } from "../models/user.validator";
import { ValidatedRequest, createValidator } from 'express-joi-validation';
import { contorllerErrorLogger } from '../utils/contorllerErrorLogger'
/**
 * Router Definition
 */

export const usersRouter = express.Router();
const validator = createValidator()

/**
 * Controller Definitions
 */

// GET users

usersRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users: UserModel[] = await UserService.getAutoSuggestUsers(req.body.loginSubstring, req.body.limit);

        res.status(200).send(users);
    } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
    }
});

// GET users/:id

usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const user: UserModel | null = await UserService.find(id);

        if (user) {
            return res.status(200).send(user);
        }

        res.status(404).send("User not found");
    } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
    }
});

// POST items

usersRouter.post(
    "/", 
    validator.body(userValidationSchema), 
    async (req: ValidatedRequest<BaseUserRequestSchema>, res: Response) => {
    try {
        const user: BaseUserModel = req.body;

        const newUser = await UserService.create(user);

        res.status(201).send(newUser.id);
    } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
    }
});

// PUT users/:id

usersRouter.put(
    "/:id", 
    validator.body(userValidationSchema),  
    async (req: ValidatedRequest<BaseUserRequestSchema>, res: Response) => {
    const id: string = req.params.id;

    try {
        const userUpdate: BaseUserModel = req.body;

        const existingUser: UserModel | null = await UserService.find(id);

        if (existingUser) {
            const updatedUser = await UserService.update(id, userUpdate);
            return res.status(200).send(`User with id ${id} updated succesfully`);
        }

        const newUser = await UserService.create(userUpdate);

        res.status(201).send(newUser.id);
    } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
    }
});

// DELETE items/:id

usersRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        await UserService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
    }
});
