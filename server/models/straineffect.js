module.exports = (sequelize, DataTypes) => {
  const StrainEffect = sequelize.define('StrainEffect', {
    strainId: DataTypes.INTEGER,
    effectId: DataTypes.INTEGER
  });

  StrainEffect.associate = (models) => {

  };
  return StrainEffect;
};
