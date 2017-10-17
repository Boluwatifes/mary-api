module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('StrainProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      ucpc: {
        type: Sequelize.STRING
      },
      strainCategory: {
        type: Sequelize.STRING
      },
      strainExtraData: {
        type: Sequelize.JSONB
      },
      strainLineageData: {
        type: Sequelize.JSONB
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
  down: (queryInterface, /** Sequelize */) => (
    queryInterface.dropTable('StrainProducts')
  )
};
