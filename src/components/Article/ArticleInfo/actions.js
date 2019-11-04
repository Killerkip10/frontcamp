const GET_ARTICLE_INFO_REQUEST = 'GET_ARTICLE_INFO_REQUEST';
const GET_ARTICLE_INFO_SUCCESS = 'GET_ARTICLE_INFO_SUCCESS';
const GET_ARTICLE_INFO_FAILURE = 'GET_ARTICLE_INFO_FAILURE';

const getArticleInfoRequestAction = () => ({
  type: GET_ARTICLE_INFO_REQUEST,
  payload: { isFetching: true },
});

const getArticleInfoSuccessAction = article => ({
  type: GET_ARTICLE_INFO_SUCCESS,
  payload: { isFetching: false, article },
});

const getArticleInfoFailureAction = () => ({
  type: GET_ARTICLE_INFO_FAILURE,
  payload: { isFetching: false },
});

module.exports = {
  GET_ARTICLE_INFO_REQUEST,
  GET_ARTICLE_INFO_SUCCESS,
  GET_ARTICLE_INFO_FAILURE,
  getArticleInfoRequestAction,
  getArticleInfoSuccessAction,
  getArticleInfoFailureAction,
};