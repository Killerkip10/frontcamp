import { combineReducers } from 'redux';

import { newsInfo } from './NewsInfo';
import { newsList } from './NewsList';

export const news = combineReducers({
  newsList,
  newsInfo,
});