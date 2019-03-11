/*
 * @Author: lcs
 * @Date: 2019-01-31 15:11:05
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 19:36:25
 * @Description:
 */

import React, { Component } from 'react';
import { Calendar } from 'antd';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onPanelChange = this.onPanelChange.bind(this);
  }

  onPanelChange(value, mode) {
    console.log(value, mode);
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <div
          style={{ width: 500, border: '1px solid #d9d9d9', borderRadius: 4 }}
        >
          <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
        </div>
      </div>
    );
  }
}

export default Login;
