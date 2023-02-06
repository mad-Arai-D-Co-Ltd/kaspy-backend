'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_historys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_historys.belongsTo(models.users, {
        foreignKey: 'createdByUserId'
      });

      order_historys.belongsTo(models.order_templates, {
        foreignKey: 'orderTempId'
      });

      order_historys.hasMany(models.order_product_historys, {
        foreignKey: 'orderHisId'
      });

    }
  }
  order_historys.init({
    orderTempId: DataTypes.INTEGER,
    customerName: DataTypes.STRING,
    address: DataTypes.STRING,
    taxId: DataTypes.STRING,
    attention: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    createdByUserId: DataTypes.INTEGER,
    no: DataTypes.STRING,
    total: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'order_historys',
  });
  return order_historys;
};