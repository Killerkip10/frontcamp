import { API, API_KEY } from 'configs/api';

import {
  getNewsByIdRequest,
  getNewsByIdSuccess,
  getNewsByIdFailure,
} from './NewsInfoActions';

export const getNewsById = (index, topic) => (dispatch) => {
  dispatch(getNewsByIdRequest());

  return fetch(`${API.HOST}${API.GET_ARTICLES}${topic}.json?api-key=${API_KEY}`)
    .then(response => response.json())
    .then(({ results }) => dispatch(getNewsByIdSuccess(results[index])))
    .catch(() => dispatch(getNewsByIdFailure()));
};