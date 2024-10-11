const passport = require("passport");

const jwtAuthChecker = passport.authenticate("jwt", { session: false });

module.exports = jwtAuthChecker;