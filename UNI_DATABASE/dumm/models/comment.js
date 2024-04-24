const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userID' });
      Comment.belongsTo(models.Post, { foreignKey: 'postID' });
    }
  };
  Comment.init({
    commentID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    postID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment'
  });
  return Comment;
};
