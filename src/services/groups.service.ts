/**
 * Data Model Interfaces
*/

import { BaseGroupModel, GroupModel } from "../models/group.interface";
import { UserGroupModel } from "../models/userGroup.interface";
import { v4 as uuidv4 } from 'uuid';
import db from '../data-access/models';
import { Transaction } from "sequelize";

/**
 * Service Methods
*/

export const getAll = async (): Promise<GroupModel[]> => {
    const groups: GroupModel[] = await db.Group.findAll();
    return groups;
}

export const find = async (id: string): Promise<GroupModel | null> => {
    const group = await db.Group.findOne({ where: {id: id} });
    return group || null;
};

export const create = async (newGroup: BaseGroupModel): Promise<GroupModel> => {
    const id = uuidv4();
    const group = await db.Group.findOne({ where: {name: newGroup.name} });

    if (group) {
        throw new Error("Group with this name already exists");    
    }

    return await db.Group.create({ 
        id: id, 
        name: newGroup.name,
        permissions: newGroup.permissions
    });
};

export const update = async (
    id: string,
    groupUpdate: BaseGroupModel
): Promise<GroupModel | null> => {

    return await db.Group.update({
        name: groupUpdate.name,
        permissions: groupUpdate.permissions
    },
    { 
        where: { id: id }
    });
};

export const remove = async (id: string): Promise<null | void> => {
    const group = await db.Group.findOne({ where: {id: id} });

    if (!group) {
        throw new Error(`Group with id ${id} doesn't exist or already deleted`);    
    }

    return await db.Group.destroy({ 
        where: { id: id }
    });
};