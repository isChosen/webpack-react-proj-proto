import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import logo from '__ImagesPath__/logo.png';
import headerLess from './header.less';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      a: false
    };
  }

  render() {
    return (
      <div className={headerLess.container}>
        <div className={headerLess.logo}>
          <NavLink to="/app"><img alt="c-life" src={logo} /></NavLink>
        </div>
        <div className={headerLess.title}>三体万航管理平台</div>
        <div lg={{ span: 9 }} xl={{ span: 10 }} xxl={{ span: 14 }} />
        <div className={headerLess.logout}>
          <span className={headerLess.logoutTxt}>注销</span>
          <span className={headerLess.logoutIcon} />
        </div>
        <div className={headerLess.accountInfo}>
          <Avatar icon="user" />
          <span className={headerLess.accountTxt}>273919002@qq.com</span>
          <div className={headerLess.separator} />
        </div>
        <div className={headerLess.hotelInfo}>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">三体万航星际大酒店 <Icon type="caret-down" /></a>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
