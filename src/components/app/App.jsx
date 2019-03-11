/*
 * @Author: liangchaoshun
 * @Date: 2019-02-14 14:21:34
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 19:38:21
 * @Description: App 顶层容器
 */

import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Spin, Icon } from 'antd';
import appLess from './app.less';

const Header = lazy(() => import(/* webpackChunkName: "chunk-header" */ '__PublicComponents__/header/Header'));
const Sidebar = lazy(() => import(/* webpackChunkName: "chunk-sidebar" */ '__PublicComponents__/sidebar/Sidebar'));

const DataMonitor = lazy(() => import(/* webpackChunkName: "chunk-dataMonitor" */ '../dataMonitor/DataMonitor'));
const DeviceMana = lazy(() => import(/* webpackChunkName: "chunk-deviceMana" */ '../deviceMana/DeviceMana'));
const RoomManage = lazy(() => import(/* webpackChunkName: "chunk-roomManage" */ '../roomManage/RoomManage'));
const GuestManage = lazy(() => import(/* webpackChunkName: "chunk-guestManage" */ '../guestManage/GuestManage'));
const AppManage = lazy(() => import(/* webpackChunkName: "chunk-appManage" */ '../appManage/AppManage'));
const AuthorMana = lazy(() => import(/* webpackChunkName: "chunk-authorMana" */ '../authorMana/AuthorMana'));
const Setting = lazy(() => import(/* webpackChunkName: "chunk-setting" */ '../setting/Setting'));

const App = props => {
  // eslint-disable-next-line react/prop-types
  const { match: { path } } = props;
  return (
    <div className={appLess.appContainer}>
      <Suspense fallback={<div style={{ textAlign: 'center' }}>应用加载中，请稍候...</div>}>
        <Layout>
          <Header />
        </Layout>
        <Layout>
          <Sidebar />
          <Layout className={appLess.section}>
            <div className={appLess.main}>
              <div className={appLess.dynamical}>
                <Suspense fallback={<Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}>
                  <Switch>
                    <Redirect exact from={`${path}`} to={`${path}/dataMonitor`} />
                    <Route path={`${path}/dataMonitor`} render={props => <DataMonitor {...props} />} />
                    <Route path={`${path}/deviceMana`} render={props => <DeviceMana {...props} />} />
                    <Route path={`${path}/roomManage`} render={props => <RoomManage {...props} />} />
                    <Route path={`${path}/guestManage`} render={props => <GuestManage {...props} />} />
                    <Route path={`${path}/appManage`} render={props => <AppManage {...props} />} />
                    <Route path={`${path}/accountAuth`} render={props => <AuthorMana {...props} />} />
                    <Route path={`${path}/setting`} render={props => <Setting {...props} />} />
                    <Redirect to={`${path}/dataMonitor`} />{/* 无匹配路由，则跳转到 dashboard */}
                  </Switch>
                </Suspense>
              </div>
            </div>
            <footer className={appLess.footer}>Copyright ©2019 三体星际发展银行有限公司</footer>
          </Layout>
        </Layout>
      </Suspense>
    </div>
  );
};


export default App;
