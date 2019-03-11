/*
 * @Author: liangchaoshun
 * @Date: 2019-3-8 13:41:32
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 19:55:03
 * @Description: EnvironData
 */

import React, { Component } from 'react';
import { fetchEnvironData } from '__Utils__/request';

class EnvironData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      environData: null
    };
  }

  async componentDidMount() {
    const environData = await fetchEnvironData('参数1', '参数2');
    const { data } = environData;
    this.setState(() => ({
      environData: data
    }));
  }

  // 交互获取数据
  async fetchEData(argv1, argv2) {
    const environData = await fetchEnvironData(argv1, argv2);
    const { data } = environData;
    this.setState(() => ({
      environData: data
    }));
  }

  render() {
    const { environData } = this.state;
    return (
      <div>
        <h4 style={{ color: '#fff' }}>环境数据</h4>;
        <button type="button" onClick={this.fetchEData.bind(this, 'btn-param1', 'btn-param2')}>获取环境参数2</button>
        <br />
        <div
          style={{
            padding: 20,
            color: '#0ff',
            textAlign: 'center',
            border: '1px solid #f00'
          }}
        >
          {
            environData && environData.map(item => (
              <p key={item.id}>
                <span>{item.name}: {item.label} {item.data}{item.unit} - 参数：{item.param1} / {item.param2}</span>
              </p>
            ))
          }
        </div>
      </div>
    );
  }
}

export default EnvironData;
