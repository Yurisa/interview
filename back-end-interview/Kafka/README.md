## Kafka
### Kafka介绍
- 消息系统
  - 点对点消息系统
  - 订阅发布消息系统
- 什么是Kafka
  - 分布式订阅发布消息系统
- 优势/特点
  - 可靠性
  - 可扩展性
  - 高性能

### Kafka术语
#### 消息由producer产生, 消息按照topic归类, 并发送到broker中, broker中保存了一个或多个topic消息, consumer通过订阅一组topic的消息, 通过持续的poll操作从broker获取消息, 并进行后续的消息处理
- broker
  - 一个kafka集群包含一个或多个服务器, 这些服务器就称为broker, 保存producer发送的消息
- topic
  - 每条发送到broker的消息都有一个类别,这个类别称为topic
- partition
  - 一个topic的消息实际上由多个队列存储的, 一个队列在kafka上称为一个partition
- producer
  - 负责发送指定topic的消息到broker
- consumer
  - 消息读取客户端, 通过订阅一组topic的消息从broker拉取消息
- consumer group
  - 每个consumer术语一个消费者组，具有相同的group.id的消费客户端术语同一个消费者。通过设置一个消息消费者group.id是否相同可以分为单播消费（集群消费）或广播消费
  - 消费者组的成员是动态维护的，如果新增或者减少了消费者组中的消费者，那么每隔消费者消费的分区的消息也会动态变化。比如原来一个消费者组有两个消费者，其中一个消费者因为故障而不能继续消费消息了，那么剩下一个消费者将会消费全部4个分区的消息。
- offset
  - 偏移量。kafka为每条在分区的消息保存一个偏移量offset，这也是消费者在分区的位置。比如一个偏移量是5的消费者，表示已经消费了从0-4偏移量的消息，下一个要消费的消息的偏移量是5

