---
author: ROYIANS
title: 在Windows系统中使用Linux
cc: 原创
tag: [ 技术 ]
keywords: ROYIANS,小梦岛,在Windows系统中使用Linux
comment: true
recommend: false
date: 2020-02-16
abbrlink: 2020021601
cover: https://img.vidorra.life/images/covers/2023/04/2101.webp
---

> 最开始学习Linux时使用的是VM Ware虚拟机装的CentOS，之后折腾电脑双系统，先后使用了凤凰OS（PC上的Android X86项目），和Deepin Linux系统。在之后有了自己的网站，就开始折腾服务器，在vultr上开启了我的CentOS 7系统，在Windows上使用XShell连接。再后来博客迁移到了Github托管，服务器放着太费钱，我就退掉了。

现在我的电脑已经使用了将近四年了，的确不如刚见他时那么生龙活虎了，我十分爱惜他，因此不愿意再装一个虚拟机或者搞双系统了。但是我有非常想要一个Linux系统实操学习，可咋办嘛？

其实早早地就听说了微软的WSL(Windows Subsystem for Linux)，知道可以使用Windows直接运行Linux系统了，就像[微软官方教程](https://docs.microsoft.com/zh-cn/learn/modules/get-started-with-windows-subsystem-for-linux/1-introduction)中所说的：

> 无论是经验丰富的开发人员，还是刚入门的新手，需要做出的最重要决定之一就是，使用什么类型的硬件和开发环境。 过去，大多数专业开发人员都会告诉你坚持使用 macOS 或 Linux，因为可以轻松安装和使用最常见的开发工具、语言和框架。 随着 Windows Subsystem for Linux (WSL) 的出现，这一切都发生了变化。 借助 WSL，可以直接在 Windows 上运行 GNU/Linux 环境（未经修改，并与 Windows 文件系统完全集成，包括大多数命令行工具、实用程序和应用），以及最常用工具（如 Visual Studio Code）。

接下来，我就边写博客，边按照教程安装/启用WSL！

[](#启用-Windows-Subsystem-for-Linux，并安装发行版本 "启用 Windows Subsystem for Linux，并安装发行版本")启用 Windows Subsystem for Linux，并安装发行版本
--------------------------------------------------------------------------------------------------------------------------

首先使用管理员身份打开PowerShell，然后输入以下命令启用WSL：

```bash
  Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

接下来会出现一个进度条，读条完毕就会提示你重启电脑。现在我重启电脑了，我们稍后见：

[![提示重启电脑](https://i.loli.net/2020/02/16/S5IxLq1bF8TPJzO.png)](https://i.loli.net/2020/02/16/S5IxLq1bF8TPJzO.png "提示重启电脑")

[提示重启电脑](https://i.loli.net/2020/02/16/S5IxLq1bF8TPJzO.png "提示重启电脑")

[](#安装-Linux-发行版本 "安装 Linux 发行版本")安装 Linux 发行版本
-----------------------------------------------

我胡汉三回来啦！系统重启完毕，接下来安装Linux。有五种系统可选：

*   Ubuntu
*   openSUSE
*   SLES
*   Kali Linux
*   Debian GNU/Linux

我自然是选Ubuntu，因为比较熟悉，哈哈！Windows store，启动！

[![lalala](https://cdn.cdnjson.com/ww4.sinaimg.cn/large/9150e4e5ly1fld9ks1e1og206o06o747.gif)](http://ww4.sinaimg.cn/large/9150e4e5ly1fld9ks1e1og206o06o747.gif "lalala")

[![Store页面](https://i.loli.net/2020/02/16/goIPLDBQNGfH4n7.png)](https://i.loli.net/2020/02/16/goIPLDBQNGfH4n7.png "Store页面")

[Store页面](https://i.loli.net/2020/02/16/goIPLDBQNGfH4n7.png "Store页面")

[![安装包有200M](https://i.loli.net/2020/02/16/VDkvjwn1zGCJfiX.png)](https://i.loli.net/2020/02/16/VDkvjwn1zGCJfiX.png "安装包有200M")

[安装包有200M](https://i.loli.net/2020/02/16/VDkvjwn1zGCJfiX.png "安装包有200M")

好啦，点击获取，就等着了。

[![等......](https://cdn.cdnjson.com/ww4.sinaimg.cn/large/9150e4e5gy1g5mu7tlzjzj206o06ogma.jpg)](http://ww4.sinaimg.cn/large/9150e4e5gy1g5mu7tlzjzj206o06ogma.jpg "等......")

[![安装好了](https://i.loli.net/2020/02/16/XfsncdraxmqVB9p.png)](https://i.loli.net/2020/02/16/XfsncdraxmqVB9p.png "安装好了")

[安装好了](https://i.loli.net/2020/02/16/XfsncdraxmqVB9p.png "安装好了")

安装完毕！点击启动，会跳出下面的框框开始安装！

[![需要几分钟时间](https://i.loli.net/2020/02/16/gwNIytjdL9G2bck.png)](https://i.loli.net/2020/02/16/gwNIytjdL9G2bck.png "需要几分钟时间")

[需要几分钟时间](https://i.loli.net/2020/02/16/gwNIytjdL9G2bck.png "需要几分钟时间")

接下来就是设置用户名和密码啦

[![设置用户名](https://i.loli.net/2020/02/16/yjgOwWFJmle3puh.png)](https://i.loli.net/2020/02/16/yjgOwWFJmle3puh.png "设置用户名")

[设置用户名](https://i.loli.net/2020/02/16/yjgOwWFJmle3puh.png "设置用户名")

设置完毕，第一次报错是因为我命名不规范。。。

[![进入命令界面](https://i.loli.net/2020/02/16/3QFsSjmVBwgb45N.png)](https://i.loli.net/2020/02/16/3QFsSjmVBwgb45N.png "进入命令界面")

[进入命令界面](https://i.loli.net/2020/02/16/3QFsSjmVBwgb45N.png "进入命令界面")

这样Unbutu就安装好啦！

[![hahaha](https://cdn.cdnjson.com/ww3.sinaimg.cn/large/9150e4e5gy1g9315veiecj2089060wef.jpg)](http://ww3.sinaimg.cn/large/9150e4e5gy1g9315veiecj2089060wef.jpg "hahaha")


[](#设置root用户密码 "设置root用户密码")设置root用户密码
--------------------------------------

但是root用户的密码是什么呢？开始菜单输入wsl并运行，会发现上面有一行小字：

[![有一行小字](https://i.loli.net/2020/02/16/9PMzvjTdfgE1AkU.png)](https://i.loli.net/2020/02/16/9PMzvjTdfgE1AkU.png "有一行小字")

[有一行小字](https://i.loli.net/2020/02/16/9PMzvjTdfgE1AkU.png "有一行小字")

按照提示，输入：

```bash
  man sudo_root
```

查看文件：

```bash
NAME
       sudo_root - How to run administrative commands

SYNOPSIS
       sudo command

       sudo -i

INTRODUCTION
       By default, the password for the user "root" (the system administrator) is locked. This means you cannot login
       as root or use su. Instead, the installer will set up sudo to allow the user that is created during install to
       run all administrative commands.
......................
```

太长了不粘贴了。其实Unbuntu安装后root时所定的，但是注册的第一个用户所在的用户组是admin，所以他可以设置root密码：

```bash
  sudo passwd root
```

[![成功设置root密码并登录！](https://i.loli.net/2020/02/16/UpGKfWLThI1Sbye.png)](https://i.loli.net/2020/02/16/UpGKfWLThI1Sbye.png "成功设置root密码并登录！")

[成功设置root密码并登录！](https://i.loli.net/2020/02/16/UpGKfWLThI1Sbye.png "成功设置root密码并登录！")

至此我们的Unbuntu安装完成！下来就可以好好折腾啦！
