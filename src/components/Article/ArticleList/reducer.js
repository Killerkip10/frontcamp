const {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
} = require('./actions');

const initialState = {
  isFetching: true,
  articles: [],
};

const articleList = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLES_REQUEST:
    case GET_ARTICLES_SUCCESS:
    case GET_ARTICLES_FAILURE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

module.exports = { articleList };