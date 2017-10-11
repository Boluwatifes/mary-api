export default (sequelize, DataTypes) => {
  const Aroma = sequelize.define('Aroma', {
    name: DataTypes.STRING
  });

  Aroma.associate = (models) => {
    Aroma.belongsToMany(models.Strain, {
      foreignKey: 'aromaId',
      through: models.StrainAroma,
      as: 'allstrains'
    });
  };
  return Aroma;
};
