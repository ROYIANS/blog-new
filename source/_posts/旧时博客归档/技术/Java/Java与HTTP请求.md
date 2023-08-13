---
title: Java 与 HTTP GET
tags: Java
comments: false
abbrlink: b625e692
date: 2019-11-03 18:55:13
description:
category:
  - 技术
  - Java
---

最近在[No.21065596↘][1]看到别人用python做了一个简单的机器人，下载了源码以后，打算用A岛API也做一个在A岛自动回复的机器人，今天先试着用Java从A岛爬一些串下来。

<!-- more -->

## Java调用HTTP接口进行GET的几种方法

### 通过`java.net.HttpURLConnection`

```java
@Test
    void httpGetViaHttpUrlConnection() {
        final String URI = "https://www.royians.cn";
        HttpsURLConnection connection = null;
        BufferedReader br = null;
        InputStreamReader isr = null;
        try {
            URL url = new URL(URI + "/tags");
            connection = (HttpsURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "text/html; charset=UTF-8");
            isr = new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8);
            br = new BufferedReader(isr);
            String line = "";
            StringBuilder result = new StringBuilder();
            while ((line = br.readLine()) != null) {
                result.append(line).append("\n");
            }
            connection.disconnect();

            System.out.println(result.toString());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
            try {
                if (isr != null) {
                    isr.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```

### 通过 `URLConnection`

```java
@Test
    void httpGetViaUrlConnection() {
        final String URI = "https://www.royians.cn";
        URLConnection connection = null;
        BufferedReader br = null;
        InputStreamReader isr = null;
        try {
            URL url = new URL(URI + "/tags");
            connection = url.openConnection();
            connection.setRequestProperty("Content-Type", "text/html; charset=UTF-8");
            isr = new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8);
            br = new BufferedReader(isr);
            String line = "";
            StringBuilder result = new StringBuilder();
            while ((line = br.readLine()) != null) {
                result.append(line).append("\n");
            }

            System.out.println(result.toString());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (isr != null) {
                    isr.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```

#### HttpUrlConnection 和 URLConnection 的区别

URLConnection是Java与所有URL进行连接的所有类的父类，HttpUrlConnection是其子类，这两个类都是抽象的，我们需要使用URL对象的openConnection来获取实例。想要关闭HttpURLConnection，只需要调用disconnect()方法，关闭URLConnection资源，需要在InputStream或OutputStream上调用close()方法，这样做可以释放与URLConnection实例相关的网络资源。

### 通过Apache的HttpClient

> 首先需要导入包，找了半天，应该是httpclient这个jar包，后来发现还需要httpcore这个包。

```java
@Test
    void httpGetViaHttpClient() {
        final String URI = "https://www.royians.cn";

        CloseableHttpClient client = null;
        CloseableHttpResponse response = null;

        try {
            HttpGet get = new HttpGet(URI + "/tags/");
            client = HttpClients.createDefault();
            response = client.execute(get);
            HttpEntity entity = response.getEntity();
            String result  = EntityUtils.toString(entity);
            System.out.println(result);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (response != null) {
                    response.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (client != null) {
                    client.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```

然后运行上面测试，结果报错：

