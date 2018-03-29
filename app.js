const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const Model = require('./models/index.js')


const session = require('express-session')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const path = require('path');
const Op = sequelize.Op;
const db = require('./models');
const app = express();

//buat setting path resources external (contohnya img)
process.env.PWD = process.cwd()
app.use(express.static(process.env.PWD + '/'));
app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true,
   cookie: {}
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routesHome = require('./routes/index.js');
app.use('/', routesHome)

var routesProjects = require('./routes/projects.js')
app.use('/projects', routesProjects)


var routesUsers = require('./routes/users.js')
app.use('/users', routesUsers)

app.post('/login', function(req,res){
  let username = req.body.username;
  let password = req.body.password;
  let role = req.body.role;
  console.log(role);

  if(role == "Student"){

    Model.Student.findOne({where: {username: username}})
         .then(student=>{
           let myPlaintextPassword = password;
           let hash = student.password;
           bcrypt.compare(myPlaintextPassword, hash, function(err, check) {
             if(check){
                 req.session.student = student
                 req.session.role = "Student"
                 res.redirect('/projects')
             }else{
               res.redirect('/')
             }
           })
         })
  }
  else if(role == "Lecturer"){
    Model.Lecturer.findOne({where: {username: username}})
         .then(lecturer=>{
           let myPlaintextPassword = password;
           let hash = lecturer.password;

           bcrypt.compare(myPlaintextPassword, hash, function(err, check) {
             if(check){
             req.session.lecturer = lecturer
             req.session.role = "Lecturer"
             res.redirect('/users/lecturer')

             }else{
               console.log("username password salah");
             }
            });
         })
  }


});

app.get('/logout', function(req,res){
  console.log('----------------');
  req.session.destroy(function(err) {
    res.redirect('/')
   // cannot access session here
  })
})



app.listen(3000, ()=>{
    console.log('server started in port 3000')
});
