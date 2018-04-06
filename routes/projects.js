var express = require('express')
var router = express.Router()
const Model = require('../models/index.js')
var checkRequirement = require('../helpers/requirement-check.js')
var role_checker = require('../helpers/role-checker.js')
var assignedSupervisor = require('../helpers/assignedSupervisor.js')

const app = express()
app.set('view engine', 'ejs')

//Halaman depan list project
router.get('/', function(req,res){
  Model.Project.findAll({include: [{
    model: Model.Lecturer
  }]})
       .then(projects=>{
         Model.Tag.findAll()
              .then(tags=>{
                res.locals.checkRequirement = checkRequirement;
                res.locals.assignedSupervisor = assignedSupervisor
                res.render('projects/list', {projects:projects, student:req.session.student, tags:tags})

              })
       })
})


//Untuk menampilkan hasil filter
router.post('/', function(req,res){
  let objectFilter = req.body
  Model.Project.searchProject(objectFilter)
       .then(function(projects){
           res.locals.checkRequirement = checkRequirement
           Model.Tag.findAll()
                .then(tags=>{
                  Model.Student.findOne({where: {id:1}})
                       .then(student=>{
                         res.locals.checkRequirement = checkRequirement
                         res.render('projects/list', {projects:projects, student:student, tags:tags})
                       })
                })
         })
         .catch(err=>{
           console.log(err);
      })

})


router.get('/:project_id/details', function(req,res){

  res.locals.checkRequirement = checkRequirement
  let getId = req.params.project_id
  Model.Project.findOne({where: {id:getId}, include: [Model.Tag]})
       .then(project=>{
         //harus di login dulu
         res.render('projects/details', {project:project, student:req.session.student})
       })
})

module.exports = router;
