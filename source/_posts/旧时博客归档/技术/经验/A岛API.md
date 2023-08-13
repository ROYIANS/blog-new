---
title: A岛 API
tags: 总结
comments: false
abbrlink: 4488dc7c
description: 昨天简单使用了Java HttpClient获取HTTP连接，今天总结一下A岛有哪些API
date: 2019-11-04 09:46:36
category:
    - 技术
    - 经验
---

昨天学会了使用Java发送HTTP GET请求，今天先来了解一下API吧

## 获取板块列表

**GET** `https://adnmb2.com/Api/getForumList?appid=nimingban`

**Result：**

```json
[
    {
        "id": "4",
        "sort": "1",
        "name": "综合",
        "status": "n",
        "forums": [
            {
                "id": "-1",
                "name": "时间线",
                "msg": "这里是匿名版最新的串"
            },
            {
                "id": "4",
                "fgroup": "4",
                "sort": "2",
                "name": "综合版1",
                "showName": "",
                "msg": "欢迎光临，这里是A岛。上手前请阅读<strong><a href=\"/Forum\">全岛总版规",
                "interval": "60",
                "createdAt": "2011-10-21 15:49:28",
                "updateAt": "2015-06-23 17:26:28",
                "status": "n"
            }
        ]
    }
]
```

**解析：**

- 大模块（多个）
    - id ID
    - sort 排序
    - name 大模块名称
    - status 状态 n 正常
    - forums 板块（多个）
        - id ID
        - fgroup
        - sort 排序
        - name 板块名
        - showName
        - msg 板块信息
        - interVal 发帖时间限制 毫秒
        - createdAt
        - updatedAt
        - status 状态 n 正常

## 获取常用串

**GET** `http://nimingban.herokuapp.com/common_posts`

**Result:**

```json
[
    {
        "name": "点兔好棒",
        "id": "3337201"
    }
]
```

**解析：**
- （多个）
    - name 名字
    - id 串号

## 获取某板块中的串

**GET** `https://adnmb2.com/Api/showf?appid=nimingban&id=2&page=1`

- id 板块id
- page 页码

**Result：**

```json
[
    {
        "id": "21141616",
        "img": "2019-11-04/5dbf84c4abbde",
        "ext": ".jpg",
        "now": "2019-11-04(一)09:54:12",
        "userid": "hwxl6hJ",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "什么叫人文关怀啊（后跳）",
        "sage": "0",
        "admin": "0",
        "status": "n",
        "replys": [
            {
                "id": "21141766",
                "img": "",
                "ext": "",
                "now": "2019-11-04(一)10:02:17",
                "userid": "QomeeBp",
                "name": "无名氏",
                "email": "",
                "title": "无标题",
                "content": "相声要是不好笑，那就太好笑了",
                "sage": "0",
                "admin": "0",
                "status": "n"
            }
        ],
        "replyCount": "3"
    }
]
```

**解析：**

- 串（多个）
    - id ID
    - img 图片链接
    - ext 图片后缀名
    - now 发表时间
    - userid 饼干
    - name 用户填写的name
    - email 用户填写的email
    - title 用户填写的标题
    - content 串的文本内容
    - sage 是否SAGE 0 1
    - admin
    - status 状态
    - replys 回复
        - 回复串（多个）
            - id ID
            - img 图片链接
            - ext 图片后缀名
            - now 发表时间
            - userid 饼干
            - name 用户填写的name
            - email 用户填写的email
            - title 用户填写的标题
            - content 串的文本内容
            - sage 是否SAGE 0 1
            - admin
            - status 状态
    - replyCount 回复数

## 获取 Timeline

**GET** `https://adnmb2.com/Api/timeline?appid=nimingban&page=1`

- page 页码

**Result：**

