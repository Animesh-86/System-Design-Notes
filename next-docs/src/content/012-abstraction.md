---
title: "Abstraction"
type: lld
order: 12
---

# Abstraction

Topic Tags:

OOPSystem DesignLLD

🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

‍

> Abstraction is a core concept of Object-Oriented Programming (OOP) that focuses on exposing only the essential details of an object while hiding the implementation details. It enables developers to interact with objects at a higher level, focusing on what an object does rather than how it does it. 🧠🔍

‍

For example, when you use a car, you interact with its accelerator, brake, and steering wheel without needing to know how the engine works internally. This is an example of abstraction. 🚗⚙️

In Java, abstraction is achieved using abstract classes and interfaces. 🏗️💡

‍

## Problem Without Abstraction

Imagine we want to create multiple animal types (Dog, Cat, Bird, etc.) where each animal has unique behaviors, such as making sounds. Without abstraction, we might end up writing repetitive and tightly coupled code. 🐕🐈🐦

‍

For example : 

```java
class Dog {
void makeSound() {
System.out.println("Bark");
}
void sleep() {
System.out.println("Sleeping...");
}
}

class Cat {
void makeSound() {
System.out.println("Meow");
}
void sleep() {
System.out.println("Sleeping...");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.makeSound(); // Outputs: Bark
dog.sleep(); // Outputs: Sleeping...
Cat cat = new Cat();
cat.makeSound(); // Outputs: Meow
cat.sleep(); // Outputs: Sleeping...
}
}
```

‍

### The problems in the Above Code which doesn't uses the Concept of Abstraction are as follows :

1\. **Repetitive Code:** Both Dog and Cat have the sleep() method, resulting in duplicate logic.

‍

2.  **No Common Structure:** If a new animal is added, the same methods need to be redefined, leading to code redundancy.

‍

3\. **Lack of Flexibility:** You can't refer to all animals in a common way (e.g., treating a Dog and Cat as Animal).

‍

4\. **Tightly Coupled Code:** You must directly interact with individual classes (Dog, Cat), making the code less reusable and harder to maintain.

‍

### Solution Using Abstraction : 

Abstraction allows us to focus on defining the what of an object (its behavior) while hiding the how of the object (its implementation).

To Solve the above Problems, we can define a common structure for all animals, specifying the essential behaviors they must have while leaving the specific implementations to the subclasses.

‍

This approach not only reduces code redundancy by centralizing shared logic but also enhances the flexibility and scalability of the system. Instead of creating tightly coupled classes for each animal type, abstraction allows us to treat all animals in a unified way, making the code more maintainable and easier to extend.

‍

Without abstraction, the code would become repetitive, harder to maintain, and prone to errors as new animal types are added.

‍

### Abstraction helps to:

• Create a scalable design where adding new animals only involves defining a new subclass or implementing a new interface.

• Ensure consistency across all animal types by enforcing common methods like makeSound() and sleep().

• Facilitate polymorphism, enabling us to write code that can interact with any animal in a generic way, regardless of its specific type.

‍

## Ways to Achieve Abstraction : 

### 1\. Abstract Class 📦

> An abstract class acts as a blueprint for other classes, providing a foundation for shared behavior while allowing subclasses to define specific implementations.

‍

It can include both abstract methods (declared but not implemented) and concrete methods (implemented with logic). By combining these, abstract classes strike a balance between enforcing a common structure and enabling flexibility. Importantly, abstract classes cannot be instantiated directly, meaning they are designed solely to be extended by other classes.

‍

```java
// Abstract Class Animal
abstract class Animal {
// Abstract method for unique behaviors
abstract void makeSound();
// Concrete method for shared behaviors
void sleep() {
System.out.println("Sleeping...");
}
}

// Specific implementation for Dog
class Dog extends Animal {
@Override
void makeSound() {
System.out.println("Bark");
}
}

// Specific implementation for Cat
class Cat extends Animal {
@Override
void makeSound() {
System.out.println("Meow");
}
}

public class Main {
public static void main(String[] args) {
Animal myDog = new Dog(); // Treating Dog as an Animal
myDog.makeSound(); // Outputs: Bark
myDog.sleep(); // Outputs: Sleeping...
Animal myCat = new Cat(); // Treating Cat as an Animal
myCat.makeSound(); // Outputs: Meow
myCat.sleep(); // Outputs: Sleeping...
}
}
```

