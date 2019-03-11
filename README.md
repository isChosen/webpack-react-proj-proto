## <span style="font-weight: 600; color: #49a9ee">SCHEMA</span>
- <span style="font-weight: 600; color: #49a9ee">查看 README 方式</span>
  * <code>vscode</code> 打开此文件 -> F1 -> 搜索 markdown -> Markdown: 打开侧边栏预览
- <span style="font-weight: 600; color: #49a9ee">调试 & 构建</span>
  * 命令解释
    * <code>dll:dev</code> 把 React 编译成动态链接库文件，代码没压缩，用于开发调试时，提示/报错信息更友好
    * <code>dll:pro</code> 把 React 编译成动态链接库文件，代码已压缩，用于提交打包发布
    * <code>start</code> 本地开发调试，此命令<span style="color: #d24949">已包含</span> <code>dll:dev</code>
    * <code>start:self</code> 本地开发调试，此命令<span style="color: #d24949">不包含</span> <code>dll:dev</code>
    * <code>build:self</code> 打包构建，打包所得的文件中，代码已压缩，脚本文件名为 <code>chunk-[id]</code>，此命令<span style="color: #d24949">不包含</span> <code>dll:*</code>
    * <code>build:pro</code> 打包构建，打包所得的文件中，代码已压缩，脚本文件名为 <code>chunk-[id]</code>，此命令<span style="color: #d24949">已包含</span> <code>dll:pro</code>
    * <span style="color: #ce8512">* 命令中无 <code>:self</code> 结尾，则表示：该命令每次都执行对应的 dll 命令，即使 dll 文件已存在。</span>
  * 本地调试：
    - 命令：<code style="font-size: 17px; font-weight: 600; color: #f04134;">npm start</code>（<code>start</code> 比较特殊，写法上：<code>npm start</code> 等价于 <code style="font-size: 17px; font-weight: 600; color: #f04134;">npm run start</code> ）
    - <span style="color: #ce8512">如果 dll 文件已存在，建议使用命令 <code>npm run start:self </code></span>
  * 打包代码：
    - <span style="color: #ce8512">用于正式打包发布（测试环境/生产环境/正式环境）</span>
    - 命令：<code style="font-size: 17px; font-weight: 600; color: #f04134;">npm run build</code>
  * <span style="font-size: 16px; font-weight: 600; color: #f04134;">提交注意 提交注意 提交注意</span>
    - 普通 commit：为了清楚地显示待提交的文件列表，普通提交时，不需要提交你本地 <code style="color: #f04134;">/dist</code> 目录及其下的文件，所以需要将 <code>/dist</code> 目录加入了忽略列表；
    - 构建 commit：首先将 <code style="color: #f04134;">/dist</code> 从忽略列表中释放出来，然后执行 <code>npm run build</code> 命令后，连同 <code style="color: #f04134;">/dist</code> 下的所有文件一并提交。提交完后记得将其设置回忽略。
  * SVN 提交时，根目录下的 <span style="font-size: 16px; font-weight: 600; color: #f04134">.idea, .vscode, analysis, cache, dll, package-lock.json, node_modules(recursively)</span> 这些目录或文件不需要提交。设置 <span style="color: #f04134">svn ignore</span> 方法：
    * 右键选中需要忽略的文件/夹，TortoiseSVN > Add to ignore list > 递归或者不递归， 只有 <code>node_modules</code> 需要递归
    * 查看 ignore list：项目根目录右击空白处，TortoiseSVN > Properties，即可看到
    * <span style="font-size: 16px; font-weight: 600; color: #f04134">说明：</span>根目录下 <code>/dll</code> 目录，因其内容是 <code>windows</code> 系统敏感文件，经常会引发项目构建错误，导致不得不用 <code>360 粉碎文件</code> 等特殊处理工具将其删除，删除后再次重新构建运行才能顺利执行任务。所以为了减少同事间协同开发的麻烦，已将根目录下的 <code>/dll</code> 添加到 SVN 忽略列表。但在 <code>/dist</code> 中的 <code>dll</code> 不会被忽略，因为只要 <code>react | react-router</code> 版本不改变，<code>/dist/dll</code> 里的文件的内容就不会有变化，只要文件内容没变化，SVN Git 等版本库就不会将文件推入提交列表。如果 <code>react | react-router</code> 版本有变化，请在 <code>webpack.config.main.build.js</code> 中按照注释操作 <code>plugins -> CopyWebpackPlugin -> dll</code>，再次运行构建命令，做到正确提交对应 <code>react | react-router</code> 版本的 <code>dll</code> 文件
