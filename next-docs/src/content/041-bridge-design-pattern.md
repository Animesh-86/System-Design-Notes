---
title: "Bridge Design Pattern"
type: lld
order: 41
---

# Bridge Design Pattern

Topic Tags:

System DesignLLD

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

## ‍

## Problem Statement: Separating the Unseparable ⚖️

Imagine you’re designing a drawing application that supports different shapes (Circle, Rectangle, etc.) and rendering methods (Vector and Raster). Your goal is to create a system that can render any shape using any rendering method.

‍

Each shape has specific attributes and behaviors, and each rendering method has its own way of drawing the shapes. For instance:

• Circle has attributes like radius and a method to draw itself.

• Rectangle has attributes like width and height and a method to draw itself.

• Vector Rendering uses mathematical equations to draw shapes.

• Raster Rendering uses pixels to draw shapes.

‍

The Problem: Shapes and rendering methods are tightly coupled. Adding a new shape or a new rendering method requires modifying existing code, making the system fragile and hard to maintain.

‍

The Challenge: How can you design a clean and scalable solution that allows adding new shapes or rendering methods independently without affecting existing code?

‍

## Solving It the Traditional Way: A Messy Solution 🛠️

Let’s look at a naive approach to solving this problem:

‍

Shape.java

```java

public abstract class Shape {
public abstract void draw();
}
```

‍

Circle.java

```java

public class Circle extends Shape {
@Override
public void rasterDraw() {
System.out.println("Drawing Circle using Raster Rendering");
}
}
```

‍

Rectangle.java

```java

public class Rectangle extends Shape {
@Override
public void rasterDraw() {
System.out.println("Drawing Rectangle using Raster Rendering");
}
}

public class DrawingApp {
public static void main(String[] args) {
Shape circle = new Circle();
circle.rasterDraw();
Shape rectangle = new Rectangle();
rectangle.rasterDraw();
}
}
```

‍

## The Problems with This Approach:

1\. No Flexibility for Rendering Methods: If we want to add Vector Rendering, we need to modify every shape class.

2\. Code Duplication: Each shape must implement rendering logic, leading to repeated code.

3\. Poor Scalability: Adding new shapes or rendering methods requires significant changes, increasing maintenance overhead.

‍

## Interviewer’s Follow-up Questions: Can We Improve the Code? 🤔

An interviewer might ask:

1\. What if we need to add new shapes? For example, adding a Triangle or Polygon.

2\. What if we need to support new rendering methods? For instance, rendering shapes using a 3D API.

3\. How can we ensure minimal changes to existing code when adding new features?

4\. Can we decouple shapes from rendering methods to make the system more modular?

These questions highlight the need for a better design that separates shape-specific logic from rendering-specific logic.

‍

## Ugly Code: When We Realize the Code Needs Restructuring 🤦‍♂️

Let’s say the logic for rendering becomes more complex:

‍

