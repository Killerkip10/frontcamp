const t = require('tcomb');

const News = t.struct({
  id: t.maybe(t.String),
  title: t.String,
  description: t.String,
  authorId: t.String,
});

module.exports = { News };