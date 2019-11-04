const {
  GET_ARTICLE_INFO_REQUEST,
  GET_ARTICLE_INFO_SUCCESS,
  GET_ARTICLE_INFO_FAILURE,
} = require('./actions');

const initialState = {
  isFetching: true,
  article: {
    title: '',
    section: '',
    abstract: '',
    des_facet: [],
    byline: '',
    url: '',
    published_date: '',
    updated_date: '',
    copyright: '',
  },
};

const articleInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLE_INFO_REQUEST:
    case GET_ARTICLE_INFO_SUCCESS:
    case GET_ARTICLE_INFO_FAILURE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

module.exports = { articleInfo };