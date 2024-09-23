'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      accountNumber: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      openDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      accountStatus: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      investmentFlag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      savingsFlag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      userID: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: 'users', key: 'userID' },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  },
};
