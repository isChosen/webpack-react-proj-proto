/*
 * @Author: liangchaoshun
 * @Date: 2019-02-13 16:49:54
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-07 17:39:11
 * @Description: Global ActionTypes Format："WORD_WORD_WORD"
 */

// 检测登录状态
export const SET_LOGINED_PENDING = 'SET_LOGINED_PENDING';
export const CHECK_LOGINED_STATUS = 'CHECK_LOGINED_STATUS';
export const LOGGED_STATUS_SUCCEEDED = 'LOGGED_STATUS_SUCCEEDED';

// 需要重新登录
export const NEED_TO_RELOGIN = 'NEED_TO_RELOGIN';
export const GOTO_LOGIN = 'GOTO_LOGIN';

// 获取侧边栏数据项
export const FETCH_SIDEBAR_INIT_DATA = 'FETCH_SIDEBAR_INIT_DATA';
