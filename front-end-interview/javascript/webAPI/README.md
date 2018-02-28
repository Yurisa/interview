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