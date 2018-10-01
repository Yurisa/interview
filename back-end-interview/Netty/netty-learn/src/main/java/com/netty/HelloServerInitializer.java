package com.netty;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.HttpServerCodec;

/**
 * 初始化器, channel注册后会执行里面的相应的初始化方法
 */
public class HelloServerInitializer extends ChannelInitializer<SocketChannel> {

    @Override
    protected void initChannel(SocketChannel socketChannel) throws Exception {
        // 通过SocketChannek去获取对应的管道
        ChannelPipeline channelPipeline = socketChannel.pipeline();

        // 通过管道添加handeler
        // HttpServerCodec是由netty自己提供的助手类
        // 当请求到服务端, 我们需要做解码, 响应到客户端做编码
        channelPipeline.addLast("HttpServerCodec", new HttpServerCodec());
        // 添加自定义的助手类, 返回"hello netty"
        channelPipeline.addLast("customHandler", new CustomHandler());


    }
}