### 👍🏼 Advantages of Abstract classes : 

1.  **Improved Code Maintainability:**

By focusing on essential details, abstraction makes code easier to maintain and understand.

‍

Example : 

```java
abstract class Animal {
abstract void makeSound();
void eat() {
System.out.println("Animal is eating...");
}
}

class Dog extends Animal {
@Override
void makeSound() {
System.out.println("Bark");
}
}

public class Main {
public static void main(String[] args) {
Animal myDog = new Dog();
myDog.eat(); // Outputs: Animal is eating...
myDog.makeSound(); // Outputs: Bark
}
}
```

‍

Here, the eat() method is defined in the abstract class Animal, and any update to this method will reflect across all subclasses (Dog, Cat, etc.), improving maintainability.

‍

2\. **Enhanced Flexibility:**

Changes to the internal implementation do not affect the external interface, allowing developers to modify or extend functionality easily.

‍

Example : 

```java
abstract class Animal {
void makeSound();
}

class Dog extends Animal {
@Override
public void makeSound() {
System.out.println("Bark");
}
}

public class Main {
public static void main(String[] args) {
Animal myDog = new Dog();
myDog.makeSound(); // Outputs: Bark
}
}
```

‍

The Animal abstract class provides a consistent way to interact with animals. Even if the Dog class changes its internal logic, the external interface (makeSound()) remains unchanged.

‍

3\. **Better Code Reusability:**

Abstract classes and interfaces promote code reuse by defining common behaviors that can be shared across multiple classes.

‍

```java
abstract class Animal {
void eat() {
System.out.println("Animal is eating...");
}
}

class Dog extends Animal {
// Inherits the eat() method
}

class Cat extends Animal {
// Inherits the eat() method
}

public class Main {
public static void main(String[] args) {
Dog myDog = new Dog();
myDog.eat(); // Outputs: Animal is eating...
Cat myCat = new Cat();
myCat.eat(); // Outputs: Animal is eating...
}
}
```

‍‍

The eat() method is defined once in the abstract class Animal and reused by all subclasses (Dog, Cat), eliminating code duplication.

‍

4\. **Increased Security:**

Hiding implementation details reduces the risk of accidental interference with internal workings.

‍

Example : 

```java
abstract class Animal {
private String secret = "Sensitive data";
abstract void makeSound();
protected String getSecret() {
return secret; // Controlled access to sensitive data
}
}

class Dog extends Animal {
@Override
void makeSound() {
System.out.println("Bark");
System.out.println("Accessing secret: " + getSecret());
}
}

public class Main {
public static void main(String[] args) {
Animal myDog = new Dog();
myDog.makeSound();
}
}
```

‍

The private field secret in Animal is hidden from external access. Subclasses can access it through controlled methods like getSecret(), ensuring security.

‍

### 👎🏼 Disadvantages of Abstract Classes : 

1.  **Complexity in Design:**

Designing abstract classes and interfaces requires careful planning and understanding of the system's requirements.

‍

Example: Imagine you're designing an abstraction for animals. If the abstraction is not carefully planned, it can lead to confusion or redundant code.

‍

```java
abstract class Animal {
abstract void makeSound();
// Poorly thought-out abstraction: Adding unrelated behaviors
abstract void fly(); // Not all animals can fly
abstract void swim(); // Not all animals can swim
}

class Dog extends Animal {
@Override
void makeSound() {
System.out.println("Bark");
}
@Override
void fly() {
throw new UnsupportedOperationException("Dogs can't fly");
}
@Override
void swim() {
System.out.println("Dog is swimming");
}
}
```

‍

**❓Why this is problematic:**