- <span style="font-weight: 600; color: #49a9ee">技术框架</span>
  * <span style="color: #de9f41">webpack@4+</span>
    - 按需加载分割点：<code>react.lazy</code> , 进一步分割点： <code>[common-chunk]</code>
    - 资源路径别名设置：<code>webpack.config.main.base > resolve.alias</code> ，省去 <code>'../../..'</code> 层层翻越查找资源
  * <span style="color: #de9f41">react@16+</span>
    - <code>lazy</code> 配合 <code>Suspense</code>
  * <span style="color: #de9f41">react-router@4+</span>
    - 路由即组件，分散在各个自定义组件中
  * <span style="color: #de9f41">react-redux</span>
    - 数据管理框架，用其中的 <code>connect</code> 方法将组件的 <code>state</code> 和 <code>method</code> 映射成 <code>props</code>
  * <span style="color: #de9f41">react-saga</span>
    - redux 中间件，管理有<span style="color: #f04134">副作用</span>的 <code>action</code>
  * <span style="color: #de9f41">immutable</span>
    - 将 <code>state</code> 转成 <code>immutable</code> 对象，防止开发者无意识修改 <code>state</code>
- <span style="font-weight: 600; color: #49a9ee">目录结构</span>
  * 全局 <code>Store</code> ( <code>src/store</code> )
    - \| - <code>index</code> ：暴露 <code>store</code>，<code>react-redux</code> 利用在项目模块入口文件 ( <code>src/index.jsx</code> ) 中提供的 <code>Provider</code> 将其作为全局引入
    - \| - <code>actionTypes</code> ：全局 <code>action</code> 类型常量，<span style="font-size: 16px; font-weight: 600; color: #f04134;">瘦action胖reducer</span>，所以 <code>redux-saga</code> 中不处理业务，业务逻辑放在 <code>reducer</code> 中处理
    - \| - <code>reducer</code> ：全局 <code>reducer</code> 利用 <code>combineReducers</code> 方法组合分散在每个组件内的 <code>reducer</code>
    - \| - <code>hotelSaga</code> ：全局 <code>Redux-saga</code> ，属于 <code>action</code> 到 <code>store</code> 的中间件。用于处理有副作用 <code>action</code>，本项目目前只作为异步请求处理，详见官网第一句话描述：https://redux-saga.js.org/ ，<code>redux-saga</code> 处理的 <code>action</code> 由其文件中的 <code>Generator</code> 函数：<code>hotelSaga</code> 决定
  * 一个公用文件通常会暴露许多方法（如：methods.js）或常量（如：actionTypes.js），对其引入的方式需考虑：
    - <span style="color: #42a8b5">全部引入方式：<code>import * as objectName from 'path/module'</code></span>
    - <span style="color: #42a8b5">按需引入方式：<code>import { name } from 'path/module'</code></span>
    - <span style="color: #42a8b5">按需引入设置别名：<code>import { name as alias } from 'path/module'</code></span>
    - <span style="color: #42a8b5">按需引入的方式，打包构建时，没使用到的代码会被 <code>webpack</code> 自动 <code>treeshaking</code> 抖落剔除</span>
  * 每个组件中建议只包含如下文件和目录：
    - \| - <code>componentName.jsx</code> ：视情况可拆分为 <span style="color: #ce8512">容器组件</span> 和 <span style="color: #ce8512">UI组件</span>，能用 <span style="color: #ce8512">纯函数</span> 就用纯函数实现
    - \| - <code>componentName.less</code> ：组件的样式，如需修改第三方库的样式，添加 <code>:global</code> 包裹三方样式，注意，其子元素内相同类名的三方样式也会被改写。记住一点：如果有多个相同类名，元素会继承最近父元素类名的样式。书写格式如下：
      ```less
      .usercont {
        min-height: 100px;
        :global(.ant-empty) {
          color: rgba(0, 0, 0, 0.45);
          :global(.ant-empty-image) {
            height: 40px;
          }
        }
      }
      ```
    - \| - <code>reducer.js</code> ：如果当前组件要共享某些数据，则需要建立一个 <code>reducer.js</code> 文件将共享的数据提到全局 <code>store</code> 中，往全局 <code>store</code> 中动态注入 <code>reducer</code> 的操作请参考 <code>axios</code> 拦截器组件 <code>ResponseInterc</code> 路径：<code>src/components/common/interceptor/response</code>
    - \| - <code>[descendant's component directory]</code> ：子组件目录，如果有的话
- <span style="font-weight: 600; color: #49a9ee">npm 依赖</span>
  * <code>css-loader</code> ：不要升级，升级后，样式模块化 <code>CSS Module</code> 会报错
  * <code>babel-plugin-import</code> ：作为 <code>antd</code> 按需加载的依赖包
  * <code>@babel/plugin-syntax-dynamic-import</code> ：给 <code>webpack</code> 动态 <code>import</code> 提供支持
  * <code>@babel/plugin-proposal-async-generator-functions</code> ：支持新语法提案 <code>generator</code> 与 <code>async await</code> 混合
  * <code>@babel/plugin-transform-runtime</code> ：<code>generator</code> 函数运行时
- <span style="font-weight: 600; color: #49a9ee">项目要点</span>
  * 按需加载方案：<code>React.lazy</code> 与 <code>@loadable/component</code> 对比参见：https://www.smooth-code.com/open-source/loadable-components/docs/loadable-vs-react-lazy/ <code>react-loadable</code> 不再推荐使用；
  * <code>React.lazy</code> 目前只支持用于 <code>export / export default</code> 导出的组件，这样能保证 <code>treeshaking</code> 正常使用。对于第三方库的组件和方法，除了三方库本身提供的按需加载方案之外（如：antd），不建议按需加载，采用传统的 <code>import</code> 写法引入即可，本项目的按需加载（<code>React.lazy</code>）用于项目内的自定义组件；
  * <code>Eslint</code> 参考规则及处理方式：
    * <code>Eslint</code> 配置请参见：https://github.com/isChosen/webpack-onDemand-more/blob/master/README.md
    * <code>Eslint Rules</code> 基本规则，请参见官网：https://eslint.org/
    * <code>Eslint React Rules</code> react 规则，请参见：https://github.com/yannickcr/eslint-plugin-react
    * <span style="color: #d24949">注意：遇到 <code>Eslint</code> 报错时，请到以上网站查找原因，如果需要修改规则，请先跟组内同事讨论决定。确定要改的话，在 <code>.eslintrc.js</code> 中修改，务必加上注释，注释格式参考已有注释</span>
  * 进入页面方式，必须登录后才能打开页面，否则重定向回登录页面。即使是粘贴输入 <code>URL</code> ，权限路由 <code>AuthorizedRoute</code> 会发送一个请求验证是否登录有效
  * 输入 <code>URL</code> 打开页面，路径中必须有 <code>app</code> 才允许进入页面，若路径中没有 <code>app</code> 则重定向到 <code>/login</code> 页面。如果路径中在 <code>app</code> 后面的路由路径有误，可自定义跳转页面，如：<code>404</code> ，本项目没指定
  * 本项目中，<span style="color: #d24949">mock data</span> 只适合 <code>GET</code> 请求，因为 <code>POST</code> 被视为修改数据的请求类型，请在项目目录下的 <code>mocks/mockConf.js</code> 中配置，另请查看配置中的注释说明。因 <span style="color: #d24949">mock</span> 的接口权重较高，遇同名接口时会覆盖其他接口请求，项目进展至联调阶段后请修正为真实接口
  * 对于引入 <code>webpack</code> 管辖之外的的样式文件处理方法，如：全局样式 <code>/static/css/reset.css</code> 和 字体图标样式 <code>/static/scc/iconfont.css</code> ，通过在模板 <code>/tmpl/index.*.html</code> 中添加 <code>\<link \/\></code> 标签静态引入。但要注意的是，生产环境的模板 <code>/tmpl/index.pro.html</code> 引入的是 <span style="color: #d24949">压缩后的样式文件 <code>\*.min.css</code></span> 。所以针对外部样式文件，如：在 <code>/static/css/</code> 目录下必须保证样式文件 <code>\*.css</code> 有一份对应的压缩文件 <code>\*.min.css</code> 。生成对应的样式压缩文件的方法是：添加 <span style="color: #d24949">minify</span> 扩展插件，然后 <span style="color: #42a8b5">打开未压缩的样式文件 -> 搜索 Minify -> 点击</span> 就会在同目录下生成一个对应的同名压缩文件 <code>\*.min.css</code> ，样式文件如有改动，需重新压缩以得到最新的压缩文件
  * <span style="font-size: 16px; font-weight: 600; color: #d24949">关于引入 Redux 和 Redux-saga 的考虑</span>
    - 如果全部严格按照 <code>Redux</code> 的写法来开展项目，势必会增加很多没必要的麻烦（每次改变 state 都要派发 action，每个请求都要经过 Redux-saga），为了省去这些麻烦，所以本项目做如下处理：
      - <code>Redux</code> 只用于处理 <span style="color: #d24949">将某些组件需要共享的数据存放在 <code>store</code> 中的操作</span> 例如 <code>Sidebar</code> 组件的选项卡需要共享，因为头部组件会用到
      - <code>Redux-saga</code> 只用于发送请求且这个请求必须要阻塞整个项目的进程，如权限路由组件，其原理是利用 <code>Generator</code> 函数
      - 随着项目的推移可能会变得越来越大，初始化的 <code>reducer</code> 会在初始加载应用时消耗太多内存，所以本项目采用了 <span style="font-weight: 600; color: #d24949">动态注入Reducer</span> 的方案，例如 <span style="color: #d24949">ResponseInterc</span> 和 <span style="color: #d24949">Sidebar</span> 组件
## <span style="font-weight: 600; color: #f04134">ISSUES</span>
<span style="font-size: 16px; color: #d24949">1. react-router 4.x，正常写法时报 warnings，如下：</span>
```html
<Route path="/" exact component="{Home}" />
<Route path="/product" component="{Product}" />
<Route path="/about" component="{About}" />
<Route path="/login" component="{Login}" />
```
```javascript
Warning: Failed prop type: Invalid prop `component` of type `object` supplied to `Route`, expected `function`.
  in Route (created by App)
  in App
  in Router (created by BrowserRouter)
  in BrowserRouter
```
- <span style="font-size: 15px; color: #57a957">Solution</span>
  * 解决办法参见 github issue：https://github.com/ReactTraining/react-router/issues/6420
  * <code>component</code> 可以换成 <code>render</code> 两者的区别：
    * <code>component</code> 会强制刷新其下的子组件，不管子组件的 <code>shouldComponentUpdate</code> 是否 <code>return false</code>
    * <code>render</code> 表现正常，刷不刷新子组件由 <code>shouldComponentUpdate</code> 返回结果决定，建议使用 <code>render</code>
  * 将其写成如下格式，即可 fix warning，如下：
    ````html
    <Route path="/" exact component={props => <Home {...props} />} />
    <Route path="/product" component={props => <Product {...props} />} />
    <Route path="/about" component={props => <About {...props} />} />
    <Route path="/login" component={props => <Login {...props} />} />
    ````
<span style="font-size: 16px; color: #d24949">2. react-router 4.x 刷新内嵌路由的页面报错，而刷新顶级路由没问题
- <span style="font-size: 15px; color: #57a957">Solution</span>
  * 把 <code>BrowserRouter</code> 换成 <code>HashRouter</code> 即可， 参见：https://blog.csdn.net/zwkkkk1/article/details/83411071

<span style="font-size: 16px; color: #d24949">3. Switch 布置路由的地方，如果没有设置 <code>Suspense</code> 会报错，即使上上...级有 <code>Suspense</code> 依然报错，报错信息如下：
````css
Unable to find node on an unmounted component
````
- <span style="font-size: 15px; color: #57a957">Solution</span>
  * 将 <code>Switch</code> 标签作为直接子元素嵌套于 <code>Suspense</code> 标签内即可
