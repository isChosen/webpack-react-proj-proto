/*
 * @Author: liangchaoshun
 * @Date: 2019-03-08 12:39:14
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-08 14:13:34
 * @Description: RoomManage
 */

import React, { Suspense, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Spin, Icon } from 'antd';
import RoomList from './roomList/RoomList'; // 默认视图，不需要异步加载

const RoomManage = props => {
  // eslint-disable-next-line react/prop-types
  const { match: { path } } = props;
  return (
    <Fragment>
      <Suspense fallback={<Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}>
        <Switch>
          <Redirect exact from={`${path}`} to={`${path}/roomList`} />
          <Route path={`${path}/roomList`} render={props => <RoomList {...props} />} />
          <Redirect to={`${path}/roomList`} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default RoomManage;
