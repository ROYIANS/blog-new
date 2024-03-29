---
title: 【基础】Java工程师成神之路第一天
date: 2019-09-09 15:28:01
author: ROYAINS
note: 此文件仅供写者本人使用、编辑、查看，且并禁止传播到网络。
comments: false
abbrlink: 6ccfaf30
password: ROYIANS123456
description: 从今天开始我们学习Java基础篇的相关知识。
tags:
    - Java
    - 未完成
category:
  - 技术
  - Java
---

> 从今天开始我们学习Java基础篇的相关知识。

<!-- more -->

# 面向对象

## 什么是面向对象

### 面向对象、面向过程

&emsp;&emsp;什么是面向过程？什么又是面向对象呢？这个问题在我们刚上大学的时候就接触过了。POP(Process-oriented Programming)，面向过程，就是一种以时间为中心的编程思想，分析出解决问题的步骤，然后用函数把这些步骤实现，并按顺序调用。也就是说，在进行面向过程编程的时候，我们不需要考虑那么多，上来先定义一个函数，然后使用各种诸如if-else、for-each等方法进行代码执行。
&emsp;&emsp;最典型的用法就是实现一个简单的算法，比如实现冒泡排序。
&emsp;&emsp;OOP(Object-oriented Programming)是指在软件开发过程中，宏观上，用面向对象来把我十五间复杂的关系，分析系统。微观上，仍然使用面向过程。面向对象是以对象为中心的编程思想。是一种**将事务高度抽象化的编程模式**。

&emsp;&emsp;将问题分解成一个一个步骤，对每个步骤进行相应抽象，形成对象，通过不同对象之间的调用，组合解决问题。

&emsp;&emsp;也就是说，在进行面向对象编程的时候，要把属性、行为等封装成对象，然后基于这些对象及对象的能力进行业务逻辑的实现。

&emsp;&emsp;比如：造车，要把车的各种属性定义出来，然后抽象成一个Car类。

&emsp;&emsp;**e.g.**:象棋设计

- 面向对象：创建黑白双方的对象负责演算，棋盘的对象负责画布，规则的对象负责判断，例子可以看出，面向对象更重视不重复造轮子，即创建一次，重复使用。
- 面向过程：开始-黑走-棋盘-判断-白走-棋盘-判断-循环。只需要关注每一步如何实现即可。

&emsp;&emsp;优劣对比：

- 面向对象：占用资源相对高，速度相对慢
- 面向过程：占用资源相对低，速度相对快

&emsp;&emsp;面向过程让计算机有步骤地顺次做件事情，是种过程化的叙事思维。但是在大型软件开发过程中，发现用面向过程语言开发，软件维护、软件复用存在着巨大的困难，代码开发变成了记流水账，久而久之就成为“面条” 代码，模块之间互相辑合，流程互相穿插，往往牵发而动全身。面向对象提出一种计算机世界里解决复杂软件工程的方法论，拆解问题复杂度，从人类思维角度提出解决问题的步骤和方案。

&emsp;&emsp;比如“开门”这个动作，面向过程是 open(Door door) 作对象的参数传入方法的，方法内定义开门的具体步骤实现。而在面向对象的世界里，首先定义一个对象 “Door” ，然后抽象出门的属性和相关操作，属性包括门的尺寸、颜色、开启方式（往外开还是往内开）、防盗功能等，门这个对象的操作必然包括 open() 和 close() 两个必备的行为。面向过程的结构相对松散， 强调如何流程化地解决问题；面向对象的思维更加内聚，强调高内聚、低耦合，先抽象模型，定义共性行为，再解决实际问题。

&emsp;&emsp;但是，编程语言仅是一个工具，就像练武之人的剑，武功高者草木皆剑，武功差者即使莫那剑在身也依然平庸。所以，能否将工具的价值发挥得淋漓尽致，最终还是取决于开发工程师本身。优秀的开发工程师用面向过程的语言也能把程序写得非常内聚，可扩展性好，具备一定的复用性；而平庸程序员用面向对象语言一样能把程序写得松散随意、毫无抽象与建模、模块间耦合严重、维护性差。

### 面向对象的三大基本特征和五大基本原则

&emsp;&emsp;传统意义上，面向对象有三大特性：封装、继承、多态。在[《阿里Java开发手册》]()中，将“抽象”也作为面向对象的特性之一，支持“四大特征”的说法。手册解释道：

