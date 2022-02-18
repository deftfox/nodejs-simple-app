/**
 * Required External Modules and Interfaces
 */

 import express, { Request, Response } from "express";
 import * as UserGroupService from "../services/userGroup.service";
 import { UserGroupModel } from "../models/userGroup.interface";
 import { contorllerErrorLogger } from '../utils/contorllerErrorLogger'
 
 /**
  * Router Definition
  */
 
 export const userGroupRouter = express.Router();
 
 /**
  * Controller Definitions
  */

 // POST items
 
 userGroupRouter.post(
     "/",
     async (req: Request, res: Response) => {
     try {
         const userGroup: UserGroupModel = req.body;
 
         const result = await UserGroupService.addUsersToGroup(userGroup.groupId, userGroup.userIds);
 
         res.status(201).send(result);
     } catch (e) {
        contorllerErrorLogger(e, req)
        res.status(500).send(e.message);
     }
 });
 