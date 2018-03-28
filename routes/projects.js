const express = require('express')
var router = express.Router()
const Model = require('../models/index.js')
var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

router.get('/add', function(req,res){
  Model.Tag.findAll()
       .then(tags=>{
         res.render('projects/form.ejs', {tags:tags})
       })
})

module.exports = router;
