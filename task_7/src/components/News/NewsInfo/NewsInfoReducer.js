import {
  NEWS_INFO_GET_REQUEST,
  NEWS_INFO_GET_SUCCESS,
  NEWS_INFO_GET_FAILURE,
} from './NewsInfoActions';

const initialState = {
  isFetching: false,
  info: {},
};

export const newsInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case NEWS_INFO_GET_REQUEST:
    case NEWS_INFO_GET_SUCCESS:
    case NEWS_INFO_GET_FAILURE:
      return { ...state, ...payload };
    default:
      return state;
  }
};