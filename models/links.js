module.exports = function (sequelize, DataTypes) {
  var Link = sequelize.define("Link", {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: DataTypes.STRING,
    summary: DataTypes.TEXT,
    category: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: { len: [1, 5] }
    },
    tags: DataTypes.STRING,
    slackChannel: DataTypes.STRING,
    favorite: DataTypes.BOOLEAN
  });

  Link.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Link.belongsTo(models.Author, {
      foreignKey: { allowNull: false }
    });
  };

  return Link;
};
