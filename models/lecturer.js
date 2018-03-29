'use strict';
module.exports = (sequelize, DataTypes) => {
  var Lecturer = sequelize.define('Lecturer', {
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
          Lecturer.findOne({where: filter}).then(data=>{
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
    degree: DataTypes.STRING
  }, {});
  Lecturer.associate = function(models) {
    // associations can be defined here
    Lecturer.belongsToMany(models.Project, {through: models.UserProject});
  };
  return Lecturer;
};
