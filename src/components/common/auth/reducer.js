/*
 * @Author: liangchaoshun
 * @Date: 2019-02-21 14:09:48
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 11:00:20
 * @Description: Authorized Route Reducer
 */

import { fromJS } from 'immutable';
import { SET_LOGINED_PENDING, LOGGED_STATUS_SUCCEEDED } from '__StorePath__/actionTypes';

// initState 若没有声明默认值，则组件中需要设置 defaultProps
const initState = fromJS({
  logged: false,
  pending: true
});

const reducer = (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case SET_LOGINED_PENDING:
      return state.set('pending', action.pending);
    case LOGGED_STATUS_SUCCEEDED: {
      const { result: { access } } = action;
      return state.merge({
        pending: false,
        logged: access
      });
    }
    default: return state;
  }
};

export { reducer };
