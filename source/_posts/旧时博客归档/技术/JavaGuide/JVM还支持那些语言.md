---
title: JVM还支持哪些语言
comments: false
abbrlink: 9867c63d
tags:
  - Java
category:
  - 技术
  - Java之路
date: 2019-11-18 16:11:32
---

JVM虚拟机并不是只支持Java语言的，你可以选择多种多样JVM编程语言去实现你的项目。这些语言最终都会被编译为字节码存储到JVM能够执行的字节码文件中去。最终，这些编程语言都会在现成的JVM上得到有效的优化。

<!-- more -->

这些JVM编程语言被分为三类：那些拥有Java不曾拥有的特性的语言；那些从现有语言移植到JVM的语言，那些research languages。

## 第一个分类

第一个分类描述的是一些包含了比Java语言更多特性的语言，能够让程序员用更简洁的代码来编写程序。Java SE8 引入了lambda表达式、Stream API和默认方法（default methods，暂译）来解决代码简洁的问题。然而，开发者还喜欢很多其他的特性，比如字符集合（collections literals）、字符匹配（pattern matching）和更复杂的类型推断（more sophisticated type inference），这些特性在Java中还没有。

而属于第一类语言的就有 Scala, Groovy, Xtend, Ceylon, Kotlin, 和 Fantom几种。

## 第二个分类

第二个分类中的语言是移植到JVM的已知语言，比如Python和Ruby，他们都可以和Java API进行交互，并且在脚本编写和快速原型设计方面很受欢迎。

Python（CPython）和Ruby（Ruby MRI）的标准实现均具有全局解释器锁，这会阻止它们充分利用多核系统。然而Jython和JRuby（Python和Ruby在JVM上的实现），通过使用Java的线程来摆脱了这种限制。

另一个广受欢迎的移植到JVM上的语言是Clojure（一种Lisp的衍生语言（a dialect of Lisp，暂译）），我们将在本文中介绍。另外，Oracle最近发布了Nashorn，该项目使您可以在JVM上运行JavaScript。

## 第三个分类

第三类是实现新研究思想，仅适用于特定领域或只是实验性的语言。我们将在本文中介绍的语言X10是为实现高性能并行计算的高效编程而设计的。此类别中的另一种语言是Oracle Labs的Fortress，现已停产。

对于上文提到的每种语言，下面都会提供一个简单概览，以使您了解该语言支持什么以及如何使用它。

## 语言概览

### 1 | Scala

