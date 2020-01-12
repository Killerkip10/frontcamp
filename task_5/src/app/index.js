const news = require('./news');

module.exports = {
  app: ({ server, database }) => ({
    start: () => Promise.resolve()
      // .then(database.connect)
      .then(server.start),
  }),
  methods: () => ({
    news,
  }), 
};