1.  **Irrelevant Methods:** The fly() method is irrelevant for animals like dogs and causes unnecessary implementation overhead.

2\. **Confusion:** Subclasses must implement methods that don’t make sense for them, leading to poor readability and maintainability.

3\. **Errors:** Using UnsupportedOperationException introduces runtime errors.

‍

💥 **Better Design :** 

‍

```java
abstract class Animal {
abstract void makeSound();
}

interface Flyable {
void fly();
}

interface Swimmable {
void swim();
}

class Dog extends Animal implements Swimmable {
@Override
void makeSound() {
System.out.println("Bark");
}
@Override
public void swim() {
System.out.println("Dog is swimming");
}
}
```

‍‍

**💭 Why this is better:**

• Only animals that can fly or swim implement the relevant interfaces, avoiding irrelevant methods in unrelated classes.

• This keeps the abstraction focused and reduces unnecessary complexity.

‍

2\. **Overhead:**

Abstraction introduces additional layers of complexity and method calls. This can slightly impact performance and make debugging harder, especially when abstractions are overused or unnecessary.

‍

Example: Let’s say you’re building a simple system to play animal sounds. Using abstraction for such a simple use case can introduce unnecessary overhead.

‍

```java
interface Animal {
void makeSound();
}

class Dog implements Animal {
@Override
public void makeSound() {
System.out.println("Bark");
}
}

class Cat implements Animal {
@Override
public void makeSound() {
System.out.println("Meow");
}
}

public class Main {
public static void main(String[] args) {
Animal dog = new Dog();
dog.makeSound(); // Outputs: Bark
Animal cat = new Cat();
cat.makeSound(); // Outputs: Meow
}
}
```

‍

**❓** **Why this is problematic:**

1.  **Overhead:** Introducing the Animal interface for such a simple scenario adds an unnecessary level of indirection.

2\. **Performance:** The method calls go through the interface, adding a minor runtime overhead.

3\. **Readability:** For small and straightforward programs, this abstraction makes the code harder to follow.

‍

💥 **Simpler Solution Without Abstraction :** 

‍

```java
class Dog {
void makeSound() {
System.out.println("Bark");
}
}

class Cat {
void makeSound() {
System.out.println("Meow");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.makeSound(); // Outputs: Bark
Cat cat = new Cat();
cat.makeSound(); // Outputs: Meow
}
}
```

‍

💭 **Why this is better:**

• For small and simple programs, directly using concrete classes makes the code more straightforward.

• There’s no need for additional abstraction if you don’t anticipate future changes or extensions.

‍

### 2\. Interface 🔌

An interface defines a contract or a set of rules that a class must adhere to. It contains abstract methods that specify what a class should do, without dictating how it should be done.

‍

Unlike abstract classes, interfaces focus purely on behavior and do not include state (fields). Starting from Java 8, interfaces can also include default and static methods, enabling the addition of shared logic without breaking existing implementations.

‍

> Interfaces are a powerful tool for achieving abstraction and ensuring consistency across unrelated classes.

‍

Example : 

```java
// Interface Animal
interface Animal {
void makeSound(); // Abstract method
void sleep(); // Abstract method
}

// Specific implementation for Dog
class Dog implements Animal {
@Override
public void makeSound() {
System.out.println("Bark");
}
@Override
public void sleep() {
System.out.println("Sleeping...");
}
}

// Specific implementation for Cat
class Cat implements Animal {
@Override
public void makeSound() {
System.out.println("Meow");
}
@Override
public void sleep() {
System.out.println("Sleeping...");
}
}

public class Main {
public static void main(String[] args) {
Animal myDog = new Dog();
myDog.makeSound(); // Outputs: Bark
myDog.sleep(); // Outputs: Sleeping...
Animal myCat = new Cat();
myCat.makeSound(); // Outputs: Meow
myCat.sleep(); // Outputs: Sleeping...
}
}
```

‍

### 👍🏼Advantages of Interface:

1.  **Decoupling:** Interfaces ensure that implementation details are completely separate from the method definitions.

