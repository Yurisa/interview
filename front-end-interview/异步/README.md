## 异步
### 什么是单线程,和异步有什么关系
    - 单线程-只有一个线程,只能做一件事,同一时间只能做一件事情
    - 原因-避免DOM渲染的冲突
    - 解决方案 异步是一种无奈的解决方案,虽然有很多问题
    - 单线程原因 - 避免DOM渲染冲突
      - 浏览器需要渲染DOM
      - JS可以修改DOM结构
      - JS执行的时候,浏览器DOM渲染会暂停
      - 两段JS也不能同时执行(都修改DOM就冲突了)
      - webworker支持多线程,但是不能访问DOM
### 什么是event-loop
    - 事件轮询,js实现异步的具体解决方案
    - 同步代码,直接执行
    - 异步函数先放在异步队列中
    - 待同步函数执行完毕,轮询执行异步队列的函数
### 是否用过jQuery的Defferred
    - 使用jQuery Defferred
      - jQuery1.5的变化
      - 无法改变JS异步和单线程的本质
      - 只能从写法上杜绝callback这种形式
      - 它是一种语法糖形式,但是解耦了代码
      - 开放封闭原则
    - 总结:dtd的API可分为两类,用意不同
    - 第一类:dtd.resolve dtd.reject
    - 第二类:dtd.then dtd.done dtd.fail
    - 初步引入Promise概念
### Promise的基本使用和原理
    - 基本语法回顾
    - 异常捕获
    - 多个串联
    - Promise.all和Promise.race
    - Promise标准
### 介绍一下async/await和Promise的区别和联系
### 总结一下当前的JS解决异步的方案