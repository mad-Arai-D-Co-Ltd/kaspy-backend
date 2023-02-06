'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_updates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_updates.belongsTo(models.products, {
        foreignKey: 'productId'
      });

      product_updates.belongsTo(models.users, {
        foreignKey: 'updateByUserId'
      });

    }
  }
  product_updates.init({
    productId: DataTypes.STRING,
    productCode: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    updateByUserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'product_updates',
  });
  return product_updates;
};