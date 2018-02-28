## JS基础

### JS中使用typeof能得到哪些类型
(1):undefined——如果这个值未定义
```
typeof undefined //undefined
```
(2):boolean——如果这个值是布尔值
```
typeof true //boolean
```
(3):string——如果这个值是字符串
```
typeof 'abc' //string
```
(4):number——如果这个值是数值
```
typeof 123 //number
```
(5):object——如果这个值是对象或null
```
typeof {} //object
typeof [] //object
typeof null //object
```
(6):function——如果这个值是函数
typeof console.log //function

### 何时使用 === 何时使用 ==
```
if(obj.a == null){
    //这里相当于obj.a === null || obj.a === undefined
    //这是jquery源码中推荐的写法
}
```
其他地方全部使用===
### JS中有哪些内置函数
Object
Array
Boolean
Number
String
Function
Date
RegExp
Error
#### 注意Math是对象
### JS变量按照存储方式区分为哪些类型
```
//值类型
var a = 10
var b = a
a = 11
console.log(b) //10

//引用类型(对象、数组、函数)
var obj1 = {x:100}
var obj2 = obj1
obj1.x = 200
console.log(obj2.x) //200
```
### 如何理解JSON
```
//JSON只不过是JS对象而已
JSON.stringfy({a:10, b:20})
JSON.parse('{"a":10,"b":20}')
```
### 变量类型和计算
- 变量类型
  - 值类型 vs 引用类型
    - 引用类型: 对象、数组、函数
- 变量计算-强制类型转换
  - 字符串拼接
  - ==运算符
    ```
    100 == '100' //true
    0 == '' //true
    null == undefined //true
    ```
  - if语句
  - 逻辑运算符
    ```
    console.log(10 && 0) //0
    console.log('' || 'abc') //'abc'
    console.log(!window.abc) //true

    // 判断变量会被当做true 还是 false
    var a = 100
    console.log(!!a)
    ```
### if中false的情况
    - 0
    - NaN
    - ''
    - null
    - undefined
    - false


## 原型和原型链
### 如何准确判断一个变量是数组类型
    - 使用instanceof

  ```
   var arr = []
   arr instanceof Array //true
   typeof arr //object, typeof是无法判断的
  ```
### 写一个原型链继承的例子
    ```
    function Elem(id){
      this.elem = document.getElementById(id)
    }
    Elem.prototype.html = function(val){
      var elem = this.elem
      if(val){
        elem.innerHTML = val
        return this //链式操作
      }else{
        return elem.innerHTML
      }
    }
    Elem.prototype.on = function(type, fn){
      var elem = this.elem
      elem.addEventListener(type, fn)
    }
    var div1 = new Elem('div1')
    console.log(div1.html())
    ```    
### 描述new一个对象的过程
    - 创建一个新对象
    - this指向这个新对象
    - 执行代码,即对this赋值
    - 返回这个this
### zepto(或其他框架)源码中如何使用原型链
- 构造函数
```
function Foo(name, age){
  this.name = name
  this.age = age
  this.class = 'class-1'
  //return this //默认有这一行
}

var f= new Foo('张三', 20)
// var f1 = new Foo('李四'， 22) //创建多个对象
```
- 构造函数-扩展
  - var a = {}其实是var a = new Object()的语法糖
  - var a = []其实是var a = new Array()的语法糖
  - function Foo(){...}其实是var Foo = new Function(...)
  - 使用instanceof判断是否是一个变量的构造函数
- 原型规则和示例
  - 所有引用类型(数组、对象、函数),都具有对象特性,即可自由扩展属性(除了'null')
  - 所有的引用类型(数组、对象、函数),都有一个__proto__(隐式原型)属性,属性值是一个普通的对象
  - 所有的函数都有一个prototype属性,属性值也是一个普通对象
  - 所有的引用类型(数组、对象、函数),__proto__属性指向它的构造函数的"prototype"属性
  - 当试图得到一个对象的某个属性时,如果这个对象本身没有这个属性,那么会去它的__proto__(即它的构造函数的prototype)中去寻找
  ```
  var obj = {}; obj.a = 100;
  var arr = []; arr.a = 100;
  function fn(){}
  fn.a = 100;

  console.log(obj.__proto__)
  console.log(arr.__proto__) 
  console.log(fn.__proto__)

  console.log(fn.prototype)

  console.log(obj.__proto__ === Object.prototype)
  ```
- 原型链 
- instanceof
  - 用于判断引用类型属于哪个构造函数的方法
    - f instance Foo的判断逻辑是:
    - f的__proto__一层一层往上,能否对应到Foo.prototype
    - 再试着判断f instanceof Object
   
## 作用域和闭包
### 变量提升的概念
    - 变量定义
    - 函数声明(注意函数表达式的区别)
### 说明this几种不同的使用场景
     - 作为构造函数执行
     - 作为对象属性执行
     - 作为普通函数执行
     - call apply bind
