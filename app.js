const express = require('express');
var app = express();

app.set('view engine', 'ejs')

var routerProjects = require('./routes/projects.js')
app.use('/projects', routerProjects)

app.listen(3000)
