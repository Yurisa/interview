# JS-WEB-API
##  DOM操作
### DOM是哪种基本数据结构
    - 树
### DOM操作的常用API有哪些
    - 获取DOM节点,以及节点的property和Attribute
    - 获取父节点,获取子节点
    - 新增节点,删除节点
### DOM节点的attr和property有何区别
    - property只是一个JS对象属性的修改
    - Attribute是对html标签属性的修改
- DOM本质
  - 浏览器把拿到的html代码,结构化一个浏览器能识别并且js可操作性的一个模型而已。
- DOM节点操作
  - 获取DOM节点
  - prototype
  - Attribute
- DOM结构操作
  - 新增节点
    ```
    var div1 = document.getElementById('div1')
    //添加新节点
    var p1= document.createElement('p')
    p1.innerHTML = "this is p"
    div1.appendChild(p1)
    //移动已有节点
    var p2 = document.getElementById('p2') 
    div1.appendChild(p2)
    ```
  - 获取父元素
  - 获取子元素
  - 删除节点
  ```
    var div1 = document.getElementById('div1')
    var parent = div1.parentNode
    console.log(parent)
    var child = div1.childNodes
    console.log(child)
    div1.removeChild(child[0])
  ```
  ## BOM操作
  ### 如何检测浏览器类型
  ### 拆解url各部分
  - navigator
    ```
    //navigator
    var ua = navigator.userAgent
    var isChrome = ua.indexOf('Chrome)
    console.log(isChrome)
    ```
  - screen
    ```
    console.log(screen.width)
    console.log(screen.height)
    ```
  - location
    ```
    console.log(location.href)
    console.log(location.protocol) //'http':'https'
    console.log(location.host) 
    console.log(location.pathname) // 'learn/199' 
    console.log(location.search)
    console.log(location.hash)
    ```
  - history
    ```
    history.back()
    history.forward()
    ```

## 事件
### 编写一个通用的事件监听函数
    ```
    function bindEvent(elem, type, fn, selector, fn){
        if(fn === null){
        	fn = selector
        	selector = null
        }
        elem.addEventListener(type, function(e){
        	var target
        	if(selector){
        		target = e.target
        		if(target.matches(selector)){
        			fn.call(target, e)
        		}
        	}else{
        		fn(e)
        	}
        })
     }

     bindEvent(div1, 'click', 'a', function(e){
         console.log(this.innerHTML)
     }),
    e.preventDefault()  //阻止默认行为
    ```
### 描述事件冒泡流程
    - DOM树形结构
    - 事件冒泡
    - 阻止冒泡
    - 冒泡的应用
### 对于一个无限下拉加载图片的页面,如何给每个图片绑定事件
- 通用事件绑定
  - IE低版本使用attachEvent绑定事件,和W3C标准不一样
- 事件冒泡
```
     var p1 = document.getElementById('p1')
     var body = document.body
     bindEvent(p1,'click', function(e){
     	e.stopPropagation()
     	alert('激活')
     }, false)
     bindEvent(body, 'click', function(e){
     	alert('取消')
     }, true)
     bindEvent(body, 'click', function(e){
     	alert('hahahahh')
     }, false)
     function bindEvent(elem, type, fn, useCaptrue){
        elem.addEventListener(type, fn, useCaptrue)
     }
```
- 代理
```
var div1 = document.getElementById('div1')
     div1.addEventListener('click', function(e){
     	var target = e.target
     	if (target.nodeName === 'A') {
     		alert(target.innerHTML)
     	}
     })
```

## Ajax-XMLHttpRequest
### 手动编写一个ajax,不依赖第三方库
```
var xhr = new XMLHttpRequest()
xhr.open("GET", "/api", false)
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		if(xhr.status == 200){
			alert(xhr.responseText)
		}
	}
}
xhr.send(null)
```
### 跨域的几种实现方式
- XMLHttpRequest
- 状态码说明
  - readyState
    - 0 (未初始化)还没有初始化
    - 1 (载入)已调用send()正在发送请求
    - 2 (载入完成)send()方法执行完成,已经接收到全部响应
    - 3 (交互)正在解析响应内容
    - 4 (完成)响应内容解析完成可以在客户端使用
  - status
    - 2xx 表示成功处理请求,如200
    - 3xx 需要重定向,浏览器直接跳转
    - 4xx 客户端请求错误,如404
    - 5xx 服务端错误
- 跨域
  - 什么是跨域
    - 浏览器有同源策略,不允许ajax访问其他域的接口
    - 跨域条件:协议、域名、端口,有一个不同就算跨域
  - 可以跨域的三个标签
    - <img src="xxx">  
    - <link href="xxxx">
    - <script href="xxxx">
  - 三个标签的场景
    - <img>用于打点统计,统计网站可能是其他域
    - <link><script>可以使用CDN,CDN的也是其他域
    - <script>可以用于JSONP
  - JSONP
  - 服务器端设置http header
  ```
  app.all('/test', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  ```

  ## 存储
  ### 请描述一下cookie,sessionStorage,localStorage的区别
    - 容量
    - 是否会携带到ajax
    - api易用性
  - cookie
    - 本身用于客户端服务端通信
    - 但是它有本地存储的功能,于是就被"借用"
    - 使用document.cookie=...获取和修改即可
  - cookie用于存储的缺点
    - 存储量太小,只有4KB
    - 所有http请求都带着,会影响获取资源的效率
    - API简单,需要封装才能用document.cookie = ....
  - localStorage和sessionStorage
    - HTML专门为存储设计,最大容量
    - API简单易用:
    - localStorage.setItem(key, value);localStorage.getItem(key)
  - 两者区别
    - localStorage一直都在
    - sessionStorage浏览器关闭即消失                     
   