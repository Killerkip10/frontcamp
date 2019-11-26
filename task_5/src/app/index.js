const news = require('./news');

module.exports = {
  app: ({ server }) => ({
    start: server.start,
  }),
  methods: () => ({
    news,
  }), 
};