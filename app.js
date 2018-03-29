const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routesProjects = require('./routes/projects.js')
app.use('/projects', routesProjects)

app.listen(3000, ()=>{
    console.log('server started in port 3000')
});
