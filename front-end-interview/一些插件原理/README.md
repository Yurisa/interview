## 一些插件原理整理
### Ueditor
#### 对于支持富文本编辑的浏览器来说，其实就是设置 document 的 designMode 属性为 on 后，再通过执行 document.execCommand('commandName'[, UIFlag[, value]]) 即可。commandName 和 value 可以在MSDN 上和MDC 上找到，它们就是我们创建各种格式的命令，比方说，我们要加粗字体，执行 document.execCommand('bold', false) 即可。

#### 自实现编辑Command
- 如果编辑的Command都是自实现且每个Command实现了do/redo(), undo(), 那么每次编辑操作, 会执行一个顶层Command的do(), 并将Command 入栈.Undo 时, 执行最上面Command的undo()方法, 指针下移Redo 时, 执行当前Command的 do/redo() 方法, 指针上移
#### 非自实现Command
- 如果没有自实现Command, 可以使用contenteditable 特性自带的undo/redo管理. 缺点是: 每次编辑操作都必须使用document.execCommand() 来做修改, 不能直接修改内容DOM树.如果没有自实现Command, 还想能够直接修改内容DOM树. 那么可以尝试定时保存内容(html格式)若内容有变化, 保存html内容和光标位置(Selection) -- 入栈. (这里涉及一个比较麻烦的问题, 即如何将Selection序列化)Undo 时, 将保存的html内容和光标位置取出, 恢复到编辑器中, 指针下移Redo 时, 指针上移, 将当前的html内容和光标位置取出, 恢复到编辑器中
