---
title: JetBrains系列激活方法
category:
  - 转载
  - 技术
comments: false
author: Neo Peng
tags:
  - IDEA
  - JetBrains
abbrlink: 3d7d7b43
description: 
date: 2020-01-04 09:12:03
---

> 本文转载自zhile.io，有疑问请留言板联系我。

**下面是国际惯例：**



> 本项目只做个人学习研究之用，不得用于商业用途！  
> 若资金允许，请点击[链接](https://www.jetbrains.com/idea/buy/)购买正版，谢谢合作！  
> 学生凭学生证可[免费申请](https://sales.jetbrains.com/hc/zh-cn/articles/207154369-%E5%AD%A6%E7%94%9F%E6%8E%88%E6%9D%83%E7%94%B3%E8%AF%B7%E6%96%B9%E5%BC%8F)正版授权！  
> 创业公司可5折[购买](https://www.jetbrains.com/shop/eform/startup)正版授权！


下面叫你使用补丁激活IDE。

传送门(原文链接)：

[点我获取最新 jetbrains-agent](https://zhile.io/2018/08/25/jetbrains-license-server-crack.html)

---------

**使用教程：**

 **如果你下载的jetbrains-agent.jar小于1M，肯定是没有下载完全（可对照sha1sum.txt）。**

 **请先一定仔细阅读本文档！一定通过IDE菜单编辑javaagent参数，别瞎TM在bin目录下改！！！**

 **可以参考文件夹内：javaagent_sample.png**

使用方法:

- 先下载压缩包解压后得到jetbrains-agent.jar，把它放到你认为合适的文件夹内。(无空格，仅英文，不在C盘)
- 启动你的IDE，如果上来就需要注册，选择：试用（Evaluate for free）进入IDE。如果你先前用过别的激活码，请先删除该激活码：Help->register->Remove Lisence->重启IDE
- 点击你要注册的IDE菜单："Configure" 或 "Help" -> "Edit Custom VM Options ..."
如果提示是否要创建文件，请点"Yes"。[参考文章](https://intellij-support.jetbrains.com/hc/en-us/articles/206544869)
- 在打开的vmoptions编辑窗口末行添加：`-javaagent:/绝对路径/到/你的/jetbrains-agent.jar`
一定要自己确认好路径(不要使用中文路径)，填错会导致IDE打不开！！！最好使用绝对路径。
一个vmoptions内只能有一个-javaagent参数。
    示例:
      mac:      -javaagent:/Users/neo/jetbrains-agent.jar
      linux:    -javaagent:/home/neo/jetbrains-agent.jar
      windows:  -javaagent:E:\Users\neo\jetbrains-agent.jar
如果还是填错了，参考[这篇文章](https://intellij-support.jetbrains.com/hc/en-us/articles/206544519)编辑vmoptions补救。
- 重启你的IDE。
- 点击IDE菜单 "Help" -> "Register..." 或 "Configure" -> "Manage License..."
  - 支持两种注册方式：License server 和 Activation code:
    - 1). 选择License server方式，地址填入：`http://fls.jetbrains-agent.com` （网络不佳的用第2种方式）
    - 2). 选择Activation code方式离线激活，请使用：ACTIVATION_CODE.txt 内的注册码激活
    - 如果激活窗口一直弹出（error 1653219），请去hosts文件里“移除”jetbrains相关的项目
    - License key is in legacy format == Key invalid，表示agent配置未生效.
    - 如果你需要自定义License name，请访问：https://zhile.io/custom-license.html

IDE升级会从旧版本导入以上设置，导入配置后可能提示未注册（因为刚导入的vmoptions未生效），直接重启IDE即可，无需其他操作。
