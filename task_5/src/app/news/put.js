const { trim } = require('lodash');
const { News: toEntity } = require('../../domain/news');

module.exports = ({ newsMapper }) => {
  const update = (id, data) => {
    try {
      const entity = toEntity(data);

      if (!trim(id)) {
        throw new Error('Not found');
      }

      if (!trim(entity.title) || !trim(entity.description) || !trim(entity.author)) {
        throw new Error('Validation error');
      }

      return newsMapper.update(id, entity);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { update };
};