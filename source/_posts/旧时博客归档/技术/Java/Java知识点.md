---
title: 知识点总结
comments: false
abbrlink: b9b4d73a
tags:
  - Java
  - 数据结构
  - 计算机网络
  - 算法
  - Mysql
category:
  - 技术
  - Java
date: 2018-11-04 08:20:07
description:
---

> 零碎知识点。

## Java

### 简述 JDK 和 JRE 的区别

JDK 是 Java 开发人员在开发过程中使用的软件开发包，它提供了 Java 的开发环境和运行环境。

JRE 是 Java Runtime Environment 是指 Java 的运行环境。

如果只是想跑 Java 程序，只需要安装 JRE 就够了，如果要从事开发就得安装 JDK。

### 简述 path 和 classpath 的区别

Path 是系统变量，跟 Java 无关，里面存放的是各种可执行的应用程序的路径。

Classpath 是给 Java 使用的，从字面上类理解，就是类的路径，主要是模仿 Path，将类文件的路径配置到 Classpath 中实现在系统的任何位置可以对类文件进行编译和执行。

### Java 的关键字中有没有 goto

`goto`是 Java 中的保留字，不是关键字。

### 面向对象都有哪些特性

1. 继承。继承是从已有的类得到继承信息创建新类的过程。提供继承信息的类被称为父类（超类、基类）；得到继承信息的类被称为子类（派生类）。继承让变化中的软件系统有了一定的延续性，同时继承也是封装程序中可变因素的重要手段。
2. 封装。封装被通常认为是把数据和操作数据的方法绑定起来，对数据的访问只能通过已经定义的接口。面向对象的本质就是将现实世界描绘成一系列完全自治、封闭的对象。我们在类中编写的方法就是对实现细节的一种封装，我们编写一个类就是对数据和数据操作的封装。可以说，封装就是隐藏一切可以隐藏的东西，只向外界提供最简单的编程接口。
3. 多态性。多态性是指允许不同的子类型的对象对同一消息进行做出不同的响应。简单的说就是用同样的对象引用调用同样的方法但是做了不一样的事情。多态性分为编译时多态和运行时的多态性。如果将对象的方法视为对象向外界提供的服务，那么运行时的多态性可以理解为：当A系统访问B系统提供的服务时，B系统由多种提供服务的方式，但是一且对于A系统来说都是透明的。方法重载实现的是编译时的多样性，也成为前绑定，而方法重写实现的是运行时的多态性，也成为后绑定。运行时的多态是面向对象最精髓的东西，要实现多态需要做两件事：1.方法重写（子类继承父类并重写父类中已有的或抽象的方法）2.对象造型（用父类型引用子类型对象，这样同样的引用调用同样的方法就会更具子类对象的不同而表现出不同的行为）。
4. 抽象。抽象是将以类对象的共同特征总结出来的构造类的过程，包括数据抽象和行为抽象两方面。抽象只关注对象有哪些属性和行为，并不关注这些细节是什么。

### 访问权限修饰符public、private、protected，以及不写的时候的区别

