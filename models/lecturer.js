'use strict';
module.exports = (sequelize, DataTypes) => {
  var Lecturer = sequelize.define('Lecturer', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    major: DataTypes.STRING,
    degree: DataTypes.STRING
  }, {});
  Lecturer.associate = function(models) {
    // associations can be defined here
  };
  return Lecturer;
};