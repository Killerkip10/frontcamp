const passport = require('passport');
const googlePassport = require('passport-google-oauth');

module.exports = ({ clientID, clientSecret, callbackURL }) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
      done(null, user);
  });

  passport.use(new googlePassport.OAuth2Strategy({
      clientID,
      clientSecret,
      callbackURL,
    },
    (accessToken, refreshToken, profile, done) => done(null, { profile, accessToken }),
  ));
}
