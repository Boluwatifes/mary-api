module.exports = (sequelize, DataTypes) => {
  const StrainProduct = sequelize.define('StrainProduct', {
    ucpc: DataTypes.STRING,
    name: DataTypes.STRING,
    strainCategory: DataTypes.STRING,
    strainExtraData: DataTypes.JSONB,
    strainLineageData: DataTypes.JSONB,
  });

  StrainProduct.associate = (models) => {

  };
  return StrainProduct;
};
