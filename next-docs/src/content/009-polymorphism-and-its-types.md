---
title: "Polymorphism and It's Types"
type: lld
order: 9
---

# Polymorphism and It's Types

Topic Tags:

oopsystem designlld

🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

‍

> Polymorphism is one of the core principles of Object-Oriented Programming (OOP), enabling objects to take on multiple forms. It allows the same operation to behave differently on different classes, enhancing code flexibility and reusability.

‍

A real-life example of polymorphism is a person who at the same time can have different characteristics. A man at the same time is a father, a husband, and an employee. So the same person exhibits different behavior in different situations. This is called polymorphism. 👨‍👩‍👧‍👦💼

‍

In Java, polymorphism can be broadly classified into two main types:

1.  Compile-time (or Static) Polymorphism
2.  Runtime (or Dynamic) Polymorphism

‍

## Types of Polymorphism:

### 1\. Compile-time (Static) Polymorphism:

Compile-time or Static polymorphism occurs when the method to be executed is determined at compile time. It is achieved using method overloading or operator overloading. 🛠️

‍

### **Method Overloading:**

> When there are multiple functions with the same name but different parameters, then the functions are said to be overloaded, hence this is known as Function or Method Overloading. Functions can be overloaded by changing the number of arguments or/and changing the type of arguments. 🔢🎚️

‍

Example : 

**1\. Changing the number of arguments :** 

‍

```java

class Vehicle {
// Method to start a vehicle with basic information
void start(String vehicleType) {
System.out.println("Starting a " + vehicleType);
}

// Overloaded method to start a vehicle with extra information
void start(String vehicleType, int speed) {
System.out.println(
"Starting a " + vehicleType + " with speed: " + speed + " km/h");
}
}


public class Main {
public static void main(String[] args) {
Vehicle vehicle = new Vehicle();

// Calls method with one argument
vehicle.start("Car");

// Calls overloaded method with two arguments
vehicle.start("Bike", 60);
}
}
```

‍![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741502994436-Frame-244-\(1\).png)

‍

**2. Changing the type of arguments :**

‍

```java

class Vehicle {
// Method to start a vehicle with a string parameter
void start(String vehicleType) {
System.out.println("Starting a " + vehicleType);
}

// Overloaded method to start a vehicle with an integer parameter
void start(int vehicleId) {
System.out.println("Starting a vehicle with ID: " + vehicleId);
}
}


public class Main {
public static void main(String[] args) {
Vehicle vehicle = new Vehicle();

// Calls method with a string argument
vehicle.start("Truck");

// Calls overloaded method with an integer argument
vehicle.start(101);
}
}
```

‍![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741502932746-Frame-245-\(1\).png)

‍

**Key Features:**

• Method resolution happens at compile time.

• Provides better readability and cleaner code by allowing methods with the same name to perform similar actions.

‍

### 2\. Runtime (Dynamic) Polymorphism : 

Runtime polymorphism occurs when the method to be executed is determined during runtime. It is achieved through method overriding and is closely tied to inheritance.

‍

### Method Overriding : 

> Method overriding allows a subclass to provide a specific implementation for a method already defined in its parent class. The overridden method in the subclass has the same name, return type, and parameters as the method in the parent class.

‍

**Example :** 

‍

```java

// Parent class
class Vehicle {
void start() {
System.out.println("Starting a generic vehicle");
}
}

// Subclasses overriding the start method
class Car extends Vehicle {
@Override
void start() {
System.out.println("Starting a car");
}
}

class Bike extends Vehicle {
@Override
void start() {
System.out.println("Starting a bike");
}
}

class Truck extends Vehicle {
@Override
void start() {
System.out.println("Starting a truck");
}
}

public class Main {
public static void main(String[] args) {
Vehicle myVehicle;
// Assign a Car object to the Vehicle reference
myVehicle = new Car();
myVehicle.start(); // Output: Starting a car

// Assign a Bike object to the Vehicle reference
myVehicle = new Bike();
myVehicle.start(); // Output: Starting a bike

// Assign a Truck object to the Vehicle reference
myVehicle = new Truck();
myVehicle.start(); // Output: Starting a truck
}
}
```

‍![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741502881273-Frame-246-\(1\).png)

‍

**Key Features:**

• Method resolution happens at runtime based on the actual object type.

• Supports dynamic method dispatch, enabling the Java Virtual Machine (JVM) to determine the appropriate method implementation.

‍

## Advantages of Polymorphism:

### 1\. Code Reusability:

○ Encourages writing generic and reusable code by allowing a single interface to handle multiple types.

‍

Example : 

