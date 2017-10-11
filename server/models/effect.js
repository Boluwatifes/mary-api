export default (sequelize, DataTypes) => {
  const Effect = sequelize.define('Effect', {
    name: DataTypes.STRING
  });

  Effect.associate = (models) => {
    Effect.belongsToMany(models.Strain, {
      foreignKey: 'effectId',
      through: models.StrainEffect,
      as: 'allstrains'
    });
  };
  return Effect;
};
