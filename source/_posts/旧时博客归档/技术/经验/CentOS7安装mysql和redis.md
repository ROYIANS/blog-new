---
title: CentOS7安装mysql和redis
category:
  - 技术
  - 经验
comments: false
tags: 经验
abbrlink: d281d887
date: 2020-02-20 17:27:23
---

> 今天需要了解一下如何在Linux系统上安装mysql和redis。从前也手动操作过，后台又用宝塔面板安装，但一直没有总结过，今天特地来总结一下。本文适用于安装mysql-5.7.24和redis-5.0.7

## 安装mysql

首先看看我的centOS有没有安装mysql

```bash
rpm -qa | grep mysql
```

我没有安装，但是如果安装了的话，可以使用下面的命令删除

```bash
rpm -e --nodeps mysql-libs-xxx
```

其次查看是否有mysql的文件夹残余，删除它。

```bash
whereis mysql
find / -name mysql
rm -rf /xxx
```

再次使用上面的命令验证，然后创建mysql用户和用户组

```bash
# 查看是否已经有了
cat /etc/group | grep mysql
cat /etc/passwd |grep mysql
# 添加用户组和用户
groupadd mysql
useradd -r -g mysql mysql
```

接下来下载mysql，先下载到家目录

```bash
wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.24-linux-glibc2.12-x86_64.tar.gz
```

接下来就要安装了，参考以下步骤

```bash
# 解压
tar xzvf mysql-5.7.24-linux-glibc2.12-x86_64.tar.gz
# 移动到/usr/local目录并重命名
cd /usr/local/
mv mysql-5.7.24-linux-glibc2.12-x86_64 mysql
# 在/usr/local/mysql目录下创建data目录
mkdir /usr/local/mysql/data
# 更改mysql目录下所有的目录及文件夹所属的用户组和用户，以及权限
chown -R mysql:mysql /usr/local/mysql
chmod -R 755 /usr/local/mysql
# 编译安装并初始化mysql,务必记住初始化输出日志末尾的密码（数据库管理员临时密码）
cd /usr/local/mysql/bin
./mysqld --initialize --user=mysql --datadir=/usr/local/mysql/data --basedir=/usr/local/mysql
```

执行到编译安装步骤的时候，我出现了下面的错误：

```
./mysqld: error while loading shared libraries: libaio.so.1: cannot open shared object file: No such file or directory
```

首先检查链接库文件有没有安装使用，如果没有，则安装

```bash
rpm -qa|grep libaio
# 若无任何东西，则
yum install libaio-devel.x86_64
```

然后重试，若还报错`cannot open shared object file`,则运行：

```bash
yum -y install numactl
```

重试，不出意外应该可以了，记住最后一行的数据库初始化密码。编辑配置文件`vi /etc/my.cnf`

```properties
[mysqld]
datadir=/usr/local/mysql/data
port = 3306
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
symbolic-links=0
max_connections=400
innodb_file_per_table=1
#表名大小写不明感，敏感为
lower_case_table_names=1
```

启动mysql服务器

```bash
/usr/local/mysql/support-files/mysql.server start
```

如果提示OK的话，那就安装成功了，如果提示`Starting MySQL... ERROR! The server quit without updating PID file`，则需要按照以下步骤进行操作：

```bash
#查询服务
ps -ef|grep mysql
ps -ef|grep mysqld

#结束进程
kill -9 PID

#启动服务
 /usr/local/mysql/support-files/mysql.server start
```

添加软连接：

```bash
ln -s /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
ln -s /usr/local/mysql/bin/mysql /usr/bin/mysql
service mysql restart
```

登录mysql，修改密码

```
 mysql -u root -p
Enter password:
mysql>set password for root@localhost = password('yourpass');
```

开放远程连接

```bash
mysql>use mysql;
msyql>update user set user.Host='%' where user.User='root';
mysql>flush privileges;
```

设置开机自动启动

```bash
# 1、将服务文件拷贝到init.d下，并重命名为mysql
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld
# 2、赋予可执行权限
chmod +x /etc/init.d/mysqld
#3、添加服务
chkconfig --add mysqld
# 4、显示服务列表
chkconfig --list
```

使用DataGrip等工具连接数据库，如果用的云服务器，则要注意放行3306端口。

## 安装Redis

下载redis

```bash
wget http://download.redis.io/releases/redis-5.0.7.tar.gz
```

解压到/usr/local目录

```bash
tar -zxvf redis-5.0.7.tar.gz -C /usr/local
mv /usr/local/redis-5.0.7.tar.gz /usr/local/redis
```

编译

```bash
cd /usr/local/redis
make
```

等待完成即可，若没有gcc，则需要安装gcc。