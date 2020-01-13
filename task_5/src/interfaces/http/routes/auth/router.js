const { Router } = require('express');
const passport = require('passport');

module.exports = () => {
  const router = Router();

  router.get(
    '/google',
    (req, res, next) => {
      req.session.referer = req.headers.referer;
      passport.authenticate(
        'google',
        { scope: ['https://www.googleapis.com/auth/userinfo.profile'] },
      )(req, res, next);
    }
  );
  
  router.get(
    '/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => res.redirect(req.session.referer.split('/').slice(0, 3).join('/')),
  );

  return router;
};