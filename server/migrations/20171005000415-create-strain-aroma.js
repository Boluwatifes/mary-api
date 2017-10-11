module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('StrainAromas', {
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
      aromaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Aromas',
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
    queryInterface.dropTable('StrainAromas')
  )
};
