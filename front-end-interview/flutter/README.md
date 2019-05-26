## flutter
### 检查开发环境
```
flutter doctor
```
### 编译器
- android
- vscode
- xcode
### Dart 基础知识
- 程序入口
  JavaScript没有预定义的入口函数，但在Dart中不需要有一个顶级的main()函数作文应用程序的入口点。
  ```
  // Dart
  main() {

  }
  ```
  线上的playgroud [online Dart Compiler](https://www.jdoodle.com/execute-dart-online)
- 控制台输出
  ```
  // JavaScript
  console.log('hello');
  // Dart
  print('hello');
  ```
- 变量
  Dart是类型安全的 - 它使用静态类型检查和运行时的组合，检查以确保变量的值始终与变量的静态值匹配类型。尽管类型是必需的，但某些类型注释是可选的，因为Dart会执行类型推断。
- 创建和分配变量
  在JavaScript中，无法定义变量类型。
  在Dart中变量必须是明确的类型或者系统能够解析的类型
  ```
  // JavaScript
  var name = 'JavaScript';

  // Dart
  String name = 'dart'; // Explicitly type as a string
  var othername = 'Dart'; // Inferred string
  ```
  [dart type system](https://dart.dev/guides/language/sound-dart)
- 默认值
  - JavaScript中未初始化的变量默认值为undefined
  - Dart中未初始化的变量为null
  ** 注意：数字在Dart中也被当做对象，所以只要是带有数字类型的未初始化的变量的值都是null **
  ```
  ```

- 检查null或零
  在dart中只有bool类型true 才为true
- Dart null检查最佳实践
  从Dart1.12开始，null-aware运算符可用帮助我们做null的检查
  ```
  bool isConnected(a, b) {
    bool outConn = outgong[a]?.contains(b) ?? false;
    bool isConn = incoming[a]?.contains(a) ?? false;
    return outConn || inConn;
  }
  ```
  ?.运算符在左边为null的情况下会阻断右边的调用，??运算符主要作用是在左边表达式为null时将其设置为默认值。
  对于表达式：
  ```
  outgoing[a]?.contains(b);
  ```
  outgoing为null或者outgoing[a]为null或者containes(b)为null都会使得表达式为null
  ** 技巧：获取一个对象中的长度：searchModel ?. data ?. length ?? 0
- Functions
- 异步编程
  - Futures
  - async和await
### 什么是声明式UI
### 项目结构、资源、依赖和本地化
### 认识视图(Views)
### 布局与列表
### 状态管理
### 路由与导航
### 线程和异步UI
### 手势检测与触摸事件
### 主题和文字处理
### 表单输入与富文本
### 调用硬件、第三方服务与平台的交互通知