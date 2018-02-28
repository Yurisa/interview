## JS-WEB-API
### DOM是哪种基本数据结构
    - 树
### DOM操作的常用API有哪些
### DOM节点的attr和property有何区别
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