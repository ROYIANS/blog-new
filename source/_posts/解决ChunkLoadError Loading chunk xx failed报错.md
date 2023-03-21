---
title: 解决 ChunkLoadError Loading chunk xx failed 报错
categories: 随记
tag:
  - 前端
  - Vue.js
  - webpack
  - JavaScript
cover: /images/covers/2023/01/0501.webp
abbrlink: 2023010501
date: 2023-01-05
recommend: true
cc: 原创
---

## 问题的出现

年前我开发了一个小工程：[打印模板设计器](https://royians.github.io/print-template-designer/)，开发过程中其实遇到了很多问题，我想现在可以有一点时间记录一些问题，供以后参考。

问题是在我已经发包以后出现的，因为我要在父工程引入我这个打印模板设计器，因此需要按照lib库的形式，也就是npm包引进父工程，接着问题就出现了：当我打开父工程页面的时候，我发现左侧的面板里都是空白的（下图框选部分），按常理来说是有组件内容的！

![](https://royians.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fee72a089-c654-40e5-b38b-f1ecb8325b2c%2FUntitled.png?id=0867e9f5-9ba2-4a4b-8249-7e9121a37701&table=block&spaceId=b25f0245-21a9-49f6-af5a-33c2f791d93e&width=2000&userId=&cache=v2)

接着打开控制台，就发现如下报错：`SyntaxError: Unexpected character '<'` 跟断点发现是找不到一个chunk文件的位置，import的时候就报错了。如果这个路径不存在，就会重定向到 `/` ,所以报了这个错。

于是我到网络上寻求帮助，最后发现这篇文章：

[[VUE报错] npm的lib库打包模式,引用时 ChunkLoadError 加载分包失败](https://www.jianshu.com/p/8a4d627e4bec)

按照博主的解释:

> 因为使用了懒加载, webpack编译时, 转译分包引用路径为 “基于网页根目录”, 而我们目标是 node_modules/<projectName>/lib/ 下的分包.
> 所以, 我们在网页根目录的js目录下自然找不到对应懒加载分包.

最后按照博主的解决方法，我选择合并分包，也就是在 vue.config.js 中进行如下配置：

```javascript
module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        // 限制只打一个包，不分Chunk
        maxChunks: 1
      })
    ]
  }
})
```

然后发包测试，问题解决！

## 扩展阅读

- [【Webpack】异步加载(懒加载)原理 - 掘金 (juejin.cn)](https://juejin.cn/post/7152516872330543141)
- [【魔法注释】路由懒加载+webpackChunkName - 掘金 (juejin.cn)](https://juejin.cn/post/7016890750193369101)
- [Lazy Loading | webpack](https://webpack.js.org/guides/lazy-loading/)
