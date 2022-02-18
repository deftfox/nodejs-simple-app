"use strict";

import { Model, UUIDV4 } from "sequelize";
import { GroupModel, Permission } from "../../models/group.interface";

module.exports = (sequelize: any, DataTypes: any) => {
  class Group extends Model<GroupModel> implements GroupModel {
    id!: string;
    name!: string;
    permissions!: Array<Permission>;
    static associate(models: any) {
      Group.belongsToMany(models.User, {
        through: 'UserGroups',
        onDelete: 'cascade'
      })
    }
  };
  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(63),
        allowNull: false,  
        unique: true,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING(16)),
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
