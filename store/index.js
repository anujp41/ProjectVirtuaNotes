"use strict";

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import markers from './markers';

const reducers = combineReducers({
  markers
})
const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducers, applyMiddleware(thunkMiddleware, createLogger()));

export default store;