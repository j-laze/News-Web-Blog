const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.belongsTo(models.User, { foreignKey: 'userID' });
    }
  };
  Session.init({
    sessionID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userID: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
    IPAddress: DataTypes.STRING,
    userAgent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Session'
  });
  return Session;
};