> 抽象是程序员的核心素养之一，体现出程序员对业务的建模能力，以及对架构的宏观掌控力。虽然面向过程也需要进行一定的抽象能力，但是相对来说，面向对象思维，以对象模型为核心，丰富模型的内涵，扩展模型的外延，通过模型的行为组合去共同解决某一类问题，抽象能力显得尤为重要。

&emsp;&emsp;所谓封装，也就是把客观事物封装成抽象的类，并且类可以把自己的数据和方法只让可信的类或对象操作，对不可信的进行信息隐藏。封装是面向对象的特征之一，是对象和类概念的主要特性。简单地说，一个类就是一个封装了数据以及操作这些数据的代码的逻辑实体。在一个对象内部，某些代码或某些数据可以是私有的，不能被外界访问。通过这种方式，对象对内部数据提供了不同级别的保护，以防止程序中无关的部分意外的改变或错误的使用了对象的私有部分。

&emsp;&emsp;继承是指这样一种能力：它可以使用现有类的所有功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。通过继承创建的新类被称为“子类”或“派生类”，被继承的类被称为“基类”、“父类”或“超类”。继承的过程，就是从一般到特殊的过程。要实现继承，可以通过“继承”和“组合”来实现。继承概念的实现方式有两类：实现继承和接口继承。实现继承是指直接使用基类的属性和方法而无需额外的编码能力；接口继承是指仅使用属性和方法的名称，但是子类必须提供实现的能力。

&emsp;&emsp;所谓多态就是指一个类实例的相同方法在不同情形下有不同的表现形式。多态机制使具有不同内部结构的对象可以共享相同的外部接口。这意味着，虽然针对不同对象的具体操作不同，但通过一个公共的类，它们（那些操作）可以通过相同的方式予以调用。

&emsp;&emsp;最常见的多态就是将子类传入父类参数中，运行时调用父类方法时通过传入的子类决定具体的内部结构或行为。

&emsp;&emsp;抽象是面向对象思想最基础的能力之一，正确而严谨的业务抽象和建模分析能力是后续的封装、继承、多态的基础，是软件大厦的及时。在面向对象思维中，抽象分为归纳和演绎。前者是从具体到本质，从个性到共性，将一类对象的共同特征进行归一化的逻辑思维过程；后者是从本质到具体，从共性到个性，逐步形象化的过程。在归纳的过程中，需要抽象出对象的属性和行为的共性，难度大于演绎。演绎是在已有问题解决方案的基础上，正确地找到合适的使用场景。演绎错误在使用集合时比较常见，比如针对查多改少的业务场景，使用链表是非常不合理的；底层框架技术选型时如果偶错误，则可能导致技术架构完全不适应业务的快速发展。

&emsp;&emsp;以上即是面向对象的三大基本特征。接下来我们讲五大原则：

&emsp;&emsp;**单一职责原则：**

&emsp;&emsp;其核心思想为：一个类，最好只做一件事，只有一个引起它的变化。单一职责原则可以看作是低耦合、高内聚在面向对象原则上的引申，将职责定义为引起变化的原因，以提高内聚性来减少引起变化的原因。职责过多，可能引起它变化的原因就越多这将导致职责依赖，相互之间就产生影响，从而大大损伤其内聚性和耦合度。通常意义下的单一职责，就是指只有一种单一功能，不要为类实现过多的功能点，以保证实体只有一个引起它变化的原因。专注，是一个人优良的品质；同样地，单一也是一个类的优良设计。交杂不清的职责将会使得代码看起来特别别扭，牵一发而动全身，又是美感和必然导致丑陋的系统错误的风险。

&emsp;&emsp;**开放封闭原则：**

&emsp;&emsp;其核心思想是：软件实体应该是可扩展的，而不可修改的。也就是，对扩展开放，对修改是封闭的。开放封闭原则主要体现在两个方面：

- 对扩展开放。意味着有新的需求或变化时，可以对现有代码进行扩展，以适应新的情况。
- 对修改封闭。意味着类一旦设计完成，就可以独立完成其工作，而不需要对其进行任何修改。

