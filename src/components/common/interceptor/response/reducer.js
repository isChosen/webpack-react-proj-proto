/*
 * @Author: liangchaoshun
 * @Date: 2019-2-26 10:25:30
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 14:28:15
 * @Description: Response Interceptor Reducer
 */

import { fromJS } from 'immutable';
import { NEED_TO_RELOGIN, GOTO_LOGIN } from '__StorePath__/actionTypes';

// initState 若没有声明默认值，则组件中需要设置 defaultProps
const initState = fromJS({
  gotoLogin: false,
  showReLoginModal: false
});

const reducer = (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case GOTO_LOGIN: {
      const { isGotoLogin, showReLoginModal } = action;
      return state.merge({
        showReLoginModal,
        gotoLogin: isGotoLogin
      });
    }
    case NEED_TO_RELOGIN: return state.set('showReLoginModal', true);
    default: return state;
  }
};

// export 出去的变量，在 import 时，方便变量重命名
export { reducer };
