module.exports = ({
  news: { get, remove, post, put },
  newsMapper: mapper,
  newsStorage,
}) => {
  const newsMapper = mapper(newsStorage());

  const getUseCase = get({ newsMapper });
  const postUseCase = post({ newsMapper });
  const deleteUseCase = remove({ newsMapper });
  const putUseCase = put({ newsMapper });

  return {
    getUseCase,
    postUseCase,
    deleteUseCase,
    putUseCase,
  };
};
