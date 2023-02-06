'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_product_historys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_product_historys.belongsTo(models.order_historys, {
        foreignKey: 'orderHisId'
      });

      order_product_historys.belongsTo(models.products, {
        foreignKey: 'productId'
      });

      order_product_historys.belongsTo(models.units, {
        foreignKey: 'unitId'
      });

    }
  }
  order_product_historys.init({
    orderHisId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productCode: DataTypes.STRING,
    productName: DataTypes.STRING,
    price: DataTypes.FLOAT,
    costPrice: DataTypes.FLOAT,
    quantity: DataTypes.STRING,
    unitId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'order_product_historys',
  });
  return order_product_historys;
};