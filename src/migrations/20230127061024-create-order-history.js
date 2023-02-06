'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_historys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderTempId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'order_templates',
          key: 'id',
        },
      },
      customerName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      taxId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attention: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdByUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      no: {
        type: Sequelize.STRING,
        allowNull : true
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull : true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_historys');
  }
};