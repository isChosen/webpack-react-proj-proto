/*
 * @Author: liangchaoshun
 * @Date: 2019-01-28 15:49:12
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 20:10:05
 * @Description: 本地 mock data
 *   数据源： 需要要什么样的数据格式，请在当前目录下的 ./data 目录中新建 json 类型文件，示例如：example1.json
 *   接  口： 在此文件(mockConf.js) 新建 api 接口
 *   多人开发时 mock 数据，此文件必然会冲突，所以，尽量不要动别人的 api，在解决冲突时，选择 "保留双方更改"
 *   【特别注意】：本地 mock 数据，只限 get 请求，如果存在 post 请求，devServer.before 内的 post 将会拦截掉其他 post 请求（代理服务）导致其他
 *    post 请求发生错误。所以，mock 数据时请使用 get 方式
 */

const rank = require('./data/example1.json');
const girls = require('./data/example2.json');
const environData = require('./data/mockEnvirData.json');

const Mock = app => {
  // ---------------  请不要删除示例，自定义接口请写在示例后面  ----------------

  // 示例-1
  app.get('/mock/example1', (req, res) => {
    res.json(rank);
  });

  // post 示例-2
  // 参数在 req.body 中，查询参数 req.query 与 body 字段属同一级
  app.get('/mock/example2', (req, res) => {
    const { query: { name } } = req;
    // console.log('mock name: ', name);
    const result = girls.data.find(el => el.name === name) || null;
    res.json(result);
  });

  // ----------------  自定义 mock 接口，请在下方继续添加 ----------------

  // 检测本地登录状态是否有效
  app.get('/mock/author/certified', (req, res) => {
    const numArr = [3, 4, 6, 8, 9, 10];
    const len = numArr.length;
    const sub = Math.floor(Math.random() * len);
    const random = numArr[sub];
    const bool = true;
    // if (random % 2 === 0) bool = true;
    res.json({ code: 0, access: bool });
  });

  // 获取环境数据
  app.get('/mock/getEnvironData', (req, res) => {
    const { query: { param1, param2 } } = req;
    environData.data.forEach(item => {
      item.param1 = param1;
      item.param2 = param2;
    });
    res.json(environData);
  });
};

module.exports = Mock;
