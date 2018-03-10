## virual dom
   - vdom是vue和React的核心
### vdom是什么?为何会存在vdom?
   - vdom
     - 虚拟DOM
     - JS模拟DOM结构
     - DOM变化的对比,放在JS层来做
     - 提高重绘性能
### vdom如何应用,核心API是什么
    - snabbdom
    - 核心API
      - h('<标签名>'， {...属性...}, [...子元素...])
      - h('<标签名>'， {...属性...}, '...')
      - patch(container, vnode)
      - patch(vdom, newVnode)
### diff算法
    - 什么是diff算法
    - 去繁就简
      - diff算法非常复杂,实现难度很大,源码量大
      - 去繁就简,讲明白核心流程,不关心细节
    - vdom为何用diff算法
      - DOM操作是"昂贵"的,因此尽量减少DOM操作
      - 找出本次DOM必须更新的节点来更新,其他的不更新
      - 这个"找出"的过程,就需要diff算法
    - diff算法的实现流程
    diff算法
     - 是linux的基础命令,git中也运用
     - vdom中应用diff算法是为了找出需要更新的节点
     - diff实现patch(container, vnode),patch(vdom, newVnode)