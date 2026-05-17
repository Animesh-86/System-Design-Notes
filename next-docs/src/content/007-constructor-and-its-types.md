---
title: "Constructor and It's types"
type: lld
order: 7
---

# Constructor and It's types

Topic Tags:

OOPSystem DesignLLD

🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

‍

> Constructors are special methods in object-oriented programming used to initialize objects of a class.

‍

They play a pivotal role in ensuring that an object is in a valid state right after it is "created". Unlike regular methods, constructors have the same name as the class and do not have a return type. 🔧

## 🛠️Key Features of Constructors:

1\. **Automatic Invocation:** Constructors are called automatically when an object of the class is instantiated. 🔄

2\. **No Return Type:** Unlike methods, constructors do not have a return type, not even void. 🚫

3\. **Overloading Support:** You can have multiple constructors with different parameters in the same class, enabling flexibility in object initialization. 🔁

‍

## Types of Constructors:

Constructors can be broadly categorized into the following types:

‍

### Default Constructor (No-Argument Constructor):

**When No Constructor Is Defined (Implicit Default Constructor):**

‍

> If you do not explicitly create any constructor for a class, Java automatically provides a default constructor.

‍

This constructor initializes instance variables to their default values based on the data type. 🔄

‍

**Default Values:**

```
int → 0
double → 0.0
boolean → false
Object → null
```

**Example :** 

‍

```java
class Movie {
private String title; // Default: null
private int duration; // Default: 0

public void displayDetails() {
System.out.println("Title: " + title + ", Duration: " + duration + " mins");
}
}

public class Main {
public static void main(String[] args) {
Movie movie = new Movie(); // Implicit default constructor is called
movie.displayDetails(); // Displays default values
}
}
```

‍

**Output :** 

```
Title: null, Duration: 0 mins
```

‍

**Explicitly Defining a Default Constructor with Custom Values :** 

‍

> You can define your own default constructor to set custom default values for the class fields instead of relying on Java's implicit default values.

‍

**Example :** 

‍

```java
class Movie {
private String title;
private int duration;

// Custom default constructor
public Movie() {
this.title = "Untitled";
this.duration = 90;
}
public void displayDetails() {
System.out.println("Title: " + title + ", Duration: " + duration + " mins");
}
}

public class Main {
public static void main(String[] args) {
Movie movie = new Movie(); // Custom default constructor is called
movie.displayDetails(); // Displays custom default values
}
}
```

‍![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741494799232-Frame-244.png)

**Output :** 

```
Title: Untitled, Duration: 90 mins
```

‍

By explicitly defining a default constructor, you gain control over how objects are initialized, ensuring that they start with meaningful default values that match the application's requirements.

‍

## 2\. Parameterized Constructor:

> A parameterized constructor takes arguments to initialize the object with specific values.

‍

**Example :** 

‍

```java
class Movie {
private String title;
private int duration;

// Parameterized constructor
public Movie(String title, int duration) {
this.title = title;
this.duration = duration;
}
public void displayDetails() {
System.out.println("Title: " + title + ", Duration: " + duration + " mins");
}
}

public class Main {
public static void main(String[] args) {
Movie movie =
new Movie("Inception", 148); // Parameterized constructor is called
movie.displayDetails();
}
}
```

‍![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741494818472-Frame-245.png)

**Output :** 

```
Title: Inception, Duration: 148 mins
```

‍

## 3\. Copy Constructor:

> A copy constructor initializes an object using another object of the same class.

‍

**Example :** 

‍

```java
class Movie {
private String title;
private int duration;

// Parameterized constructor
public Movie(String title, int duration) {
this.title = title;
this.duration = duration;
}

// Copy constructor
public Movie(Movie other) {
this.title = other.title;
this.duration = other.duration;
}
public void displayDetails() {
System.out.println("Title: " + title + ", Duration: " + duration + " mins");
}
}

public class Main {
public static void main(String[] args) {
Movie original = new Movie("Inception", 148);
Movie copy = new Movie(original); // Copy constructor is called
copy.displayDetails();
}
}
```

‍![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741494829805-Frame-246.png)

Output : 

```
Title: Inception, Duration: 148 mins
```

‍

## 4\. Private Constructor: 

> A private constructor is used to restrict object creation from outside the class. It is commonly used in Singleton Design Pattern.

‍

**Example :** 

‍

```java
class Singleton {
private static Singleton instance;
// Private constructor
private Singleton() {}
public static Singleton getInstance() {
if (instance == null) {
instance = new Singleton();
}
return instance;
}
}

public class Main {
public static void main(String[] args) {
Singleton s1 = Singleton.getInstance();
Singleton s2 = Singleton.getInstance();
System.out.println(s1
== s2); // Output: true, as both references point to the same instance
}
}
```

‍![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741494842017-Frame-247.png)

## ‍

## 🔑Key Points to Remember:

1\. A class can have multiple constructors through overloading, but they must differ in parameter lists.

‍

2\. Constructors can call other constructors in the same class using this().

‍

3\. Constructors can call parent class constructors using super() in java.

‍

4\. Always use constructors to ensure objects are in a consistent and valid state.

‍

5\. Utilize copy constructors carefully to avoid shallow copying when deep copying is required.

‍

6\. Leverage private constructors for Singleton patterns or utility classes.

‍

## Interview Questions : 

1\. Can a constructor be final, static, or abstract? Why or why not?

**Answer:** No, constructors cannot be final, static, or abstract because:

• **final:** A constructor cannot be inherited, so final is irrelevant.

• **static:** Constructors belong to objects, not the class itself.

• **abstract:** A constructor must be concrete as it initializes an object.

‍

2\. What happens if you explicitly define a constructor with arguments but no default constructor?

**Answer:** The default constructor is not automatically provided. Attempting to create an object with no arguments will result in a compilation error.

‍

```java
class Example {
public Example(int a, int b) {
this.a = a;
this.b = b;
}

public static void main(String[] args) {
Example example = new Example();
System.out.println(example);
}
}
```

**Output :**

```
Compilation Error
```

‍

3\. What happens if you create an object of a subclass? Which constructor is called first?

**Answer:** The parent class constructor is called first, followed by the subclass constructor. This ensures proper initialization.

‍

4\. What happens if a constructor is synchronized?

**Answer:** A synchronized constructor is allowed but makes no sense, as object-level synchronization is not applicable before the object is fully created.

‍

5\. Can a constructor be inherited?

**Answer:** No, constructors are not inherited, but a subclass can call the superclass constructor using super().

‍

6\. Can a constructor have a return statement?

**Answer:** No, constructors cannot return a value, but they can have a return statement to exit early (without a value).

‍

```java
class Example {
private int value;
// Constructor with a return statement
public Example(int value) {
if (value < 0) {
System.out.println("Invalid value! Constructor exiting early.");
return; // Exits the constructor early
}
this.value = value; // Initializes the value if valid
}
public void display() {
System.out.println("Value: " + value);
}
}

public class Main {
public static void main(String[] args) {
Example obj1 = new Example(10); // Valid value
obj1.display();
Example obj2 = new Example(-5); // Invalid value, constructor exits early
obj2.display();
}
}
```

**Output :** 

```
Value: 10
Invalid value! Constructor exiting early.
Value: 0
```

‍

## 🎯Conclusion :

Constructors are essential for initializing objects in object-oriented programming. Understanding their types and use cases enables developers to write clean, efficient, and maintainable code. 🧑‍💻

With proper usage of constructors, you can ensure object consistency and design robust systems. 💪

---
