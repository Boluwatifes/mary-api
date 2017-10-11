module.exports = (sequelize, DataTypes) => {
  const StrainAroma = sequelize.define('StrainAroma', {
    strainId: DataTypes.INTEGER,
    aromaId: DataTypes.INTEGER
  });

  StrainAroma.associate = (models) => {

  };
  return StrainAroma;
};
