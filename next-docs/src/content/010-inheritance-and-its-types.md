---
title: "Inheritance and It's types"
type: lld
order: 10
---

# Inheritance and It's types

Topic Tags:

OOPSystem DesignLLD

🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

‍

> Inheritance is a cornerstone of Object-Oriented Programming (OOP) that facilitates code reuse and establishes a hierarchical relationship between classes. By inheriting properties and methods from a parent class, a subclass can extend or override functionalities, enabling efficient and scalable application development. ⚙️🔄

‍

This promotes code reuse, reduces redundancy, and supports polymorphism, making applications easier to develop and maintain. 💻✨

‍

## Types of Inheritance:

### 1\. Single Inheritance:

> In single inheritance, a subclass inherits from a single parent class. This is the simplest form of inheritance and is widely used in Java.

‍

Example : 

```java

class Animal {
void eat() {
System.out.println("This animal eats food.");
}
}

class Dog extends Animal {
void bark() {
System.out.println("The dog barks.");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.eat(); // Inherited method
dog.bark();
}
}
```

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741574593081-Frame-244-\(2\).png)

**🔑Key Features:**

• A single subclass derives from one superclass.

• Promotes simplicity and clarity in the inheritance hierarchy.

‍

### 2\. Multilevel Inheritance : 

> In multilevel inheritance, a class inherits from a parent class, and another class further inherits from this child class, forming a chain.

‍

Example : 

```java

class Animal {
void eat() {
System.out.println("This animal eats food.");
}
}

class Mammal extends Animal {
void walk() {
System.out.println("This mammal walks.");
}
}

class Dog extends Mammal {
void bark() {
System.out.println("The dog barks.");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.eat(); // Inherited from Animal
dog.walk(); // Inherited from Mammal
dog.bark();
}
}
```

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741574610806-Frame-245-\(2\).png)

‍

**🔑 Key Features:**

• Establishes a chain of inheritance.

• Enables deeper specialization of classes.

‍

### 3\. Hierarchical Inheritance :

> In hierarchical inheritance, multiple subclasses inherit from a single parent class. This allows different classes to share common properties and behaviors defined in the superclass.

‍

Example : 

```java

class Animal {
void eat() {
System.out.println("This animal eats food.");
}
}

class Dog extends Animal {
void bark() {
System.out.println("The dog barks.");
}
}

class Cat extends Animal {
void meow() {
System.out.println("The cat meows.");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.eat();
dog.bark();
Cat cat = new Cat();
cat.eat();
cat.meow();
}
}
```

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741574633062-Frame-246-\(2\).png)

‍

**🔑 Key Features:**

• Multiple subclasses share common properties from a single superclass.

• Promotes code reuse and modularity.

‍

### 4\. Multiple Inheritance : 

> Java does not support Multiple inheritance directly due to the diamond problem, but it can be achieved using interfaces. In Multiple inheritance, A single class can inherit properties from multiple interfaces.

### ‍

### 💎 What is the Diamond Problem?

The diamond problem arises in languages that allow multiple inheritance with classes. Imagine a scenario where a class inherits from two parent classes that both have a method with the same name. If the child class does not override the method, it creates ambiguity as to which implementation the child class should inherit. This leads to confusion and potential conflicts in the program.

‍

**Problem Example :** 

```java

class Animal {
public void sound() {
System.out.println("Animal makes a sound");
}
}

class Dog extends Animal {
@Override
public void sound() {
System.out.println("Dog barks");
}
}

class Cat extends Animal {
@Override
public void sound() {
System.out.println("Cat meows");
}
}

// Not supported in Java
public class HybridAnimal extends Dog, Cat {
public static void main(String[] args) {
HybridAnimal hybrid = new HybridAnimal();
hybrid.sound(); // Creates ambiguity: Should it call Dog's sound() or Cat's
// sound()?
}
}
```

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741574642008-Frame-247-\(1\).png)

‍

