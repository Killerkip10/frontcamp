const container = require('../../../../container');
const instance = require('./instance');
const router = require('./router');

module.exports = () => {
  const {
    methods: { news },
    storages: { newsStorage },
    mappers: { newsMapper },
    database: { News },
    logger,
  } = container.cradle;

  const app = instance({ news, newsStorage, newsMapper, News });
 
  return router({ logger, ...app });
};