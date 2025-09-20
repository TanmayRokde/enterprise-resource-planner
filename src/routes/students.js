const auth = require("../controllers/user/auth");

module.exports = function (router) {
    
  router.post("/student/signup", auth.signup);

  router.post("/student/login", auth.login);
};
