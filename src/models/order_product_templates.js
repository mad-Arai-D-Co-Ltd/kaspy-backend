'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_product_templates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_product_templates.belongsTo(models.order_templates, {
        foreignKey: 'orderTempId'
      });

      order_product_templates.belongsTo(models.products, {
        foreignKey: 'productId'
      });

      order_product_templates.belongsTo(models.units, {
        foreignKey: 'unitId'
      });

    }
  }
  order_product_templates.init({
    orderTempId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.STRING,
    unitId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'order_product_templates',
  });
  return order_product_templates;
};