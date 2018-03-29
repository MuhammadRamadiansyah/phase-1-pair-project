function assignedSupervisor(projectData){
  if(projectData.Lecturers.length > 0){

    return projectData.Lecturers[0].name
  }else{
    return "Unassigned"
  }
}

module.exports = assignedSupervisor;