‍

```java
interface Animal {
void makeSound();
void sleep();
}

class Dog implements Animal {
@Override
public void makeSound() {
System.out.println("Bark");
}
@Override
public void sleep() {
System.out.println("Dog is sleeping");
}
}

class Cat implements Animal {
@Override
public void makeSound() {
System.out.println("Meow");
}
@Override
public void sleep() {
System.out.println("Cat is sleeping");
}
}
```

‍

By using interfaces, the Dog and Cat classes are decoupled from the Animal interface, allowing for flexible and interchangeable implementations.

‍

2.**Extensibility:** Any class that implements Animal must provide its own implementation for makeSound() and sleep().

‍

```java
class Bird implements Animal {
@Override
public void makeSound() {
System.out.println("Chirp");
}

@Override
public void sleep() {
System.out.println("Bird is sleeping");
}
}
```

‍

New animal types like Bird can be easily added by implementing the Animal interface, without modifying existing code.

‍

3\. **Standardization:** Interfaces define a contract, ensuring that all implementing classes behave consistently.

‍

```java
public class Zoo {
public static void main(String[] args) {
Animal dog = new Dog();
Animal cat = new Cat();
Animal bird = new Bird();
dog.makeSound();
cat.makeSound();
bird.makeSound();
}
}
```

‍

The Zoo class can interact with any Animal implementation, ensuring consistent behavior across different animal types.

‍

### 👎🏼Disadvantages of Interface:

1.  **Complexity**: Using interfaces can introduce additional complexity, especially in small projects where the benefits of decoupling and extensibility may not be as significant.

‍

```java
interface Animal {
void makeSound();
void sleep();
}

class Dog implements Animal {
@Override
public void makeSound() {
System.out.println("Bark");
}
@Override
public void sleep() {
System.out.println("Dog is sleeping");
}
}

class Cat implements Animal {
@Override
public void makeSound() {
System.out.println("Meow");
}
@Override
public void sleep() {
System.out.println("Cat is sleeping");
}
}
```

‍

In small projects, the added complexity of defining and implementing interfaces may not be justified.

‍

2\. **Overhead:** Implementing multiple interfaces can lead to overhead in terms of code maintenance and readability, especially if the interfaces are not well-designed.

‍

```java
interface Animal {
void makeSound();
void sleep();
}

interface Pet {
void play();
}

class Dog implements Animal, Pet {
@Override
public void makeSound() {
System.out.println("Bark");
}
@Override
public void sleep() {
System.out.println("Dog is sleeping");
}
@Override
public void play() {
System.out.println("Dog is playing");
}
}
```

‍

Implementing multiple interfaces can make the code harder to read and maintain, especially if the interfaces are complex. 🧩🔄

‍

## Abstract Class vs Interface in Java:

> Abstraction is a fundamental concept in object-oriented programming that allows us to focus on the essential details while hiding unnecessary complexities.

‍

Both abstract classes and interfaces are tools used to achieve abstraction, but they serve different purposes and have distinct use cases. ⚙️

‍

### 📦 Abstract Class:

1\. **Definition:**

An abstract class is a class that cannot be instantiated directly. It serves as a blueprint for other classes to derive from. 🏗️

‍

2\. **Method Implementation:**

An abstract class can contain both abstract methods (methods without an implementation) and concrete methods (methods with an implementation). 🔨

‍

3\. **Variables:**

Abstract classes can have member variables, including final, non-final, static, and non-static variables. 📜

‍

4\. **Constructors:**

Abstract classes can have constructors, which can be used to initialize variables in the abstract class when it is instantiated by a subclass. 🛠️

‍

### 🔌 Interface:

1\. **Definition:**

An interface is a reference type in Java, it is similar to a class, and it is a collection of abstract methods and static constants. 🔗

‍

2\. **Method Implementation:**

All methods in an interface are by default abstract and must be implemented by any class that implements the interface. From Java 8, interfaces can have default and static methods with concrete implementations. From Java 9, interfaces can also have private methods. 🏗️

