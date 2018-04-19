module.exports = function(sequelize, DataTypes) {
    var Author = sequelize.define("Author", {
      // Giving the Author model a name of type STRING
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {isEmail:true}
      }
    });
  
    Author.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Author.hasMany(models.Link, {
        onDelete: "cascade"
      });
    };
  
    return Author;
  };
  