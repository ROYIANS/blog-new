---
title: JVM、JDK和JRE
comments: false
abbrlink: 7f3e3da
tags:
  - Java
  - Java Guide
category:
  - 技术
  - Java之路
date: 2019-11-18 11:54:45
quicklink: true
---

> 本文根据[Java Guide][0]补充学习Java，因此有Java Guide标签的文章内容大多引用自Java Guide

[0]: https://snailclimb.top/JavaGuide/ "Java Guide"

## JVM

JVM（Java Vitural Machain）是运行Java字节码的虚拟机，包括一套字节码指令集、一组寄存器、一个栈、一个垃圾回收、堆和一个存储方法域。JVM是运行在操作系统之上的，它与硬件没有直接的交互。

<!-- more -->

JVM有针对不同系统的特定实现，目的是使用相同的字节码，他们都会给出相同的结果

> 在 Java 中，JVM可以理解的代码就叫做字节码（即扩展名为 .class 的文件），它不面向任何特定的处理器，只面向虚拟机。Java 语言通过字节码的方式，在一定程度上解决了传统解释型语言执行效率低的问题，同时又保留了解释型语言可移植的特点。所以 Java 程序运行时比较高效，而且，由于字节码并不针对一种特定的机器，因此，Java程序无须重新编译便可在多种不同操作系统的计算机上运行。

当一个程序从开始运行，这时虚拟机就开始实例化了，多个程序启动就会存在多个虚拟机实例。程序退出或关闭，则虚拟机实例小王，多个虚拟机之间数据不能共享。

![](https://i.loli.net/2019/11/18/wb8ZfYBAvzUkh5Q.png)

## JDK

JDK是Java Development Kit，它是功能齐全的Java SDK。它拥有JRE所拥有的一切，还有编译器（javac）和工具（如javadoc和jdb）。它能够创建和编译程序。

## JRE

JRE 是 Java运行时环境。它是运行已编译 Java 程序所需的所有内容的集合，包括 Java虚拟机（JVM），Java类库，java命令和其他的一些基础构件。但是，它不能用于创建新程序。

如果你只是为了运行一下 Java 程序的话，那么你只需要安装 JRE 就可以了。如果你需要进行一些 Java 编程方面的工作，那么你就需要安装JDK了。但是，这不是绝对的。有时，即使您不打算在计算机上进行任何Java开发，仍然需要安装JDK。例如，如果要使用JSP部署Web应用程序，那么从技术上讲，您只是在应用程序服务器中运行Java程序。那你为什么需要JDK呢？因为应用程序服务器会将 JSP 转换为 Java servlet，并且需要使用 JDK 来编译 servlet。

## 参考资料

[重读 JVM](https://juejin.im/post/59ad4cd56fb9a02477075780#heading-89)
