---
title: 一天复习MyBatis
category:
    - 技术
    - MyBatis
comments: false
tags:
  - MyBatis
  - 复习
abbrlink: 8317fb0a
date: 2020-02-06 10:56:51
---

> 哪里可能一天！好好复习啊!

## MyBatis简介

### 1.1 传统的JDBC编程

Java程序都是通过JDBC(Java Database Connectivity)连接数据库的。JDBC是一种规范，用来适配各种类型的数据库。不过JDBC只定义了接口规范，具体的实现是交给数据库厂商去实现的，JDBC是一种典型的桥接模式。

下面是一个传统的使用JDBC进行数据库连接并查询数据的代码示例：

```java
package cn.vidorra.todo;

import cn.vidorra.todo.pojo.TodoListEntity;

import java.sql.*;
import java.util.Objects;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author ROYIANS
 * @date 2020/2/7 20:10
 */
public class JDBCExample {
    private Connection getConnection() {
        Connection connection = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            String url = "jdbc:mysql://127.0.0.1:3306/vidorra?serverTimezone=PRC&useUnicode=true&characterEncoding=utf8&useSSL=false";
            String user = "root";
            String password = "123456";
            connection = DriverManager.getConnection(url, user, password);
        } catch (ClassNotFoundException | SQLException e) {
            Logger.getLogger(JDBCExample.class.getName()).log(Level.SEVERE, null, e);
            return null;
        }
        return connection;
    }

    public TodoListEntity getTodo(Long id) {
        Connection connection = getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            String sql = "select * from todo_list where id = ?";
            ps = Objects.requireNonNull(connection).prepareStatement(sql);
            ps.setLong(1, id);
            rs = ps.executeQuery();
            if (rs.next()) {
                long todoID = rs.getLong("id");
                long todoUID = rs.getLong("uid");
                String todoContents = rs.getString("contents");
                byte todoStatus = rs.getByte("status");
                int todoCreateTime = rs.getInt("create_time");
                int todoUpdateTime = rs.getInt("update_time");

                return new TodoListEntity(
                        todoID,
                        todoUID,
                        todoContents,
                        todoStatus,
                        todoCreateTime,
                        todoUpdateTime
                );
            }
        } catch (SQLException e) {
            Logger.getLogger(JDBCExample.class.getName()).log(Level.SEVERE, null, e);
        } finally {
            this.close(rs, ps, connection);
        }
        return null;
    }

    private void close(ResultSet rs, Statement stmt, Connection connection) {
        try {
            if (rs != null && !rs.isClosed()) {
                rs.close();
            }
        } catch (SQLException e) {
            Logger.getLogger(JDBCExample.class.getName()).log(Level.SEVERE, null, e);
        }

        try {
            if (stmt != null && !stmt.isClosed()) {
                stmt.close();
            }
        } catch (SQLException e) {
            Logger.getLogger(JDBCExample.class.getName()).log(Level.SEVERE, null, e);
        }

        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (SQLException e) {
            Logger.getLogger(JDBCExample.class.getName()).log(Level.SEVERE, null, e);
        }
    }

    public static void main(String[] args) {
        JDBCExample example = new JDBCExample();
        TodoListEntity entity = example.getTodo(1L);
        System.err.println("todo => " + entity.toString());
    }
}
```

使用JDBC操作数据库大致分为以下几步：

- 使用JDBC编程需要连接数据库，注册驱动和数据库信息。
- 操作Connection，打开Statement对象
- 通过Statement执行SQL，返回结果岛ResultSet对象。
- 使用ResultSet读取数据，然后通过代码转化为具体的POJO对象。
- 关闭数据库相关资源。

使用传统的JDBC方式存在的弊端：

- 工作量相对较大。
- 对JDBC编程中可能产生的异常，我们需要进行捕捉处理并正确关闭资源。

对于一个简单的SQL在JDBC中都如此复杂，很快这种模式就被ORM模型取代了，所有的ORM模型都是基于JDBC进行封装的，不同的ORM模型对JDBC封装的强度是不一样的。

### 1.2 ORM模型

ORM（Object Relational Mapping），对象关系映射。ORM模型就是数据库的表和POJO的映射关系模型，主要解决了数据库数据和POJO对象的相互映射。我们通过

## MyBatis入门

## 配置

## 映射器

## 动态SQL

## MyBatis的解析和运行原理

## 插件

## MyBatis-Spring

## 实用的场景
