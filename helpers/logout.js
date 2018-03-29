function logout(){
  console.log('--------');
  req.session.destroy(function(err) {
    console.log('logout success');
   // cannot access session here
  })
}

module.exports = logout;
