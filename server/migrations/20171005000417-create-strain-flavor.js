module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('StrainFlavors', {
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
      flavorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Flavors',
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
    queryInterface.dropTable('StrainFlavors')
  )
};
