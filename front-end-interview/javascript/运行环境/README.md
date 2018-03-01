## 运行环境
- 页面加载过程
- 性能优化
- 安全性
## 页面加载过程
### 输入url到得到html的详细过程
### window.onload和DOMContentLoaded的区别
   - window.onload页面全部资源加载完才会执行,包括图片、视频等
   - DOMContentLoaded DOM渲染即可执行,此时图片、视频可能还未加载完
- 加载资源的形式
  - 输入url(或跳转页面)加载html
  - 加载html中的静态资源
- 加载一个资源的过程
  - 浏览器根据DNS服务器得到域名的IP地址
  - 向这个IP的服务器发送http请求
  - 服务器收到、处理并返回http请求
  - 浏览器得到返回内容
- 浏览器渲染页面的过程
  - 根据html结构生成DOM Tree
  - 根据CSS生成CSSOM
  - 将DOM和CSSOM整合成RenderTree
  - 浏览器根据RenderTree开始渲染和展示
  - 遇到<script>时,会执行并阻塞渲染
## 性能优化
- 原则
   - 多使用内存与缓存或其他方法
   - 减少CPU计算、减少网络
   - 减少硬盘的读写