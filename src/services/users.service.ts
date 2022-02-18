/**
 * Data Model Interfaces
*/

import { BaseUserModel, UserModel } from "../models/user.interface";
import { v4 as uuidv4 } from 'uuid';
import db from '../data-access/models';

/**
 * Service Methods
*/

export const getAutoSuggestUsers = async (loginSubstring?: string, limit?: number): Promise<UserModel[]> => {
    const users: UserModel[] = await db.User.findAll();
    if (loginSubstring && limit) {
        return users
        .filter(user => !user.isDeleted && user.login.includes(loginSubstring))
        .sort((a,b) => (a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0))
        .slice(0, limit);
    } else {
        return users.filter(user => !user.isDeleted);
    }
}

export const find = async (id: string): Promise<UserModel | null> => {
    const user = await db.User.findOne({ where: {id: id, isDeleted: false} });
    return user || null;
};

export const authenticate = async (login: string, password: string): Promise<UserModel | null> => {
    const user = await db.User.findOne({ where: {login: login, password: password,   isDeleted: false} });
    return user || null;
};

export const create = async (newUser: BaseUserModel): Promise<UserModel> => {
    const id = uuidv4();
    const isDeleted = false;
    const user = await db.User.findOne({ where: {login: newUser.login, isDeleted: false} });

    if (user) {
        throw new Error("User with this login already exists");    
    }

    return await db.User.create({ 
        id: id, 
        login: newUser.login,
        password: newUser.password,
        age: newUser.age,
        isDeleted: isDeleted
    });
};

export const update = async (
    id: string,
    userUpdate: BaseUserModel
): Promise<UserModel | null> => {

    return await db.User.update({
        login: userUpdate.login,
        password: userUpdate.password,
        age: userUpdate.age
    },
    { 
        where: { id: id }
    });
};

export const remove = async (id: string): Promise<null | void> => {
    const user = await db.User.findOne({ where: {id: id, isDeleted: false} });

    if (!user) {
        throw new Error(`User with id ${id} doesn't exist or already deleted`);    
    }

    await db.UserGroup.destroy({ where: {UserId: id} });

    return await db.User.update({
        isDeleted: true
    },
    { 
        where: { id: id }
    });
};