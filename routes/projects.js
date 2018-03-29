var express = require('express')
var router = express.Router()
const Model = require('../models/index.js')
var checkRequirement = require('../helpers/requirement-check.js')

const app = express()
app.set('view engine', 'ejs')

//Halaman depan list project
router.get('/', function(req,res){
  Model.Project.findAll()
       .then(projects=>{
         Model.Tag.findAll()
              .then(tags=>{
                Model.Student.findOne({where: {id:1}})
                     .then(student=>{
                       res.locals.checkRequirement = checkRequirement
                       res.render('projects/list', {projects:projects, student:student, tags:tags})
                     })
              })
       })
})


//Untuk menampilkan hasil filter
router.post('/', function(req,res){
  let objectFilter = req.body
  Model.Project.searchProject(objectFilter)
       .then(function(projects){
         console.log('----------------',projects);
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
<<<<<<< HEAD
         .catch(err=>{
           console.log(err);
      })

})

=======
})
>>>>>>> 0683b44cbda318ea5526870245671c7a43ca81cd
router.get('/add', function(req,res){
  Model.Tag.findAll()
       .then(tags=>{
         res.render('lecturer-profile', {tags:tags})
       })
})

<<<<<<< HEAD
=======

>>>>>>> 0683b44cbda318ea5526870245671c7a43ca81cd
router.post('/add', function(req,res){

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
         Model.Project.create(newData)
              .then(()=>{
                res.redirect('/projects')
              })
              .catch(err=>{
                console.log(err);
                res.redirect('/projects/add')
              })
       })

})

router.get('/:project_id/details', function(req,res){

  res.locals.checkRequirement = checkRequirement
  let getId = req.params.project_id
  Model.Project.findOne({where: {id:getId}, include: [Model.Tag]})
       .then(project=>{
         //harus di login dulu
         Model.Student.findOne({where: {id:1}})
              .then(student=>{
                res.render('projects/details', {project:project, student:student})
              })
       })
})
<<<<<<< HEAD



=======
>>>>>>> 0683b44cbda318ea5526870245671c7a43ca81cd
module.exports = router;
