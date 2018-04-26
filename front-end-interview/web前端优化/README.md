## web前端优化
### 资源的合并与压缩
- 减少http请求数量
- 减少请求资源大小
  - html压缩 
    - html代码压缩就是压缩这些在文本文件中有意义, 但是在html中不显示的字符,包括空格, 制表符, 换行符等,还有一些其他意义的字符, 如hml注释也可以被压缩
    #### 方式
    - 1.使用在线网站进行压缩
    - 2.nodejs提供的html-minifier工具
    - 3.后端模板引擎渲染压缩
  - css压缩
    - 无效代码删除
    - css语义合并
    #### 方式
    - 1.使用在线网站进行压缩
    - 2.nodejs提供的html-minifier工具
    - 3.使用clean-css对css进行压缩
  - js的压缩和混乱
    - 无效字符的删除
    - 剔除注释
    - 代码语义的缩减和优化
    - 代码保护
    #### 方式
    - 1.使用在线网站进行压缩
    - 2.nodejs提供的html-minifier工具
    - 3.使用uglyfyjs2对js 进行压缩
  - 文件合并
    #### 文件合并存在的问题:
         - 首屏渲染问题
         - 缓存失效问题
    #### 解决方法
         - 公共库合并
         - 不同页面的合并
         - 见机行事,随机应变
    #### 方式
         - 使用在线网站进行文件合并
         - 使用nodejs实现文件合并
  - 开启gzip
### 图片
    - jpg有损压缩, 压缩率高,不支持透明
    - png支持透明, 浏览器兼容好
    - webp压缩程度更好, 在ios webview有兼容性问题
    - svg矢量图, 代码内嵌, 相对较小, 图片样式相对简单的场景
#### 不同格式图片常用的业务场景
     - jpg ———— 大部分不需要透明图片的业务场景
     - png ———— 大部分需要透明图片的业务场景
     - webp ———— 安卓全部
     - svg矢量图 ———— 图片样式相对简单的业务场景
#### 方式
##### 减少http请求数量
     - 雪碧图
     - Image inline base64的方式将图片内容内嵌到html
     - 使用矢量图 使用SVG进行矢量图的绘制 使用iconfont解决icon问题
### 懒加载和预加载的原理
#### 懒加载
    - 图片进入可视区域之后请求图片资源
    - 对于电商等图片很多, 页面很长的业务场景适用
    - 减少无效资源的加载
    - 并发加载的资源过多会阻塞js的加载, 影响网站的正常使用
#### 预加载
    - 图片等静态资源在使用之前的提前请求
    - 资源使用到时能从缓存中加载, 提升用户体验
    - 页面展示的依赖关系维护
### 重绘与回流
#### 回流
    - 当render tree的一部分(或全部)因为元素的规模尺寸, 布局, 隐藏等改变而需要重新构建。这就称为回流(reflow)
    - 当页面布局和几何属性改变时就需要回流
#### 重绘
    - 当render tree的一些属性需要更新属性, 而这些属性只是影响元素的外观, 风格, 而不会影响布局的, 比如background-color。 就称为重绘
#### 总结
    - 回流一定会引起重绘, 重绘不一定引起回流
#### 触发页面重布局的属性
     - 盒子模型相关属性会触发重布局
     - 定位属性及浮动也会触发重布局
     - 改变节点内部文字结构也会触发重布局
#### Chrome 创建图层的条件
     - 1.3D或透视变换CSS属性
     - 2.使用加速视频解码的<video>节点
     - 3.拥有3D(WebGL)上下文或加速的2D上下文的<canvas>节点
     - 4.混合插件(如Flash)
     - 5.对自己的opacity做CSS动画或使用一个动画webkit变换的元素
     - 6.拥有加速CSS过滤器的元素
     - 7.元素有一个包含复合层的后代节点(一个元素拥有一个子元素, 该子元素在自己的层里)
     - 8.元素有一个z-index较低且包含一个复合层的兄弟节点(换句话说就是该元素在复合层上面渲染)
### 浏览器存储机制
#### Cookie
     - 因为HTTP请求无状态, 所以需要cookie去维持客户端状态
     - cookie的生成方式:http response header中的set-cookie
     - js中可以通过document.cookie可以读写cookie
     - 用于浏览器端和服务端的交互
     - 客户端自身数据的存储
     - expire
     - httponly 设置不支持js读写
##### cookie存储的限制
     - 作为浏览器存储, 大小4KB左右
     - 需要设置过期时间expire