&emsp;&emsp;实现开放封闭原则的核心思想就是对抽象编程，而不是对具体编程。因为抽象相对稳定。让类依赖于固定的抽象，所以修改就是封闭的；而通过面向对象的继承和多态机制，又可以实现对抽象类的继承，通过覆写其方法来改变固有的行为，实现新的拓展方法，所以就是开放的。“需求总是变化”，没有不变的软件，所以就需要用等比开放原则来封闭变化满足需求，同时还能保持软件内部的封装体系稳定，不被需求的变化影响。

&emsp;&emsp;**Liskov替换原则：**

&emsp;&emsp;里氏替换原则的核心思想是：子类必须能够替换其基类。这一思想体现为对继承机制的约束规范，只有子类能够替换基类时，才能保证系统在运行期内识别子类，这是保证继承复用的基础。在父类和子类的具体行为中，必须严格把握继承层次中的关系和特征，将基类替换为子类，程序的行为不会发生任何变化。同时，这一约束反过来则是不成立的，子类可以替换积累，但是基类不一定能替换子类。里氏替换原则，主要着眼于对抽象和多态建立在继承的基础上，因此只有遵了里氏替换原则，才能保证继承服用是可靠的。实现的方法是面向接口编程：将公共部分抽象为基类接口或抽象类，通过`Extract Abstract Class`，在子类中通过覆写父类的方法实现新的方式支持同样的职责。里氏替换原则是关于继承机制的设计原则，违反里氏替换原则就必然导致违反开放-封闭原则。里氏替换原则能够保证系统具有良好的拓展性，同时实现基于多态的抽象机制，能够减少代码冗余，避免运行期的类型判别。

&emsp;&emsp;**依赖倒置原则：**

&emsp;&emsp;其核心思想是：依赖于抽象。具体而言就是高层模块不依赖于底层模块，二者都同时依赖于抽象；抽象不依赖于具体，具体依赖于抽象。我们知道，类一定会存在类与类、模块与模块之间。当两个模块之间存在紧密的耦合关系时，最好的方法就是分离接口和实现：在依赖之间定义一个抽象的接口，以此来邮箱控制耦合关系，达到依赖于抽象的设计目标。抽象的稳定性决定了系统的稳定性，因为抽象是不变的，依赖于抽象是一个通用的原则，而某些时候依赖于细节则是在所难免的，必须权衡在抽象和具体之间的取舍，方法不是一成不变的。依赖于抽象，就是对接口编程，不要对实现编程。

&emsp;&emsp;**接口隔离原则：**

&emsp;&emsp;其核心思想是：使用多个小的专门的接口，而不要使用一个大的总接口。具体而言，接口隔离原则体现在：接口应该是内聚的，应该避免“胖”的接口。一个类对另外一个类的依赖应该建立在最小的接口上，不要强迫依赖不用的方法，这是一种接口污染。接口有效地将细节和抽象隔离，体现了对抽象编程的一切好处，接口隔离强调接口的单一性。而“胖”接口存在明显的弊端，会导致实现的类型并非需要所有的接口定义，这在设计上这是浪费，而且在实施上这会带来潜在的问题，对“胖”接口的修改将导致一连串的客户端程序需要修改，有时候这是一种灾难。在这种情况下将“胖”接口分解为多个特点的定制化方法，使得客户端仅仅依赖于它们的实际调用的方法，从而解除了客户端不会依赖于他们不用的方法。分离的手段主要有以下两种：

- 委托分离。通过增加一个新的类型来委托客户的请求，隔离客户和接口的直接以来，但是会增加系统的开销。
- 多重继承分离。通过接口多继承来实现客户的需求，这种方法是较好的。

&emsp;&emsp;以上就是五个基本的面向对象设计原则，他们就像面向对象程序设计中的金科玉律，遵守他们可以使我们的代码更加鲜活，易于复用，易于拓展，灵活优雅。不同的设计模式对应不同的需求，而设计原则则代表永恒的灵魂，需要在实践中时时刻刻的遵守。就如ARTHUR J.RIEL在那本《OOD启示录》中所说的：

> 你并不必严格遵守这些原则，违背他们也不会被初一宗教刑罚。但是你应当把这些原则看作警铃，若违背了其中一条，那么警铃就会响起

## 平台无关性

### Java如何实现的平台无关性的

&emsp;&emsp;Java是一门跨平台的语言，Java是平台无关性的，这也是Java语言可以迅速崛起并风光无限的一个重要的原因。

&emsp;&emsp;**什么是平台无关性：**

&emsp;&emsp;平台无关性就是一种语言在计算机上运行不受平台的约束，一次编译，到处运行（Write once， run anywhere）。

