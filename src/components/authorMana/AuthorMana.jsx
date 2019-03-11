/*
 * @Author: liangchaoshun
 * @Date: 2019-03-08 12:39:14
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-08 14:41:26
 * @Description: DataMonitor
 */

import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Spin, Icon } from 'antd';
import PersonalInfo from './personlInfo/PersonalInfo'; // 默认视图不需要 异步加载

const RoleMana = lazy(() => import(/* webpackChunkName: "chunk-roleMana" */ './roleMana/RoleMana'));
const AccountMana = lazy(() => import(/* webpackChunkName: "chunk-accountMana" */ './accountMana/AccountMana'));
const HotelInfoMana = lazy(() => import(/* webpackChunkName: "chunk-hotelInfoMana" */ './hotelInfoMana/HotelInfoMana'));

const DataMonitor = props => {
  // eslint-disable-next-line react/prop-types
  const { match: { path } } = props;
  return (
    <Fragment>
      <Suspense fallback={<Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}>
        <Switch>
          <Redirect exact from={`${path}`} to={`${path}/PersonalInfo`} />
          <Route path={`${path}/personalInfo`} render={props => <PersonalInfo {...props} />} />
          <Route path={`${path}/roleMana`} render={props => <RoleMana {...props} />} />
          <Route path={`${path}/accountMana`} render={props => <AccountMana {...props} />} />
          <Route path={`${path}/hotelInfoMana`} render={props => <HotelInfoMana {...props} />} />
          <Redirect to={`${path}/personalInfo`} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default DataMonitor;
