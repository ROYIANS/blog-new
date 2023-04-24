---
title: JS 事件循环学习笔记
categories: [随记]
tag:
  - 前端
  - JavaScript
  - 随记
cover: /images/covers/2023/03/2001.webp
abbrlink: 2023032001
date: 2023-03-20
recommend: true
cc: 原创
comment: true
---

今天来学习下 JS 中的事件循环。

## 浏览器的进程模型

### 进程

- 程序运行所需要的（内存）空间。
- 一个程序至少一个进程
- 相互隔离，相互独立。
- 可以通信（双方同意）

![内存空间](/images/post_images/20230320-b09f3c7e9f944bfa8f8daacbeab89520.webp)


### 线程

- 线程就是运行代码的 “人”
- 一个进程至少一个线程
- 主线程：跟随进程自动启动的线程

![线程](/images/post_images/20230320-78143c0adde64e2ebe655bc36849c73d.webp)






### 浏览器的进程和线程

- 浏览器是多进程、多线程的应用程序
