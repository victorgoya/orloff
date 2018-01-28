import reducers from "./reducers";
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import persistState from 'redux-localstorage';
import createSagaMiddleware from 'redux-saga';

import { Route } from 'react-router'

import { routerMiddleware } from 'react-router-redux';
import history from "./history";
import pageSaga from './sagas/page';

const historyMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(logger),
  applyMiddleware(historyMiddleware),
  persistState(['configuration', 'router', 'pages'])
)

let store = createStore(
  reducers,
  enhancer
);

sagaMiddleware.run(pageSaga)

export default store;