![不同的权限修饰符的区别](https://i.loli.net/2020/01/05/qowPeisjBuyCVTN.png)

### `static` 关键字是什么意思？Java 中是否可以覆盖（Override）一个 private 或者是 static 的方法

`static`关键字表明一个成员变量或者是成员方法可以在没有所属的类的实例变量的情况下被访问。

Java 中 static 的方法不能被覆盖，因为方法覆盖是基于运行时动态绑定的，而 static 方法是编译时静态绑定的。static 方法跟类的任何实例都不想管，所以概念上不适用。

### Java 中的方法覆盖（Overriding）和方法重载（Overloading）是什么意思

Java 中的方法重载发生在同一个类里面两个或者是多个方法的方法名相同但是参数不同的情况。与此相对，方法覆盖始说子类重新定义了父类的方法。方法覆盖必须有相同的方法名，参数列表和返回类型。覆盖者可能不会限制它所覆盖的方法的访问。

### Overload 和 Override 的区别

方法的重写 Overriding 和重载 Overloading 是 Java 多态性的不同表现。重写 Overloadding 是父类与子类之间多态性的一种表现。如果在子类中定义某方法与其父类有相同的名称和函数，我们说该方法被重写 Overriding。子类的对象使用这个方法时，将调用子类中的定义，对他而言，父类中的定义如同被“屏蔽”了。如果在一个类中定义了多个同名的方法，他们或有不同的参数个数或有不同的参数类型，则成为方法的重载 Overloading。

重载：发生在同一个类中，方法名必须相同，参数类型不同、个数不同、顺序不同，方法返回值和访问修饰符可以不同，发生在编译时。

重写：发生在父子类中，方法名、参数列表必须相同，返回值范围小于等于父类，抛出异常的范围小于等于父类，访问修饰符范围大于等于父类，如果父类方法访问修饰符为 private 则子类不能重写该方法。

### String 和 StringBuffer、StringBuilder 的区别是什么？String 为什么是不可变的

可变性：

简单的来说，String 类中使用 final 关键字字符数组保存字符串，`private final char value[]`，所以 String 对象是不可变的。而StringBuilder 与StringBuffer 都继承自 AbscractStringBuilder 类，在该类中也是用字符数组保存字符串`char[] value`但是没有用 final 关键字修饰，所以这两种对象都是可变的。

StringBuilder 与 StringBuffer 的构造方法都是调用父类构造方法也就是 AbstractStringBuilder 实现的，大家可以自行查阅源码。

```java
abstract class AbstractStringBuilder implements Appendable, CharSequence {
    char[] value;
    int count;

    AbstractStringBuilder() {

    }

    AbstractStringBuilder(int capacity) {
        value = new char[capacity];
    }
```

线程安全性：

String中的对象是不可变的，也就可以理解为常量，线程安全。AbstractStringBuilder 是 StringBuilder 与 StringBuffer 的公共父类，定义了一些字符串的基本操作，如expandCapacity、append、insert、indexOf等公共方法。StringBuffer对方法加了同步锁或者对调用方法加了同步锁，所以是线程安全的。StringBuilder并未有对方法进行加同步锁，所以是非线程安全的。

性能：

每次对String类型进行改变的时候，都会生成一个新的String对象，然后将指针指向心得String对象。
StringBuffer每次都会对StringBuffer对象本身进行操作，而不是生成新的对象并改变对对象的引用。相同情况下使用StringBuilder相比使用StringBuffer仅能获得10%~15%左右的性能提升，却要冒多线程不安全的风险。

对于三者使用的总结：

1. 操作少量的数据 String
2. 单线程操作字符串缓冲区下操作大量数据 StringBuilder
3. 多线程操作字符串缓冲区下操作大量数据 StringBuffer

### 自动拆箱与自动装箱

装箱：将基本数据类型用它们对应的引用类型包装起来。
拆箱：将包装类型装换为基本数据类型。

### == 与 equals()

==：它的作用是判断两个对象的地址是不是相等。即，判断两个对象是不是同一个对象。（基本数据类型的==比较的是值，引用数据类型==比较的是内存地址）
equals()：它的作用也是判断两个对象是否相等。但他一般有两种使用情况：

- 类没有覆盖equals()方法。则通过equals()比较该类的两个对象时候，等价于通过“==”比较。
- 类覆盖了equals()方法的时候。一般，我们都覆盖equals()方法来两个对象的内容相等；若他们的内容相等，则返回true。

### 关于 final 关键字的一些总结

final 关键字主要用在三个地方：变量、方法、类。

1. 对于一个 final 变量，如果是基本数据类型的变量，则其数值一旦在初始化后便不能修改。如果是引用类型的变量，则在对其初始化之后便不能再让其指向另一个对象。
2. 当用 final 修饰一个类时候，表明这个类不能被继承。 final 类中的所有成员方法都会被隐式地指定为final 方法。
3. 使用final 方法的原因有两个。第一个原因是把方法锁定，以防止任何继承类修改它的含义。第二个原因是效率。在早期的Java实现版本中，会将 final 方法转为内嵌调用。但是如果方法过于庞大，可能看不到内嵌调用带来的任何性能提升（现在的Java版本已经不需要使用final方法进行这些优化了）。类中所有的 private 方法都隐式地指定为 final。

### Object类常见方法总结

Object类提供的11个方法：

- getClass()
- hashCode()
- equals()
- clone()
- toString()
- notify()
- notifyAll()
- wait()*3
- finalize()

### Java中的异常处理

![Java异常类层次结构图](https://i.loli.net/2020/01/04/oWX3VxkJBfcplir.png)

在 Java 中，所有的异常都有一个共同的祖先 java.lang 包中的 Throwable类。Throwable：有两个重要的子类：Exception和Error，二者都是Java异常处理的重要子类，各自都包含大量子类。

Error，错误，是程序无法处理的错误，表示运行应用程序中较为严重的问题。大多数错误域代码编写者执行的操作无关，而是表示代码运行时JVM出现的问题。例如，JVM运行错误，当JVM不再有继续执行操作所需的内存资源时，将出现 OutOfMemoryError。这些异常发生时，JVM一般会选择线程终止。

这些错误表示故障发生于JVM自身、或者发生在虚拟机试图执行应用时，如Java虚拟机运行错误、类定义错误等。这些错误是不可查的，因为他们在应用程序的控制和处理能力之外，而且绝大多数是程序运行时不允许出现的状况。对于设计合理的应用程序来说，即使确实发生了错误，本质上也不应该试图去处理他引起的异常状况。在Java中，错误通过Error的子类描述。

Exception，异常，是程序本身可以处理的异常。Exception有一个重要的子类RuntimeException。RuntimeException异常由Java虚拟机抛出，NullPointerException、ArithmeticException（算数异常）和ArrayIndexOutOfBoundsException。

（异常可以被程序自身处理，错误是无法处理的）

Throwable类的常用方法

- public String getMessage()；
- public String toString();
- public String getLocalizedMessage() // 返回异常的本地化信息，使用Throwable的子类覆盖这个方法，可 以声称本地化信息。如果子类没有覆盖该方法，则该方法返回的信息与getMessage()返回的结果相同。
- public void printStrackTrace()

异常处理总结：

- try块：用于捕获异常，气候可以接0到多个catch块，如果没有catch块，则必须跟一个finally块。
- catch块：用于处理try捕获到的异常。
- finally块：无论是否捕获或处理异常，finally块里的语句都会被执行。当try块或catch块中遇到return语句时，finally块中的语句会在方法返回值前被执行。

在以下四种情况下，finally块不会被执行：

1. 在finally语句块中发生了异常
2. 在前面的代码中使用了System.exit()退出程序。
3. 程序所在的线程死亡
4. 关闭CPU。

### 获取用键盘输入常用的两种方法

通过Scanner

```java
Scanner input = new Scanner(System.in);
String s = input.nextLine();
input.close();
```

通过BufferedReader

```java
BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
String s = input.readLine();
```

### 接口和抽象类的区别是什么

Java 提供和支持创建抽象类和接口。他们的实现有共同点，不同点在于：

- 类可以实现多个接口，但是只能继承一个抽象类
- 类可以不实现抽象类和接口声明的所有方法，当然，在这种情况下，类必须得声明成是抽象的。
- 抽象类可以在不提供接口方法实现的情况下实现接口。
- Java 接口中声明的变量默认都是 final 的。抽象类可以包含非 final 的变量。
- Java 接口中的成员函数默认是 public 的。抽象类的成员函数可以是 private，protected 或者是 public。
- 接口绝对是抽象的，不可以被实例化。抽象类也不可以被实例化，但是如果它包含 main 方法的话是可以被调用的。
也可以参考 JDK8 中抽象类和接口的区别。

- 接口方法默认是public，所有方法在接口中不能有实现（Java8开始接口方法可以有默认实现），抽象类可以有非抽象的方法。
- 接口中的实例变量默认是final类型的，而抽象类不一定。
- 一个类可以实现多个接口，但最多只能实现一个抽象类
- 一个类实现接口的话要实现接口的所有方法，而抽象类不一定
- 接口不能用new实例化，但可以声明，但是必须引用一个实现该接口的对象。从设计层面上来说，抽象是对类的抽象，是一种模板设计。接口是行为的抽象，是一种行为的规范。

在 JDK8 中，接口也可以定义静态方法，可以直接用接口名调用。实现类和实现是不可以调用的。如果同时实现两个接口，接口中定义了一样的默认方法，必须重写，不然会报错。

### 接口是否可继承接口？抽象类是否可实现接口？抽象类是否可靠继承实体类

接口可以继承接口，抽象类可以实现接口，抽象类可以继承实体类，但前提是实体类必须有明确的构造函数。

### Java 的基本数据类型跟引用数据类型分别有哪些

Java 的基本数据类型有8个，分别是：

- 整数型
  - byte
  - short
  - int
  - long
  - char
- 浮点型
  - float
  - double
- 字符型
  - char
- 布尔型
  - boolean

### char 型变量中能不能存储一个中文汉字，为什么

char 变量是用来存储 Unicode 编码的字符的，Unicode 编码字符集中包含了汉字，所以，char 变量中当然可以存储汉字啦。

### 简述 & 和 && 的区别

& 和 && 都可以用作逻辑与的运算符，表示逻辑与（and），当运算符两边的表达式的结果都为 true 时，整个运算结果才为 true，否则，只有有一方为 false，则结果为 false。

&& 还具有短路的功能，即如果第一个表达式为 false，则不再计算第二个表达式。

& 还可以用作位运算符。

### Java 中垃圾回收有什么目的？什么时候进行垃圾回收

垃圾回收的目的是识别并且丢弃引用不再使用的对象来释放和重用资源。

### 如果对象的引用被置为 null，垃圾回收器是否会立即释放对象占用的内存

不会，在下一个垃圾回收周期中，这个对象是可被回收的。

### 进程和线程的区别是什么

进程是执行着的应用程序，而线程是进程内部的一个执行序列。一个进程可以有多个线程。线程又叫做轻量级进程。

### 创建线程有几种不同的方式

有三种方式可以用来创建线程：

- 继承 Thread 类
- 实现 Runnable/Callable 接口
- 应用程序可以使用 Executor 框架来创建线程池

实现接口这种方式更受欢迎，因为这不需要继承 Thread 类。在应用设计中已经继承了别的对象的情况下，这需要多继承（而 Java 不支持多继承），只能实现接口。同时，线程池是非常高效的，很容易实现和使用。
