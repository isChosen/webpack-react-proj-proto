/*
 * @Author: liangchaoshun
 * @Date: 2019-3-4 10:23:46
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 14:28:20
 * @Description: Sidebar Reducer
 */

import { fromJS } from 'immutable';
import { FETCH_SIDEBAR_INIT_DATA } from '__StorePath__/actionTypes';

const initState = fromJS({
  sidebarInitData: [
    {
      name: '数据监测',
      alias: 'dataMonitor',
      access: true,
      to: { pathname: '/app/dataMonitor/' },
      icon: 'stock',
      childList: [
        {
          name: '综合数据',
          alias: 'dashboard',
          access: true,
          to: { pathname: '/app/dataMonitor/dashboard/' }
        },
        {
          name: '睡眠数据',
          alias: 'sleepData',
          access: true,
          to: { pathname: '/app/dataMonitor/sleepData/' }
        },
        {
          name: '体征数据',
          alias: 'bodySign',
          access: true,
          to: { pathname: '/app/dataMonitor/bodySign/' }
        },
        {
          name: '环境数据',
          alias: 'environData',
          access: true,
          to: { pathname: '/app/dataMonitor/environData/' }
        }
      ]
    },
    {
      name: '设备管理',
      alias: 'deviceMana',
      access: true,
      to: { pathname: '/app/deviceMana/' },
      icon: 'hdd',
      childList: [
        {
          name: '设备列表',
          alias: 'deviceList',
          access: true,
          to: { pathname: '/app/deviceMana/deviceList' }
        }
      ]
    },
    {
      name: '客房管理',
      alias: 'roomManage',
      access: true,
      to: { pathname: '/app/roomManage/' },
      icon: 'home',
      childList: [
        {
          name: '客房列表',
          alias: 'roomList',
          access: true,
          to: { pathname: '/app/roomManage/roomList' }
        }
      ]
    },
    {
      name: '客人管理',
      alias: 'guestManage',
      access: true,
      to: { pathname: '/app/guestManage/' },
      icon: 'team',
      childList: [
        {
          name: '客人列表',
          alias: 'guestList',
          access: true,
          to: { pathname: '/app/guestManage/guestList' }
        },
        {
          name: '客人行为统计',
          alias: 'guestBehavior',
          access: true,
          to: { pathname: '/app/guestManage/guestBehavior' }
        }
      ]
    },
    {
      name: '应用管理',
      alias: 'appManage',
      access: true,
      to: { pathname: '/app/appManage/' },
      icon: 'appstore',
      childList: [
        {
          name: '公众号管理',
          alias: 'wechatManage',
          access: true,
          to: { pathname: '/app/appManage/wechatManage' }
        }
      ]
    },
    {
      name: '账号权限',
      alias: 'accountAuth',
      access: true,
      to: { pathname: '/app/accountAuth/' },
      icon: 'unlock',
      childList: [
        {
          name: '个人信息',
          alias: 'personalInfo',
          access: true,
          to: { pathname: '/app/accountAuth/personalInfo' }
        },
        {
          name: '账号管理',
          alias: 'accountMana',
          access: true,
          to: { pathname: '/app/accountAuth/accountMana' }
        },
        {
          name: '角色管理',
          alias: 'roleMana',
          access: true,
          to: { pathname: '/app/accountAuth/roleMana' }
        },
        {
          name: '酒店信息管理',
          alias: 'hotelInfoMana',
          access: true,
          to: { pathname: '/app/accountAuth/hotelInfoMana' }
        }
      ]
    },
    {
      name: '系统设置',
      alias: 'setting',
      access: true,
      to: { pathname: '/app/setting/' },
      icon: 'setting',
      childList: [
        {
          name: '迎宾管理',
          alias: 'greeting',
          access: true,
          to: { pathname: '/app/setting/greeting' }
        },
        {
          name: '常见问题',
          alias: 'faq',
          access: true,
          to: { pathname: '/app/setting/faq' }
        },
        {
          name: '日志管理',
          alias: 'logMana',
          access: true,
          to: { pathname: '/app/setting/logMana' }
        }
      ]
    }
  ],
  sidebarRootkeys: ['dataMonitor', 'deviceMana', 'roomManage', 'guestManage', 'appManage', 'accountAuth', 'setting']
});

const reducer = (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case FETCH_SIDEBAR_INIT_DATA: return initState;
    default: return state;
  }
};

// export 出去的变量，在 import 时，方便变量重命名
export { reducer };
