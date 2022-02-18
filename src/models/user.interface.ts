import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation'

export interface BaseUserModel {
    login: string;
    password: string;
    age: number;
}

export interface UserModel extends BaseUserModel {
    id: string;    
    isDeleted: boolean;
}

export interface BaseUserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        login: string;
        password: string;
        age: number;
    }
}