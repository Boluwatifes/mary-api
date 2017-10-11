export default (sequelize, DataTypes) => {
  const Flavor = sequelize.define('Flavor', {
    name: DataTypes.STRING
  });

  Flavor.associate = (models) => {
    Flavor.belongsToMany(models.Strain, {
      foreignKey: 'flavorId',
      through: models.StrainFlavor,
      as: 'allstrains'
    });
  };
  return Flavor;
};
