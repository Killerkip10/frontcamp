module.exports = ({ newsMapper }) => {
  const all = () => newsMapper.getAll();
  const byId = id => newsMapper.getById(id);

  return {
    all,
    byId,
  };
};