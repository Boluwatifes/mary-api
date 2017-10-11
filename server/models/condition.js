export default (sequelize, DataTypes) => {
  const Condition = sequelize.define('Condition', {
    name: DataTypes.STRING
  });

  Condition.associate = (models) => {
    Condition.belongsToMany(models.Strain, {
      foreignKey: 'conditionId',
      through: models.StrainCondition,
      as: 'allstrains'
    });
  };
  return Condition;
};