### 创建10个<a>标签,点击时候弹出来对应的序号
    ```
    for(var i = 0;i < 10; i++){
      (function(i){
      var a = document.createElement('a')
      a.innerHTML = i + '<br>'
      a.addEventListener('click', function(event){
        event.preventDefault()
        alert(i)
      })
      document.body.appendChild(a)
      })(i)
    }
    ```
    或者使用ES6的let
### 如何理解作用域
    - 自由变量
    - 作用域链,即自由变量的查找
    - 闭包的两个场景
### 实际开发中闭包的应用
    - 闭包的实际应用主要用于封装变量,收敛权限
  ```
  function isFirstLoad(){
    var _list = [];
    return function(id){
      if(_list.indexOf(id) >= 0 ){
        return false;
      }else{
        _list.push(id);
        return true;
      }
    }
  }

  //使用
  var firstLoad = isFirstLoad();
  firstLoad(10) //true
  firstLoad(10) //false
  firstLoad(20) //true
  ```
- 执行上下文
  - 范围:一段<script>或者一个函数
  - 全局:变量定义、函数声明
  - 函数:变量定义、函数声明、this、arguments
  ** ps:注意函数声明和函数表达式的区别 **
- this
  - 作为构造函数执行
  - 作为对象属性执行
  - 作为普通函数执行
  - call apply bind
```
var a = {
  name: 'A',
  fn: function(){
    console.log(this.name)
  }
}
a.fn() //this === a
a.fn.call({name:'B'}) //this === {name: 'B'}
var fn1 = a.fn
fn1() //this === window
```
- 作用域
  - ES6新增块级作用域let const
  - var 不是块级作用域,函数作用域和全局作用域
- 作用域链
  ```
  var a = 100
  function fn(){
    var b = 200

    //当前作用域没有定义的变量,即"自由变量"
    console.log(a)
    console.log(b)
  }
  fn()
  ```
- 闭包
  ```
  function F1(){
      var a= 100

      //返回一个函数(函数作为返回值)
      return function(){
        console.log(a)
      }
  }
  //f1 得到一个函数
  var f1 = F1()
  var a = 200
  f1()

  //1.函数作为返回值
  //2.函数作为参数来传递

  function F2(fn){
   var a = 300
   fn()
  }
  F2(f1) //100
  ```

## 异步和单线程
### 同步和异步的区别是什么？分别举一个同步和异步的例子
    - 同步会阻塞代码的执行,而异步不会
    - alert是同步,setTimeout是异步
### 一个关于setTimeOut的笔试题
### 前端使用异步的场景有哪些
    - 定时任务:setTimeout,setInverval
    - 网络请求:ajax请求,动态<img>加载
    - 事件绑定
- 什么是异步(对比同步)
- 前端使用异步的场景
  - 定时任务:setTimeout,setInverval
  - 网络请求:ajax请求,动态<img>加载
  - 事件绑定
- 异步和单线程


## 其他知识
### 获取 2017-06-10格式的日期
    ```
function formateDate(dt){
 	if(!dt){
 		dt = new Date()
 	}
 	var year = dt.getFullYear()
 	var month = dt.getMonth() + 1
 	var date = dt.getDate()
 	var hour = dt.getHours()
 	var minute = dt.getMinutes()
 	var second = dt.getSeconds()
 	if(month < 10){
 		month = '0' + month
 	}
 	if(date < 10){
 		date = '0' + date
 	}
 	if(hour < 10){
 		hour = '0' +hour
 	}
 	if(minute < 10){
 		minute = '0' + minute
 	}
 	if(second < 10){
 		second = '0' + second
 	}
 	return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
 }
 var dt = new Date
 var formateDate = formateDate(dt)
 console.log(formateDate)
    ```
### 获取随机数,要求长度一致的字符串格式
    ```
    var random = Math.random()
    var random = random + '0000000000'
    var random = random.slice(0, 10)
    console.log(random)
    ```
### 写一个能遍历对象和数组的通用的forEach函数
    ```
      function forEach(obj,fn){
    	var key 
    	if(obj instanceof Array){
    		//准确判断是否为数组
    		obj.forEach(function(item, index){
    			fn(index, item)
    		})
    	}else{
    		//不是数组就是对象
    		for(key in obj){
    			fn(key, obj[key])
    		}
    	}
    }
    var obj = {
    	a:1,
    	b:2,
    	c:3
    }
    forEach(obj, function(key, value){
    	console.log(key, value)
    })
    ```
- 日期
  ```
  Date.now() //获取当前时间的毫秒数
  var dt = new Date()
  dt.getTime //获取毫秒数
  dt.getFullYear() //获取毫秒数
  dt.getMonth()  //月(0 - 11)
  dt.getDate //日(0 - 31)
  dt.getHours() //小时(0 - 23)
  dt.getMinutes //分钟(0 - 59)
  dt.getSeconds //秒(0 - 59)
  ```
- Math
  - 获取随机数 Math.random() 
- 数组API
  - forEach 遍历所有元素
  - every 判断所有元素是否都符合条件
  - some 判断是否至少有一个元素符合条件
  - sort 排序
  - map 对元素重新组装,生成新数组
  - filter 过滤符合条件的元素
- 对象API
  - for...in...