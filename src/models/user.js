const { Model, DataTypes, Sequelize } = require('sequelize');
const config = require('../config/database/database');

class User extends Model {}
User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
    },
    nickname: DataTypes.STRING,
    adress: DataTypes.STRING,
    bio: DataTypes.STRING,
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
  },
);

module.exports = User;
