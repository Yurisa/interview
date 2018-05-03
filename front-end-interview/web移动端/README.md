## web移动端
### Meta标签
- <meta name="viewport" content="name=value, name=value"> -->
- width:设置布局viewport的特定值("device-width")
- initial-scale:设置页面的初始缩放比
- minimum-scale:最少缩放
- maximum-scale:最大缩放
- user-scalable:用户能否缩放
### 视口viewport和度量viewport
- 布局viewport document.body.clientWidth
- 度量viewport window.innerWidth

### click事件300ms
- 自定义Tap事件原理:
  - 在touchstart时记录时间、手指位置,在touchhend时进行比较,如果手指位置没有移动(或位移非常小)且时间间隔较短(一般200ms),且过程中未曾触发过touchmove,即可认为触发了手持设备上的'click',一般称它为'tap';