‍

3\. **Variables:**

Variables declared in an interface are by default public, static, and final (constants). 🔑

‍

4\. **Constructors:**

Interfaces are purely designed to define a contract for classes to implement. They cannot have constructors because they do not manage or hold any state, and constructors are used to initialize an object's state. This design aligns with the principle that interfaces focus solely on defining behavior, leaving the implementation details to the implementing classes. 🧳

‍

### 🤔 When to use what?

🎀 **Consider using abstract classes if any of these statements apply to your situation:**

• In the Java application, there are some related classes that need to share some lines of code, then you can put these lines of code within the abstract class, and this abstract class should be extended by all these related classes. 🔄

‍

```java
abstract class Animal {
void eat() {
System.out.println("Eating...");
}
abstract void makeSound();
}

class Dog extends Animal {
@Override
void makeSound() {
System.out.println("Bark");
}
}

class Cat extends Animal {
@Override
void makeSound() {
System.out.println("Meow");
}
}
```

‍

The Animal abstract class contains shared code for eat(), and both Dog and Cat extend this class and provide their own implementation for makeSound().

‍

• You can define the non-static or non-final field(s) in the abstract class so that via a method you can access and modify the state of the object to which they belong.

‍

```java
abstract class Animal {
protected String name;
abstract void makeSound();
void setName(String name) {
this.name = name;
}
String getName() {
return name;
}
}

class Dog extends Animal {
@Override
void makeSound() {
System.out.println("Bark");
}
}
```

‍

The Animal abstract class has a non-static field name and methods to access and modify it. The Dog     class extends Animal and provides its own implementation for makeSound().

‍

• You can expect that the classes that extend an abstract class have many common methods or fields, or require access modifiers other than public (such as protected and private).

‍

```java
abstract class Animal {
protected int age;
abstract void makeSound();
void setAge(int age) {
this.age = age;
}
int getAge() {
return age;
}
}

class Cat extends Animal {
@Override
void makeSound() {
System.out.println("Meow");
}
}
```

• The Animal abstract class has a protected field age and methods to access and modify it. The Cat class extends Animal and provides its own implementation for makeSound().

‍

🎀 **Consider using interfaces if any of these statements apply to your situation:**  

*   It is a total abstraction, all methods declared within an interface must be implemented by the class(es) that implements this interface.

‍

```java
interface Animal {
void makeSound();
void sleep();
}

class Dog implements Animal {
@Override
public void makeSound() {
System.out.println("Bark");
}
@Override
public void sleep() {
System.out.println("Dog is sleeping");
}
}
```

‍

The Animal interface defines the methods makeSound() and sleep(), and the Dog class implements these methods.

‍

• A class can implement more than one interface. It is called multiple inheritances.

```java
interface Animal {
void makeSound();
}

interface Pet {
void play();
}

class Dog implements Animal, Pet {
@Override
public void makeSound() {
System.out.println("Bark");
}
@Override
public void play() {
System.out.println("Dog is playing");
}
}
```

‍

The Dog class implements both Animal and Pet interfaces, providing implementations for makeSound() and play() methods.

‍

*   You want to specify the behavior of a data type without worrying about its implementation.

‍

```java
interface Animal {
void makeSound();
void sleep();
}

class Cat implements Animal {
@Override
public void makeSound() {
System.out.println("Meow");
}
@Override
public void sleep() {
System.out.println("Cat is sleeping");
}
}
```

‍

The Animal interface specifies the behavior for makeSound() and sleep(), and the Cat class provides the implementation for these methods.

## ‍

## When to Use Abstraction?

• When multiple objects share common behavior but have different implementations.

• To define a template or a standard for other classes to follow.

• To hide implementation details and expose only relevant functionalities to the users.

‍

## 👩🏼‍🎓Interview Questions : 

1\. What is the difference between an abstract class and an interface in Java? When would you use one over the other?

✨ Answer:

