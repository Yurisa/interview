## 分布式
### 什么是分布式系统
- 很多计算机组成一个整体, 一个整体一致对外并且处理同一请求
- 内部的每台计算机都可以相互通信(rest/rpc)
- 客户端到服务端的一次请求到响应结束会历经多台计算机

### Zookeeper简介
- 中间件, 提供协调服务
- 作用于分布式系统, 发挥其优势, 可以为大数据服务
- 支持java, 提供java和c语言的客户端api

### Zookeeper的特性
- 一致性:数据一致性, 数据按照顺序分批入库
- 原子性:事务要么成功要么失败, 不会局部化
- 单一视图:客户端连接集群中的任一zk节点, 数据都是一致性的
- 可靠性:每次对zk的操作状态都会保存在服务端
- 实时性:客户端可以读取到zk服务端的最新数据

### Zookeeper基本数据模型介绍
- 是一个树形结构, 类似于前端开发中的tree.js组件
- zk的数据模型也可以理解为linux/unix的文件目录:/usr/local/...
- 每一个节点都称之为znode, 它可以有子节点, 也可以有数据
- 每个节点分为临时节点和永久节点, 临时节点在客户端断开后消失
- 每个zk节点都有各自的版本号, 可以通过命令行来显示节点信息
- 每当节点数据发生变化, 那么该节点的版本号会累加(乐观锁)
- 删除/修改过时节点, 版本号不匹配则会报错
- 每个zk节点存储的数据不宜过大, 几k即可
- 节点可以设置权限acl, 可以通过权限来限制用户的访问

### Zookeeper数据模型基本操作
- 客户端连接
- 查看znode结构
- 关闭客户端连接

### zk的作用体现
- master节点选举, 主节点挂了以后, 从节点就会接手工作,并且保证这个节点是唯一的, 这也就是所谓首脑模式, 从而保证我们的集群是高可用的
- 统一配置文件管理, 只需要部署一台服务器, 则可以把相同的配置文件同步更新到其他所有服务器, 此操作在计算中用的特别多
- 发布与订阅, 类似消息队列MQ(amq, rmq...), dubbo发布者把数据存在znode上, 订阅者会读取这个数据
- 提供分布式锁, 分布式环境中不同进程之间争夺资源, 类似于多线程中的锁
- 集群管理, 集群中保证数据的强一致性

### zk常用命令行
- 通过 ./zkCli.sh 打开zk的客户端进行命令行后台
- ls与ls2命令
- get与stat命令
- create命令
- set命令
- delete命令

### zk特性-session的基本原理
- 客户端与服务端之间的连接存在会话
- 每个会话都会可以设置一个超时时间
- 心跳结束, session则过期
- Session过期, 则临时节点znode会被抛弃
- 心跳机制:客户端向服务端的ping包请求

### zk特性-watcher机制
- 针对每个节点的操作, 都会有一个监督者->watcher
- 当监控的某个对象(znode)发生了变化, 则触发watcher事件
- zk中的watcher是一次性的, 触发后立刻销毁
- 父节点, 子节点 增删改都能够触发其watcher
- 针对不同类型的操作, 触发的watcher事件也不同"
  - 1.(子)节点创建事件
  - 2.(子)节点删除事件
  - 3.(子)节点数据发生变化事件

### Watcher命令行
- 通过get path [watch]设置watcher
- 父节点增删改操作触发watcher
- 子节点增删改操作触发watcher

### Watcher事件类型
- 创建父节点触发:NodeCreated
- 修改父节点数据触发:NodeDataChanged
- 删除父节点触发:NodeDeleted

- ls为父节点设置watcher, 创建子节点触发:NodeChildrenChanged
- ls为父节点设置watcher, 删除子节点触发:NodeChildrenChanged
- ls为父节点设置watcher, 修改子节点不触发事件

### Watcher使用场景
- 统一资源配置

### ACL(access control list)权限控制
- 针对节点可以使设置相关读写等权限, 目的为了保障数据安全性
- 权限permission可以指定不同的权限范围以及角色

### ACL命令行
- getAcl:获取某个节点的acl权限信息
- setAcl:设置某个节点的acl权限信息
- addauth:输入认证授权信息, 注册时输入明文密码(登录)但是在zk的系统里, 密码是以加密的形式存在的

### ACL的构成
- zk的acl通过[schema:permissions]来构成权限列表
  - schema:代表采用某种权限机制
  - id:代表允许访问的用户
  - permission:权限组合字符串

#### schema
- world:world下只有一个id, 即只有一个用户, 也就是anyone, 那么组合的写法就是world:anyone:[permissions]
- auth:代表认证登录, 需要注册用户有权限就可以, 形式为auth:user:password:[permissions]
- digest:需要对密码加密才能访问, 组合形式为digest:username:BASE64(SHA1(password)):[permissions]
- 简而言之, auth与digest的区别就是, 前者明文, 后者密文setAcl/path auth:lee:lee:cdrwa 与 setAcl/path digest:lee:BASE64(SHA1(password)) cdrwa 是等价的, 在通过addayth digest lee:lee后都能操作指定节点的权限
- ip:当设置为ip指定的ip地址, 此时限制ip进行访问, 比如ip:192.168.1.1:[permissions]
- super:代表超级管理员, 拥有所有的权限

#### permissions
##### 权限字符串缩写crdwa
     - CREATE:创建子节点
     - READ:获取节点/子节点
     - WRITE:设置节点数据
     - DELETE:删除子节点
     - ADMIN:设置权限

### ACL的常用使用场景
- 开发/测试环境分离, 开发者无权操作测试库的节点, 只能看
- 生产环境上控制指定ip的服务可以访问相关节点, 防止混乱

### zk四字命令 Four Letter Words
- zk可以通过它自身提供的简写命令来和服务器进行交互
- 需要使用到nc命令, 安装:yum install nc
- echo [command] | nc [ip] [port]

- [stat] 查看zk的状态信息, 以及是否mode
- [ruok] 查看当前zkserver是否启动, 返回imok
- [dump] 列出未经处理的会话和临时节点
- [conf] 查看服务器相关的配置
- [cons] 展示连接到服务器的客户端信息
- [envi] 环境变量
- [mntr] 监控zk健康信息
- [wchs] 展示watch信息
- [wchc] 与 [wchp] session与watch及path与watch信息

### Zookeeper集群搭建
- zk集群, 主从节点, 心跳机制(选举模式)

### Zookeeper集群搭建注意点
- 配置数据文件 myid 1/2/3 对应Server.1/2/3
- 通过./zkCli.sh -server [ip]:[port]检测集群是否配置成功

### Zookeeper真实环境集群搭建
- 需要注意:环境变量的配置, ip配置不同, 端口号可以相同
- 集群测试, 选举测试

### Zookeeper原生java api使用
- 会话连接与恢复
- 节点的增删改查
- watch与acl的相关操作