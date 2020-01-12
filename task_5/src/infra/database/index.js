const mongoose = require('mongoose');
const { news } = require('./schemas');

module.exports = ({ config, logger }) => {
  const News = mongoose.model('News', news);

  const connect = () => mongoose.connect(config.DATABASE_HOST, { useNewUrlParser: true })
    .then(() => logger.log('Database was connected'))
    .catch(error => logger.error(error));

  return {
    connect,
    News,
  };
};