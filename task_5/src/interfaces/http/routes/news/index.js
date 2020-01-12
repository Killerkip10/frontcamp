const container = require('../../../../container');
const instance = require('./instance');
const router = require('./router');

module.exports = () => {
  const {
    methods: { news },
    storages: { newsDbStorage },
    mappers: { newsMapper },
    database: { News },
    logger,
  } = container.cradle;

  const app = instance({ news, newsDbStorage, newsMapper, News });
 
  return router({ logger, ...app });
};