const { Router } = require('express');

module.exports = () => {
  const apiRouter = Router();
  const newsRouter = require('./routes/news');

  apiRouter.use('/news', newsRouter());

  return apiRouter;
};