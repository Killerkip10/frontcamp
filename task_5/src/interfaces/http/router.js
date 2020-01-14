const { Router } = require('express');

const { isAuthorized } = require('./middlewares');

module.exports = () => {
  const apiRouter = Router();
  const newsRouter = require('./routes/news');
  const authRouter = require('./routes/auth');
  const userRouter = require('./routes/user');

  apiRouter.use('/auth', authRouter());
  apiRouter.use('/news', isAuthorized(), newsRouter());
  apiRouter.use('/user', isAuthorized(), userRouter());

  return apiRouter;
};