---
title: "Access Modifiers"
type: lld
order: 14
---

# Access Modifiers

Topic Tags:

oopsystem designlld

‍‍🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

‍

> Access modifiers 🔒 are fundamental in Object-Oriented Programming (OOP) 💻 as they control the visibility 👀 and accessibility of classes, methods, and variables in a program. They play a crucial role in encapsulation 🔐 by restricting or allowing access to certain parts of the code based on the specified modifier.

‍

Access modifiers prevent data members or functions of one class from tampering 🛑 with another class while restricting its access. It allows us to select which members can be accessed directly by outside functions and which are not. ✅

# 🏗️ Project Structure Overview:

Before diving into the types of access modifiers 🔒, let me walk you through the project structure that will be used to demonstrate their behavior.

Below is an image 🖼️ of the project setup:

‍

### Project Structure:

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741746983943-image.png)

• **src/:**

The root folder containing all the code files.

‍

• **demoPackage/:**

This package contains the DemoClass, which we will use to demonstrate the usage of different access modifiers in Java.

‍

• **utilityClasses/:**

This package contains the following classes:

1.  PublicClassExample: Demonstrates the use of the public access modifier.
2.  PrivateClassExample: Demonstrates the use of the private access modifier.
3.  ProtectedClassExample: Demonstrates the use of the protected access modifier.
4.  DefaultClassExample: Demonstrates the default (package-private) access modifier.

‍

• **Main.java:**

The main entry point for running the project.

‍

### This structure allows us to clearly show how access modifiers work across:

1\. Classes within the same package (demoPackage).

2\. Classes in different packages (utilityClasses).

‍

Each of these access modifiers—public, private, protected, and default—will be explored using these classes and their relationships.

‍

# Types of Access Modifiers in Java : 

Java provides four main types of access modifiers:

## 1\. Public : 

### 🌐 Scope:

A public class, method, or variable is accessible from anywhere in the application, whether it’s within the same package or from a different package.

‍

### 🛠️ Usage:

The public modifier is used when you want the element (class, method, or variable) to be globally accessible. In the context of our project structure, the PublicClassExample in the utilityClasses package is accessible to other classes such as DemoClass in the demoPackage package.

‍

### 💻 Code Example: Demonstrating the Public Modifier

Here’s how we use the PublicClassExample to demonstrate the public modifier:

‍

PublicClassExample.java : 

• Located in the utilityClasses package:

‍

```java
package utilityClasses; // Declared in the utilityClasses package
public class PublicClassExample {
public void display() {
System.out.println("This is a public method in PublicClassExample.");
}
}
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741748160739-image.png)

‍

DemoClass.java : 

• Located in the demoPackage package, demonstrating the usage of the public method:

```java
package demoPackage; // Declared in the demoPackage package
import utilityClasses.PublicClassExample; // Importing the PublicClassExample from another package

public class DemoClass {
public static void main(String[] args) {
// Creating an object of PublicClassExample
PublicClassExample example = new PublicClassExample();

// Calling the public method
example.display(); // Accessible because 'display()' is public
}
}
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741748136436-image.png)

### ‍

### 🧩 Explanation : 

The display() method in PublicClassExample is declared as public, making it accessible across packages. By importing utilityClasses.PublicClassExample in DemoClass, we can use the method display() without any access restrictions.

‍

When you run the DemoClass, the output will be:

```
This is a public method.
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741748110130-image.png)

## ‍

## 2\. Private : 

### 🌐 Scope: 

A private class, method, or variable is not accessible from anywhere in the application. It is only accessible within the same class and not from outside the class, whether in the same package, a child class, or a different package. It will be accessible only within the same class.

### 🛠️ Usage: 

The private modifier is used when you want an element (class, method, or variable) to be accessible only within the same class. In the context of our project structure, the PrivateClassExample in the utilityClasses package is accessible to other classes because it is declared public. However, its methods won't be accessible to the DemoClass in the demoPackage package, as all the methods defined are private, which will result in a compile-time error.

‍

### 💻 Code Example: Demonstrating the Private Modifier

Here’s how we use the PrivateClassExample to demonstrate the public modifier:

‍

PrivateClassExample.java : 

Located in the utilityClasses package

```java
package utilityClasses;

public class PrivateClassExample {
private String secret = "Hidden Message";
private void displaySecret() {
System.out.println(secret);
}
private void show() {
displaySecret(); // Accessible within the same class
}
}
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741748080835-image.png)

‍

DemoClass.java : 

Located in the demoPackage package, demonstrating the usage of the private method

```java
package demoPackage;
import utilityClasses.PrivateClassExample;

public class DemoClass {
public static void main(String[] args) {
PrivateClassExample example = new PrivateClassExample();
example.show();
}
}
```

‍

The show() method in PrivateClassExample is declared as private, making it accessible only within the PrivateClassExample class. By importing utilityClasses.PrivateClassExample in DemoClass, we cannot use the show() method.

Whenever we try to access the show() method of the PrivateClassExample, since it's declared private, the compiler will give us a warning stating that 'show() has private access in utilityClasses.PrivateClassExample'.

‍

Even if you forcefully run the DemoClass, the output will be a compile-time error, which will be printed in the terminal:

