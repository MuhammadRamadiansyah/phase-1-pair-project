var express = require('express')
var router = express.Router()
const Model = require('../models/index.js')

const app = express()
app.set('view engine', 'ejs')

//Halaman depan list project
router.get('/', function(req,res){
  Model.Project.findAll()
       .then((projects)=>{
         Model.Tag.findAll()
              .then(tags=>{
                res.render('projects/index.ejs', {tags:tags, projects:projects})
              })
       })
})


//Untuk menampilkan hasil filter
router.post('/', function(req,res){
  Model.Project.searchProject(req.body)
         .then(projects=>{
           Model.Tag.findAll()
                .then(tags=>{
                  res.render('projects/index.ejs', {tags:tags, projects:projects})
                })
         })
})
router.get('/add', function(req,res){
  Model.Tag.findAll()
       .then(tags=>{
         res.render('projects/form.ejs', {tags:tags})
       })
})


router.post('/add', function(req,res){

  let title = req.body.title;
  let status = req.body.status;
  let location = req.body.location;
  let deadline = new Date(req.body.deadline)
  let level = req.body.level;
  let major = req.body.major;
  let summary = req.body.summary;
  let max_member = req.body.max_member
  if(summary == undefined){
    summary = "";
  }
  let semester = req.body.semester

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
    summary: summary
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
module.exports = router;