Abstract classes are used when classes share common functionality and state, whereas interfaces are used to define a contract for unrelated classes. Use abstract classes when you need shared code and interfaces for behavior enforcement.

‍

```java
abstract class Animal {
String name;
Animal(String name) {
this.name = name;
}
abstract void sound();
}

interface Pet {
void play();
}

class Dog extends Animal implements Pet {
Dog(String name) {
super(name);
}
@Override
void sound() {
System.out.println(name + " barks.");
}
@Override
public void play() {
System.out.println(name + " plays fetch.");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog("Buddy");
dog.sound(); // Output: Buddy barks.
dog.play(); // Output: Buddy plays fetch.
}
}
```

‍

2\. Can an abstract class implement an interface? If yes, why would you do it?

✨Answer:

Yes, an abstract class can implement an interface to provide partial implementation. This is useful when some methods in the interface have common logic that can be shared across subclasses.

‍

```java
interface Pet {
void play();
}

abstract class Animal implements Pet {
String name;
Animal(String name) {
this.name = name;
}
abstract void sound();
@Override
public void play() {
System.out.println(name + " plays.");
}
}

class Dog extends Animal {
Dog(String name) {
super(name);
}
@Override
void sound() {
System.out.println(name + " barks.");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog("Buddy");
dog.sound(); // Output: Buddy barks.
dog.play(); // Output: Buddy plays.
}
}
```

‍

3\. Why can’t we instantiate an abstract class? What would be the consequences if it were allowed?

✨Answer:

Abstract classes are incomplete blueprints meant to be extended. Allowing instantiation would violate the principle of abstraction, as abstract methods lack implementation.

‍

```java
abstract class Animal {
abstract void sound();
}

class Dog extends Animal {
@Override
void sound() {
System.out.println("Dog barks.");
}
}

public class Main {
public static void main(String[] args) {
// Animal animal = new Animal(); // Compile-time error
Dog dog = new Dog();
dog.sound(); // Output: Dog barks.
}
}
```

‍

4\. What are the limitations of using abstract classes over interfaces?

✨ Answer:

Abstract classes allow single inheritance only, whereas interfaces can be implemented by multiple classes, offering more flexibility.

‍

Abstract Class Example (Multiple Inheritance Error):

```java
abstract class Animal {
abstract void sound();
void commonMethod() {
System.out.println("Animal common method.");
}
}

abstract class Mammal {
abstract void eat();
void commonMethod() {
System.out.println("Mammal common method.");
}
}

class Dog extends Animal, Mammal { // This will cause a compile-time error
@Override
void sound() {
System.out.println("Dog barks.");
}
@Override
void eat() {
System.out.println("Dog eats.");
}
@Override
void commonMethod() {
// Which commonMethod() to call? This causes ambiguity.
}
}
```

‍

Interface Example (No Error):

```java
interface Animal {
void sound();
default void commonMethod() {
System.out.println("Animal common method.");
}
}

interface Pet {
void play();
default void commonMethod() {
System.out.println("Pet common method.");
}
}

class Dog implements Animal, Pet {
@Override
public void sound() {
System.out.println("Dog barks.");
}
@Override
public void play() {
System.out.println("Dog plays fetch.");
}
@Override
public void commonMethod() {
Animal.super.commonMethod();
Pet.super.commonMethod();
System.out.println("Dog's own common method.");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.sound(); // Output: Dog barks.
dog.play(); // Output: Dog plays fetch.
dog.commonMethod(); // Output: Animal common method.
//         Pet common method.
//         Dog's own common method.
}
}
```

‍

5\. When should you not use an interface? Provide a practical example.

✨Answer:

Avoid interfaces when the implementing classes share common functionality or state. For example, if Dog and Cat both need an eat() method with shared logic, an abstract class like Animal is more appropriate than an interface.

‍

```java
abstract class Animal {
void eat() {
System.out.println("Eating...");
}
}

class Dog extends Animal {
void sound() {
System.out.println("Dog barks.");
}
}

class Cat extends Animal {
void sound() {
System.out.println("Cat meows.");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
Cat cat = new Cat();
dog.eat(); // Output: Eating...
dog.sound(); // Output: Dog barks.
cat.eat(); // Output: Eating...
cat.sound(); // Output: Cat meows.
}
}
```

