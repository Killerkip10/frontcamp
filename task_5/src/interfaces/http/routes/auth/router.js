const { Router } = require('express');
const passport = require('passport');

module.exports = () => {
  const router = Router();

  router.get(
    '/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] })
  );
  
  router.get(
    '/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }), 
    (req, res) => res.redirect('/'),
  );

  return router;
};