var express = require('express')
var router = express.Router()
const Model = require('../models/index.js')

const session = require('express-session')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express()

app.set('view engine', 'ejs')

router.get('/', function(req,res){
  Model.Project.findAll(
    {
      order:[['createdAt', 'ASC']],
      limit:3
    })
       .then((projects)=>{
        res.render('home',{
          projects:projects
        })
       })
});

router.get('/register', function(req,res){
  res.render('register');
});


//udah bisa dapat encrypt dan dapat salt
//musti validasi email, phone
router.post('/register', function(req,res){
  let new_user;
  let plain_password = req.body.password;
  if(req.body.role === 'Student'){
    new_user =
    {
      name: req.body.name,
      username: req.body.username,
      password: null,
      salt: null,
      email: req.body.email,
      phone: req.body.phone,
      major: req.body.major,
      semester: req.body.semester,
      contribution: 0,
      level: 'Beginner',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    bcrypt.genSalt(saltRounds, function(err, salt) {
      new_user.salt = salt;
      bcrypt.hash(plain_password, salt, function(err, hash) {
          new_user.password = hash;

          Model.Student.create(new_user)
         .then(()=>{
           res.redirect('/projects')
         })
         .catch(err=>{
           console.log(err);
           res.redirect('/')
         })
        });
    });
  } else {
    new_user =
    {
      name: req.body.name,
      username: req.body.username,
      password: null,
      salt: null,
      email: req.body.email,
      phone: req.body.phone,
      major: req.body.major,
      degree: req.body.degree,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    bcrypt.genSalt(saltRounds, function(err, salt) {
      new_user.salt = salt;
      bcrypt.hash(plain_password, salt, function(err, hash) {
          new_user.password = hash;

          Model.Lecturer.create(new_user)
         .then(()=>{
           res.redirect('/projects')
         })
         .catch(err=>{
           console.log(err);
           res.redirect('/')
         })
        });
    });
  }
});


module.exports = router;