‍‍

6\. What are default methods in Java interfaces? Why were they introduced?

✨ Answer:

Default methods are methods in interfaces that have a body (implementation). They were introduced in Java 8 to provide backward compatibility. This allows interfaces to evolve by adding new methods without breaking existing implementations of the interface.

‍

```java
interface Animal {
void sound() {
System.out.println("This is a default animal sound.");
}
}

class Dog implements Animal {
// No need to override sound
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.sound(); // Output: This is a default animal sound.
}
}
```

‍

7\. What is the difference between abstract methods and default methods in an interface?

✨Answer:

Abstract methods have no body and must be implemented by a class that implements the interface. Default methods have a body and can be optionally overridden by implementing classes.

‍

```java
interface Animal {
void eat(); // Abstract method
default void sound() {
System.out.println("This is a default animal sound.");
}
}

class Dog implements Animal {
@Override
public void eat() {
System.out.println("Dog is eating.");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.eat(); // Output: Dog is eating.
dog.sound(); // Output: This is a default animal sound.
}
}
```

‍‍

8\. Why do we need default methods in Java? Couldn’t we achieve the same with abstract classes?

✨Answer:

Default methods allow interfaces to add new behavior without forcing all implementing classes to change. Abstract classes cannot achieve this because Java does not allow multiple inheritance of classes. Interfaces with default methods enable flexibility while avoiding the diamond problem.

‍

```java
interface Animal {
default void sound() {
System.out.println("This is a default animal sound.");
}
}

abstract class Mammal {
abstract void eat();
}

class Dog extends Mammal implements Animal {
@Override
void eat() {
System.out.println("Dog is eating.");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.eat(); // Output: Dog is eating.
dog.sound(); // Output: This is a default animal sound.
}
}
```

‍‍

9\. Can a class implement an interface without overriding its default methods?

✨Answer:

Yes, a class can implement an interface without overriding its default methods. The default implementation will be inherited. However, the class can override the method if it needs custom behavior.

‍

```java
interface Animal {
default void sound() {
System.out.println("This is a default animal sound.");
}
}

class Dog implements Animal {
// No need to override sound
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.sound(); // Output: This is a default animal sound.
}
}
```

‍‍

10\. What happens if a class implements an interface with a default method and also inherits the same method from a superclass? Which one gets priority?

✨Answer:

The method from the superclass takes priority over the default method in the interface. The class will inherit the superclass's method unless it explicitly overrides it.

‍

```java
interface Animal {
default void sound() {
System.out.println("This is a default animal sound.");
}
}

class Mammal {
public void sound() {
System.out.println("This is a mammal sound.");
}
}

class Dog extends Mammal implements Animal {
// No need to override sound
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.sound(); // Output: This is a mammal sound.
}
}
```

‍

11\. What happens if a class implements two interfaces that have a default method with the same name?

✨Answer:

If a class implements two interfaces with the same default method, it must override the method to resolve the ambiguity explicitly.

‍

🫎 **Example Scenario: Animal Sounds**

Imagine two interfaces, DogBehaviour and CatBehaviour, both of which have a makeSound() default method. A class AnimalProcessor implements both interfaces and needs to resolve the conflict explicitly.

‍

```java
interface DogBehavior {
default void makeSound() {
System.out.println("Dog barks.");
}
}

interface CatBehavior {
default void makeSound() {
System.out.println("Cat meows.");
}
}

class AnimalProcessor implements DogBehavior, CatBehavior {
// Resolving the conflict by overriding the method
@Override
public void makeSound() {
System.out.println(
"Resolving conflict between DogBehavior and CatBehavior:");

// Call the default method from DogBehavior
DogBehavior.super.makeSound();

// Call the default method from CatBehavior
CatBehavior.super.makeSound();

// Adding custom behavior
System.out.println(
"Custom behavior: AnimalProcessor decides which sound to make.");
}
}

public class Main {
public static void main(String[] args) {
AnimalProcessor processor = new AnimalProcessor();
processor.makeSound();
}
}
```

