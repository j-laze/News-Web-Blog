const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RateLimit extends Model {
    static associate(models) {
      RateLimit.belongsTo(models.User, { foreignKey: 'userID' });
    }
  };
  RateLimit.init({
    rateLimitID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userID: DataTypes.INTEGER,
    route: DataTypes.STRING,
    IPAddress: DataTypes.STRING,
    accessedAt: DataTypes.DATE,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RateLimit'
  });
  return RateLimit;
};
