'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class access_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  access_tokens.init({
    userId: DataTypes.INTEGER,
    fcmToken: DataTypes.STRING,
    platform: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'access_tokens',
  });
  return access_tokens;
};