```
java: show() has private access in utilityClasses.PrivateClassExample
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741747996976-image.png)

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741747982783-image.png)

## ‍

## 3\. Protected

### 🌐 Scope: 

The protected modifier allows access members within the same package and from subclasses in other packages. It offers more restricted access compared to public, but it is broader than private. By using protected, you enable controlled inheritance, allowing child classes to reuse and extend parent class functionality while keeping it hidden from unrelated classes.

‍

### 🛠️ Usage:

The protected modifier is used in scenarios where inheritance is a key design pattern. For example, you might define reusable methods or fields in a superclass that should only be accessed or overridden by its subclasses. It is commonly used in frameworks or libraries to expose specific functionality to derived classes while restricting general access.

‍

### 💻 Code Example: Demonstrating the Protected Modifier

Here’s how we use the ProtectedClassExample to demonstrate the public modifier:

‍

ProtectedClassExample.java : 

Located in the utilityClasses package

```java
package utilityClasses;

public class ProtectedClassExample {
protected void display() {
System.out.println("Hello from Parent class!");
}
}
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741747956485-image.png)

‍

DemoClass.java : 

• Located in the demoPackage package, demonstrating the usage of the protected method:

```java
package demoPackage;
import utilityClasses.ProtectedClassExample;

public class DemoClass {
public static void main(String[] args) {
ProtectedClassExample example = new ProtectedClassExample();
example.display();
}
}
```

‍

The display() method in ProtectedClassExample is declared as protected when no access modifier is assigned, making it accessible only within the classes present in the same package and also in the classes present in different packages if they are a subclass of the ProtectedClassExample. By importing utilityClasses.ProtectedClassExample in DemoClass, we cannot use the display() method, as the DemoClass is not a subclass of the ProtectedClassExample.

‍

Whenever we try to access the display() method of the ProtectedClassExample, since it's declared protected, the compiler will give us a warning stating that:

```
'display()' has protected access in 'utilityClasses.ProtectedClassExample'
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741747930771-image.png)

‍

In order to access the parent class method, we can make DemoClass extend the ProtectedClassExample class, thereby making DemoClass a subclass of ProtectedClassExample.

This will allow us to access the display() method of the ProtectedClassExample.

‍

Code : 

```java
package demoPackage;
import utilityClasses.ProtectedClassExample;

public class DemoClass extends ProtectedClassExample {
public static void main(String[] args) {
ProtectedClassExample example = new ProtectedClassExample();
example.display();
}
}
```

‍

The output in the Terminal will be : 

```
Hello from Parent class!
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741747876132-image.png)

## ‍

## 4\. Default (Package-Private)

### 🌐Scope: 

When no access modifier is specified, the default (package-private) access modifier is applied. Members with this access modifier are accessible only within the same package but not from outside it. This ensures that the functionality is available for closely related classes within the package while being hidden from other parts of the application.

### 🛠️ Usage: 

Default access is used when you want to limit access to package-level components. It is ideal for internal helper classes, methods, or variables that do not need to be exposed to external packages. This access level supports modularity by grouping related classes and ensuring that their interactions remain encapsulated within the package.

### 💻 Code Example: Demonstrating the Default Modifier : 

Here’s how we use the DefaultClassExample to demonstrate the public modifier:

‍

DefaultClassExample.java : 

• Located in the utilityClasses package:

```java
package utilityClasses;

public class DefaultClassExample {
void display() {
System.out.println("This is a default access method.");
}
}
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741747838076-image.png)

‍

DemoClass.java : 

• Located in the demoPackage package, demonstrating the usage of the default method:

```java
package demoPackage;
import utilityClasses.DefaultClassExample;

public class DemoClass {
public static void main(String[] args) {
DefaultClassExample example = new DefaultClassExample();
example.display();
}
}
```

‍

The display() method in DefaultClassExample is by default declared as default when no access modifier is assigned, making it accessible only within the classes present in the same package. By importing utilityClasses.DefaultClassExample in DemoClass, we cannot use the display() method, as the DemoClass is present in a different package, which is demoPackage.

‍

Whenever we try to access the display() method of the DefaultClassExample, since it's declared default, the compiler will give us a warning stating that:‍

```
'display()' is not public in 'utilityClasses.DefaultClassExample'. Cannot be accessed from outside package.
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741747808420-image.png)

‍

Now, even if we try to run the file forcefully, it will give us a compile-time error in the terminal, stating:

```
java: display() is not public in utilityClasses.DefaultClassExample; cannot be accessed from outside package
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741747778061-image.png)

‍

Now that we have seen we cannot access the default access modifier methods in different packages, if we create a new class, let's say Main, in the same utilityClasses package, add the same code as we did in the DemoClass and try to access the display() method of the DefaultClassExample, it will not give us any compile-time warnings and will work absolutely fine.

‍

The output in the Terminal will be : 

```
This is a default access method.
```

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741746875913-image.png)

‍

## 📝 Summary of Access Modifiers : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741746136124-image.png)

‍

## 🎉 Conclusion : 

Access modifiers are essential tools that provide control over the visibility and accessibility of classes, methods, and variables. By understanding and using access modifiers effectively, developers can create secure, modular, and maintainable applications. Mastery of access modifiers is key to writing robust and encapsulated programs.

---
