module.exports = (sequelize, DataTypes) => {
  const StrainCondition = sequelize.define('StrainCondition', {
    strainId: DataTypes.INTEGER,
    conditionId: DataTypes.INTEGER
  });

  StrainCondition.associate = (models) => {

  };
  return StrainCondition;
};
