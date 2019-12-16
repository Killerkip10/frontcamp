import { API, API_KEY } from 'configs/api';

import {
  getNewsListRequest,
  getNewsListSuccess,
  getNewsListFailure,
} from './actions';

export const getNewsList = (topic) => (dispatch) => {
  dispatch(getNewsListRequest());

  return fetch(`${API.HOST}${API.GET_ARTICLES}${topic}.json?api-key=${API_KEY}`)
    .then(response => response.json())
    .then(({ results }) => dispatch(getNewsListSuccess(results)))
    .catch(() => dispatch(getNewsListFailure()));
};