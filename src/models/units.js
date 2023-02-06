'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class units extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      units.hasMany(models.order_product_templates, {
        foreignKey: 'unitId'
      });

    }
  }
  units.init({
    name: DataTypes.STRING,
    createdByUserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'units',
  });
  return units;
};