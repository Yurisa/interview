## vue源码解读
https://ustbhuangyi.github.io/vue-analysis/

### 难点
#### 难点1
-  value = this.getter.call(vm, vm)
当为渲染watcher时 this.getter为updateComponent
当为computer watcher时 this.getter为computed中定义的getter函数
当为user watcher时 this.getter为该属性的getter函数

#### 难点2
- props和data中的属性dep.depend()收集依赖时会在user watcher 在new Watcher()时会触发属性的getter方法完成依赖收集，此时收集的依赖为user watcher
- props和data中的属性在页面渲染时触发属性getter从而触发dep.depend()收集依赖，此时收集的依赖为渲染watcher
- computed watcher 在创建完成之后执行watcher.denpend()完成computed watcher内部的dep依赖收集此时收集的watcher为渲染watcher
- 接着执行watcher.evaluate()会执行watcher中的get()方法从而将全局的watcher变成computed watcher,执行this.getter.call(vm, vm)时, 执行用户自定义的computed getter(), 从而触发内部实用的props或者data中的属性的getter方法, 执行这些属性getter方法中的dep.depend()完成依赖收集，此时的watcher为computed watcher。当引用的props或者data中的属性改变时除了派发自身的渲染watcher之外还会触发computed watcher, 之前提到computed watcher自身内部有一个dep,在computed watcher run的时候会派发内部dep的更新，也就是触发订阅了computed watcher的渲染更新。

#### 难点3
- watcher.run()
- 在set,在更新数据的时候触发
- 如果是渲染watcher和computed watcher,则会执行const value = this.get()会执行updateComponent()方法执行diff算法更新dom
- 如果是user watcher,执行执const value = this.get() 得到最新的值, oldvalue 中保存上一次渲染周期vm中的值，并将新值赋值给vm中，最后将新的value和oldValue全部传入用户自定义的watcher回调函数中执行。