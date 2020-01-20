const { Router } = require('express');

module.exports = () => {
  const router = Router();

  router.get('/', (req, res) => res.send(req.session.passport.user.profile));

  return router;
};