**🧠 How Java Resolves This?**

Java avoids this problem by not allowing multiple inheritance with classes. Instead, Java provides interfaces as a way to achieve multiple inheritance.

‍

When a class implements multiple interfaces, it must provide implementations for the methods defined in the interfaces. This eliminates ambiguity since the child class explicitly defines the behavior of inherited methods.

‍

Solution Example : 

```java

interface Dog {
void sound();
}

interface Cat {
void sound();
}

public class HybridAnimal implements Dog, Cat {
@Override
public void sound() {
// You can define custom logic to decide which sound to make
Dog.super.sound(); // Calls Dog's sound()
// Cat.super.sound();  // Or you can choose to call Cat's sound()
}

public static void main(String[] args) {
HybridAnimal hybrid = new HybridAnimal();
hybrid.sound(); // Calls Dog's sound
}
}
```

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741574649159-Frame-248.png)

‍

**🔑Key Features:**

• Achieved using interfaces to avoid ambiguity caused by multiple inheritance.

• Combines the benefits of various inheritance types.

‍

### 5\. Hybrid Inheritance : 

> Hybrid inheritance is a combination of more than one type of inheritance. It can involve both single inheritance and multiple inheritance.

‍

In Java, hybrid inheritance is achieved by combining classes and interfaces. Since Java doesn't support multiple inheritance with classes (to avoid the diamond problem), this type of inheritance can only be implemented using interfaces alongside class inheritance.

‍‍

Example :

```java

// Single inheritance
class Animal {
void eat() {
System.out.println("The animal eats food.");
}
}

// Interface for multiple inheritance
interface Mammal {
void walk();
}

// Interface for multiple inheritance
interface Pet {
void play();
}

// Hybrid inheritance using a combination of class and interfaces
class Dog extends Animal implements Mammal, Pet {
@Override
void eat() {
System.out.println("The dog eats food.");
}
@Override
public void walk() {
System.out.println("The dog walks.");
}
@Override
public void play() {
System.out.println("The dog plays fetch.");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.eat();
dog.walk();
dog.play();
}
}
```

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741574657854-Frame-249.png)

‍

## 👍🏼Advantages of Inheritance : 

### 1\. Code Reusability:

Enables reuse of existing code, reducing redundancy and effort.

‍

Example :

```java

class Animal {
public void eat() {
System.out.println("Animal is eating");
}
}

class Dog extends Animal {
// Inherits eat() method from Animal
}

class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.eat(); // Reuses the eat method from Animal
}
}
```

‍

### 2\. Ease of Maintenance:

Centralizes common functionality, making updates and bug fixes more manageable.

‍

Example :

```java

class Animal {
public void eat() {
System.out.println("Animal is eating");
}
}

class Dog extends Animal {
// Inherits eat() method from Animal
}

class Cat extends Animal {
// Inherits eat() method from Animal
}

public class Main {
public static void main(String[] args) {
// If we need to fix a bug in eat()
// or improve it, we only need to do it in Animal
Animal animal = new Dog();
animal.eat(); // Animal is eating
animal = new Cat();
animal.eat(); // Animal is eating
}
}
```

‍

If we need to fix a bug in start() method or refactor it, we only need to do it in the Vehicle Class and it will be implemented for all the sub classes of the Vehicle Class.

‍

### 3\. Extensibility:

Allows developers to extend functionality without altering existing code.

‍

Example : 

```java

class Animal {
public void sleep() {
System.out.println("Animal is sleeping");
}
}

class Dog extends Animal {
@Override
public void sleep() {
System.out.println("Dog is sleeping in its kennel");
}
}

class Cat extends Animal {
@Override
public void sleep() {
System.out.println("Cat sleeps in a tree");
}
}

class Main {
public static void main(String[] args) {
Animal myAnimal = new Animal();
Animal myDog = new Dog();
Animal myCat = new Cat();
myAnimal.sleep(); // Animal is sleeping
myDog.sleep(); // Dog is sleeping in its kennel
myCat.sleep(); // Cat sleeps in a tree
}
}
```

