const auth = require("../controllers/user/auth");
const scholarships = require("../controllers/students/scholarships")
const {authenticateSTUDENT}= require("../middlewares/auth")

module.exports = function (router) {
    
  router.post("/student/signup", auth.signup);

  router.post("/student/login", auth.login);

  router.post("/student/submit-form", authenticateSTUDENT, scholarships.createStudentForm);
  
  router.post("/student/edit-form", authenticateSTUDENT, scholarships.editStudentForm);
  
};