```java

import java.util.Scanner;
public class DrawingApp {
public static void main(String[] args) {
Scanner scanner = new Scanner(System.in);
// Display available shapes
System.out.println("Available shapes:");
System.out.println("1. Circle");
System.out.println("2. Rectangle");
System.out.println("3. Triangle");
System.out.println("4. Square");
System.out.println("5. Hexagon");
System.out.print("Enter the number for desired shape: ");
int shapeChoice = scanner.nextInt();
String shapeType = getShapeType(shapeChoice);
// Display available rendering methods
System.out.println("
Available rendering methods:");
System.out.println("1. Raster");
System.out.println("2. Vector");
System.out.println("3. 3D");
System.out.println("4. Wireframe");
System.out.print("Enter the number for desired rendering method: ");
int renderChoice = scanner.nextInt();
String renderType = getRenderType(renderChoice);


// Process the choices
if (shapeType != null && renderType != null) {
drawShape(shapeType, renderType);
} else {
System.out.println("Invalid selection. Please try again.");
}
scanner.close();
}

private static String getShapeType(int choice) {
switch (choice) {
case 1:
return "Circle";
case 2:
return "Rectangle";
case 3:
return "Triangle";
case 4:
return "Square";
case 5:
return "Hexagon";
default:
return null;
}
}

private static String getRenderType(int choice) {
switch (choice) {
case 1:
return "Raster";
case 2:
return "Vector";
case 3:
return "3D";
case 4:
return "Wireframe";
default:
return null;
}
}

private static void drawShape(String shapeType, String renderType) {
// Circle combinations
if (shapeType.equals("Circle") && renderType.equals("Raster")) {
System.out.println("Drawing Circle using Raster Rendering");
} else if (shapeType.equals("Circle") && renderType.equals("Vector")) {
System.out.println("Drawing Circle using Vector Rendering");
} else if (shapeType.equals("Circle") && renderType.equals("3D")) {
System.out.println("Drawing Circle using 3D Rendering");
} else if (shapeType.equals("Circle") && renderType.equals("Wireframe")) {
System.out.println("Drawing Circle using Wireframe Rendering");
}
// Rectangle combinations
else if (shapeType.equals("Rectangle") && renderType.equals("Raster")) {
System.out.println("Drawing Rectangle using Raster Rendering");
} else if (shapeType.equals("Rectangle") && renderType.equals("Vector")) {
System.out.println("Drawing Rectangle using Vector Rendering");
} else if (shapeType.equals("Rectangle") && renderType.equals("3D")) {
System.out.println("Drawing Rectangle using 3D Rendering");
} else if (shapeType.equals("Rectangle")
&& renderType.equals("Wireframe")) {
System.out.println("Drawing Rectangle using Wireframe Rendering");
}
// Triangle combinations
else if (shapeType.equals("Triangle") && renderType.equals("Raster")) {
System.out.println("Drawing Triangle using Raster Rendering");
} else if (shapeType.equals("Triangle") && renderType.equals("Vector")) {
System.out.println("Drawing Triangle using Vector Rendering");
} else if (shapeType.equals("Triangle") && renderType.equals("3D")) {
System.out.println("Drawing Triangle using 3D Rendering");
} else if (shapeType.equals("Triangle") && renderType.equals("Wireframe")) {
System.out.println("Drawing Triangle using Wireframe Rendering");
}
// Square combinations
else if (shapeType.equals("Square") && renderType.equals("Raster")) {
System.out.println("Drawing Square using Raster Rendering");
} else if (shapeType.equals("Square") && renderType.equals("Vector")) {
System.out.println("Drawing Square using Vector Rendering");
} else if (shapeType.equals("Square") && renderType.equals("3D")) {
System.out.println("Drawing Square using 3D Rendering");
} else if (shapeType.equals("Square") && renderType.equals("Wireframe")) {
System.out.println("Drawing Square using Wireframe Rendering");
}
else {
System.out.println("Unsupported combination of shape and rendering type");
}
}
}
```

‍

## Why is This Code Problematic ? :

1\. Hardcoding: Adding new shapes or rendering methods requires modifying multiple conditional branches.

2\. Tightly Coupled Logic: Shapes and rendering methods are entangled, making the code hard to extend or debug.

3\. Fragile Design: A single change can break the entire system.

## ‍

## The Savior: Bridge Design Pattern 👼

The Bridge Design Pattern is ideal for this problem. It separates abstraction (Shape) from its implementation (Rendering Method) so that the two can evolve independently.

In essence, the Bridge Pattern decouples what is being done (shapes) from how it is being done (rendering methods).

‍

## How the Bridge Design Pattern Works 🔧

1\. Abstraction: Define the high-level interface for shapes.

2\. Implementor: Define the interface for rendering methods.

3\. Concrete Implementor: Provide specific implementations of the rendering methods (e.g., Raster, Vector).

4\. Refined Abstraction: Implement shapes by using rendering methods through composition.

‍

## Solving the Problem with Bridge Design Pattern 🌐

### Step 1: Define the Renderer Interface

This interface provides methods to render shapes:

‍

Renderer.java

```java

// Renderer.java - Interface for rendering methods
public interface Renderer {
void renderCircle(double radius);
void renderRectangle(double width, double height);
}
```

‍

### Step 2: Create Concrete Implementations for Rendering Methods

In this step,we will Create concrete classes that implement the Renderer interface. These classes will provide specific implementations for the rendering methods defined in the interface. 

‍

RasterRenderer.java

