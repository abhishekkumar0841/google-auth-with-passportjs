const express = require('express');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const envConstants = require("../constants/envConstants");

const oAuthRouter = express.Router();

oAuthRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    approvalPrompt: "force",
    // prompt: "select_account" 
  })
);

oAuthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${envConstants.URLS.CLIENT_BASE_URL}/login`,
    session: false,
  }),
  function (req, res) {
    const payload = {
      id: req.user.id,
      name: req.user.name,
    };

    const token = jwt.sign(payload, envConstants.JWT.JWT_SECRET, {
      expiresIn: envConstants.JWT.TOKEN_LIFE,
    });

    const bearerToken = `Bearer ${token}`

    // return res.status(201).json({
    //     success: true,
    //     token: `Bearer ${token}`
    // })

    res.redirect(`${envConstants.URLS.CLIENT_BASE_URL}?token=${bearerToken}`)
  }
);

module.exports = oAuthRouter;
