---
title: SpringCloud-01 入门及基本概念介绍
category:
  - 技术
  - SpringCloud
comments: false
tags:
  - SpringCloud
  - 学习
abbrlink: a4d3022e
date: 2020-03-23 08:42:15
---

在微服务的概念形成之前。绝大部分基于 Web 的应用都是使用单体架构的风格来进行构建的。在单体架构中，应用程序作为单个可部署的软件制品交付，所有的 UI 、业务、数据库访问逻辑都被打包在一个应用程序制品中并且部署在一个应用服务器上。

![Figure 1. 单体应用程序强迫开发团队人工同步他们的交付，因为他们的代码需要被作为一个整体单元进行构建、测试和部署](https://i.loli.net/2020/03/23/5UXWlw82OkKi7SR.png)

## 什么是微服务

微服务的概念最初是在2014年前后悄悄蔓延出来的，它是对在技术上和组织上扩大大型单体应用程序所面临的诸多挑战的直接回应。微服务是一个小的、松耦合的分布式服务。微服务允许将一个大型的应用分解为具有严格职责定义的便于管理的组件。微服务通过将大型的代码分解为小型的精确定义的部分，帮助解决大型代码库中传统的复杂问题。

![Figure 2. 使用微服务架构，CRM应用将会被分解为一系列完全彼此独立的微服务，让每个开发团队都能够按照各自的步伐前进](https://i.loli.net/2020/03/23/P7TJhVk3Msw2Iyn.png)

## Spring Cloud

Spring Cloud 为开发者提供了在分布式系统中一些常见模式的快速构建工具（如配置管理、服务发现、断路器、动态路由、微型代理、控制总线、一次性令牌、全局锁、选举算法、分布式session、集群状态）。分布式系统间的协作产生了一些样板性质的模式（boiler plate patterns，锅炉板模式），开发者使用 Spring Cloud 就可以快速地构建基于这些模式的服务和应用。而这些服务和应用，也可以很好的工作在任何分布式环境，包括开发者自己的笔记本，裸机数据中心以及像Cloud Foundry这样的托管平台。

![Figure 3. Spring Cloud 整体架构](https://i.loli.net/2020/03/23/8nukriJBx4CgRq3.png)

### Spring Cloud 的核心功能

Spring Cloud专注于为典型的用例和可扩展性机制（包括其他用例）提供良好的开箱即用体验。

- Distributed/versioned configuration【分布式以及版本化的配置】
- Service registration and discovery【服务注册与发现】
- Routing【路由】
- Service-to-service calls【服务调用】
- Load balancing【负载均衡】
- Circuit Breakers【断路器】
- Distributed messaging【分布式消息】

SpringCloud是一个由许多子项目组成的综合项目，各子项目有不同的发布节奏。Spring并没有重复制造轮子，它只是将目前各家公司开发的比较成熟、经得起实际考验的服务框架组合起来，通过Spring Boot风格进行再封装屏蔽掉了复杂的配置和实现原理，最终给开发者留出了一套简单易懂、易部署和易维护的分布式系统开发工具包。

### SpringCloud 和 Springboot 版本对应关系

<table><caption>Table 1. Release train Spring Boot compatibility</caption><colgroup><col style="width: 60%;"><col style="width: 40%;"></colgroup><thead><tr><th>Release Train</th><th>Boot Version</th></tr></thead><tbody><tr><td><p>Hoxton</p></td><td><p>2.2.x</p></td></tr><tr><td><p>Greenwich</p></td><td><p>2.1.x</p></td></tr><tr><td><p>Finchley</p></td><td><p>2.0.x</p></td></tr><tr><td><p>Edgware</p></td><td><p>1.5.x</p></td></tr><tr><td><p>Dalston</p></td><td><p>1.5.x</p></td></tr></tbody></table>

### SpringCloud和各子项目版本对应关系

<table><thead><tr><th>Component</th><th>Edgware.SR6</th><th>Greenwich.SR2</th></tr></thead><tbody><tr><td>spring-cloud-bus</td><td>1.3.4.RELEASE</td><td>2.1.2.RELEASE</td></tr><tr><td>spring-cloud-commons</td><td>1.3.6.RELEASE</td><td>2.1.2.RELEASE</td></tr><tr><td>spring-cloud-config</td><td>1.4.7.RELEASE</td><td>2.1.3.RELEASE</td></tr><tr><td>spring-cloud-netflix</td><td>1.4.7.RELEASE</td><td>2.1.2.RELEASE</td></tr><tr><td>spring-cloud-security</td><td>1.2.4.RELEASE</td><td>2.1.3.RELEASE</td></tr><tr><td>spring-cloud-consul</td><td>1.3.6.RELEASE</td><td>2.1.2.RELEASE</td></tr><tr><td>spring-cloud-sleuth</td><td>1.3.6.RELEASE</td><td>2.1.1.RELEASE</td></tr><tr><td>spring-cloud-stream</td><td>Ditmars.SR5</td><td>Fishtown.SR3</td></tr><tr><td>spring-cloud-zookeeper</td><td>1.2.3.RELEASE</td><td>2.1.2.RELEASE</td></tr><tr><td>spring-boot</td><td>1.5.21.RELEASE</td><td>2.1.5.RELEASE</td></tr><tr><td>spring-cloud-task</td><td>1.2.4.RELEASE</td><td>2.1.2.RELEASE</td></tr><tr><td>spring-cloud-gateway</td><td>1.0.3.RELEASE</td><td>2.1.2.RELEASE</td></tr><tr><td>spring-cloud-openfeign</td><td>暂无</td><td>2.1.2.RELEASE</td></tr></tbody></table>

### Spring Cloud 的小弟们

Spring Cloud 主要的小弟有：Spring Cloud Config、Spring Cloud Netflix（Eureka、Hystrix、Zuul、Archaius…）、Spring Cloud Bus、Spring Cloud for Cloud Foundry、Spring Cloud Cluster、Spring Cloud Consul、Spring Cloud Security、Spring Cloud Sleuth、Spring Cloud Data Flow、Spring Cloud Stream、Spring Cloud Task、Spring Cloud Zookeeper、Spring Cloud Connectors、Spring Cloud Starters、Spring Cloud CLI，每个小弟身怀独门绝技武功高强下面来做一一介绍。

## Spring Cloud 子项目简介

### Spring Cloud Config

集中配置管理工具，分布式系统中统一的外部配置管理，默认使用Git来存储配置，可以支持客户端配置的刷新及加密、解密操作。配置资源直接映射到Spring Environment，但是如果需要，可以由非Spring应用程序使用。

### Spring Cloud Netflix

Netflix OSS 开源组件集成，包括Eureka、Hystrix、Ribbon、Feign、Zuul等核心组件。

- Eureka：服务治理组件，包括服务端的注册中心和客户端的服务发现机制；
- Ribbon：负载均衡的服务调用组件，具有多种负载均衡调用策略；
- Hystrix：服务容错组件，实现了断路器模式，为依赖服务的出错和延迟提供了容错能力；
- Feign：基于Ribbon和Hystrix的声明式服务调用组件；
- Zuul：API网关组件，对请求提供路由及过滤功能。

### Spring Cloud Bus

事件、消息总线，用于在集群（例如，配置变化事件）中传播状态变化，可与Spring Cloud Config联合实现热部署（动态刷新集群中的服务配置）。

### Spring Cloud Gateway

API网关组件，对请求提供路由及过滤功能。

### Spring Cloud OpenFeign

基于Ribbon和Hystrix的声明式服务调用组件，可以动态创建基于Spring MVC注解的接口实现用于服务调用，在SpringCloud 2.0中已经取代Feign成为了一等公民。

### Spring Cloud for Cloud Foundry

Cloud Foundry是VMware推出的业界第一个开源PaaS云平台，它支持多种框架、语言、运行时环境、云平台及应用服务，使开发人员能够在几秒钟内进行应用程序的部署和扩展，无需担心任何基础架构的问题

### Spring Cloud Cluster

Zookeeper，Redis，Hazelcast和Consul的选举算法（Leadership election，不知道是不是这样翻译）和常见状态模式以及抽象和实现。

### Spring Cloud Consul

使用Hashicorp Consul进行服务发现和配置管理。

Consul 是一个支持多数据中心分布式高可用的服务发现和配置共享的服务软件,由 HashiCorp 公司用 Go 语言开发, 基于 Mozilla Public License 2.0 的协议进行开源. Consul 支持健康检查,并允许 HTTP 和 DNS 协议调用 API 存储键值对.

Spring Cloud Consul 封装了Consul操作，consul是一个服务发现与配置工具，与Docker容器可以无缝集成。

### Spring Cloud Security

安全工具包，对Zuul代理中的负载均衡OAuth2客户端及登录认证进行支持。

### Spring Cloud Sleuth

SpringCloud应用程序的分布式请求链路跟踪，支持使用Zipkin、HTrace和基于日志（例如ELK）的跟踪。

### Spring Cloud Data Flow

Data flow 是一个用于开发和执行大范围数据处理其模式包括ETL，批量运算和持续运算的统一编程模型和托管服务。

### Spring Cloud Stream

Spring Cloud Stream是创建消息驱动微服务应用的框架。Spring Cloud Stream是基于spring boot创建，用来建立单独的／工业级spring应用，使用spring integration提供与消息代理之间的连接。数据流操作开发包，封装了与Redis,Rabbit、Kafka等发送接收消息。

### Spring Cloud Task

Spring Cloud Task 主要解决短命微服务的任务管理，任务调度的工作，比如说某些定时任务晚上就跑一次，或者某项数据分析临时就跑几次。

### Spring Cloud Zookeeper

使用ZooKeeper进行服务发现和配置管理。

ZooKeeper是一个分布式的，开放源码的分布式应用程序协调服务，是Google的Chubby一个开源的实现，是Hadoop和Hbase的重要组件。它是一个为分布式应用提供一致性服务的软件，提供的功能包括：配置维护、域名服务、分布式同步、组服务等。ZooKeeper的目标就是封装好复杂易出错的关键服务，将简单易用的接口和性能高效、功能稳定的系统提供给用户。

### Spring Cloud Connectors

使各种平台上的PaaS应用程序轻松连接到后端服务，例如数据库和消息代理（该项目以前称为“ Spring Cloud”）。

Spring Cloud Connectors 简化了连接到服务的过程和从云平台获取操作的过程，有很强的扩展性，可以利用Spring Cloud Connectors来构建你自己的云平台。

### Spring Cloud CLI

基于 Spring Boot CLI，可以让你以命令行方式快速建立云组件。

### Spring Cloud Starters

Spring Boot-style starter projects to ease dependency management for consumers of Spring Cloud. (Discontinued as a project and merged with the other projects after Angel.SR2.)

## 参考

- [Spring Cloud Overview](https://spring.io/projects/spring-cloud/)
- [SpringCloud整体架构概览](https://juejin.im/post/5d764f05e51d4561fb04bfd7)
- [大话Spring Cloud](https://mp.weixin.qq.com/s/7hzvAg2z1qNlVv8F_nYmPA)
- 《Spring Microservices in Action》
