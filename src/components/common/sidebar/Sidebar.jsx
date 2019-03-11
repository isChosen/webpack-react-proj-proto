/*
 * @Author: liangchaoshun
 * @Date: 2019-03-04 10:00:35
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 18:37:37
 * @Description: Sidebar Component
 */

import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';
import { Layout, Menu, Icon } from 'antd';
import { FETCH_SIDEBAR_INIT_DATA } from '__StorePath__/actionTypes';
import store, { injectReducer } from '__StorePath__';
import { reducer } from './reducer';
import sidebarLess from './sidebar.less';

// 动态注入该组件的 reducer
injectReducer(store, { key: 'sidebar', reducer });

const { SubMenu } = Menu;
const { Sider } = Layout;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      openKeys: [], // 侧边栏：当前展开的选项卡
      selectedKeys: [], // 侧边栏：当前选中的子选项卡
      collapsedStyle: { right: '50%', marginRight: '-8px' }
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { fetchSidebarData, location: { pathname } } = this.props;
    fetchSidebarData();
    const { 3: subMenu } = pathname.split('/');
    this.setState(() => ({ selectedKeys: [subMenu] }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(_isEqual(this.props, nextProps) && _isEqual(this.state, nextState));
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/prop-types
    const { location: { pathname: prevPathname } } = prevProps;
    // eslint-disable-next-line react/prop-types
    const { location: { pathname } } = this.props;
    if (prevPathname !== pathname) {
      const { 3: subMenu } = pathname.split('/');
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(() => ({ selectedKeys: [subMenu] }));
    }
  }

  // 更改展开的菜单项
  onOpenChange(openKeys) {
    const { sidebarRootkeys } = this.props;
    const { openKeys: openKeysArr } = this.state;
    const latestOpenKey = openKeys.find(key => openKeysArr.indexOf(key) === -1);
    if (sidebarRootkeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  }

  // 侧边栏：切换隐藏显示
  toggleSidebar(prevCollapsed) {
    // eslint-disable-next-line react/prop-types
    const { location: { pathname } } = this.props;
    const { 2: menu, 3: subMenu } = pathname.split('/');
    this.setState(() => ({
      collapsed: !prevCollapsed,
      selectedKeys: [subMenu],
      openKeys: prevCollapsed ? [menu] : [],
      collapsedStyle: prevCollapsed ? {} : { right: '50%', marginRight: '-8px' }
    }));
  }

  render() {
    const {
      openKeys,
      collapsed,
      selectedKeys,
      collapsedStyle
    } = this.state;
    const { sidebarInitData } = this.props;
    return (
      <Sider
        width={170}
        collapsible
        trigger={null}
        collapsed={collapsed}
      >
        <div className={sidebarLess.separator} />
        <div className={sidebarLess.triggerBtn}>
          <Icon
            className="trigger"
            style={collapsedStyle}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggleSidebar.bind(this, collapsed)}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={this.onOpenChange.bind(this)}
        >
          {
            sidebarInitData.map(item => (
              <SubMenu
                key={item.alias}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                  </span>
                }
              >
                {item.childList
                  && item.childList.length > 0
                  && item.childList.map(subItem => (
                    <Menu.Item key={subItem.alias}><NavLink to={subItem.to}>{subItem.name}</NavLink></Menu.Item>
                  ))}
              </SubMenu>
            ))
          }
        </Menu>
      </Sider>
    );
  }
}

// 设置属性类型
Sidebar.propTypes = {
  sidebarRootkeys: PropTypes.array.isRequired,
  fetchSidebarData: PropTypes.func.isRequired,
  sidebarInitData: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  sidebarInitData: state.getIn(['sidebar', 'sidebarInitData']).toJS(),
  sidebarRootkeys: state.getIn(['sidebar', 'sidebarRootkeys']).toArray()
});

const mapDispathToProps = dispatch => ({
  fetchSidebarData(type) {
    dispatch({ type: FETCH_SIDEBAR_INIT_DATA, init: true });
  }
});

export default withRouter(connect(
  mapStateToProps,
  mapDispathToProps
)(Sidebar));
