---
title: Java 如何跳出forEach
comments: false
abbrlink: 4364ab65
date: 2019-11-04 11:26:27
tags: Java
category:
  - 技术
  - Java
description:
---


StackOverflow上看到一个[以前没有意识到的问题][1]，怎样能跳出forEach循环呢？

<!-- more -->

## 问题

我的第一想法是，`break`不可以使用吗？`continue`呢？

## 探索

于是我在IDEA中试了一下：

```java
@Test
    void testBreak() {
        LinkedList<Integer> integers = new LinkedList<Integer>(Collections.singleton(10));
        Random random = new Random();
        for (int i = 0; i < 10; i++) {
            integers.add(random.nextInt(20));
        }
        integers.forEach((number) -> {
            System.out.println("Number: " + number);
            break;
        });
    }
```

结果编译时报错：

![E](https://i.loli.net/2019/11/04/ZVgGnEmXUl58D7z.png)

接着我试了`continue`，同样报错。

那怎么办了？

我接着试了`return`：

```java
@Test
    void testBreak() {
        List<Integer> integers = Arrays.asList(1, 2, 3, 4, 5);
        integers.forEach((number) -> {
            System.out.println("Number: " + number);
            if (number == 2) {
                return;
            }
        });
    }
```

运行结果：

![E](https://i.loli.net/2019/11/04/iw4xjcDmr1Ls8yk.png)

没卵用

然后我发现粗心的把输出语句写在return上面了

```java
@Test
    void testBreak() {
        List<Integer> integers = Arrays.asList(1, 2, 3, 4, 5);
        integers.forEach(number -> {
            if (number == 2) {
                return;
            }
            System.out.println("Number: " + number);
        });
    }
```

结果如下：

![E](https://i.loli.net/2019/11/04/CVgiGSeprkZWO92.png)

相当于continue

continue替代者找到了，那如何实现break呢？

```java
public class BreakException extends RuntimeException{ }
...
    @Test
    void testBreak() {
        List<Integer> integers = Arrays.asList(1, 2, 3, 4, 5);
        try {
            integers.forEach(number -> {
                if (number == 2) {
                    throw new BreakException();
                }
                System.out.println("Number: " + number);
            });
        } catch (BreakException e) {
            System.out.println("Break");
        }
    }
```

结果：
![image.png](https://i.loli.net/2019/11/04/su4erb2AxR9ShGg.png)

## 总结

forEach()方法不支持break、continue，是因为源码中：

```java
default void forEach(Consumer<? super T> action) {
        Objects.requireNonNull(action);
        for (T t : this) {
            action.accept(t);
        }
    }
```

for循环是在方法体内的，如果在forEach的lambda表达式中使用break和continue，是没有效果的。我们找到的替代方法是使用return;达到continue的效果，使用throw异常的方式取得和break一样的效果。

但是感觉有点麻烦了，不如还是直接使用增强for循环遍历。

[1]: https://stackoverflow.com/questions/23996454/terminate-or-break-java-8-stream-loop
