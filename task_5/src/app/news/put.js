const { trim } = require('lodash');
const { News: toEntity } = require('../../domain/news');

module.exports = ({ newsMapper }) => {
  const update = (id, data) => Promise.resolve(data)
    .then(toEntity)
    .then((data) => {
      if (!trim(id)) {
        throw new Error('');
      }

      if (!trim(data.title) || !trim(data.description) || !trim(data.author)) {
        throw new Error('Validation error');
      }

      return newsMapper.update(id, data);
    });

  return { update };
};