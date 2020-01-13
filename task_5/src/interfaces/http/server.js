const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
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
  app.use(cors());

  app.use(router());
  app.get('/', (req, res) => {
    logger.log('########################################', req.cookies);
    res.redirect('/news');
  });
  
  return {
    app,
    start: () => app.listen(config.PORT, () => logger.log(`Api was started on ${config.PORT}`)),
  };
};