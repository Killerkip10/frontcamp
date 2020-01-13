const dotenv = require('dotenv');

const {
  parsed: {
    PORT = 3000,
    HOST = 'http://localhost:3000',
    DATABASE_HOST = 'mongodb://frontcamp:vp123456789@ds263368.mlab.com:63368/frontcamp',
    GOOGLE_CLIENT_ID = '663086567594-o02jg0umibrolc0tt8s9q1hfh4lajuni.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET ='LKmX1G8Nq-az12-W1dlfAGtZ',
    SESSION = {
      name: 'sid',
      secret: 'secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: false,
      },
    },
  }
} = dotenv.config();

module.exports = {
  PORT,
  HOST,
  DATABASE_HOST,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SESSION,
};