```java

// Interface
interface Vehicle {
void start(); // Abstract method
}

// Implementing classes
class Car implements Vehicle {
@Override
public void start() {
System.out.println("Starting the car");
}
}

class Bike implements Vehicle {
@Override
public void start() {
System.out.println("Starting the bike");
}
}

class Truck implements Vehicle {
@Override
public void start() {
System.out.println("Starting the truck");
}
}

public class Main {
public static void main(String[] args) {
Vehicle[] vehicles = {new Car(), new Bike(), new Truck()};
for (Vehicle vehicle : vehicles) {
vehicle.start(); // Polymorphic behavior
}
}
}
```

‍

The Vehicle interface allows you to reuse a single loop (for (Vehicle vehicle : vehicles)) to handle different implementations.

### 2\. Flexibility:

○ Provides flexibility in program design by enabling dynamic method behavior.

‍

Example : 

```java

public class Main {
public static void main(String[] args) {
Vehicle vehicle;
// Flexible: Dynamically assign different types of vehicles
vehicle = new Car();
vehicle.start(); // Output: Starting the car
vehicle = new Bike();
vehicle.start(); // Output: Starting the bike
vehicle = new Truck();
vehicle.start(); // Output: Starting the truck
}
}
```

Using the Vehicle interface, we dynamically switch between different implementations (Car, Bike, Truck) at runtime.

‍

### 3\. Extensibility:

Allows easy extension of code by adding new classes / methods or overriding existing ones.

‍

Example : 

```java

// Adding a new type of Vehicle
class Bus implements Vehicle {
@Override
public void start() {
System.out.println("Starting the bus");
}
}

public class Main {
public static void main(String[] args) {
// Extensible: Add new vehicle types without changing existing code
Vehicle[] vehicles = {new Car(), new Bike(), new Truck(), new Bus()};
for (Vehicle vehicle : vehicles) {
vehicle.start(); // Polymorphic behavior handles the new type seamlessly
}
}
}
```

‍

Adding new vehicle types (Bus) is seamless and requires no changes to the existing code because all new classes just implement the Vehicle interface.

‍

## Disadvantages of Polymorphism:

### 1\. Complex Debugging:

Runtime polymorphism can make debugging difficult due to dynamic method resolution.

‍

Example:

```java

import java.util.ArrayList;
import java.util.List;

// Base class
class Vehicle {
void start() {
System.out.println("Starting a generic vehicle");
}
}

// Subclasses overriding the start method
class Car extends Vehicle {
@Override
void start() {
System.out.println("Starting a car");
}
}

class Bike extends Vehicle {
@Override
void start() {
System.out.println("Starting a bike");
}
}

class Truck extends Vehicle {
@Override
void start() {
System.out.println("Starting a truck");
}
}

public class Main {
public static void main(String[] args) {
// List containing various types of vehicles
List<Vehicle> vehicleList = new ArrayList<>();
vehicleList.add(new Car());
vehicleList.add(new Bike());
vehicleList.add(new Truck());
vehicleList.add(new Vehicle());
// Debugging challenge: What type of vehicle is being started?
for (Vehicle vehicle : vehicleList) {
vehicle.start(); // Runtime determines which start() method is called
}
}
}
```

When iterating through a list of Vehicle objects, it’s unclear during debugging which specific subclass (Car, Bike, Truck, or Vehicle) is being called without stepping through the code or inspecting runtime variables.

‍

If the list comes from an external API, file, or database, the actual type of each object isn’t clear from the source code, making it difficult to debug.

‍

### 2\. Performance Overhead:

Dynamic method dispatch introduces slight overhead as the JVM resolves the method during runtime.

‍

Example : 

```java

class Vehicle {
void start() {
System.out.println("Starting a generic vehicle");
}
}

class Car extends Vehicle {
@Override
void start() {
System.out.println("Starting a car");
}
}

public class Main {
public static void main(String[] args) {
Vehicle myVehicle;
long startTime = System.nanoTime();
// Dynamic method dispatch
myVehicle = new Car();
myVehicle.start(); // JVM resolves method implementation dynamically
long endTime = System.nanoTime();
System.out.println("Time taken for method dispatch: "
+ (endTime - startTime) + " nanoseconds");
}
}
```

‍

## 🎯Conclusion :

Polymorphism is a powerful feature in OOPs that promotes flexibility, modularity, and reusability. Understanding its types—compile-time and runtime—is essential for mastering OOP principles and designing robust applications. 💡

‍

By leveraging polymorphism effectively, developers can write cleaner, more maintainable code, ensuring their applications are scalable and adaptable to change. 🔄💻

---
