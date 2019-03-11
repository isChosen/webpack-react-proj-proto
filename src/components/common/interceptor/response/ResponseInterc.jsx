/*
 * @Author: liangchaoshun
 * @Date: 2019-2-25 13:42:25
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 14:55:18
 * @Description: ResponseInterc Page
 */

import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { GOTO_LOGIN } from '__StorePath__/actionTypes';
import store, { injectReducer } from '__StorePath__';
import { reducer } from './reducer';

// 动态注入该组件的 reducer
injectReducer(store, { key: 'responseInterc', reducer });

class ResponseInterc extends Component {
  componentDidUpdate() {
    const { showReLoginModal, goToLoginPage } = this.props;
    if (showReLoginModal) {
      Modal.error({
        title: '登录失效，请重新登录',
        width: 300,
        centered: true,
        okText: '确定',
        onOk() {
          console.log('reLoginConfirm called');
          goToLoginPage(true, false); // 转到 login 页面，同时不再弹出 “重新登录” 模态框
        }
      });
    }
  }

  render() {
    const { gotoLogin } = this.props;
    return (
      <Fragment>
        <h4 style={{ display: 'none' }}>Response Interceptor</h4>
        { gotoLogin && <Redirect to="/login" /> }
      </Fragment>
    );
  }
}

// 设置属性类型
ResponseInterc.propTypes = {
  gotoLogin: PropTypes.bool,
  showReLoginModal: PropTypes.bool,
  goToLoginPage: PropTypes.func.isRequired
};

// 设置属性默认值(！注意：若属性设置了 isRequired，就不用设置默认值, 且其属性值不能是 null)
ResponseInterc.defaultProps = {
  showReLoginModal: false,
  gotoLogin: false
};

// 映射 state 成 prop
const mapStateToProps = state => ({
  gotoLogin: state.getIn(['responseInterc', 'gotoLogin']),
  showReLoginModal: state.getIn(['responseInterc', 'showReLoginModal'])
});

const mapDispathToProps = dispatch => ({
  goToLoginPage(isGotoLogin, showReLoginModal) {
    dispatch({
      type: GOTO_LOGIN,
      isGotoLogin,
      showReLoginModal
    });
  }
});


export default connect(mapStateToProps, mapDispathToProps)(ResponseInterc);
