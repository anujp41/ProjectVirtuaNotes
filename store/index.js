import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import markers from './markers';

const reducers = combineReducers({ markers })
const middleware = applyMiddleware(thunkMiddleware, logger);

const store = createStore(reducers, middleware);

export default store;

export * from './markers';