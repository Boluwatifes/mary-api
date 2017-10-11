module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('StrainEffects', {
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
      effectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Effects',
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
    queryInterface.dropTable('StrainEffects')
  )
};
