module.exports = ({
  news: { getList, getItem, remove, post, put },
  newsMapper: mapper,
  newsStorage,
  News,
}) => {
  const newsMapper = mapper(newsStorage({ News }));

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
