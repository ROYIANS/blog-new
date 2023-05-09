---
title: CSS @media 优先级问题
tag:
  - 随记
  - 前端
  - CSS3
cover: https://img.vidorra.life/images/covers/2023/01/0901.webp
abbrlink: 2023010901
date: 2023-01-09
recommend: true
cc: 原创
comment: true
---

我们在写程序的时候经常会用到@media媒体查询，尤其是在做移动端适配的时候。但是关于@media媒体查询你了解多少呢？

作为一个初级开发人员，今天在开发的时候碰到了一个这样的问题：

```css
.logo {
  font-size: 50px
}


@media screen and (max-width: 767px) {
  .logo {
    font-size: 40px
  }
}

@media screen and (max-width: 1024px) {
  .logo {
    font-size: 60px
  }
}
```

文件是上图这样写的，但是在手机屏幕上实际渲染的字体大小是60px。

很多人可能理所当然的想象自己写在哪个屏幕条件下的样式，就是那个屏幕尺寸下实际的显示效果，但是@media后面跟的条件只是说这些样式在这样的条件下生效，因此如果按上面的代码，三个样式在手机屏幕上是都生效了，因此此时按书写顺序的优先级，最下面的60px覆盖了上面两个样式。

所以正确的写法是：

```css
.logo {
  font-size: 50px
}

@media screen and (max-width: 1024px) {
  .logo {
    font-size: 60px
  }
}

@media screen and (max-width: 767px) {
  .logo {
    font-size: 40px
  }
}
```

原始样式在最上，屏幕大的在屏幕小的上面。
