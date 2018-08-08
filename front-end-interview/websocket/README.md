## websocket
### 技术背景
- 以前的网站为了实现推送功能，使用的都是客户端轮询(因为http通信是单向的).所以HTML5定义了WebSocket协议, 以及相关的编程API, 能更好地实现双向通信且节省服务器资源和带宽.
```
注意： WebSocket 实际上指的是一种协议，与我们熟知的 Http 协议是同等的一个网络协议。用网络模型结构来解释的话， WebSocket 和 Http 协议都属于 应用层协议，两者都基于传输层协议 TCP。
```
WebSocket 协议

与HTML5的联系
Html5是指的一系列新的API，或者说新规范，新技术。在这个新规范中定义了一个为了实现双向实时通信的新协议 WebSocket，并且提供了一套 JavaScript API 供开发者来调用实现通信。服务器端的实现由诸如：Tomcat、Jetty等等。

与Http协议的联系
简单概括来看： WebSocket 不是 Http 协议， Http 协议只是被 WebSocket 使用来建立 WebSocket 连接，连接建立了以后客户端与服务器的双向通信就与 Http 无关了。

WebSocket 协议和 HTTP 协议是两种不同的东西，它们的联系如下：

```
客户端开始建立 WebSocket 连接时要发送一个 header 标记了 Upgrade 的 HTTP 请求，表示请求协议升级。所以服务器端做出响应的简便方法是，直接在现有的 HTTP 服务器软件和现有的端口上实现 WebSocket 协议，重用现有代码（比如解析和认证这个 HTTP 请求。如果在 TCP 协议上实现，这两个功能就要重新实现），然后再回一个状态码为 101 的 HTTP 响应完成握手，再往后发送数据时就没 HTTP 的事了。

**例子**
下面给出发出建立连接请求时的 request 和 response。

注意：下面的请求报文与响应报文中的内容不是完整的报文，而是 WebSocket 基于 Http 请求（响应）报文添加的内容。
```

浏览器请求
GET / HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Host: example.com
Origin: null
Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ==
Sec-WebSocket-Version: 13

服务器回应
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
Sec-WebSocket-Origin: null
Sec-WebSocket-Location: ws://example.com/