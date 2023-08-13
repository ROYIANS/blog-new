---
title: Go_02 Golangの安装编译运行
tags: Go
category: Go之路
comments: false
abbrlink: c83eb85e
date: 2019-07-12 08:12:51
#password:
---

昨天我们了解了一下Go语言，文章的最后给出了一个程序，那么正如我们需要安装JDK编译Java程序并运行一样，Go语言同样需要配置相关环境。

<!-- more -->

## 安装Go

首先，先去[Go语言官网⇲][1]下载安装包。

![Go语言官网](https://i.loli.net/2019/10/31/9FWPAHkb34x56zL.png)

网页左边有一个Download按钮，点击即可跳转到下载页面，在这里按照你的系统下载

![下载页面](https://i.loli.net/2019/10/31/h7OQyGzBqpZ8jSM.png)

你可以发现在主页右面有一个*Try Go*，在下方的文本框里可以写简单的Go程序并直接运行之。

下载好程序后的安装过程就不赘述了，主要了解一下下面的配置。

在 Go-1.8 版本之前呢，我们是必须设置环境变量的，但是 Go-1.8（含）版本之后，如果没有特别配置，默认使用以下路径作为GOPATH

Windows：

```bash
%USERPROFILE%/go
```

Linux:

```bash
$HOME/go
```

Mac:

```bash
通过修改 ~/.bash_profile 来设置
```

配置好后，我们在终端使用以下命令查看是否正确配置了Go：

```bash
go version
```

![go version](https://i.loli.net/2019/10/31/Ws2rDPpxlVjYGdB.png)

好了，假设我使用的是 Cent OS 7 ，接下来我们新建一个目录来存放最近要开始学习的Go源文件：

```bash
cd ~
mkdir go_learning
cd go_learning
mkdir src # 新建源码文件夹
cd src
mkdir day01/main # 新建一个 package
touch hello_world.go
```

Go语言的源文件是以go为后缀名的。接下来我们用vim编辑这个文件

```go
// package 声明语句，声明 package 为 main
package main // 包，表明代码所在的模块

// 导包
import "fmt" // 引入代码依赖

// 主函数，功能实现
func main() {
    fmt.Println("Hello world")
}
```

接下来我们保存这个文件，在终端准备运行这个程序

```bash
go run hello_word.go
```

如我们所想，控制台输出了Hello world字样。

`go run`是直接运行，如果我们想编译这个文件的话，使用这个命令：

```bash
go build hello_world.go
```

运行此条命令后，一个二进制文件就生成了。

可执行的限制要求：

- 必须是main包
- 必须是main方法
- 文件名不一定是main.go
- 文件不一定放在main文件夹下

退出返回值：

- Go 中 main 函数**不支持任何返回值**
- 通过`os.Exit`来返回状态
- Go 中 main 函数**不支持传入参数**
- 通过`os.Args`获取命令行参数

```go
package main

import "fmt"

// ERROR, main 不支持任何返回值
/*
func main() int {
    fmt.Println("...")
    return 1
}
*/

// ERROR, main 不支持任何参数
/*
func main(arg []string) {
    // do something
}
*/

// 通过 os.Exit 来返回状态, 通过 os.Args 获取命令行参数
func main() {
    fmt.Println(os.Args)

    if len(os.Args) > 1 {
        fmt.Println(os.Args[1])
    }

    os.Exit(0)
}

```

[( ^ω^)]: # (链接放下面)

[1]: https://golang.google.cn/
