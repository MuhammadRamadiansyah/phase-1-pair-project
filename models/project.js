'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    TagId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    location: DataTypes.STRING,
    deadline: DataTypes.DATE,
    level: DataTypes.STRING,
    semester: DataTypes.INTEGER,
    major: DataTypes.STRING,
    summary: DataTypes.STRING
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.Tag)
    // associations can be defined here
  };
  return Project;
};
