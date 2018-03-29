const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');

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

<<<<<<< HEAD
var routesProjects = require('./routes/projects.js')
app.use('/projects', routesProjects)
=======
let routes_index = require('./routes/index.js');
app.use('/',routes_index)

let routes_project = require('./routes/projects.js');
app.use('/projects',routes_project)

>>>>>>> 0683b44cbda318ea5526870245671c7a43ca81cd

app.listen(3000, ()=>{
    console.log('server started in port 3000')
});
