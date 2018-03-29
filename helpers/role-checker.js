function isStudent(req,res,next){
  if(req.session.role == "Student"){
    next()
  }else{
    res.redirect('/')
  }

}

function isLecturer(req,res,next){
  if(req.session.role == "Lecturer"){
    next()
  }else{
    res.redirect('/')
  }
}


module.exports = {student:isStudent, lecturer: isLecturer};
