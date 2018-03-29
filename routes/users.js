var express = require('express')
var router = express.Router()
const Model = require('../models/index.js')
var checkRequirement = require('../helpers/requirement-check.js')
var logout = require('../helpers/logout.js')
var role_checker = require('../helpers/role-checker.js')

const app = express()
app.set('view engine', 'ejs')

router.get('/', function(req,res){
  res.render()
})

router.get('/lecturer', function(req,res){
  Model.Tag.findAll()
       .then(tags=>{
         res.locals.logout = logout;
         Model.Lecturer.findOne({where: {id:req.session.lecturer.id}, include: [{
           model: Model.Project
         }]})
              .then(lecturer=>{
                console.log('----------',lecturer);
                res.render('lecturer-profile', {tags:tags, lecturer:lecturer})
              })
       })
})


router.post('/lecturer/add', role_checker.lecturer,function(req,res){

  let title = req.body.title;
  let status = req.body.status;
  let location = req.body.location;
  let deadline = new Date(req.body.deadline)
  let level = req.body.level;
  let major = req.body.major;
  let summary = req.body.summary;
  let max_member = req.body.max_member;
  let semester = req.body.semester;

  if(max_member == "null"){
    max_member =1;
  }
  if(semester == "null"){
    semester =1;
  }
  if(summary == undefined){
    summary = "";
  }

  Model.Tag.findOne({where: {name:req.body.tag}})

       .then(tag=>{
         let newData = {
           title: title,
           status: "open",
           location: location,
           deadline: deadline,
           level: level,
           semester: semester,
           major: major,
           createdAt: new Date(),
           updatedAt: new Date(),
           max_member: max_member,
           summary: summary,
           TagId: tag.id
         }
         let supervisorId = req.session.lecturer.id
         Model.Project.create(newData)
              .then((newProject)=>{
                let newUserProject = {
                  ProjectId: newProject.id,
                  LecturerId: supervisorId
                }
                Model.UserProject.create(newUserProject)
                     .then(()=>{

                       res.redirect('/projects')
                     })
              })
              .catch(err=>{
                console.log(err);
                res.redirect('/projects/add')
              })
       })

})

router.post('/student/apply', function(req,res){

  console.log('--------------',req.body);
  Model.UserProject.findOne({where: {ProjectId:req.body.ProjectId}})
       .then(data=>{
         console.log(data);
         data.StudentId = req.body.StudentId
         let newData = {
           LecturerId: data.LecturerId,
           StudentId: data.StudentId,
           ProjectId: data.ProjectId
         }
         Model.UserProject.create(newData)
              .then(()=>{
                res.redirect('/projects')
              })
       })

})

router.get('/project/close/:id', function(req,res){

  let getId = req.params.id;

  Model.UserProject.findAll({where: {ProjectId: getId}})
       .then(data=>{
         console.log('eeeeeee');
         console.log(data);
       })
})
module.exports = router;
