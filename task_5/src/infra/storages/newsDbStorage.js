module.exports = ({ News }) => {
  const findAll = () => News.find();

  const findById = id => News.findById(id);

  const remove = _id => News.remove({ _id });

  const add = n => News.create(n);

  const update = (_id, updated) => News.findByIdAndUpdate(_id, updated, { new: true });

  return {
    findAll,
    findById,
    remove,
    add,
    update,
  };
};