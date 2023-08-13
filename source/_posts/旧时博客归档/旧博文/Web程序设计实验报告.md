---
title: Web程序设计实验报告
comments: false
author: 小梦岛
tags:
  - Web程序设计
  - 实验报告
abbrlink: c375ee94
date: 2018-10-23 14:19:34
category: 旧博文
---

## 实验一 HTML基础

### 实验目的与要求
1. 掌握常用的HTML语言标记。
2. 利用文本编辑器建立HTML文档，制作简单表单页面。

### 实验设备和环境
计算机、Windows操作系统

### 实验内容
1. 在文本编辑器“记事本”中输入如下的HTML代码程序，以文件名sy1.html保存，并在浏览器中运行。（请仔细阅读下列程序语句，理解每条语句的作用）
&emsp;&emsp;源程序清单如下：

```HTML
<html>
  
  <head>
    <title>Example</title></head>
  
  <body bgcolor="#00DDFF">
    <h1>
      <b>
        <i>
          <font color="#FF00FF">
            <marquee bgcolor="#FFFF00" direction="left" behavior="alternate">welcome to you</marquee></font>
        </i>
      </b>
    </h1>
    <hr />
    <h2 align="center">
      <font color="#0000FF">A simple HTML document</font></h2>
    <em>Welcome to the world of HTML</em>
    <p>This is a simple HTML document.It is to give you an outline of how to write HTML file and how the
      <b>markup tags</b>work in the
      <i>HTML</i>file</p>
    <p>Following is three chapters</p>
    <ul>
      <li>This is the chapter one</li>
      <li>
        <a href="#item">This is the chapter two</a></li>
      <li>This is the chapter three</li></ul>
    <p>
    </p>
    <hr />
    <p>
      <a name="item">Following is items of the chapter two</a></p>
    <table border="2" bgcolor="gray" width="40%">
      <tbody>
        <tr>
          <th>item</th>
          <th>content</th></tr>
        <tr>
          <td>item 1</td>
          <td>font</td></tr>
        <tr>
          <td>item 2</td>
          <td>table</td></tr>
        <tr>
          <td>item 3</td>
          <td>form</td></tr>
      </tbody>
    </table>
    <hr />
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <p>5</p>
    <p>6</p>
    <p>7</p>
    <p>
      <b>
        <i>
          <font color="BLUE" size="4">End of the example document</font></i>
      </b>
    </p>
  </body>

</html>
```
2. 编写一个能输出如下图所示界面的HTML文件。要求：
    - 校验输入的E-Mail的格式：用户名@域名。
    - 校验输入的电话格式：11位数字组成。
    - 性别“女”为默认选项。
    - 年龄的列表选项有：20以下、20、21、22、23、24、25、25以上，其中“20以下”为默认选项。
    ![](https://ws1.sinaimg.cn/large/8595b112ly1fwi57i3c5yj20df0dlwem.jpg)

```HTML
<!DOCTYPE html>
<html>
  
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="HandheldFriendly" content="True" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="description" content="Web程序设计实验一" />
    <meta name="keywords" content="ROYIANS,LD.L,小梦岛⁺,小梦岛,Web程序设计实验一" />
    <link rel="icon" type="image/png" href="/images/favicon-192x192.png" sizes="192x192" />
    <title>Profiles | 小梦岛</title>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css'>
    <style>body{ display: flex; align-items: center; justify-content: center; height: 100vh; width: 100vw; background: linear-gradient(#84fab0,#8fd3f4) } .container { background:#ffffff; height: auto; width: 50%; padding: 1.5rem; box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2); border-radius: 0.5rem; text-align: center; color: #696969; } .container h1 { color:#000000; } .container form { text-align: left; padding-left: 20%; } .container input , .container textarea { resize: none; padding: 10px 5px; max-width: 100%; font-size: .775rem; border:none; outline: none; border-bottom: 1px dashed #999; } .container input:focus , .container textarea:focus { border:none; border-bottom: 1px dashed #009688; } form > label { position: relative; display: block; padding: 8px 0 8px 0; text-transform: uppercase; font-size: 14px; letter-spacing: .0875em; font-weight: 500; text-align: left; } button { width: 15%; background: transparent; border: 1px dashed #999; } ul { margin: 0; padding: 0; list-style: none; } ul li { margin: 0 0 0.25em 0; clear: both; display: inline-block; width: 100%; }</style></head>
  
  <body>
    <div class="container">
      <h1>请留下个人资料</h1>
      <hr>
      <form>
        <ul>
          <li>
            <label for="name">姓名：</label>
            <input type="text" name="name" id="name" required /></li>
          <li>
            <label for="mail">E-Mail：</label>
            <input type="email" name="mail" id="mail" required /></li>
          <li>
            <label for="phone">电话：</label>
            <input type="text" name="phone" id="phone" pattern="1[3|4|5|7|8][0-9]{9}" title="11位手机号" required /></li>
          <li>
            <label>性别：</label>
            <input type="radio" name="sex" id="female" checked="" required />
            <label for="female">女</label>
            <input type="radio" name="sex" id="male" required />
            <label for="male">男</label></li>
          <li>
            <label>年龄：</label>
            <select name="age" required>
              <option value="le20">20以下</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="he25">25以上</option></select>
          </li>
          <li>
            <label for="msg">留言板：</label>
            <textarea maxlength="140" id="msg" name="msg"></textarea>
          </li>
          <li>
            <label for="hobby">您的爱好：</label>
            <input type="checkbox" name="hobby" id="sports" />
            <label for="sports">运动</label>
            <input type="checkbox" name="hobby" id="reading" />
            <label for="reading">阅读</label>
            <input type="checkbox" name="hobby" id="music" />
            <label for="music">听音乐</label>
            <input type="checkbox" name="hobby" id="travel" />
            <label for="travel">旅游</label></li>
          <li>
            <button type="submit">提交</button>&emsp;
            <button type="reset">全部重写</button>
            <li></ul>
      </form>
      <hr></div>
  </body>

</html>
```

#### 截图
![](https://ws1.sinaimg.cn/large/8595b112ly1fwi5ghnegtj20t90gde82.jpg)
![](https://ws1.sinaimg.cn/large/8595b112ly1fwi5f37kugj20ut0hlnpe.jpg)
![](https://ws1.sinaimg.cn/large/8595b112ly1fwi5goh15bj20v70h5npe.jpg)