module.exports = (sequelize, DataTypes) => {
  const StrainFlavor = sequelize.define('StrainFlavor', {
    strainId: DataTypes.INTEGER,
    flavorId: DataTypes.INTEGER
  });

  StrainFlavor.associate = (models) => {

  };
  return StrainFlavor;
};
