const { Router } = require('express');

module.exports = () => {
  const apiRouter = Router();
  const newsRouter = require('./routes/news');
  const authRouter = require('./routes/auth');

  apiRouter.use('/auth', authRouter());
  apiRouter.use('/news', newsRouter());

  return apiRouter;
};