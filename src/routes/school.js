const auth = require("../controllers/user/auth");

module.exports = function (router) {
  router.post("/school/login", auth.login);
};
