module.exports = ({ newsMapper }) => {
    const byId = id => newsMapper.getById(id);
  
    return {
      byId,
    };
  };