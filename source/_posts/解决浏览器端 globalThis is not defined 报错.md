---
title: 解决浏览器端 globalThis is not defined 报错
categories: 技术碎片
tag:
  - 前端
  - JavaScript
cover: /img/2023/01/0401.webp
abbrlink: 2023010401
date: 2023-01-04
recommend: true
cc: 原创
---

今日开发时，生产运维人员上报说页面打开一片空白，无法进入系统。排查一下发现是我的[print-template-designer](https://github.com/ROYIANS/print-template-designer)报的错，报了一个 `globalThis is not defined`。

其实之前好像印象中也遇到过此类错误，一般就是浏览器版本太低了。

上[Can I Use](https://caniuse.com/?search=global%20this)查一下，发现 `globalThis` 在 chrome70 版本之前都不支持的。

![can i use 查询结果](https://royians.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F037a280f-63e9-4549-a9c0-f7f2cadcdb68%2FUntitled.png?id=f5983de1-0522-4d38-8520-5f8e942e866b&table=block&spaceId=b25f0245-21a9-49f6-af5a-33c2f791d93e&width=2000&userId=&cache=v2)

那么解决方法就俩：

- 让客户升级浏览器版本
- 前端升级下，兼容下低版本

最后还是让客户先升级浏览器版本了，win7系统用最新版108就好了。（话说今年chrome停止支持win7了，108应该是最后一个版本）

另外代码层面怎么解决呢？只需要在head添加下面的代码即可。

```html
<head>
  <script>
    this.globalThis || (this.globalThis = this)
  </script>
</head>
```

再有就是了解下globalThis是什么的问题：

- [globalThis - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
- [es6 globalThis对象 - 掘金 (juejin.cn)](https://juejin.cn/post/7016622873729040414)
