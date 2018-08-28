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
   
### mouseover和mouseenter的区别
- mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡的过程。对应的移除事件是mouseout
- mouseenter：当鼠标移入元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是mouseleave

### js的各种位置, 比如clientHeight,scrollHeight,offsetHeight ,以及scrollTop, offsetTop,clientTop的区别？
- clientHeight：表示的是可视区域的高度，不包含border和滚动条
- offsetHeight：表示可视区域的高度，包含了border和滚动条
- scrollHeight：表示了所有区域的高度，包含了因为滚动被隐藏的部分。
- clientTop：表示边框border的厚度，在未指定的情况下一般为0
- scrollTop：滚动后被隐藏的高度，获取对象相对于由offsetParent属性指定的父坐标(css定位的元素或body元素)距离顶端的高度。

### BFC（块级格式化上下文，用于清楚浮动，防止margin重叠等）
直译成：块级格式化上下文，是一个独立的渲染区域，并且有一定的布局规则。

- BFC区域不会与float box重叠
- BFC是页面上的一个独立容器，子元素不会影响到外面
- 计算BFC的高度时，浮动元素也会参与计算

那些元素会生成BFC：

- 根元素
- float不为none的元素
- position为fixed和absolute的元素
- display为inline-block、table-cell、table-caption，flex，inline-flex的元素
- overflow不为visible的元素

### QuerySelector/QuerySelectorAll和getElementById/getElementsByClassName的区别
- 灵活性
  - QS/QSA 均支持CSS的选择器，也就是说你可以这么写：
```
querySelector('div img .test')
//找到div下面的img下面类名为test的元素
```
  - 结论
    - 1.QS/QSA相较于GEBI/GEBC更加灵活和方便
    - 2.QS/QSA对于CSS伪类选择器不生效
- 动态性
  - 接下来我们来讨论QSA与GEBC最大的区别动态性。
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
    <script>
        a = document.querySelectorAll('img')
        b = document.getElementsByTagName('img')
        document.body.appendChild(new Image())
        console.log(a.length) // 0
        console.log(b.length) // 1
    </script>
</body>
</html>
```
   - 结论
     - 通过QSA选择的不受后来DOM变化的影响，但是通过GEBC会受DOM的影响。