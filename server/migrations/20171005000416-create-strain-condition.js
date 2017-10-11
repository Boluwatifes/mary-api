module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('StrainConditions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      strainId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Strains',
          key: 'id'
        }
      },
      conditionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Conditions',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.dropTable('StrainConditions')
  )
};
