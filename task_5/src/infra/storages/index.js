const newsStorage = require('./newsStorage');
const newsDbStorage = require('./newsDbStorage');

module.exports = () => ({
  newsStorage,
  newsDbStorage,
});