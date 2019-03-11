/*
 * @Author: liangchaoshun
 * @Date: 2019-02-10 20:01:18
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 16:48:34
 * @Description: Axios Interceptor
 */

import axios from 'axios';
import store from '__StorePath__';
import { NEED_TO_RELOGIN } from '__StorePath__/actionTypes';

axios.defaults.timeout = 5000;

const codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  2: '请重新登录'
};


axios.interceptors.response.use(
  response => {
    // console.log('response interc: ', response);

    /* ----------------- 异常流处理 start ----------------- */
    // NEED_TO_LOGININ handle
    const { data: { code: statusCode } } = response;
    if (statusCode === 2) {
      const { dispatch } = store;
      dispatch({ type: NEED_TO_RELOGIN, desc: '登录失效，请重新登录' });
      // eslint-disable-next-line no-console
      console.log('登录失效：', codeMessage[2]);
    }

    /* ----------------- 异常流处理 end ----------------- */

    return response.data;
  },
  error => Promise.reject(error)
);

export default axios;
