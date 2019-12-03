module.exports = ({ newsMapper }) => {
  const all = () => newsMapper.getAll();

  return {
    all,
  };
};