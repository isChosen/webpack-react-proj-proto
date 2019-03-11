/*
 * @Author: liangchaoshun
 * @Date: 2019-02-13 10:49:29
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 18:11:04
 * @Description: Global Store
 */

import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import initReducer from './reducer';
import hotelSaga from './hotelSaga';

// eslint-disable-next-line import/no-mutable-exports
let store;
const sagaMiddleware = createSagaMiddleware();

// 开发环境时，启用 Redux 调试插件，生产环境将其移除
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') { // development
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(combineReducers(initReducer), composeEnhancers(applyMiddleware(sagaMiddleware)));
} else {
  store = createStore(combineReducers(initReducer), applyMiddleware(sagaMiddleware)); // production
}

sagaMiddleware.run(hotelSaga);

store.asyncReducers = { ...initReducer };

// 动态注入 reducer
export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;
  store.replaceReducer(combineReducers({ ...store.asyncReducers }));
  // console.log('injectReducer after: ', Object.keys(store.asyncReducers));
};

export default store;
