'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{
          args: true,
          msg: "email salah"
        },
        isUniqueEmail: function(email, callback){
          let filter = {email:email}
          if(this.id != null){
            filter = {email:email, id : {[Op.ne]:this.id }}
          }
          Student.findOne({where: filter}).then(data=>{
            if(data) {
              callback('email sudah ada')
            } else {
              callback()
            }
          })
        }
      }
    },
    phone: DataTypes.STRING,
    major: DataTypes.STRING,
    semester: DataTypes.INTEGER,
    contribution: DataTypes.INTEGER,
    level: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Project, {through: models.UserProject});
  };
  return Student;
};
