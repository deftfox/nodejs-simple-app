
import db from '../data-access/models';
import { Transaction } from "sequelize";
import { UserModel } from "../models/user.interface";

export const addUsersToGroup = async (groupId: string, userIds: string[]): Promise<string> => {
    try {
        const result = await db.sequelize.transaction(async (t: Transaction) => {

            const group = await db.Group.findOne({ where: {id: groupId} }, { transaction: t });

            if (!group) {
                throw new Error(`Group with id ${groupId} does not exist`);
            }

            const users = await db.User.findAll({ where: {id: userIds, isDeleted: false}}, { transaction: t });

            if (!users.length) {
                throw new Error(`Users with ids ${userIds} are not found`);
            }

            for(const user of users) {
                await db.UserGroup.create({ 
                    GroupId: group.id, 
                    UserId: user.id
                }, { transaction: t });
            }


            // await users.forEach(async (user: UserModel) => {
            //     await db.UserGroup.create({ 
            //         GroupId: group.id, 
            //         UserId: user.id
            //     }, { transaction: t });
            // });
        
            return `Users with Ids ${userIds} are successfully added to group with id ${groupId}`;
        
            });
        
        return result;
      
      } catch (error) {
            throw new Error(`Could not add users to group. ${error}`);
      }
};