```json
[
    {
        "id": "14500641",
        "fid": "4",
        "img": "2019-08-24/5d60c60501fd3",
        "ext": ".jpg",
        "now": "2018-07-06(五)11:41:51",
        "userid": "ATM",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "<font color=\"red\">本站<b>禁止一切涉政涉黄及其擦边暗示！！！</b></font>违规将导致删串封禁<br>\r\n综合一禁发一切<font color=\"orange\">时事/热点/民生等社会性话题</font>，相关请发往<a href=\"/t/18830332 \">速报2版</a><br>\r\n<font color=\"green\">======================<br> </font>\r\n欢迎来到A岛，一个<a href=\"/t/6064422\">开放包容，理性客观，有事说事，就事论事</a>的讨论社区！发串前请仔细阅读<a href=\"http://adnmb.com/\">→总版规←</a><br>，如仍有本站使用问题请前往<a href=\"/t/17703121\">问答集中串</a>\r\n永久域名<a href=\"https://adnmb.com\">https://adnmb.com</a>，请将此地址加入收藏夹。",
        "sage": "1",
        "admin": "1",
        "replys": [
            {
                "id": "21142049",
                "img": "",
                "ext": "",
                "now": "2019-11-04(一)10:16:04",
                "userid": "fxdF1pJ",
                "name": "无名氏",
                "email": "",
                "title": "无标题",
                "content": "<font color=\"#789922\">&gt;&gt;No.21142030</font><br />\n(`ヮ´ )爆炸",
                "sage": "0",
                "admin": "0",
                "status": "n"
            }
        ],
        "replyCount": "0"
    }
]
```

**解析：**

- 时间线串（多个）
    - id ID
    - fid 板块ID
    - img 图片链接
    - ext 图片后缀名
    - now 发表时间
    - userid 饼干
    - name 用户填写的name
    - email 用户填写的email
    - title 用户填写的标题
    - content 串的文本内容
    - sage 是否SAGE 0 1
    - admin
    - replys 回复
        - 回复串（多个）
    - replyCount 回复数

## 获取某串内容

**GET** `https://adnmb2.com/Api/thread?appid=nimingban&id=20881021&page=1`

**Result：**

```json
{
    "id": "20881021",
    "fid": "111",
    "img": "",
    "ext": "",
    "now": "2019-10-25(五)13:30:17",
    "userid": "fxdF1pJ",
    "name": "无名氏",
    "email": "",
    "title": "无标题",
    "content": "大概是炼丹团<br />\n<br />\n目标是成为最强丹师！炼制出传说中的神级丹药！",
    "sage": "0",
    "admin": "0",
    "replys": [
        {
            "id": "20881030",
            "img": "",
            "ext": "",
            "now": "2019-10-25(五)13:30:31",
            "userid": "MFrfo8m",
            "name": "无名氏",
            "email": "",
            "title": "无标题",
            "content": "r",
            "sage": "0",
            "admin": "0",
            "status": "n"
        }
    ],
    "replyCount": "910"
}
```

**解析：**

- 串
    - id ID
    - img 图片链接
    - ext 图片后缀名
    - now 发表时间
    - userid 饼干
    - name 用户填写的name
    - email 用户填写的email
    - title 用户填写的标题
    - content 串的文本内容
    - sage 是否SAGE 0 1
    - admin
    - replys 回复
        - 回复串（多个）
    - replyCount 回复数

## 获取管理串的页面

**GET** `https://adnmb2.com/Home/Forum/ref?appid=nimingban&id=19971128`

- id 串号

只有红名能使用

## 获取订阅

**GET** `https://adnmb2.com/Api/feed?appid=nimingban&uuid=5&page=1`

- uuid 用户ID
- page 页码

同样没法用，不知道uuid如何获取

## 添加订阅

**POST** `https://adnmb2.com/Api/addFeed?appid=nimingban&uuid=1&tid=11550598`

- uuid 用户ID
- tid 串ID

仿佛任何人都能操作

## 删除订阅

**POST** `https://adnmb2.com/Api/delFeed?appid=nimingban&uuid=1&tid=11550598`

- uuid 用户ID
- tid 串ID

仿佛任何人都能操作

## 搜索

**GET** `https://adnmb2.com/Api/search?appid=nimingban&q=hello&pageNo=1`

- q 搜索词
- pageNo 页数

需要Cookies

今天就探索到这里，至于发帖、回复日后更新到这里。