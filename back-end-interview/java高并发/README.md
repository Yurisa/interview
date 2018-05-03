## java并发编程与高并发解决方案
### 并发基本概念
    - 同时拥有两个或者多个线程, 如果程序在单核处理器上运行, 多个线程将交替地换人或者换出内存, 这些线程是同时"存在"的, 每个线程都处于执行过程中的某个状态, 如果运行在多核处理器上, 此时, 程序中的每个线程都将分配到一个处理器核上, 因此可以同时运行。
### 高并发
    - 高并发(High Concurrency)是互联网分布式系统架构设计中必须考虑的因素之一, 它通常是指, 通过设计保证系统能够同时并行处理很多请求。
#### 并发: 多个线程操作相同的资源, 保证线程安全, 合理使用资源
#### 高并发: 服务能同时处理很多请求, 提高程序性能 
### CPU多级缓存
![cache icon](./images/4.jpg)
#### 为什么CPU需要cache
     - CPU的频率太快了, 快到主存跟不上, 这样在处理器时钟周期内, CPU常常需要等待主存, 浪费资源。所以cache的出现是为了缓解CPU和内存之间速度不匹配问题(结构:cpu -> cache -> memory)
#### CPU cache有什么意义
     - 时间局部性: 如果某个数据被访问, 那么在不久的将来它很可能被再次访问
     - 空间局部性: 如果某个数据被访问, 那么与它相邻的数据很快也可能被访问
#### 缓存一致性(MESI)
     - 用于保证多个CPU cache之间缓存共享数据的一致
       - M:Modified 被修改
       - E:Eclusive 独享
       - S:Shared 共享
       - I:Invalid 无效的
#### 乱序执行优化
     - 处理器为提高运算速度而做出违背原有顺序的优化
### java内存模型(Java Memory Model, JMM)
    - java内存模型是一种规范, 它规定了java虚拟机和计算机是如何协同工作的, 它规定了一个线程如何和何时可以看到由其他线程修改过后的变量的值以及在必须时如何同步地访问共享变量。
![JMM1 icon](./images/5.jpg)
![JMM2 icon](./images/6.jpg)
![JMM3 icon](./images/7.jpg)
#### java内存模型抽象结构图
![JMM4 icon](./images/8.jpg)
#### 同步八种操作
     - lock
![lock icon](./images/9.jpg)
### 并发的优势与风险
![youshilieshi icon](./images/10.jpg)

### 线程安全性
    - 定义: 当多个线程访问某个类时, 不管运行时环境采用何种调度方式或者这些进程将如何交替执行, 并且在主调代码中不需要任何额外的同步或协同, 这个类都能表现出正确的行为, 那么就称这个类是线程安全的。
    - 原子性:提供了互斥访问, 同一时刻只能有一个线程来对它进行操作
    - 可见性:一个线程对主内存的修改可以及时的被其他线程观察
    - 有序性:一个线程观察其他线程中的指令执行顺序, 由于指令重排序的存在, 该观察结果一般杂乱无序执行顺序, 由于指令重排序的存在, 该观察结果一般杂乱无序。
### 原子性
#### 原子性 - Atomic
    - AtomicXXX: CAS、Unsafe.compareAndSwapInt
    - AtomicLong、LongAdder
    - AtomicReference、AtomicReferenceFieldUpdater
    - AtomicStampReference:CAS的ABA问题
    CAS compareAndSwap

#### 原子性 - 锁
     - synchronized:依赖JVM
     - Lock:依赖特殊的CPU指令, 代码实现, ReentrantLock
##### synchronized 修饰对象
      - 修饰代码块: 大括号括起来的代码, 作用域调用的对象
      - 修饰方法: 整个方法, 作用于调用的对象
      - 修饰静态方法:整个静态方法, 作用于所有对象
      - 修饰类:括号括起来的部分, 作用于所有对象
##### synchronized 与 Lock对比
      - synchronized: 不可中断锁, 适合竞争不激烈, 可读性好
      - Lock: 可中断锁, 多样化同步, 竞争激烈时能维持常态
      - Atomic: 竞争激烈时能维持常态, 比Lock性能好; 只能同步一个值
### 可见性
- 导致共享变量在线程间不可见的原因
  - 线程交叉执行
  - 重排序结合线程交叉执行
  - 共享变量更新后的值没有在工作内存与主存间及时更新
