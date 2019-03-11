/*
 * @Author: liangchaoshun
 * @Date: 2019-02-16 09:35:33
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 20:09:51
 * @Description: All Requestion
 * @Note: [传参方式]: GET -> params, POST -> data
 */

import axios from './http';

const domain = '/v1/web/csleep'; // domain


/* // 登录
export const login = {
  url: `${domain}/hotel/author/login`,
  method: 'post'
}; */

// 获取登录状态
export const fetchLoggedStatus = () => axios(
  {
    // url: `${domain}/hotel/author/certified`,
    url: 'mock/author/certified',
    method: 'get'
  }
);

// 获取环境数据
export const fetchEnvironData = (argv1, argv2) => axios(
  {
    url: 'mock/getEnvironData',
    method: 'get',
    params: { param1: argv1, param2: argv2 }
  }
);
