'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('investment', {
      accountNumber: {
        type: Sequelize.STRING,
        references: { model: 'accounts', key: 'accountNumber' },
        allowNull: false,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userID: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: 'users', key: 'userID' },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      investmentDuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      investmentMedia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preferredInvestmentSectors: {
        type: Sequelize.JSON, 
        allowNull: false,
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
    await queryInterface.dropTable('investment_accounts');
  },
};
