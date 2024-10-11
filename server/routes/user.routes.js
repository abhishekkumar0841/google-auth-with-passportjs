const express = require("express");
const passport = require("passport");

const {
  loginUser,
  registerUser,
  getProfile,
} = require("../controllers/user.controller");
const jwtAuthChecker = require("../middleware/auth.middleware");

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

userRouter.get(
  "/profile",
    jwtAuthChecker,
  getProfile
);

module.exports = userRouter;
