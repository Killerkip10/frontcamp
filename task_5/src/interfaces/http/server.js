const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const router = require('./router');
const middlewares = require('./middlewares');
const googlePassport = require('./googlePassport');

module.exports = ({ config, logger }) => {
  const app = express();

  googlePassport({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK,
  });

  app.use(bodyParser.json());
  app.use(middlewares.logger());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session(config.SESSION));

  app.use('/api', router());

  app.use(express.static(path.join(__dirname, '../../../dist')));

  return {
    app,
    start: () => app.listen(config.PORT, () => logger.log(`Api was started on ${config.PORT}`)),
  };
};