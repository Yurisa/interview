## 计算机网络
### ipv4和ipv6的区别
    - 扩展了路由和寻址的能力
    - 报头格式的简化
    - 对可选项更大的支持
    - QoS的功能
    - 身份验证和保密
    - 安全机制IPSec是必选的。ipv4的是可选的或者是需要付费支持的。
    - 加强了对移动设备的支持。IPv6在设计之初有着支持移动设备的思想。
    - 支持无状态自动地址配置, 
    
### TCP三次握手及四次挥手
#### TCP报文重要字段介绍
    - 序号:Seq序号, 占32位, 用来标识从TCP源端向目的端发送的字节流, 发起方发送数据时对此进行标记。
    - 确认序号:Ack序号, 占32位, 只有ACK标志为1时, 确认序号字段才有效, Ack=Seq+1。
    - 标志位:共6个, 即URG、ACK、 PSH、 RST、 SYN、 FIN等, 具体含义如下:
       - URG:紧急指针(urgent pointer)有效。
       - ACK:确认序号有效。
       - PSH:接收方应该尽快将这个报文交给应用层
       - RST:重置连接。
       - SYN:发起一个新连接
       - FIN:释放一个连接
    - 注意:
       - 不要讲确认序号Ack和标志位中的ACK搞混了。
       - 确认方Ack=发起方Seq+1, 两端配对。
#### 三次握手过程详解
##### 所谓三次握手(Three-Way-HandShake)即建立TCP连接, 就是指建立一个TCP连接时, 需要客户端和服务端总共发送3个包以确认连接的建立。在socket编程中, 这一过程由客户端执行connect来触发。
    - 第一次握手:
    Client将标志位SYN置为1, 随机产生一个值seq=j, Client进入SYN_SENT状态, 等待Server确认。
    - 第二次握手
    Server收到数据包后由标志位SYN=1知道Client请求建立连接, Server将标志位SYN和ACK都置为1, ack=j+1, 随机产生一个值seq=K, 并将该数据包发送给Client以确认连接请求, Server进入SYN_RECVD状态。
    - 第三次握手:
    Client收到确认后, 检查ack是否为j+1,ACK是否为1, 如果正确则将标志位ACK置为1, ack=k+1, 并将该数据包发送给Server, Server检查ack是否为k+1, ACK是否为1, 如果正确则连接建立成功, Client和Server进入ESTABLISHED状态, 完成三次握手, 随后Client和Server之间就可以开始传输数据了。
##### SYN攻击:
    - 在三次握手过程中, Server发送SYN-ACK之后, 收到Client的ACK之前的TCP连接称为半连接(half-openconnect), 此时Server处于SYN_RECVD状态,当收到ACK后, Server转入ESTABLISHED状态。SYN攻击就是Client在短时间内伪造大量不存在的IP地址, 并向Server不断发送SYN包, Server回复确认包, 并等待Client的确认, 由于源地址是不存在的, 因此, Server需要不断重发直至超时, 这些伪造的SYN包将长时间占用未连接队列, 导致正常的SYN请求因为队列满而被丢弃, 从而引起网络堵塞甚至系统瘫痪。SYN攻击是一种典型的DDOS攻击, 检测SYN攻击的方式非常简单, 即当Server上有大量半连接状态且源IP地址是随机的, 可以断定遭到了SYN攻击了, 使用如下命令可以让之现行。
```
#netstat -nap | grep SYN_RECV
```
#### 四次挥手过程详解