/*
 * @Author: liangchaoshun
 * @Date: 2019-02-13 10:49:47
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 18:04:59
 * @Description: Global Reducer: 组件中的 state 对象是在此创建的
 */
import { fromJS } from 'immutable';
// import { reducer as sidebarReducer } from '__PublicComponents__/sidebar/reducer';
import { SET_LOGINED_PENDING, LOGGED_STATUS_SUCCEEDED } from './actionTypes';

// 初始化 state（权限路由检测登录状态）
const initState = fromJS({
  appLogged: false,
  appPending: true
});

// 初始化 reducer（权限路由检测登录状态）
const initialReducer = (state = initState, action) => {
  const { type } = action;
  switch (type) {
    // 权限路由：加载组价前的动画
    case SET_LOGINED_PENDING:
      return state.set('appPending', action.appPending);
    // 权限路由：若登录状态有效，则渲染组件
    case LOGGED_STATUS_SUCCEEDED: {
      const { result: { access } } = action;
      return state.merge({
        appPending: false,
        appLogged: access
      });
    }
    default:
      return state;
  }
};

const initReducer = {
  init: initialReducer
  // sidebar: sidebarReducer
};

export default initReducer;
