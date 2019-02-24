### 开始阅读react16的源码
react源码分析链接 https://react.jokcy.me/

```
function Cmp() {
	return <div/>
}

<Cmp id="q">
  <span>123</span>
  <span>123</span>
</Cmp>
```
上述jsx代码经过babel编译后转化成如下的js代码
```
"use strict";

function Cmp() {
  return React.createElement("div", null);
}

React.createElement(Cmp, {
  id: "q"
}, React.createElement("span", null, "123"), React.createElement("span", null, "123"));
```