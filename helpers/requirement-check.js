function checkRequirement(project, major,semester,level){
  if(project.major == major && project.semester < semester && project.level == level){
    return true
  }else{
    return false
  }
}

module.exports = checkRequirement;
