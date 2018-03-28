'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserProject = sequelize.define('UserProject', {
    LecturerId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, {});
  UserProject.associate = function(models) {
    // associations can be defined here
  };
  return UserProject;
};