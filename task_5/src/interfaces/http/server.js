const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const middlewares = require('./middlewares');

module.exports = ({ config, logger }) => {
  const app = express();
  
  app.use(bodyParser.json());
  app.use(middlewares.logger());
  app.use(router());

  return {
    app,
    start: () => app.listen(config.PORT, () => logger.log(`Api was started on ${config.PORT}`)),
  };
};