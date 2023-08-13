---
title: Java语言有哪些特点
comments: false
abbrlink: 6ec38e0a
date: 2019-11-18 09:12:33
tags:
  - Java
  - Java Guide
category:
  - 技术
  - Java之路
---

> 本文根据[Java Guide][0]补充学习Java，因此有Java Guide标签的文章内容大多引用自Java Guide

## 简单易学

1. Java的风格类似于C++，因而C++程序员是非常熟悉的。从某种意义上讲，Java语言是C及C++语言的一个变种，因此，C++程序员可以很快就掌握Java编程技术。
2. Java摒弃了C++中容易引发程序错误的地方，如指针和内存管理。
3. Java提供了丰富的类库。

<!-- more -->

## 面向对象（封装，继承，多态）

传统意义上，面向对象有三大特性：**封装**、**继承**、**多态**。《码出高效》一书中将**抽象**也作为面向对象的三大特性，支持面向对象“四大特性”的说法。虽然面向过程也需要一定的抽象能力，但是相对来说，面向对象思维，以对象模型为核心，丰富模型内涵，扩展模型外延，通过模型的行为组合去共同解决某一类问题，抽象能力显得尤为重要；封装是一种对象功能内聚的表现形式，使模块之间耦合度贬低，更具有维护性；继承使子类能够继承父类，获得父类的部分属性和行为，使模块更有复用性；多态使模块在复用性基础上更加有扩展性，使运行期更有想象空间。

## 平台无关性（Java虚拟机实现平台无关性）

Java是一门跨平台的语言，是平台无关性的，这也是Java语言可以迅速崛起并风光无限的一个重要的原因。

平台无关性就是一种语言在计算机上运行不受平台的约束，一次编译，到处运行。Java语言是借助class二进制字节码文件实现跨平台的。而class文件也是在对于Java平台无关性的支持中扮演的重要角色之一，除class文件之外，还有Java语言规范、JVM。

### JVM

对于不同的平台（操作系统、硬件），最主要的区别就是指令不同。比如同样是执行`a+b`，A平台的指令是`10001000`，而B平台就是`11101110`了。想做到跨平台，最重要的就是可以根据对应硬件和操作系统生成对应的二进制指令。

而这一工作在Java中，就是由JVM完成的。**Java语言是平台无关的，但是JVM是平台有关的**，不同的操作系统要安装不同的JVM。

![](https://i.loli.net/2019/11/18/d2Ky9ILshAjFeMP.png)

### 字节码

各种不同的平台的虚拟机都使用统一的程序存储格式——字节码（ByteCode）是构成平台无关性的另一个基石。Java虚拟机只与由字节码组成的Class文件进行交互。

我们说Java语言可以Write Once ,Run Anywhere。这里的Write其实指的就是生成Class文件的过程。

因为Java Class文件可以在任何平台创建，也可以被任何平台的Java虚拟机装载并执行，所以才有了Java的平台无关性。

### Java语言规范

有了平台对应的不同JVM，和统一的class文件，Java仍然不能彻底实现跨平台，而Java在实现跨平台方面，做出了自己的努力，体现在Java语言规范中。

C/C++中，基本数据类型是由它的占位宽度决定的，而占位宽度是由平台自己决定的。因此，在不同平台中，对于同一个C/C++程序进行编译会出现不同的行为。

而在Java中，它的基本数据类型的值域和行为都是由自己定义的。通过保证基本数据类型在所有平台的一致性，Java语言为平台无关性提供了强有力的支持。

![](https://i.loli.net/2019/11/18/bQsfJYHC2rRjO47.png)

## 可靠性

Java致力于检查程序在编译和运行时的错误。类型检查帮助检查出许多开发早期出现的错误。Java自已操纵内存减少了内存出错的可能性。Java还实现了真数组，避免了覆盖数据的可能。这些功能特征大大缩短了开发Java应用程序的周期。Java提供Null指针检测数组边界检测异常出口字节代码校验。

Java needed to reduce the likelihood of fatal errors from programmer mistakes. With this in mind, object-oriented programming was introduced. When data and its manipulation were packaged together in one place, Java was robust.

## 安全性

Java的安全性可从两个方面得到保证。一方面，在Java语言里，象指针和释放内存等C++功能被删除，避免了非法内存操作。另一方面，当Java用来创建浏览器时，语言功能和浏览器本身提供的功能结合起来，使它更安全。Java语言在你的机器上执行前，要经过很多次的测试。它经过代码校验，检查代码段的格式，检测指针操作，对象操作是否过分以及试图改变一个对象的类型。

Because Java was originally targeting mobile devices that would be exchanging data over networks, it was built to include a high level of security. Java is probably the most secure programming language to date.

## 支持多线程

C++ 语言没有内置的多线程机制，因此必须调用操作系统的多线程功能来进行多线程程序设计，而 Java 语言却提供了多线程支持

> 修正（参见：[issue#544][1]）：C++11开始（2011年的时候）,C++就引入了多线程库，在windows、linux、macos都可以使用std::thread和std::async来创建线程。[参考链接][2]

## 支持网络编程并且很方便

Java 语言诞生本身就是为简化网络编程设计的，因此 Java 语言不仅支持网络编程而且很方便

## 编译与解释并存

简而言之，Java既是编译型语言又是解释型语言，它通过javac和JIT进行编译，通过JVM进行解释。下面是Java程序从编写到执行的基本过程：

1. Programmer write source code and store that into a .java file. Always remember name of your Java source file must be same with the public class declared inside that file, for example if there is public class called Order inside Java file, then it name must be Order.java.
2. javac compiles .java fie and creates class files, which contains byte code. This byte code is main reason of Java being platform independent.
3. JVM executes these class files and gathers statistics of execution run. These statics are used to determine hot spot i.e. part of your code which executes 90% of time.
4. After certain threshold, when JVM has enough data to make decision, JIT compiles frequently used byte codes into native code, which is then directly executed by platform. This provides performance boost to Java application.

## 参考资料

1. [JAVA语言主要特点有哪些？](https://www.cnblogs.com/jay36/p/7762535.html)
2. [Java是如何实现平台无关性（跨平台）的?](https://mp.weixin.qq.com/s/KIeLngRROEkjRJ5chPE1lw)
3. [What Is Java?](https://www.thoughtco.com/what-is-java-2034117)
4. [Is Java Compiled or Interpreted Programming language?](https://javarevisited.blogspot.com/2014/06/is-java-interpreted-or-compiled-programming-language.html)

[0]: https://snailclimb.top/JavaGuide/ "Java Guide"
[1]: https://github.com/Snailclimb/JavaGuide/issues/544
[2]: http://www.cplusplus.com/reference/thread/thread/?kw=thread
