export const NEWS_LIST_GET_REQUEST = 'NEWS_LIST_GET_REQUEST';
export const NEWS_LIST_GET_SUCCESS = 'NEWS_LIST_GET_SUCCESS';
export const NEWS_LIST_GET_FAILURE = 'NEWS_LIST_GET_FAILURE';

export const CHANGE_TOPIC = 'CHANGE_TOPIC';

export const getNewsListRequest = () => ({
  type: NEWS_LIST_GET_REQUEST,
  payload: { isFetching: true },
});

export const getNewsListSuccess = news => ({
  type: NEWS_LIST_GET_SUCCESS,
  payload: { news, isFetching: false },
});

export const getNewsListFailure = () => ({
  type: NEWS_LIST_GET_FAILURE,
  payload: { isFetching: false },
})

export const changeTopic = topic => ({
  type: CHANGE_TOPIC,
  payload: { topic },
});