‍

In this example, Dog and Cat both inherit the sleep() method from Animal. You can extend the functionality of the sleep() method in each subclass by overriding it to add specific behavior for each subclass (Dog sleeping in a kennel, Cat sleeping in a tree). 

‍

This is an example of extensibility—you don’t need to modify the Animal class itself to extend its behavior for each subclass. You only need to add new behavior or change behavior in the subclasses as needed.

‍

Inheritance makes it easier to add new types of animals with different sleeping behaviors by extending Animal without changing the original Animal class.

‍

### 4\. Supports Polymorphism:

Facilitates runtime polymorphism, enabling dynamic behaviour.

‍

Example : 

```java

class Animal {
public void sound() {
System.out.println("Animal makes a sound");
}
}

class Dog extends Animal {
@Override
public void sound() {
System.out.println("Dog barks");
}
}

class Cat extends Animal {
@Override
public void sound() {
System.out.println("Cat meows");
}
}

class Main {
public static void main(String[] args) {
Animal myAnimal = new Dog();
myAnimal.sound(); // Dog barks

myAnimal = new Cat();
myAnimal.sound(); // Cat meows
}
}
```

‍

## 👎🏼Disadvantages of Inheritance : 

### 1\. Increased Coupling:

Creates a tightly coupled relationship between classes, making changes in the superclass impact all subclasses.

‍

Example : 

```java

class Animal {
public void eat() {
System.out.println("Animal eats");
}
}

class Dog extends Animal {
// Inherits eat() method from Animal
}

class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.eat(); // Reuses the eat method from Animal
}
}
```

‍

If we change Animal's eat method, it could break Dog's functionality leading to an Exception      which shows how a change in one particular method of the Parent class can break the properties of it's subclasses.

‍

### 2\. Complexity:

Overuse of inheritance can lead to overly complex and hard-to-maintain hierarchies.

‍

Example :

```java

class Animal {}
class Mammal extends Animal {}
class Dog extends Mammal {}
class Bulldog extends Dog {}

class Main {
public static void main(String[] args) {
Bulldog bulldog = new Bulldog();
}
}
```

‍

Understanding this deep nested level of inheritance structure may be difficult in larger systems to maintain and may require refactoring to make the structure more maintainable and scalable.

‍

### 3\. Reduced Flexibility:

A subclass is heavily dependent on the implementation of its superclass, which may limit customization.

‍

Example :

```java

class Animal {
public void sleep() {
System.out.println("Animal is sleeping");
}
}

class Dog extends Animal {
// The dog inherits the sleep method from Animal
}

class Cat extends Animal {
// Similarly, the Cat class inherits the sleep method from Animal
}

class Main {
public static void main(String[] args) {
Animal dog = new Dog();
Animal cat = new Cat();

dog.sleep(); // Animal is sleeping (not customized for Dog)
cat.sleep(); // Animal is sleeping (not customized for Cat)
}
}
```

‍

In this example, the Dog and Cat classes are both inheriting the sleep() method from Animal. However, suppose you wanted to make Dog sleep in a specific way, for instance, "Dog is sleeping in its kennel" 🐶🏠 and Cat sleep in another way, "Cat sleeps in a tree" 🐱🌳.

‍

You would be forced to modify the sleep() method in the parent class, Animal, or override it in each subclass. This reduces flexibility because you can't change or extend sleep() behavior independently for each subclass without affecting the others. 🔄

‍

## 🎯Conclusion :

Inheritance is a fundamental feature of Java that enhances code reuse, modularity, and scalability. By understanding its types—single, multilevel, hierarchical, and hybrid—developers can design robust and maintainable applications. 💻

‍

Proper use of inheritance fosters efficient development while avoiding common pitfalls such as over-coupling and unnecessary complexity. 🛠️

---