&emsp;&emsp;也就是说，用java创建的可执行二进制程序，能够不加改变的运行于多个平台。

&emsp;&emsp;**平台无关性的好处：**

&emsp;&emsp;作为一门平台无关性语言，无论是在自身发展，还是对开发者的友好度上都是很突出的。

&emsp;&emsp;因为其平台无关性，所以Java程序可以运行在各种各样的设备上，尤其是一些嵌入式设备，如打印机、扫描仪、传真机等。随着5G时代的来临，也会有更多的终端接入网络，相信平台无关性的Java也能做一些贡献。

&emsp;&emsp;对于Java开发者来说，Java减少了开发和部署到多个平台的成本和时间。真正的做到一次编译，到处运行。

&emsp;&emsp;**平台无关性的实现：**

&emsp;&emsp;对于java平台无关性的支持，就像对安全性和网络移动性的支持一样，是分布在整个Java体系结构中的。其中扮演着重要的角色的有Java语言规范、class文件、Java虚拟机（JVM）等。

&emsp;&emsp;**编译原理基础：**

&emsp;&emsp;在计算机世界中，计算机只认识0和1，所以，真正被计算机执行的其实是由0和1组成的二进制文件。

&emsp;&emsp;但是，我们日程使用的C、C++、Java、Python等都属于高级语言，而非二进制语。所以，想要让计算机认识我们写出来的Java代码，就需要把它编译成二进制文件，负责这个过程的处理工具就叫做编译器。

&emsp;&emsp;在Java平台中，想要把Java文件编译成二进制文件，与要经过两步编译，前端编译和后端编译。

&emsp;&emsp;**前端编译**主要指与元语言有关但与目标机无关的部分，Java中，我们所熟知的`javac`的编译就是前端编译。除了这种以外，我们使用的很多IDE，如Eclipse、IDEA等，都内置了前端编译器。主要功能就是把`.java`代码转换成`.class`代码。

&emsp;&emsp;这里提到的`.class`代码，其实就是class文件。

&emsp;&emsp;后端编译主要是将中间代码再翻译成机器语言。Java中，这一步骤就是JVM来执行的。

&emsp;&emsp;**Java虚拟机**

&emsp;&emsp;所谓平台无关性，就是说能够做到可以在多个平台上都能无缝对接。但是，对于不同的平台，硬件和操作系统肯定都是不一样的。

&emsp;&emsp;对于不同的硬件和操作系统，最主要及区别就是指令不同。比如同样执行a+b，A操作系统对应的二进制指令可能是10001000，而B操作系统对应的指令可能是11101110.那么想做跨平台，最重要的就是可以根据对应的硬件和操作系统生成对应的二进制指令。

&emsp;&emsp;而这一工作，主要由JVM完成。虽然Java语言是平台无关的，但JVM却是平台有关的，不同操作系统需要安装对应的Java虚拟机。

&emsp;&emsp;有了Java虚拟机，想要执行a+b的操作，A操作系统和B操作系统上面的虚拟机，就会把指令翻译成机器对应的二进制码。

&emsp;&emsp;所以，Java之所以可以做到跨平台，是因为Java虚拟机充当了桥梁。它扮演运行时Java程序与其下的硬件和操作系统之间的缓冲角色。

&emsp;&emsp;**字节码**

&emsp;&emsp;各种不同平台的虚拟机都使用统一的程序存储格式——字节码。是构成平台无关性的另一个基石。Java虚拟机只与由字节码组成的class文件进行交互。

&emsp;&emsp;我们说的Java原因呢可以一次编译，到处运行，这里的Write其实指的就是生成class文件的过程。

&emsp;&emsp;因为Java class文件可以在任何平台创建，也可以被任何平台的Java虚拟机装载并执行，所以才有了Java平台的无关性。

&emsp;&emsp;**Java语言规范**

&emsp;&emsp;已经有了统一的class文件，以及可以在不同平台上将class文件翻译成对应的二进制文件的Java虚拟机，Java就可以彻底实现跨平台了吗？

&emsp;&emsp;其实不然，Java语言在快平台方面也是做了一些努力的，这些努力被定义在Java语言规范中。

&emsp;&emsp;比如，Java中的基本数据类型的值域和行为都是由其自己定义的，而在C/C++中，基本数据类型是由他的占位宽度决定的。