module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('PictureStrains', {
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
        type: Sequelize.TEXT
      },
      strainLineageData: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  ),
  down: (queryInterface, /** Sequelize */) => (
    queryInterface.dropTable('PictureStrains')
  )
};
