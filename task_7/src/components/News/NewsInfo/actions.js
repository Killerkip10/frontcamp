export const NEWS_INFO_GET_REQUEST = 'NEWS_INFO_GET_REQUEST';
export const NEWS_INFO_GET_SUCCESS = 'NEWS_INFO_GET_SUCCESS';
export const NEWS_INFO_GET_FAILURE = 'NEWS_INFO_GET_FAILURE';

export const CHANGE_TOPIC = 'CHANGE_TOPIC';

export const getNewsByIdRequest = () => ({
  type: NEWS_INFO_GET_REQUEST,
  payload: { isFetching: true },
});

export const getNewsByIdSuccess = info => ({
  type: NEWS_INFO_GET_SUCCESS,
  payload: { info, isFetching: false },
});

export const getNewsByIdFailure = () => ({
  type: NEWS_INFO_GET_FAILURE,
  payload: { isFetching: false },
})
