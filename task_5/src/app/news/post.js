const { trim } = require('lodash');
const { News: toEntity } = require('../../domain/news');

module.exports = ({ newsMapper }) => {
  const create = (data) => {
    try {
      const entity = toEntity(data);

      if (!trim(entity.title) || !trim(entity.description) || !trim(entity.author)) {
        throw new Error('Validation error');
      }

      return newsMapper.create(entity);
    } catch(error) {
      return Promise.reject(error);
    }
  };

  return { create };
};