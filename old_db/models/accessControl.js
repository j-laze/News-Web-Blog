const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AccessControl extends Model {
    static associate(models) {
      AccessControl.belongsTo(models.User, { foreignKey: 'userID' });
    }
  };
  AccessControl.init({
    accessControlID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userID: DataTypes.INTEGER,
    resourceType: DataTypes.STRING,
    resourceID: DataTypes.INTEGER,
    permissionLevel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AccessControl'
  });
  return AccessControl;
};
