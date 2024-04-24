const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dependency extends Model {};
  Dependency.init({
    dependencyID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    version: DataTypes.STRING,
    lastChecked: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dependency'
  });
  return Dependency;
};
