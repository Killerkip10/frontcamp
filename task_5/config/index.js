const dotenv = require('dotenv');

const {
  parsed: {
    PORT = 3000,
    HOST = 'http://localhost:3000',
    DATABASE_HOST = 'mongodb://localhost:27017/frontcamp',
    GOOGLE_CLIENT_ID = '663086567594-o02jg0umibrolc0tt8s9q1hfh4lajuni.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET ='LKmX1G8Nq-az12-W1dlfAGtZ',
  }
} = dotenv.config();

module.exports = {
  PORT,
  HOST,
  DATABASE_HOST,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
};
