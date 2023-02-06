'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.users, {
        foreignKey: 'createdByUserId'
      });

      products.hasMany(models.order_product_templates, {
        foreignKey: 'productId'
      });

    }
  }
  products.init({
    productCode: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    createdByUserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};