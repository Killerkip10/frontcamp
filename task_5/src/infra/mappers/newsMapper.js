const { News: toEntity } = require('../../domain/news');

module.exports = (storage) => {
  const getAll = (...args) => storage.findAll(...args)
    .then(entity => entity.map(e => toEntity(e)));

  const getById = (...args) => storage.findById(...args)
    .then(entity => entity && toEntity(entity));

  const remove = (...args) => storage.remove(...args);

  const create = (...args) => storage.add(...args)
    .then(toEntity);

  const update = (...args) => storage.update(...args)
    .then(toEntity);

  return {
    getAll,
    getById,
    remove,
    create,
    update,
  };
};