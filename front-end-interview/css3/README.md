## CSS
### CSS预处理器
    - 基于CSS的另一种语言
    - 通过工具编译成CSS
    - 添加了很多CSS不具备的特性
    - 能提升CSS文件的组织

    - 嵌套 反映层级和约束
    - 变量和计算 减少重复代码
    - Extend和Mixin代码片段
    - 循环 适用于复杂有规律的样式
    - import CSS文件模块化
#### less sass
    - less 基于nodejs
    - sass 基于Ruby

### BFC规范——————Block Formatting Contexts(块级元素格式化上下文)

- 格式化则表明了在这个环境中, 元素处于此环境中应当被初始化, 即元素在此环境中应当如何布局等。元素如果创建了BFC, 那么BFC决定了如何对其内容进行定位, 以及它与其他元素的关系和相互作用。

- 创建了BFC的元素会按照如下方式对其子元素进行排列：
- 1.元素的子元素会一个接一个地放置。垂直方向上他们的起点是一个包含块的顶部, 两个相邻元素之间的垂直距离取决于'margin'特性。在BFC相邻的块级元素垂直边距会折叠(collapse)
- 2.元素的子元素中, 每一个子元素左外边与包含块的左边相接触(对于从右到左的格式化, 右外边接触右边), 即使存在浮动也是如此(尽管一个子元素的内容区域会由于浮动而压缩), 除非这个子元素也创建了一个新的BFC, 如它自身也是一个浮动。

如何形成BFC

满足下面任意条件的元素可形成BFC：

1.浮动元素，float除了none外的值

2.绝对定位元素，position：absolute/fixed

3.display为inline-block、table-cells、table-captions(表格标题)之一

4.overflow为visible之外的值（hideen、auto、scroll（块级区域始终有滚动条））