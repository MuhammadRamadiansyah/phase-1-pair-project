'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProjectTag = sequelize.define('ProjectTag', {
    ProjectId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {});
  ProjectTag.associate = function(models) {
    // associations can be defined here
  };
  return ProjectTag;
};