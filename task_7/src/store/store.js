import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { news } from 'components/News/reducer';

const reducers = combineReducers({ news });

const middlewares = [thunk];

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));