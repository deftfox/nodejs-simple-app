"use strict";

import { Model, UUIDV4 } from "sequelize";
import { UserModel } from "../../models/user.interface";

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserModel> implements UserModel {
    id!: string;
    login!: string;
    password!: string;
    age!: number;
    isDeleted!: boolean;
    static associate(models: any) {
      User.belongsToMany(models.Group, {
        through: 'UserGroups'
      })
    }
  };
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING(63),
        allowNull: false,  
        unique: true,
      },
      password: {
        type: DataTypes.STRING(63),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },  
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
