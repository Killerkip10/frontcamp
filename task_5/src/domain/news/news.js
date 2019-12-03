const t = require('tcomb');

const News = t.struct({
  id: t.maybe(t.String),
  title: t.String,
  description: t.String,
  author: t.String,
});

module.exports = { News };