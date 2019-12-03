module.exports = ({ newsMapper }) => {
  const remove = id => newsMapper.remove(id);

  return { remove };
};