```java

// RasterRenderer.java - Concrete implementation for Raster Rendering
public class RasterRenderer implements Renderer {
@Override
public void renderCircle(double radius) {
System.out.println("Raster Rendering: Drawing Circle with radius " + radius);
}
@Override
public void renderRectangle(double width, double height) {
System.out.println("Raster Rendering: Drawing Rectangle with width " + width + " and height " + height);
}
}
```

‍

VectorRenderer.java

```java

// VectorRenderer.java - Concrete implementation for Vector Rendering
public class VectorRenderer implements Renderer {
@Override
public void renderCircle(double radius) {
System.out.println("Vector Rendering: Drawing Circle with radius " + radius);
}
@Override
public void renderRectangle(double width, double height) {
System.out.println("Vector Rendering: Drawing Rectangle with width " + width + " and height " + height);
}
}
```

‍

### Step 3: Define the Abstract Shape Class : 

In this step, we will create an abstract class that represents a generic shape. This abstract class will define common properties and methods that all shapes must have, such as dimensions and rendering capabilities

‍

Shape.java

```java

// Shape.java - Abstract class for shapes
public abstract class Shape {
protected Renderer renderer;
// Constructor to accept a renderer
public Shape(Renderer renderer) {
this.renderer = renderer;
}
public abstract void draw();
}
```

‍

### Step 4: Create Refined Shape Classes : 

In this step, we will create concrete classes that extend the abstract Shape class. These refined shape classes will provide specific implementations for the abstract methods defined in the Shape class. 

‍

Circle.java : 

```java

// Circle.java - Refined abstraction for Circle
public class Circle extends Shape {
private double radius;
public Circle(Renderer renderer, double radius) {
super(renderer);
this.radius = radius;
}
@Override
public void draw() {
renderer.renderCircle(radius);
}
}
```

‍

Rectangle.java

```java

// Rectangle.java - Refined abstraction for Rectangle
public class Rectangle extends Shape {
private double width;
private double height;

public Rectangle(Renderer renderer, double width, double height) {
super(renderer);
this.width = width;
this.height = height;
}
@Override
public void draw() {
renderer.renderRectangle(width, height);
}
}
```

‍

### Step 5: Use the Bridge Pattern in the Application : 

In this step, we will integrate the Bridge Pattern into our application to decouple the abstraction (shape) from its implementation (renderer). This allows us to vary both independently, promoting flexibility and scalability in our design.

‍

DrawingApp.java : 

```java

// DrawingApp.java
public class DrawingApp {
public static void main(String[] args) {
Renderer rasterRenderer = new RasterRenderer();
Renderer vectorRenderer = new VectorRenderer();
Shape rasterCircle = new Circle(rasterRenderer, 5);
Shape vectorCircle = new Circle(vectorRenderer, 5);
Shape rasterRectangle = new Rectangle(rasterRenderer, 10, 5);
Shape vectorRectangle = new Rectangle(vectorRenderer, 10, 5);
rasterCircle.draw();
vectorCircle.draw();
rasterRectangle.draw();
vectorRectangle.draw();
}
}
```

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1742799177362-Frame-233-\(2\).png)

‍

## Advantages of Using the Bridge Design Pattern 🏆

1\. Decoupling:

Shapes and rendering methods are decoupled, allowing them to vary independently.

‍

2\. Scalability:

Adding a new shape or rendering method requires minimal changes.

‍

3\. Reusability:

Rendering logic can be reused across different shapes.

‍

4\. Maintainability:

Code is cleaner and easier to maintain, as each class has a single responsibility.

‍

## Real-life Use Cases of the Bridge Pattern 🌎

1\. Graphics Libraries:

Libraries like OpenGL use a bridge-like pattern to separate shapes from rendering logic.

‍

2\. UI Frameworks:

UI frameworks often decouple widgets from their look-and-feel using the Bridge Pattern.

‍

3\. Persistence Mechanisms:

ORM libraries use bridges to decouple object manipulation from database-specific queries.

‍

## Conclusion 🎯

The Bridge Design Pattern is a powerful tool for decoupling abstraction from implementation. In our drawing application example, it allows shapes and rendering methods to evolve independently, making the system flexible, scalable, and maintainable. Whether you’re designing a graphics library, a UI framework, or any system with varying abstractions and implementations, the Bridge Pattern is an excellent choice for clean architecture and long-term growth.

---
