/*
 * @Author: liangchaoshun
 * @Date: 2019-03-08 12:39:14
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-08 14:38:51
 * @Description: Setting
 */

import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Spin, Icon } from 'antd';
import FAQ from './faq/FAQ'; // 默认视图，不需要异步加载

const Log = lazy(() => import(/* webpackChunkName: "chunk-log" */ './log/Log'));
const Greeting = lazy(() => import(/* webpackChunkName: "chunk-greeting" */ './greeting/Greeting'));

const Setting = props => {
  // eslint-disable-next-line react/prop-types
  const { match: { path } } = props;
  return (
    <Fragment>
      <Suspense fallback={<Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}>
        <Switch>
          <Redirect exact from={`${path}`} to={`${path}/faq`} />
          <Route path={`${path}/faq`} render={props => <FAQ {...props} />} />
          <Route path={`${path}/logMana`} render={props => <Log {...props} />} />
          <Route path={`${path}/greeting`} render={props => <Greeting {...props} />} />
          <Redirect to={`${path}/faq`} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default Setting;