[Scala](//www.scala-lang.org/) is a statically typed programming language that fuses the object-oriented model and functional programming ideas. That means, in practice, that you can declare classes, create objects, and call methods just like you would typically do in Java. However, Scala also brings popular features from functional programming languages such as pattern matching on data structures, local type inference, persistent collections, and tuple literals.

The fusion of object-oriented and functional features lets you use the best tools from both worlds to solve a particular problem. As a result, Scala often lets programmers express algorithms more concisely than in Java.

**Feature focus: pattern matching.** To illustrate, take a tree structure that you would like to traverse. **Listing 1** shows a simple expression language consisting of numbers and binary operations.

```scala
    [Java]

    class Expr { ... }
    class Number extends Expr { int val; ... }
    class BinOp extends Expr { String opname; Expr left, right; ... }
```

**Listing 1**

Say you’re asked to write a method to simplify some expressions. For example “5 / 1” can be simplified to “5.” The tree for this expression is illustrated in **Figure 1**.

![Architect-languages-f1](//www.oracle.com/ocom/groups/public/@otn/documents/digitalasset/2267342.jpg)

**Figure 1**

In Java, you could deconstruct this tree representation by using `instanceof`, as shown in **Listing 2**. Alternatively, a common design pattern for separating an algorithm from its domain is the visitor design pattern, which can alleviate some of the verbosity. See **Listing 3**.

```java
    [Java]
    
    Expr simplifyExpression(Expr expr) {
        if (expr instanceof BinOp
              && "/".equals(((BinOp)expr).opname)
              && ((BinOp)expr).right instanceof Number
              && ... // it’s all getting very clumsy
              && ... ) {
            return (Binop)expr.left;
         }
         ... // other simplifications
    }
```

**Listing 2**

```java
    [Java]

    public class SimplifyExprVisitor {
        ...
        public Expr visit(BinOp e){
            if("/".equals(e.opname) && 
    e.right instanceof Number && ...){
                return e.left;
            }
            return e;
        }
    }
```

**Listing 3**

However, this pattern introduces a lot of boilerplate. First, domain classes need to provide an `accept` method to use a visitor. You then need to implement the “visit” logic.

In Scala, the same problem can be tackled using pattern matching. See **Listing 4**.

```scala
    [Scala]
    
    def simplifyExpression(expr: Expr): Expr = expr match {
        case BinOp("+", e, Number(0)) => e   // Adding zero
        case BinOp("*", e, Number(1)) => e   // Multiplying by one
        case BinOp("/", e, Number(1)) => e   // Dividing by one
        case _ => expr                       // Can’t simplify expr
    }
```

**Listing 4**

### 2 | Groovy

Groovy is a dynamically typed object-oriented language. Groovy’s dynamic nature lets you manipulate your code in powerful ways. For example, you can expand objects at runtime (for example, by adding fields or methods).

However, Groovy also provides optional static checking, which means that you can catch errors at compile time (for example, calling an undefined method will be reported as an error before the program runs, just as in Java). As a result, programmers who feel that they are more productive without types getting in their way can embrace Groovy’s dynamic nature. Nonetheless, they can also opt to gradually use static checking later if they wish. In addition, Groovy is friendly to Java programmers because almost all Java code is also valid Groovy code, so the learning curve is small.

**Feature focus: safe navigation.** Groovy has many features that let you write more-concise code compared to Java. One of them is the _safe navigation operator_, which prevents a `NullPointerException`. In Java, dealing with null can be cumbersome. For example, the following code might result in a `NullPointerException` if either `person` is null or `getCar()` returns null:

```Groovy
    Insurance carInsurance = 
    person.getCar().getInsurance();
```

To prevent an unintended `NullPointerException`, you can be defensive and add checks to prevent null dereferences, as shown in **Listing 5**.

```Java
    [Java]
    
    Insurance carInsurance = null;
    if(person != null){
        Car car = person.getCar();
        if(car != null){
            carInsurance = 
                car.getInsurance();
        }
    }
```

**Listing 5**

However, the code quickly becomes ugly because of the nested checks, which also decrease the code’s readability. The safe navigation operator, which is represented by `?.`, can help you navigate safely through potential null references:

```Groovy
    def carInsurance = 
    person?.getCar()?.getInsurance()
```

In this case, the variable `carInsurance` will be null if `person` is null, `getCar()` returns null, or `getInsurance()` returns null. However, no `NullPointerException` is thrown along the way.

### 3 | Clojure

[Clojure](//www.clojure.org/) is a dynamically typed programming language that can be seen as a modern take on Lisp. It is radically different from what object-oriented programmers might be used to. In fact, Clojure is a fully functional programming language, and as a result, it is centered on immutable data structures, recursion, and functions.

**Feature focus: homoiconicity.** What differentiates Clojure from most languages is that it’s a _homoiconic_ language. That is, Clojure code is represented using the language’s fundamental datatypes—for example, lists, symbols, and literals—and you can manipulate the fundamental datatypes using built-in constructs. As a consequence, Clojure code can be elegantly manipulated and transformed by reusing the built-in constructs.

Clojure has a built-in `if` construct. It works like this. Let’s say you want to extend the language with a new construct called `unless` that should work like an inverted `if`. In other words, if the condition that is passed as an argument evaluates to `false`, Clojure evaluates the first branch. Otherwise—if the argument evaluates to `true`—Clojure evaluates the second branch. You should be able to call the `unless` construct as shown in **Listing 6**.

```Clojure
    [Clojure]
    
    (unless false (println "ok!!") (println "boo!!")) 
    ; prints "ok!!"
    
    (if false (println "boo!!") (println "ok!!")) 
    ; prints "ok!!"
```

**Listing 6**

To achieve the desired result you can define a macro that transforms a call to `unless` to use the construct `if`, but with its branch arguments reversed (in other words, swap the first branch and the second branch). In Clojure, you can manipulate the code representing the branches that are passed as an argument as if it were data. See **Listing 7**.

```Clojure
    [Clojure]
    
    (defmacro unless
      "Inverted 'if'"
      [condition & branches]
      (conj (reverse branches) condition 'if))
```

**Listing 7**

In this macro definition, the symbol `branches` consists of a list that contains the two expressions representing the two branches to execute (`println "boo!!"` and `println "ok!!"`). With this list in hand, you can now produce the code for the `unless` construct. First, call the core function `reverse` on that list. You’ll get a new list with the two branches swapped. You can then use the core function `conj`, which when given a list, adds the remaining arguments to the front of the list. Here, you pass the `if` operation together with the condition to evaluate.

### 4 | Kotlin

[Kotlin](//kotlinlang.org/) is a statically typed object-oriented language. Its main design goals are to be compatible with Java’s API, have a type system that catches more errors at compile time, and be less verbose than Java. Kotlin’s designers say that Scala is a close choice to match its design goals, but they dislike Scala’s complexity and long compilation time compared to Java. Kotlin aims to tackle these issues.

**Feature focus: smart casts.** Many developers see the Java cast feature as annoying and redundant. For an example, see **Listing 8**.

```Java
    [Java]
    
    if(expr instanceof Number){
        System.out.println(((Number) expr).getValue());
    }
```

**Listing 8**

Repeating the cast to `Number` shouldn’t be necessary, because within the `if` block, `expr` has to be an instance of `Number`. The generality of this technique is called _flow typing_—type information propagates with the flow of the program.

Kotlin supports _smart casts_. That is, you don’t have to cast the expression within the `if` block. See **Listing 9**.

```Kotlin
    [Kotlin]
    
    if(expr is Number){
        println(expr.getValue())
    // expr is automatically cast to Number
    }
```

**Listing 9**

### 5 | Ceylon

Red Hat developed [Ceylon](https://ceylon-lang.org/), a statically typed object-oriented language, to give Java programmers a language that’s easy to learn and understand (because of syntax that’s similar to Java) but less verbose. Ceylon includes more type system features than Java. For example, Ceylon supports a construct for defining type aliases (similar to C’s `typedef;` for example, you could define `Strings` to be an alias for `List<String>`), flow typing (for example, no need to cast the type of an expression in a block if you’ve already done an `instanceof` check on it), union of types, and local type inference. In addition, in Ceylon you can ask certain variables or blocks of code to use dynamic typing—type checking is performed at runtime instead of compile time.

**Feature focus: for comprehensions.**`for` comprehensions can be seen as syntactic sugar for a chain of `map`, `flatMap`, and `filter` operations using Java SE 8 streams. For example, in Java, by combining a range and a `map` operation, you can generate all the numbers from 2 to 20 with a step value of `2`, as shown in **Listing 10**.

```Java
    [Java]
    
    List<Integer> numbers = IntStream.rangeClosed(1, 10).mapToObj(
    x -> x * 2).collect(toList());
```

**Listing 10**

In Ceylon, it can be written as follows using a `for` comprehension:

```Ceylon
    List<Integer> numbers = 
    [for (x in 1...10) x * 2];
```

Here’s a more-complex example. In Java, you can generate a list of points in which the sum of the `x` and `y` coordinates is equal to `10`. See **Listing 11**.

```Java
    [Java]
    
    List<Point> points = IntStream.rangeClosed(1, 10).boxed()
    .flatMap(x -> IntStream.rangeClosed(1, 10)
      .filter(y -> x + y == 10)
      .mapToObj(y -> new Point(x, y)))
      .collect(toList());
```

**Listing 11**

Thinking in terms of `flatMap` and `map` operations using the Stream API might be overwhelming. Instead, in Ceylon, you can write more simply, as done in the code shown in **Listing 12**, which produces `[(1, 9), (2, 8), (3, 7), (4, 6), (5, 5), (6, 4), (7, 3), (8, 2), (9, 1)]`.

```Ceylon
    [Ceylon]
    List<Point> points = 
       [for (x in 1..10) for(y in 1..10) 
       if(x+y == 10) Point(x, y)];
```

**Listing 12**

The result: Ceylon can make your code more concise.

### 6 | Xtend

[Xtend](https://www.eclipse.org/xtend/) is a statically typed object-oriented language. One way it differs from other languages is that it compiles to pretty-printed Java code rather than bytecode. As a result, you can also work with the generated code.

Xtend supports two forms of method invocation: default Java dispatching and multiple dispatching. With multiple dispatching, an overloaded method is selected based on the runtime type of its arguments (instead of the traditional static types of the arguments, as in Java). Xtend provides many other popular features available in other languages such as operator overloading and type inference.

One unique feature is template expressions, which are a convenient way to generate string concatenation (similar to what template engines provide). For example, template expressions support control-flow constructs such as `IF` and `FOR`. In addition, special processing of white space allows templates to be readable and their output to be nicely formatted.

**Feature focus: active annotations.** Xtend provides a feature called active annotations, which is a way to do compile-time metaprogramming. In its simplest form, this feature allows you to generate code transparently, such as adding methods or fields to classes with seamless integration in the Eclipse IDE for example. New fields or meth-ods will show up as members of the modified classes within the Eclipse environment. More-advanced use of this feature can generate a skeleton of design patterns such as the visitor or observer pattern. You can provide your own way to generate code using template expressions.

Here’s an example to illustrate this feature in action. Given sample JSON data, you can automatically generate a domain class in your Xtend program that maps JSON properties into members. The Eclipse IDE will recognize these members, so you can use features such as type checking and autocompletion. All you have to do is wrap the JSON sample within an `@Jsonized` annotation. **Figure 2** shows an example within the Eclipse IDE using a JSON sample representing a tweet.

![Architect-languages-f2](https://www.oracle.com/ocom/groups/public/@otn/documents/digitalasset/2267343.jpg)

**Figure 2**

### 7 | Fantom

[Fantom](https://www.fantom.org/) is an object-oriented language featuring a type system that takes an alternative view compared to most other established, statically typed languages. First, it differentiates itself by not supporting user-defined generics. However, three built-in classes can be parameterized: `List`, `Map`, and `Func`. This design decision was made to let programmers benefit from the use of generics (such as working with collections—see the link to an empirical study conducted by Parnin et al. in “Learn More”) without complicating the overall type system. In addition, Fantom provides two kinds of method invocations: one that goes through type checking at compile time (using a dot notation: .) and one that defers checking to runtime (using an arrow notation: `->`).

**Feature focus: immutability.** Fantom encourages immutability through language constructs. For example, it supports `const` classes—once created, an instance is guaranteed to have no state changes. Here’s how it works. You can define a class `Transaction` prefixed with the `const` keyword:

```fantom
    const class Transaction {
      const Int value
    }
```

The `const` keyword ensures that the class declares only fields that are immutable, so you won’t be able to modify the field named `value` after you instantiate a `Transaction`. This is not much different than declaring all fields of a class `final` in Java. However, this feature is particularly useful with nested structures. For example, let’s say the `Transaction` class is modified to support another field of type `Location`. The compiler ensures that the `location` field can’t be reassigned and that the `Location` class is immutable.

For instance, the code in **Listing 13** is incorrect and will produce the error `Const field 'location' has non-const type 'hello_0::Location'`. Similarly, all classes extending a `const` class can be only `const` classes themselves.

```Fantom
    [Fantom]
    
    const class Transaction {
      const Int value
      const Location location := Location("Cambridge")
    }
    class Location{
      Str city
      new make(Str city) { this.city = city }
    }
```

### 8 | X10

[X10](http://x10-lang.org/) is an experimental object-oriented language that IBM developed. It supports features such as first-class functions and is designed to facilitate efficient programming for high-performance parallel computing.

To this end, the language is based on a programming model called the _partitioned global address space_. In this model, each process shares a global address space, and slices of this space are allocated as private memory for local data and access. To work with this model, X10 offers specialized built-in language constructs to work with concurrency and distributed execution.

Compared to popular object-oriented languages, a novel feature in its type system is support for _constraint types_. You can think of constraint types as a form of contracts attached to types. What makes this useful is that errors are checked statically, eliminating the need for more-expensive runtime checks. For example, one possible application of constraint types is to report out-of-bound array accesses at compile time.

## Learn More

-   **“[Java Generics Adoption: How New Features Are Introduced, Championed, or Ignored](https://dl.acm.org/citation.cfm?id=1985446)”**

**Feature focus: constraint types.** Consider a simple `Pair` class, with a generated constructor:

`class Pair(x: Long, y: Long){}`

You can create `Pair` objects as follows:

```js
val p1 : Pair = new Pair(2, 5);
```

However, you can also define explicit constraints (similar to contracts) on the properties of a `Pair` at use-site. Here, you want to ensure that `p2` holds only symmetric pairs (that is, the values of `x` and `y` must be equal):

```js
val p2 : Pair{self.x == self.y} = new Pair(2, 5);
```

Because `x` and `y` are different in this code example, the assignment will be reported as a compile error. However, the following code compiles without an error:

```js
val p2 : Pair{self.x == self.y} = new Pair(5, 5);
```

## Conclusion

In this article, we examined eight features from eight popular JVM languages. These languages provide many benefits, such as enabling you to write code in a more concise way, use dynamic typing, or access popular functional programming features.

I hope this article has sparked some interest in alternative languages and that it will encourage you to check out the wider JVM eco-system.

**Acknowledgements.** I’d like to thank Alex Buckley, Richard Warburton, Andy Frank, and Sven Efftinge for their feedback.

## 参考资料

[Alternative Languages for the JVM](https://www.oracle.com/technical-resources/articles/java/architect-languages.html)
