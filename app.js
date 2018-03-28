const express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));



app.set('view engine', 'ejs')

var routerProjects = require('./routes/projects.js')
app.use('/projects', routerProjects)

app.listen(3000)
