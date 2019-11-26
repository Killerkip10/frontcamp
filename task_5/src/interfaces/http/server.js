const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

module.exports = ({ config, logger }) => {
  const app = express();
  
  app.use(bodyParser.json());
  app.use(router());

  return {
    app,
    start: () => app.listen(config.port, () => logger.log(`Api was started on ${config.port}`)),
  };
};