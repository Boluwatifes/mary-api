module.exports = (sequelize, DataTypes) => {
  const PictureStrain = sequelize.define('PictureStrain', {
    ucpc: DataTypes.STRING,
    name: DataTypes.STRING,
    strainCategory: DataTypes.STRING,
    strainExtraData: DataTypes.TEXT,
    strainLineageData: DataTypes.TEXT,
  });

  PictureStrain.associate = (models) => {

  };
  return PictureStrain;
};
