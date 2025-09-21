const auth = require("../controllers/user/auth");
const { authenticateSCERT } = require("../middlewares/auth")
const scholarship = require("../controllers/scert/createScholarship")

module.exports = function (router) {

  router.post("/scert/login", auth.login);
  router.post("/scert/create-scholarship", authenticateSCERT ,scholarship.createScholarship)
};