```
java.lang.NoClassDefFoundError: org/apache/commons/logging/LogFactory

	at org.apache.http.conn.ssl.DefaultHostnameVerifier.<init>(DefaultHostnameVerifier.java:82)
	at org.apache.http.impl.client.HttpClientBuilder.build(HttpClientBuilder.java:966)
	at org.apache.http.impl.client.HttpClients.createDefault(HttpClients.java:56)
	at com.royians.test.TestHttpConnection.httpGetViaHttpClient(TestHttpConnection.java:111)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.junit.platform.commons.util.ReflectionUtils.invokeMethod(ReflectionUtils.java:628)
	at org.junit.jupiter.engine.execution.ExecutableInvoker.invoke(ExecutableInvoker.java:117)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.lambda$invokeTestMethod$7(TestMethodTestDescriptor.java:184)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.invokeTestMethod(TestMethodTestDescriptor.java:180)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.execute(TestMethodTestDescriptor.java:127)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.execute(TestMethodTestDescriptor.java:68)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$5(NodeTestTask.java:135)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$7(NodeTestTask.java:125)
	at org.junit.platform.engine.support.hierarchical.Node.around(Node.java:135)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$8(NodeTestTask.java:123)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.executeRecursively(NodeTestTask.java:122)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.execute(NodeTestTask.java:80)
	at java.util.ArrayList.forEach(ArrayList.java:1257)
	at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestExecutorService.invokeAll(SameThreadHierarchicalTestExecutorService.java:38)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$5(NodeTestTask.java:139)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$7(NodeTestTask.java:125)
	at org.junit.platform.engine.support.hierarchical.Node.around(Node.java:135)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$8(NodeTestTask.java:123)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.executeRecursively(NodeTestTask.java:122)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.execute(NodeTestTask.java:80)
	at java.util.ArrayList.forEach(ArrayList.java:1257)
	at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestExecutorService.invokeAll(SameThreadHierarchicalTestExecutorService.java:38)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$5(NodeTestTask.java:139)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$7(NodeTestTask.java:125)
	at org.junit.platform.engine.support.hierarchical.Node.around(Node.java:135)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$8(NodeTestTask.java:123)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.executeRecursively(NodeTestTask.java:122)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.execute(NodeTestTask.java:80)
	at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestExecutorService.submit(SameThreadHierarchicalTestExecutorService.java:32)
	at org.junit.platform.engine.support.hierarchical.HierarchicalTestExecutor.execute(HierarchicalTestExecutor.java:57)
	at org.junit.platform.engine.support.hierarchical.HierarchicalTestEngine.execute(HierarchicalTestEngine.java:51)
	at org.junit.platform.launcher.core.DefaultLauncher.execute(DefaultLauncher.java:229)
	at org.junit.platform.launcher.core.DefaultLauncher.lambda$execute$6(DefaultLauncher.java:197)
	at org.junit.platform.launcher.core.DefaultLauncher.withInterceptedStreams(DefaultLauncher.java:211)
	at org.junit.platform.launcher.core.DefaultLauncher.execute(DefaultLauncher.java:191)
	at org.junit.platform.launcher.core.DefaultLauncher.execute(DefaultLauncher.java:128)
	at com.intellij.junit5.JUnit5IdeaTestRunner.startRunnerWithArgs(JUnit5IdeaTestRunner.java:69)
	at com.intellij.rt.execution.junit.IdeaTestRunner$Repeater.startRunnerWithArgs(IdeaTestRunner.java:47)
	at com.intellij.rt.execution.junit.JUnitStarter.prepareStreamsAndStart(JUnitStarter.java:242)
	at com.intellij.rt.execution.junit.JUnitStarter.main(JUnitStarter.java:70)
Caused by: java.lang.ClassNotFoundException: org.apache.commons.logging.LogFactory
	at java.net.URLClassLoader.findClass(URLClassLoader.java:382)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
	at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:349)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
	... 55 more
```

原因是还需要导入Apache的`common-logging`包，导入后正常运行。

## 获取A岛某串内容

常用的基本上就是上面几种方法，现在我用最基本的HttpURLConnection获取A岛的综合一的串的内容。

API参考的是开源紫岛APP的代码[⋙][2]

A岛API没人总结，可能我得自己摸索一下，首先看到了如何获取一个串里的内容：

```plain
GET https://adnmb2.com/Api/thread?appid=nimingban&id=5000&page=1
```

参数中，appid是固定的，id就是串号，page是页码。返回的是JSON格式。

现在我们写Code来获取这个API的内容，串就用光来po的串吧[No.16236809↘][3]

```java
@Test
    void getGuangLaiPoThread() {
        String postUrl = AcUrl.getPostUrl("16236809", 1);
        InputStreamReader isr = null;
        HttpsURLConnection connection = null;
        BufferedReader br = null;
        try {
            URL url = new URL("https://"+postUrl);
            connection = (HttpsURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
            isr = new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8);
            br = new BufferedReader(isr);
            String line = "";
            StringBuilder sb = new StringBuilder();
            while((line = br.readLine())!=null) {
                sb.append(line).append("\n");
            }
            String json = sb.toString();
            System.out.println(json);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
            try {
                if (isr != null) {
                    isr.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```

看代码没有什么错，但是运行后发现是乱码：

![乱码](https://i.loli.net/2019/11/03/M5XOsKtfzogy3H6.png)

查看cosole：

![console](https://i.loli.net/2019/11/03/Aw7MbDvSCPdch4R.png)

发现 Content-Encoding: gzip

经过查看[这篇博文][4]提供的解决方法，最后写成：

```java
@Test
    void getGuangLaiPoThread() {
        String postUrl = AcUrl.getPostUrl("16236809", 1);
        CloseableHttpClient httpclient = HttpClients.custom().addInterceptorFirst(new HttpResponseInterceptor() {

            @Override
            public void process(HttpResponse response, HttpContext context) throws HttpException, IOException {
                HttpEntity resEntity = response.getEntity();
                // 在此处消费InputStream
                InputStream is = new GZIPInputStream(resEntity.getContent());
                InputStreamReader isr = new InputStreamReader(is);
                BufferedReader br = new BufferedReader(isr);
                String line;
                while ((line = br.readLine()) != null) {
                    System.out.println(line);
                }
            }
        }).build();
        HttpGet get = new HttpGet("https://" + postUrl);
        try {
            httpclient.execute(get);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

效果：

![效果](https://i.loli.net/2019/11/03/eGZdf5oxDqAF486.png)

好了，获取到json了，今天就到这里，下一步是用fastjson解析数据了。

[^_^]: # "links below"
[1]: https://adnmb2.com/t/21065596
[2]: https://github.com/seven332/Nimingban/blob/master/app/src/main/java/com/hippo/nimingban/client/ac/ACUrl.java
[3]: https://adnmb2.com/t/16236809
[4]: https://blog.csdn.net/yiifaa/article/details/80928522
