const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const passport = require('passport');
const router = require('./router');
const middlewares = require('./middlewares');
const googlePassport = require('./googlePassport');

module.exports = ({ config, logger }) => {
  const app = express();

  googlePassport({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  });

  app.use(bodyParser.json());
  app.use(middlewares.logger());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(router());
  app.get('/', (req, res) => res.redirect('/news'));

  app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] }));
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
  });

  return {
    app,
    start: () => app.listen(config.PORT, () => logger.log(`Api was started on ${config.PORT}`)),
  };
};