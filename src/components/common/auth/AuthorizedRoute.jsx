/*
 * @Author: liangchaoshun
 * @Date: 2019-02-21 11:23:48
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 18:03:16
 * @Description: Authorized Route
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CHECK_LOGINED_STATUS, SET_LOGINED_PENDING } from '__StorePath__/actionTypes';

class AuthorizedRoute extends Component {
  componentWillMount() {
    const { ckeckLogined } = this.props;
    ckeckLogined();
  }

  // 注销登录后，appPending 设置回 true
  componentWillUnmount() {
    const { setPending } = this.props;
    setPending();
  }

  render() {
    const { component: Component, appPending, appLogged, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (appPending) return <div style={{ textAlign: 'center', marginTop: 10 }}>应用加载中，请稍候...</div>;
          return (appLogged ? <Component {...props} /> : <Redirect to="/login" />);
        }}
      />
    );
  }
}

// 设置属性类型
AuthorizedRoute.propTypes = {
  appPending: PropTypes.bool,
  appLogged: PropTypes.bool,
  component: PropTypes.PropTypes.func.isRequired,
  setPending: PropTypes.func.isRequired,
  ckeckLogined: PropTypes.func.isRequired
};

// 设置属性默认值
AuthorizedRoute.defaultProps = {
  appPending: true,
  appLogged: false
};

// 映射 state 成 prop
const stateToProps = state => ({
  appLogged: state.getIn(['init', 'appLogged']),
  appPending: state.getIn(['init', 'appPending'])
});

// 映射 methods 成 prop
const mapDispathToProps = dispatch => ({
  ckeckLogined() {
    dispatch({ type: CHECK_LOGINED_STATUS });
  },
  setPending() {
    dispatch({ type: SET_LOGINED_PENDING, appPending: true });
  }
});

export default connect(stateToProps, mapDispathToProps)(AuthorizedRoute);
