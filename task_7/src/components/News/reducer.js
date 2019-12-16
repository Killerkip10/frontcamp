import { combineReducers } from 'redux';

import { newsList } from './NewsList/reducer';
import { newsInfo } from './NewsInfo/reducer';

export const news = combineReducers({
  newsList,
  newsInfo,
});