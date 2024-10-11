const envConstants = require("../constants/envConstants");
const UserModel = require("../models/user.model");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = envConstants.JWT.JWT_SECRET;

// JWT STRATEGY
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await UserModel.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

// GOOGLE STRATEGY
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleAuth = async () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: envConstants.GOOGLE.GOOGLE_CLIENT_ID,
        clientSecret: envConstants.GOOGLE.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const user = await UserModel.findOne({ googleId: profile.id });
          if (!user) {
            const newUser = new UserModel({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              emailProvider: "GOOGLE",
            });
            await newUser.save();
            return cb(null, newUser);
          }
          return cb(null, user);
        } catch (error) {
          cb(error, false);
        }
      }
    )
  );
};

module.exports = async (app) => {
  app.use(passport.initialize());
  await googleAuth();
};
