export default (sequelize, DataTypes) => {
  const Strain = sequelize.define('Strain', {
    name: DataTypes.STRING
  });

  Strain.associate = (models) => {
    Strain.belongsToMany(models.Effect, {
      foreignKey: 'strainId',
      through: models.StrainEffect,
      as: 'alleffects'
    });
    Strain.belongsToMany(models.Flavor, {
      foreignKey: 'strainId',
      through: models.StrainFlavor,
      as: 'allflavors'
    });
    Strain.belongsToMany(models.Condition, {
      foreignKey: 'strainId',
      through: models.StrainCondition,
      as: 'allconditions'
    });
    Strain.belongsToMany(models.Aroma, {
      foreignKey: 'strainId',
      through: models.StrainAroma,
      as: 'allaromas'
    });
  };
  return Strain;
};
