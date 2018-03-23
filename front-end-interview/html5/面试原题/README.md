### doctype的意义是什么 
    - 让浏览器以标准模式渲染
    - 让浏览器知道元素的合法性
### HTML XHTML HTML5的关系
    - HTML属于SGML 新的语义化元素
    - XHTML属于XML,是HTML进行XML严格化的结果
    - HTML5不属于SGML或XML,比XHTML宽松
### HTML5有什么变化
    - 新的语义化元素
    - 表单增强
    - 新的API(离线、音视频、图形、实时通信、本地存储、设备能力)
    - 分类和嵌套变更
### em和i有什么区别
    - em是语义化的标签,表强调
    - i是纯样式的标签,表斜体
    - HTML5中i不推荐使用,一般用作图标
### 语义化的意义
    - 开发者容易理解
    - 机器容易理解结构(搜索、读屏、软件)
    - 有助于SEO
    - seamantic microdata
### 哪些元素可以自闭合
    - 表单元素 input
    - 图片img
    - br hr
    - meta link
### HTML和DOM的关系
    - HTML是"死"的
    - DOM是由HTML解析而来
    - JS可以维护DOM
### property和attribute
    - property是JS对象
    - attribute是标签中的属性
### form的作用有哪些
    - 直接提交表单
    - 使用submit/reset按钮
    - 便于浏览器保存表单
    - 第三方库可以整体提取值
    - 第三方库可以进行表单验证
### HTML5 Web客户端五种离线存储方式
- LocalStorage 
  - Key-Value的简单键值对存储
- Cookie
  - 存储内容有限
- Indexed Database API
  - IndexedDB可以存储结构对象,可构建key和index的索引方式查找,目前各浏览器已经逐渐支持IndexDB的存储方式
- FileSystem API
  - 相当于操作本地文件
- Web SQL Database