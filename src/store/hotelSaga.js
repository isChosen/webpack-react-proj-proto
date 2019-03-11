/*
 * @Author: liangchaoshun
 * @Date: 2019-02-16 09:24:12
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 15:56:05
 * @Description: Global Saga: 在此文件内处理业务逻辑和数据格式
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchLoggedStatus } from '__Utils__/request';
import { LOGGED_STATUS_SUCCEEDED, CHECK_LOGINED_STATUS } from './actionTypes';

// 获取 github 用户
function* checkLogged(action) {
  const result = yield call(fetchLoggedStatus);
  yield put({ type: LOGGED_STATUS_SUCCEEDED, result });
}

// 分配任务 Generator
function* hotelSaga() {
  yield takeLatest(CHECK_LOGINED_STATUS, checkLogged);
}

export default hotelSaga;