#### 可见性 - synchronized
- JMM关于synchronized的两条规定
  - 线程解锁前, 必须把共享变量的最新值刷新到主内存
  - 线程加锁时, 将清空工作内存中共享变量的值, 从而使用共享变量时需要从主内存中重新读取最新的值(注意, 加锁和解锁是同一把锁)
#### 可见性 - volatile
- 通过加入内存屏障和禁止重排序优化来实现
  - 对volatile变量写操作时, 会在写操作后加入一条store屏障指令, 将本地内存中的共享变量值刷新到主内存
  - 对volatile变量读操作时, 会在读操作前加入一条load屏障指令, 从主内存中读取共享变量

### 有序性
- java内存模型中, 允许编译器和处理器对指令进行重排序, 但是重排序过程不会影响到单线程程序的执行, 却会影响到多线程并发执行的正确性
- vlatile、synchronized、Lock
#### 有序性 - happends-before原则
- 程序次序规则:一个线程内, 按照代码顺序, 书写在前面的操作先行发生于写在后面的操作
- 锁定规则:一个unLock操作先行发生于后面对同一个锁的lock操作
- volatile变量规则:对一个变量的写规则先行发生于后面对这个变量的读操作
- 传递规则:如果操作A先行发生于操作B, 而操作B又先行发生于操作C, 则可以得出操作A先行发生于操作C
- 线程启动规则:Thread对象的start()方法先行发生于此线程的每一个动作
- 线程中断规则:对线程interrupt()方法的调用先行发生于被中断线程的代码检测到中断事件的发生
- 线程终结规则: 线程中所有的操作都先行发生于线程的终止检测, 我们可以通过Thread.join方法结束、Thread.isAlive()返回值手段检测到线程已经终止执行
- 对象终结规则:一个对象的初始化完成先行发生于他的finalize()方法的开始

### 发布对象
- 发布对象:使一个对象能够被当前范围之外的代码所使用
- 对象逸出:一种错误的发布。当一个对象还没有构造完成时, 就使它被其他线程所见

### 安全发布对象
- 在静态初始化函数中初始化一个对象的引用
- 将对象的引用保存到volatile类型域或者AtomicReference对象中
- 将对象的引用保存到某个正确够早对象的final类型域中
- 将对象的引用保存到一个由锁保护的域中

### 不可变对象
- 不可变对象需要满足的条件
  - 对象创建以后其状态就不能修改
  - 对象所有域都是final类型
  - 对象是正确创建的(在对象创建期间, this引用没有逸出)
### final关键字
- final关键字:类、方法、变量
  - 修饰类:不能被继承
  - 修饰方法:1.锁定方法不被继承类修改2.效率
  - 修饰变量:基本数据类型变量、引用类型变量
### 其他不可变
- Collections.ummodifiableXXX:Collection、List、Set、Map...
- Guava:ImmutableXXX:Collection、List、Set、Map...

### 线程封闭
- Ad-hoc 线程封闭:程序控制实现, 最糟糕, 忽略
- 堆栈封闭: 局部变量, 无并发问题
- ThreadLocal 线程封闭:特别好的封闭方法

### 线程不安全类与写法
- StringBuilder不安全 -> StringBuffer安全
- SimpleDateFormate不安全 -> JodaTime
- ArrayList, HashSet, HashMap等Collections
- 先检查再执行:if(condition(a)){handle(a)}

### 同步容器
- 不安全 -> 安全
- ArrayList -> Vector,Stack
- HashMap -> HashTable(key、value不能为null)
- Collections.synchronizedXXX(List、 Set、 Map)

### 并发容器J.U.C java.util.concurrent
#### 分为 tool、locks、atomic、collections、executors
- ArrayList -> CopyOnWriteArrayList
- HashSet、TreeSet -> CopyOnWriteArraySet 、ConcurrentSkipListSet
- HashMap、TreeMap -> ConcurrentHashMap ConcurrentHashMap、 ConcurrentSkipListMap

### 安全共享对象策略总结
- 线程限制:一个呗线程限制的对象, 由线程独占, 并且只能被占有它的线程修改
- 共享只读:一个共享只读的对象, 在没有额外同步的情况下, 可以被多个线程并发访问, 但是任何线程都不能修改它。
- 线程安全对象:一个线程安全的对象或者容器, 在内部通过同步机制来保证线程安全, 所以其他线程无需额外的同步就可以通过公共接口随意访问它。
- 被守护对象:被守护对象只能通过获取特定的锁来访问。