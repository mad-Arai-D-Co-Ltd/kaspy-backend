'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_templates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_templates.belongsTo(models.users, {
        foreignKey: 'createdByUserId'
      });

      order_templates.hasMany(models.order_product_templates, {
        foreignKey: 'orderTempId'
      });

    }
  }
  order_templates.init({
    customerName: DataTypes.STRING,
    address: DataTypes.STRING,
    taxId: DataTypes.STRING,
    attention: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    createdByUserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'order_templates',
  });
  return order_templates;
};