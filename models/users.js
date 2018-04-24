module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: DataTypes.STRING
    });
  
    return User;
  };
  