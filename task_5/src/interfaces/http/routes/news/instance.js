module.exports = ({
  news: { getList, getItem, remove, post, put },
  newsMapper: mapper,
  newsStorage,
}) => {
  const newsMapper = mapper(newsStorage());

  const getListUseCase = getList({ newsMapper });
  const getItemUseCase = getItem({ newsMapper });
  const postUseCase = post({ newsMapper });
  const deleteUseCase = remove({ newsMapper });
  const putUseCase = put({ newsMapper });

  return {
    getListUseCase,
    getItemUseCase,
    postUseCase,
    deleteUseCase,
    putUseCase,
  };
};
