## react-router
### react-router 和 react-router-dom理解
- 4.0版本中已不需要路由配置, 一切皆组件
- react-router:提供了一些router的核心api
- react-router-dom: 提供了BrowserRouter, HashRouter, Route, Link, NavLink

### react-router-dom核心用法
- HashRouter和BrowserRouter
  - http://localhosy:3000/#/admin/buttons
  - http://localhosy:3000/admin/buttons
- Route: path、exact(精准匹配)、component、render
- NavLink、Link
  - Link
    - {pathname: '/', search: '', hash:'', key:'', state:{}}
- Switch
  - 防止多重加载
- Redirect
  - 路由重定向: <Redirect to="/admin/home"/>
  