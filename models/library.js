module.exports = function(sequelize, DataTypes) {
  var Library = sequelize.define("Library", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    tags: DataTypes.STRING,
    favorite: DataTypes.BOOLEAN,
    

  });

  Author.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Author.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Author;
};
