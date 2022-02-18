'use strict';

import { Model } from 'sequelize';

interface UserGroupAttributes {
  GroupId: string;
  UserId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class UserGroup extends Model<UserGroupAttributes> 
    implements UserGroupAttributes{
        GroupId!: string;
        UserId!: string;

    static associate(models: any) {
      
    }
  };
  UserGroup.init({
    GroupId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Group',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UserGroup',
  });
  return UserGroup;
};