‍

Explanation:

○ **Default Methods Conflict:**

Both DogBehaviour and CatBehaviour define a makeSound() default method. When AnimalProcessor implements both interfaces, the compiler cannot determine which version to use.

‍

○ **Conflict Resolution:**

To resolve the conflict, AnimalProcessor explicitly overrides the makeSound() method and uses InterfaceName.super.methodName() to call the specific default method from each interface.

‍

○ **Custom Logic:**

The makeSound() method in AnimalProcessor adds custom behavior after calling the default methods from the interfaces.

‍

12\. Is it possible to override a default method and make it abstract in a subclass or interface? Why or why not?

✨Answer:

No, a default method cannot be overridden and made abstract. Once a default method is defined, overriding implementations must provide a concrete implementation.

‍

```java
interface Animal {
default void sound() {
System.out.println("This is a default animal sound.");
}
}

class Dog implements Animal {
@Override
public void sound() {
System.out.println("Dog barks.");
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.sound(); // Output: Dog barks.
}
}
```

‍

13\. Can default methods access instance variables of the implementing class? Why or why not?

✨Answer:

No, default methods cannot access instance variables of the implementing class because interfaces do not have state. Default methods are stateless and only work with parameters and their internal logic.

‍

```java
interface Animal {
default void sound() {
System.out.println("This is a default animal sound.");
}
}

class Dog implements Animal {
private String name = "Buddy";
public void printName() {
System.out.println("Dog's name is " + name);
}
}

public class Main {
public static void main(String[] args) {
Dog dog = new Dog();
dog.printName(); // Output: Dog's name is Buddy
dog.sound(); // Output: This is a default animal sound.
}
}
```

‍

14\. What are some limitations of default methods in comparison to methods in abstract classes?

✨Answer:

• Default methods cannot have instance variables.

• They cannot use super to refer to the implementing class’s parent.

• Abstract classes can have constructors and fields, but interfaces cannot.

‍

```java
// Abstract class example showcasing fields, constructors, and abstract methods
abstract class Animal {
String name; // Instance variable
// Constructor to initialize the name
Animal(String name) {
this.name = name;
}
// Abstract method
abstract void sound();
// Non-abstract method to demonstrate additional functionality
void eat() {
System.out.println(name + " is eating.");
}
}

// Interface example showcasing default methods and their limitations
interface Playable {
// Default method
default void play() {
System.out.println("Playing with the animal.");
}
// Attempt to declare an instance variable (not allowed in interfaces)
String name = "Buddy";
// Interfaces can only contain static final variables, which are essentially
// constants. Since it is static you cannot call it instance variable.
default void setName(String name) {
this.name = name; // Error: Interfaces cannot have instance variables
}
}

// Dog class extends abstract class Animal and implements interface Playable
class Dog extends Animal implements Playable {
// Constructor calling the abstract class constructor
Dog(String name) {
super(name);
}

// Overriding the abstract method
@Override
void sound() {
System.out.println(name + " barks.");
}

// Uncommenting the following code will cause an error because default methods
// cannot use super to refer to parent methods

@Override
public void play() {
super.play(); // Error: Cannot use super to refer to a parent method in an
// interface
}
}

public class Main {
public static void main(String[] args) {
// Abstract class functionality
Dog dog = new Dog("Buddy");
dog.sound(); // Output: Buddy barks.
dog.eat(); // Output: Buddy is eating.

// Interface functionality
dog.play(); // Output: Playing with the animal.
}
}
```

‍

## 🎉 Conclusion : 

Abstraction is a powerful tool in OOP that simplifies code by focusing on what an object does rather than how it does it. By using abstract classes and interfaces, developers can create flexible, reusable, and maintainable code. Mastering abstraction is crucial for designing robust and scalable Java applications.

---