##### cookie中在相关域名下面 —— cdn的流量的损耗
     - 解决方法:cdn的域名和主站的域名要分开
#### IndexedDB
    - IndexedDB是一种低级API, 用于客户端存储大量结构化数据。该API使用索引来实现对该数据的高性能搜索。虽然Web Storage对于存储少量的数据很有用, 但对于存储结构化数据来说, 这种方法不太有用。IndexedDB提供了一个解决方案。
    - 为应用创建离线版本
#### Service Workers产生的意义
#### PWA
    - PWA(Progressive Web Apps)是一种Web App 新模型, 并不是具体指某一种前沿的技术或者某一单一的知识点, 我们从英文缩写来看就能看出来, 这是一个渐进式的Web App, 是通过一系列新的Web特性, 配合优秀的UI交互设计,逐步增强WebApp的用户体验
    - 可靠:在没有网络的环境下也能提供基本的页面访问,而不会出现"未连接到互联网"的页面
    - 快速:针对网页渲染及网络数据访问有较好优化。
    - 融入(Engaging):应用可以被增加到手机桌面,并且和普通应用一样有全屏、推送等特性。
#### Service Worker
    - Service Worker是一个脚本,浏览器独立于当前网页, 将其在后台运行, 为实现一些不依赖页面或者用户交互的特性打开了一扇大门。在未来这些特性将包括推送消息,背景后台同步,geofencing(地理围栏定位), 但它将推出的第一个首要特性, 就是拦截和处理网络请求的能力, 包括以编程方式来管理被缓存的响应。
### 缓存
#### httpheader
##### Cache-Control
      - max-age ——— 优先级高于expires, 从浏览器缓存读取
      - s-maxage ——— 优先级高于max-age,比如CDN, 对于public相关的缓存设备
      - private
      - public
      - no-cache ———  告诉浏览器、缓存服务器，不管本地副本是否过期，使用资源副本前，一定要到源服务器进行副本有效性校验。
      - no-store ——— 完全不会使用任何缓存策略
##### Expires
     - 缓存过期时间, 用来指定资源到期的时间, 是服务器端的具体的时间点。
     - 告诉浏览器在过期时间前浏览器可以直接从缓存中取数据, 而无需再次请求
##### Last-Modified/If-Modified-Since
     - 基于客户端和服务端协商的缓存机制
     - last-modified ——— response header
     - if-modified-since ——— request header
     - 需要与cache-control共同使用 ——— max-age优先级较高
###### 缺点
     - 1.某些服务器不能获取精确的修改时间
     - 2. 文件修改时间改了, 但文件内容却没有更改
##### Etag/If-None-Match
     - 文件内容的hash值
     - etag ——— response header
     - if-none-match ——— request header
     - 需要与cache-control共同使用
### Vue-SSR
#### 多层次的优化方案
    - 构建层模板编译
    - 数据无关的prerender
    - 服务端渲染
### documentFragment和requestAnimationFrame
#### 我们经常用setInterval来实现动画，其实这种做法不是太好，因为不同浏览器的刷新频率也不一样（一般认为设置16为最佳,按每秒60帧算，1000/60≈16.67）
```
var dis = 0,timer = 0;
clearInterval(timer);
timer = setInterval(function(){
   div.style.left = ++dis;
　　if(dis>=50) clearInterval(timer)
},16)
```
#### 实现js动画最好的是requestAnimationFrame:
#### requestAnimationFrame 比起 setTimeout、setInterval的优势主要有两点：
- 1、requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
- 2、在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。
####一次性加载几万条数据，要求不卡住界面

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <ul>控件</ul>
  <script>
    setTimeout(() => {
      // 插入十万条数据
      const total = 100000
      // 一次插入 20 条，如果觉得性能不好就减少
      const once = 20
      // 渲染数据总共需要几次
      const loopCount = total / once
      let countOfRender = 0
      let ul = document.querySelector("ul");
      function add() {
        // 优化性能，插入不会造成回流
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < once; i++) {
          const li = document.createElement("li");
          li.innerText = Math.floor(Math.random() * total);
          fragment.appendChild(li);
        }
        ul.appendChild(fragment);
        countOfRender += 1;
        loop();
      }
      function loop() {
        if (countOfRender < loopCount) {
          window.requestAnimationFrame(add);
        }
      }
      loop();
    }, 0);
  </script>
</body>
</html>

```