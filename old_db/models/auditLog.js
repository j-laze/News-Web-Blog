const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AuditLog extends Model {
    static associate(models) {
      AuditLog.belongsTo(models.User, { foreignKey: 'userID' });
    }
  };
  AuditLog.init({
    logID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userID: DataTypes.INTEGER,
    actionType: DataTypes.STRING,
    detail: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    IPAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AuditLog'
  });
  return AuditLog;
};
