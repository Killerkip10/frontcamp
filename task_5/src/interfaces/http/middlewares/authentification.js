const STATUS = require('http-status');

const isAuthorized = () => (req, res, next) => {
  console.log(req.session.passport && req.session.passport.user.profile);
  if (req.session.passport) {
    next();
  } else {
    res.sendStatus(STATUS.UNAUTHORIZED);
  }
};

module.exports = { isAuthorized };