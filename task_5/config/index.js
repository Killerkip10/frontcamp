const dotenv = require('dotenv');

const {
  parsed: {
    PORT = 3000,
  }
} = dotenv.config();

module.exports = {
  PORT,
};