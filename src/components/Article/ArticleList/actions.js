const GET_ARTICLES_REQUEST = 'GET_ARTICLES_REQUEST';
const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
const GET_ARTICLES_FAILURE = 'GET_ARTICLES_FAILURE';

const getArticlesRequestAction = () => ({
  type: GET_ARTICLES_REQUEST,
  payload: { isFetching: true, articles: [] },
});

const getArticlesSuccessAction = articles => ({
  type: GET_ARTICLES_SUCCESS,
  payload: { isFetching: false, articles },
});

const getArticlesFailureAction = () => ({
  type: GET_ARTICLES_FAILURE,
  payload: { isFetching: false },
});


module.exports = {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  getArticlesRequestAction,
  getArticlesSuccessAction,
  getArticlesFailureAction,
};