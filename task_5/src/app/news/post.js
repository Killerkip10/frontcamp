const { trim } = require('lodash');
const { News: toEntity } = require('../../domain/news');

module.exports = ({ newsMapper }) => {
  const create = data => Promise.resolve(data)
    .then(toEntity)
    .then((data) => {
      if (!trim(data.title) || !trim(data.description) || !trim(data.author)) {
        throw new Error('Validation error');
      }

      return newsMapper.create(data);
    });

  return { create };
};