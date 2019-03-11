/*
 * @Author: liangchaoshun
 * @Date: 2019-03-08 12:39:14
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-08 14:18:10
 * @Description: GuestManage
 */

import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Spin, Icon } from 'antd';
import GuestList from './guestList/GuestList'; // 默认视图，不需要异步加载

const GuestBehavior = lazy(() => import(/* webpackChunkName: "chunk-guestBahavior" */ './guestBehavior/GuestBehavior'));

const GuestManage = props => {
  // eslint-disable-next-line react/prop-types
  const { match: { path } } = props;
  return (
    <Fragment>
      <Suspense fallback={<Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}>
        <Switch>
          <Redirect exact from={`${path}`} to={`${path}/guestList`} />
          <Route path={`${path}/guestList`} render={props => <GuestList {...props} />} />
          <Route path={`${path}/guestBehavior`} render={props => <GuestBehavior {...props} />} />
          <Redirect to={`${path}/guestList`} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default GuestManage;
