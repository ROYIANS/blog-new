---
title: Redis入门
tags: Redis
category:
    - 技术
    - Redis之路
comments: false
abbrlink: 6a343b7f
description: Redis入门教程，初识Redis，简要了解Redis基本操作，学习通过Java操作Redis
date: 2019-11-26 11:55:56
---

## NoSql

NoSql = Not Only SQL，意思是不仅仅是SQL。NoSql是一项全新的数据库理念，指的是非关系型数据库，是对不同于传统的关系型数据库的数据库管理系统的统称。
NoSql用于超大规模数据的存储（例如Google或Facebook每天为他们的用户收集万亿比特的数据）。这些类型的数据存储不需要固定的模式，无需多于操作就可以横向扩展。
随着互联网web2.0网站的兴起，传统的关系数据库在应付web2.0网站，特别是超大规模和高并发的SNS类型的web2.0纯动态网站已经显得力不从心，暴露了很多难以克服的问题，而非关系型的数据库则由于其本身的特点得到了非常迅速的发展。NoSQL数据库的产生就是为了解决大规模数据集合多重数据种类带来的挑战，尤其是大数据应用难题。

### NoSql和关系型数据库的比较

- 优点
    - 成本
        NoSql数据库简单易部署，基本都是开源软件，不需要像使用oracle那样花费大量成本购买使用，相比关系型数据库价格便宜。
    - 查询速度
        NoSql数据库将数据存储于缓存中，关系型数据库将数据存储在硬盘中，自然查询速度远不及NoSql数据库。
    - 存储数据格式
        NoSql的存储格式是`key:value`的形式、图片形式、文档形式等等，所以可以存储基础类型以及对象或者是集合等各种形式，而数据库则支支持基础类型。
    - 扩展性
        关系型数据库有类似join这样的多表查询机制的限制导致扩展很艰难
- 缺点
    - 维护的工具和资料有限
        因为NoSql是属于新的技术，不能和关系型数据库十几年的技术同日而语。
    - 不提供对sql的是支持，如果不支持sql这样的工业标准，将产生一定用户的学习和使用的成本。
    - 不提供关系型数据库对事物的事务处理。

### 非关系型数据库的优势

- 性能
    NoSql是基于键值对的，可以想象成表中的主键和值的对应关系，而且不需要经过SQL层的解析，所以性能非常高。
- 可扩展性：
    可扩展性同样也是因为基于键值对，数据之间没有耦合性，所以非常容易水平扩展。

### 关系型数据库的优势

- 复杂查询可以用SQL语句方便的在一个表以及多个表之间做非常复杂的数据查询。
- 事务支持使得对于安全性能很高的数据访问要求得以实现。对于这两类数据库，对方的优势就是自己的弱势，反之亦然。

### 主流产品

1. 键值（Key-Value）存储数据库
    - 相关产品
        - Tokyo Cabinet/Tyrant
        - Redis
        - Voldemort
        - Berkelry DB
    - 典型应用
        内容缓存，主要用于处理大量数据的高访问负载
    - 数据模型
        一系列键值对
    - 优势
        快速查询
    - 劣势
        存储的数据缺少结构化
2. 列存储数据库
    - 相关产品
        - Cassandra
        - HBase
        - Riak
    - 典型应用
        分布式的文件系统
    - 数据模型
        以列簇式存储，将同一列数据存在一起
    - 优势
        查找速度快、可扩展性强，更容易进行分布式扩展
    - 劣势
        功能相对局限
3. 文档型数据库
    - 相关产品
        - CouchDB
        - MongoDB
    - 典型应用
        Web应用（与Key-Value类似，Value是结构化的）
    - 数据模型
        一系列键值对
    - 优势
        数据结构要求不严格
    - 劣势
        查询性能不高，而且缺乏统一的查询语法
4. 图形（Graph）数据库
    - 相关产品
        - Neo4J
        - InfoGrid
        - Infinite Graph
    - 典型应用
        社交网络
    - 数据模型
        图结构
    - 优势
        利用图结构相关算法
    - 劣势
        需要对整个图做计算才能得出结果，不容易做分布式的集群方案。

### 总结

关系型数据库与NoSQL数据库并非对立而是互补的关系，即通常情况下使用关系型数据库，在适合使用NoSQL的时候使用NoSQL数据库，
让NoSQL数据库对关系型数据库的不足进行弥补。
一般会将数据存储在关系型数据库中，在nosql数据库中备份存储关系型数据库的数据

## Redis

### 简介

Redis是一款高性能的NOSQL系列的非关系型数据库是用C语言开发的一个开源的高性能键值对（key-value）数据库，官方提供测试数据，50个并发执行100000个请求,读的速度是110000次/s,写的速度是81000次/s ，且Redis通过提供多种键值数据类型来适应不同场景下的存储需求，目前为止Redis支持的键值数据类型如下：

1. 字符串类型 string
2. 哈希类型 hash
3. 列表类型 list
4. 集合类型 set
5. 有序集合类型 sortedset

### Redis的应用场景

1. 缓存（数据查询、短链接、新闻内容、商品内容等等）
2. 聊天室的在线好友列表
3. 任务队列（秒杀、抢购、12306等）
4. 应用排行榜
5. 网站访问统计
6. 数据过期处理（可以精确到毫秒）
7. 分布式集群架构中的session分离

### Redis的下载、安装与配置

#### Windows

访问[github/MicrosoftArchive/redis](https://github.com/MicrosoftArchive/redis/releases)，下载Redis-x64-3.2.100.zip

![](https://i.loli.net/2019/11/26/12FXyCIdVv7Qozp.png)

![](https://i.loli.net/2019/11/26/ZpJbzXfrwMH4um7.png)

将压缩文件中的文件解压到单独的文件夹即可使用。

```plain
redis.windows.conf: 配置文件
redis-cli.exe: redis 客户端
redis-server.exe: redis 服务器端
```

#### Linux

访问[Redis.io](https://redis.io/download)，点击Download按钮。

![](https://i.loli.net/2019/11/26/EK5z4GYgRiqaJQU.png)

或者使用命令

```bash
$ wget http://download.redis.io/releases/redis-5.0.7.tar.gz
```

解压

```bash
$ tar xzf redis-5.0.7.tar.gz
```

移动到解压后的文件夹并编译

```bash
$ cd redis-5.0.7
$ make
```
等待编译完成后，二进制文件就被编译到`src`文件夹中了，我们可以通过下面的命令运行Redis服务器：

```bash
$ src/redis-server
```

你可以使用redis的内置客户端操作redis：

```bash
$ src/redis-cli
```

### 试试看

以下的命令我们下次学，现在先来体验一下redis.

打开redis服务器端：

![](https://i.loli.net/2019/11/26/zWQPFYBdqRipmAI.png)

打开客户端：

![](https://i.loli.net/2019/11/26/SHtY18cNiIqsxKQ.png)

输入以下命令

```
set msg "Hello World!"
```

```
get msg
```

![](https://i.loli.net/2019/11/26/dsnpWIymfHZ6rtR.png)

Bravo！
