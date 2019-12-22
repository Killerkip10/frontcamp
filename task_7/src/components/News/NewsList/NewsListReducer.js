import { ARTICLE_TOPICS } from './constants';
import {
  NEWS_LIST_GET_REQUEST,
  NEWS_LIST_GET_SUCCESS,
  NEWS_LIST_GET_FAILURE,
  CHANGE_TOPIC,
} from './NewsListActions';

export const initialState = {
  isFetching: false,
  topic: ARTICLE_TOPICS.ARTS,
  news: [],
};

export const newsList = (state = initialState, { type, payload }) => {
  switch (type) {
    case NEWS_LIST_GET_REQUEST:
    case NEWS_LIST_GET_SUCCESS:
    case NEWS_LIST_GET_FAILURE:
    case CHANGE_TOPIC:
      return { ...state,  ...payload };
    default:
      return state;
  }
};