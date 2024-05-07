const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'userID' });
      User.hasMany(models.Comment, { foreignKey: 'userID' });
      User.hasMany(models.Session, { foreignKey: 'userID' });
      User.hasMany(models.AuditLog, { foreignKey: 'userID' });
      User.hasMany(models.RateLimit, { foreignKey: 'userID' });
      User.hasMany(models.AccessControl, { foreignKey: 'userID' });
    }
  };
  User.init({
    userID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    email: DataTypes.STRING,
    twoFactorType: DataTypes.STRING,
    twoFactorInfo: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    accountStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
