/*
 * @Author: liangchaoshun
 * @Date: 2019-03-08 12:39:14
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-08 13:44:27
 * @Description: DataMonitor
 */

import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Spin, Icon } from 'antd';
import Dashboard from './dashboard/Dashboard'; // 默认视图不需要 异步加载

const BodySign = lazy(() => import(/* webpackChunkName: "chunk-bodySign" */ './bodySign/BodySign'));
const SleepData = lazy(() => import(/* webpackChunkName: "chunk-sleepData" */ './sleepData/SleepData'));
const EnvironData = lazy(() => import(/* webpackChunkName: "chunk-environData" */ './environData/EnvironData'));

const DataMonitor = props => {
  // eslint-disable-next-line react/prop-types
  const { match: { path } } = props;
  return (
    <Fragment>
      <Suspense fallback={<Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}>
        <Switch>
          <Redirect exact from={`${path}`} to={`${path}/dashboard`} />
          <Route path={`${path}/dashboard`} render={props => <Dashboard {...props} />} />
          <Route path={`${path}/bodySign`} render={props => <BodySign {...props} />} />
          <Route path={`${path}/sleepData`} render={props => <SleepData {...props} />} />
          <Route path={`${path}/environData`} render={props => <EnvironData {...props} />} />
          <Redirect to={`${path}/dashboard`} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default DataMonitor;
