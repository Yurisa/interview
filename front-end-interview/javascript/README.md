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