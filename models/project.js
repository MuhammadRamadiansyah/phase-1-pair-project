'use strict';

const sequelize = require('sequelize');
const Op = sequelize.Op

module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    TagId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      validate: {

      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {

      }
    },
    location: {
      type: DataTypes.STRING,
      validate: {

      }
    },
    deadline: {
      type: DataTypes.DATE,
      validate: {

      }
    },
    level: {
      type: DataTypes.STRING,
      validate: {

      }
    },
    semester: {
      type: DataTypes.INTEGER,
      validate: {

      }
    },
    major: {
      type: DataTypes.STRING,
      validate: {

      }
    },
    summary: DataTypes.STRING,
    max_member: {
      type: DataTypes.INTEGER,
      validate: {

      }
    }
  },{
    hooks: {
      beforeCreate: (project, options) => {

      if(project.major == 'null' || project.title == '' || project.deadline == "Invalid Date" || project.location == 'null'){
        throw new Error('Tidak boleh ada yang kosong')
      }
     }
   },
    afterCreate: (project, options) => {

     sequelize.models.UserProject.create()
    }
  });
  Project.associate = function(models) {
    Project.belongsTo(models.Tag)
    Project.belongsToMany(models.Student, {through: models.UserProject});
    Project.belongsToMany(models.Lecturer, {through: models.UserProject});
    // associations can be defined here
  };

  //Filter advanced research
  Project.searchProject = function(objectFilter){

    let whereFilter = {}
    if(objectFilter.title !== ''){
      let titleSearch = '%' + objectFilter.title + '%'
      whereFilter.title = {[Op.like]: titleSearch}
    }
    if(objectFilter.location !== 'null'){
      whereFilter.location = objectFilter.location
    }
    if(objectFilter.level !== 'null'){
      if(objectFilter.level == "Master"){
        whereFilter.level = {[Op.like]: ['%Master%']}
      }else if(objectFilter.level == "Senior"){
        whereFilter.level = {[Op.like]: ['%Master%','%Senior%']}
      }else if(objectFilter.level == "Advanced"){
        whereFilter.level = {[Op.like]: ['%Master%', '%Advanced%', '%Senior%']}
      }else if(objectFilter.level == "Beginner"){
        whereFilter.level = {[Op.like]: ['%Master%', '%Advanced%', '%Senior%','%Beginner%']}
      }
    }
    if(objectFilter.semester !== ''){
      whereFilter.semester = {[Op.gte]: objectFilter.semester}
    }else{
      whereFilter.semester = {[Op.gte]: 1}
    }

    if(objectFilter.deadline !== ''){
      whereFilter.deadline = {[Op.gt]: new Date(objectFilter.deadline)}
    }
    if(objectFilter.major !== 'null'){
      whereFilter.major = objectFilter.major
    }

    if(objectFilter.tag != 'null'){
      return new Promise(function(resolve,reject){
        sequelize.models.Tag.findOne({where: {name: objectFilter.tag}})
          .then(tag=>{
             whereFilter.TagId = tag.id;

             Project.findAll({where: whereFilter})
                    .then(projects=>{
                      console.log('searchProject invoked');
                      resolve(projects)
                    }).catch(err=>{
                      reject(err)
                    })

        })
      })
    }
    if(objectFilter.tag == 'null'){
      return new Promise((resolve,reject)=>{
        Project.findAll({where: whereFilter})
               .then(projects=>{
                 resolve(projects)
               })
             })
    }
  }

  //Filter berdasarkan search title
  Project.searchTitle = function(keyword){
    return new Promise((resolve,reject)=>{
      let titleSearch = '%' + keyword + '%'
      Project.findAll({where: {title: {[Op.like]: titleSearch}}})
             .then(projects=>{
               resolve(projects)
             })
    })
  }
  //Filter berdasarkan minimum semester
  Project.filterMinimumSemester = function(semester){
    return new Promise((resolve,reject)=>{
      Project.findAll({where: {semester: {[Op.gte]: semester}}})
             .then(projects=>{
               resolve(projects)
             })
    })
  }

  //Filter berdasarkan project baru
  Project.filterNewProject = function(){
    return new Promise((resolve,reject)=>{
      Project.findAll({order: [['createdAt', 'ASC']]})
             .then(projects=>{
               resolve(projects)
             })
    })
  }

  //Filter berdasarkan deadline
  Project.filterDeadline = function(){
    return new Promise((resolve,reject)=>{
      Project.findAll({order: [['deadline', 'ASC']]})
             .then(projects=>{
               resolve(projects)
             })
    })
  }

  //Filter berdasarkan jurusan
  Project.filterMajor = function(major){
    return new Promise((resolve,reject)=>{
      Project.findAll({where: {major: major}})
             .then(projects=>{
               resolve(projects)
             })
    })
  }

  //Filter berdasarkan lokasi
  Project.filterLocation = function(location){
    return new Promise((resolve,reject)=>{
      Project.findAll({where: {location:location}})
             .then(projects=>{
               resolve(projects)
             })
    })
  }

  //Filter berdasarkan tags
  Project.filterTags = function(tagname){

    return new Promise((resolve,reject)=>{
      sequelize.models.Tag({where: {name:tagname}})
               .then(tags=>{
                 resolve(tags)
               })
    })
  }
  return Project;
};
