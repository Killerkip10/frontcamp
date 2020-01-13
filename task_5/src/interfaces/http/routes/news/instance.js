module.exports = ({
  news: { getList, getItem, remove, post, put },
  newsMapper: mapper,
  newsDbStorage,
  News,
}) => {
  const newsMapper = mapper(newsDbStorage({ News }));

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
