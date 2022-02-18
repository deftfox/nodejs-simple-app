/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as GroupService from "../services/groups.service";
import { BaseGroupModel, GroupModel, BaseGroupRequestSchema } from "../models/group.interface";
import { groupValidationSchema } from "../models/group.validator";
import { ValidatedRequest, createValidator } from 'express-joi-validation';
import { contorllerErrorLogger } from '../utils/contorllerErrorLogger'

/**
 * Router Definition
 */

export const groupsRouter = express.Router();
const validator = createValidator();

/**
 * Controller Definitions
 */

// GET groups

groupsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const groups: GroupModel[] = await GroupService.getAll();

        res.status(200).send(groups);
    } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
    }
});

// GET groups/:id

groupsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const group: GroupModel | null = await GroupService.find(id);

        if (group) {
            return res.status(200).send(group);
        }

        res.status(404).send("Group not found");
    } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
    }
});

// POST items

groupsRouter.post(
    "/", 
    validator.body(groupValidationSchema), 
    async (req: ValidatedRequest<BaseGroupRequestSchema>, res: Response) => {
    try {
        const group: BaseGroupModel = req.body;

        const newGroup = await GroupService.create(group);

        res.status(201).send(newGroup.id);
    } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
    }
});

// PUT groups/:id

groupsRouter.put(
    "/:id", 
    validator.body(groupValidationSchema),  
    async (req: ValidatedRequest<BaseGroupRequestSchema>, res: Response) => {
    const id: string = req.params.id;

    try {
        const groupUpdate: BaseGroupModel = req.body;

        const existingGroup: GroupModel | null = await GroupService.find(id);

        if (existingGroup) {
            const updatedUser = await GroupService.update(id, groupUpdate);
            return res.status(200).send(`Group with id ${id} updated succesfully`);
        }

        const newGroup = await GroupService.create(groupUpdate);

        res.status(201).send(newGroup.id);
    } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
    }
});

// DELETE groups/:id

groupsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        await GroupService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
    }
});
