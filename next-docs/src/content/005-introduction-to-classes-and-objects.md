---
title: "Introduction to Classes and Objects"
type: lld
order: 5
---

# Introduction to Classes and Objects

Topic Tags:

oop

🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

‍

‍

Object-Oriented Programming (OOP) is a programming paradigm that organizes code into objects, which represent real-world entities. It allows developers to model complex systems by breaking them down into smaller, manageable pieces.

‍

> The foundation of OOP lies in classes and objects, which together enable the creation of structured, reusable, and scalable code. 🧩

‍

Imagine a car manufacturing company. To produce cars, the company uses a design blueprint. The blueprint defines the structure and functionality of a car (e.g., the number of wheels, type of engine, color, etc.).

However, the blueprint itself is not a car—it is only a guide. The actual cars manufactured from this blueprint are like objects, and the blueprint itself is a class. 🚗📏

‍

## 📋 What is a Class?

A class is a blueprint for creating objects. It defines the properties (attributes) and behaviors (methods) that the objects will have. Think of it as a template that outlines the structure and capabilities of an object but does not represent any actual instance. 🏗️

### Key Characteristics of a Class:

1.  **Attributes (State):** These are variables defined within the class that describe the characteristics of the object. 📝
    
2.  **Methods (Behavior)**: These are functions defined in the class that describe what the objects can do. 🔧
    

**3.Constructor:** A special method used to initialize the attributes of the class when an object is created. 🛠️

‍

```java

public class Car {
// Attributes : 
String manufacturer;
String model;
int year;

// Constructor : 
public Car(String manufacturer, String model, int year) {
this.manufacturer = manufacturer;
this.model = model;
this.year = year;
}

// Methods : 
public void startEngine() {
System.out.println("The " + year + " " + manufacturer + " " + model + "'s engine has started.");
}
public void displayInfo() {
System.out.println("Car Info: " + manufacturer + " " + model + " (" + year + ")");
}
}
```

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741314957172-Frame-237-\(1\).png)

‍

## ⚡What is an Object?

> An object is an instance of a class. It represents a specific realization of the class blueprint, with its own unique set of data.

‍

In the car analogy, each manufactured car is an object, and it holds specific values for its attributes (e.g., make: "Toyota", model: "Corolla", year: 2021).

‍

### **🔑Key Characteristics of an Object:**

1\. **State:** Represented by the object’s attributes.

**2\. Behavior:** Defined by the methods the object can execute.

**3.Identity:** A unique reference to the object in memory.

‍

```java

public class Main {
public static void main(String[] args) {

// Creating objects
Car car1 = new Car("Toyota", "Corolla", 2021);
Car car2 = new Car("Honda", "Civic", 2022);

// Using objects
car1.startEngine();  // Output: The 2021 Toyota Corolla's engine has started.ĺ
car2.startEngine();  // Output: The 2022 Honda Civic's engine has started.
car1.displayInfo();  // Output: Car Info: Toyota Corolla (2021)
car2.displayInfo();  // Output: Car Info: Honda Civic (2022)
}
}
```

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741315055304-Frame-238.png)

Here, car1 and car2 are objects of the Car class, each holding specific data for the attributes and performing actions through methods.

‍

### Real-World Analogy:

A car manufacturing blueprint is a perfect analogy for understanding classes and objects:

**1\. Blueprint (Class):** It specifies the design and functionality of the car but does not represent an actual car. 🏗️🚗

**2\. Cars (Objects):** Each car produced from the blueprint is unique, with specific values for attributes like color, manufacturer, and model Number, but all cars share the same general structure and behavior defined by the blueprint. 🌟

‍

**For example:**

• **Blueprint:** Car design with details like "4 wheels," "engine capacity," "fuel type." 🛠️🔧

‍

• **Objects:**

○ **Car 1:** A red Hyundai i20, 1.8L engine capacity and petrol fuel type. 🔴🚗

○ **Car 2:** A blue Honda Civic, 2.0L engine capacity and diesel fuel type. 🔵🚙

‍

## 🤔 **Why Use Classes and Objects?**

**1\. Reusability:** Write a class once and create multiple objects with different data. ♻️

**2\. Modularity:** Classes help organize code into logical sections, making it easier to debug and maintain. 🧩

**3\. Abstraction:** Focus on the essential details of an entity without worrying about the internal workings. 🔍

**4\. Scalability:** Adding new features is straightforward without affecting existing code. 📈

## 🎯Conclusion :

Understanding classes and objects is the first step in mastering Object-Oriented Programming. A class provides the structure and design, while objects bring that structure to life with specific data. 💡

‍

Together, they enable the creation of modular, reusable, and scalable applications. 🔄

By practicing these concepts, you lay a strong foundation for tackling more advanced topics in OOP. 🚀

---
