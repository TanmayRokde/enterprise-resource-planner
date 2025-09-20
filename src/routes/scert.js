const auth = require("../controllers/user/auth");

module.exports = function (router) {
  router.post("/scert/login", auth.login);
};
