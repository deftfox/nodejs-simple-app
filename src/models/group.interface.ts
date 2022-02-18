import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation'

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface BaseGroupModel {
    name: string;
    permissions: Array<Permission>;
}

export interface GroupModel extends BaseGroupModel {
    id: string;
}

export interface BaseGroupRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        name: string;
        permissions: Array<Permission>;
    }
}