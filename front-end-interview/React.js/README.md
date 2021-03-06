## React.js
### React介绍
- Facebook开源的一个Javascript库
- React结合生态库构成一个MV*框架
- React特点
  - Declarative(声明式编码)
  - Component-Based(组件化编码)
  - 高效-高效的DOM Diff算法 最小化页面重绘
  - 单向数据流
### React脚手架
- 如何安装和使用React脚手架
```
npm install -g create-react-app
create-react-app my-app

cd my-app
npm start
```
- 什么是Yarn
  - Yarn是新一代包管理工具
- 为什么使用Yarn
  - 速度快
  - 安装版本统一、更安全
  - 更简洁的输出
  - 更好的语义化
- 如何使用Yarn
  - yarn init
  - yarn add
  - yarn remove
  - yarn/yarn install
### React生命周期
- React生命周期包含哪些
  - getDefaultProps
  - getInitialState
  - componentWillMount
  - render
  - componentDidMount
  - componentWillReceiveProps
  - shouldComponentUpdate
  - componentWillUpdate
  - componentDidUpdate
  - componentWillUnmount
![img icon](./image/lifecycle.png)
### 说一下对组件化的理解
    - 组件的封装
      - 视图
      - 数据
      - 变化逻辑(数据驱动视图)
    - 组件的复用
      - props传递
      - 复用
### JSX的本质是什么
    - JSX语法
      - html形式
      - 引入JS变量和表达式
      - if...else...
      - 循环
      - style和className
      - 事件
    - JSX解析成JS
      - JSX其实是语法糖
      - 开发环境会将JSX编译成JS代码
      - JSX的写法大大降低了学习成本和编码工作量
      - 同时,JSX也会增加debug的成本
    - 独立的标准
      - JSX是React引入的,但不是React独有的
      - React已经将它作为一个独立标准,其他项目也可用
      - React.createElment是可以自定义修改的
      - 说明:本身功能已经完备;和其他标准兼容和扩展性没问题
### JSX和vdom的关系是什么
    - 为何需要vdom
      - vdom是React初次推广开来,结合JSX
      - JSX就是模板,最终要渲染成html,数据驱动视图
      - 初次渲染 + 修改state后的re-render
      - 正好符合vdom的应用场景
    - 何时patch
      - 初次渲染 - ReactDOM.render(<APP/>, container)
      - 会触发patch(container, vnode)
      - re-render -setState
      - 会触发patch(vnode, newVnode)
    - 自定义组件的解析
      - 'div' - 直接渲染<div>即可,vdom可以做到
      - Input和List,是自定义组件(class), vdom默认不认识
      - 因此Input和List定义的时候必须声明render函数
      - 根据props初始化实例,然后执行实例的render函数
      - render函数返回的还是vnode对象
### setState的过程
    - setState的异步
      - setState为何需要异步
        - 可能一次执行多次setState
        - 无法规定、限制用户如何使用setState
        - 没必要每次setState都重新渲染,考虑性能
        - 即使是每次重新渲染,用户也看不到中间的效果
        - 只看到最后的结果即可
    - vue修改属性也是异步
    - setState的过程
      - 每个组件实例,都有renderComponent方法
      - 执行renderComponent会重新执行实例的render
      - render函数返回newVnode,然后拿到preVnode
      - 执行patch(preVnode, newVnode)
### 阐述自己对React和Vue的认识
    - 两者本质区别
      - vue - 本质是MVVM,由MVC发展而来
      - React - 本质是前端组件化框架,由后端组件化发展而来
    - 看模板和组件化的区别
      - vue -使用模板(最初由angular提出)
      - React - 使用JSX
      - 模板语法倾向于React
      - 模板分离倾向于vue
      - 组件化更倾向于React
    - 两者共同点
      - 都支持组件化
      - 数据驱动视图
### React生命周期
    - React组件有若干钩子函数, 在组件不同的状态执行
      - 初始化周期
      - 组件更新渲染生命周期
      - 组件卸载声明周期

### Fiber架构
#### requestIdleCallback
```
var handle = window.requestIdleCallback(callback[, options])
```