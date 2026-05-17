---
title: "Design Inventory Management System"
type: lld
order: 49
---

# Design Inventory Management System

Topic Tags:

System DesignLLDInterview Questions

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

# Low-Level Design: Inventory Management System 🏗️

An inventory management system is designed to efficiently track, manage, and optimize product inventory within a business. The system needs to handle multiple products, track stock levels, process orders, and ensure timely replenishment. The system should be able to accommodate different product types, handle various inventory operations, and provide accurate reporting.

‍

## Rules of the System:

### Setup:

• The business has multiple warehouses and can store multiple product types.

• Products can be added, removed, or transferred between warehouses.

• Each product has attributes like SKU(Stock Keeping Unit - Unique Id of a Product), name, price, and quantity.

• The system tracks inventory levels and triggers alerts for low stock.

‍

Operation:

• Users can add new products to the inventory.

• Stock levels are updated when products are received or shipped.

• The system generates reports on inventory status and movement.

• Inventory can be searched and filtered based on various criteria.

‍

Safety Features:

• Threshold alerts prevent stockouts.

• Audit trails track all inventory changes.

• Access control limits who can perform different inventory operations.

‍

Interview Setting 🤝

Point 1: Introduction and Vague Problem Statement:

Interviewer: Let's start with a basic problem statement. Design an Inventory Management System.

Candidate: Certainly! Here's my understanding of the Inventory Management System:

• The system will manage multiple products across different warehouses.

• Users can add, remove, and transfer inventory items.

• The system tracks stock levels and alerts on low inventory.

• Reports can be generated for inventory analysis.

• The system should be scalable to handle businesses of different sizes.

Is this the expected flow?

Interviewer: Yes, you are aligned with the flow. Please continue ahead.

Candidate: Great! Before diving into the design, I'd like to clarify a few requirements:

• What types of products should the system support?

• Are there specific inventory replenishment (restoration of stock) strategies to implement?

• How should the system handle product categorization?

‍

Point 2: Clarifying Requirements :

Interviewer: We want a system that:

• Supports multiple product types in multiple warehouses.

• Handles both inventory additions and removals.

• Efficiently notifies when stock levels are low.

‍

Candidate: To summarize, the key requirements are:

• A system with multiple warehouses and product categories.

• Stock level tracking and management.

• Intelligent replenishment strategy implementation.

• Ability to handle edge cases like damaged inventory or returns.

Interviewer: Perfect, let's proceed.

‍

Point 3: Identifying Key Components/Entities:

Candidate: Now that we have the requirements, let's identify the key components of our Inventory Management System:

Product: Represents individual products in inventory.

• Class: Product

• Description: This class represents individual products with their attributes.

‍

```java
public class Product {
private String sku;
private String name;
private double price;
private int quantity;
private int threshold;
private ProductCategory category;
}
```

‍

Warehouse: Contains products and manages storage.

• Class: Warehouse

Description: This class represents physical storage locations.

‍

```java
public class Warehouse {
private int id;
private String name;
private String location;
private Map<String, Product> products; // SKU -> Product	    
public void addProduct(Product product, int quantity);
public void removeProduct(String sku, int quantity);
public int getAvailableQuantity(String sku);
}
```

‍

InventoryManager: Manages inventory operations and tracking.

• Class: InventoryManager

Description: This class handles inventory operations and uses the Singleton pattern.

‍

```java
public class InventoryManager {
private static InventoryManager instance;
private List<Warehouse> warehouses;
private ProductFactory productFactory;
private List<InventoryObserver> observers;
private ReplenishmentStrategy replenishmentStrategy;
}
```

‍

Interviewer: That sounds good. Let's proceed with the design details.

‍

### Point 4: Design Challenges:

Interviewer: What design challenges do you anticipate?

‍

Candidate: The key challenges for the Inventory Management System include:

1\. Scalability: Handling large numbers of products and warehouses.

2\. Concurrency: Managing multiple simultaneous inventory operations.

3\. Data Consistency: Ensuring accurate inventory counts across the system.

4\. Customizable Replenishment: Supporting different replenishment strategies.

5\. Edge Cases: Handling product returns, damaged inventory, and seasonal demand fluctuations.

### Point 5: Approach:

Interviewer: How would you approach these challenges?

‍

Candidate: I propose using design patterns effectively. Here are my strategies:

1\. Singleton Pattern for Inventory Manager: 

• Ensures a single point of control for inventory operations.

• Maintains consistency across the system.

2\. Observer Pattern for Inventory Alerts: 

• Notifies relevant stakeholders when stock falls below thresholds.

• Enables real-time inventory monitoring.

‍

3\. Factory Pattern for Product Creation:

• Encapsulates product creation logic.

• Allows for easy addition of new product types.

‍

4\. Strategy Pattern for Replenishment: 

• Enables different replenishment strategies.

• Can switch between algorithms based on product type or season.

‍

5\. State Management with Enums: 

• To effectively manage product categories and operations, we'll use enums.

‍

```java
public enum ProductCategory { 
ELECTRONICS, CLOTHING, GROCERY, FURNITURE, OTHER 
}

public enum InventoryOperation { 
ADD, REMOVE, TRANSFER, ADJUST 
}
```

‍

Interviewer: That sounds like a solid approach. Let's delve into the implementation details.

‍

### Point 6: Implementation:

Interviewer: Ready to discuss implementation?

‍

Candidate: Yes. I'll focus on implementing the design patterns we discussed and show how they work together in the Inventory Management System:

‍

## Inventory Management System Implementation with Design Patterns 🏗: 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743315295359-Frame-245.png)

‍

1\. Factory Pattern For Product Creation : 

‍

• Product.java : 

This is an abstract base class representing a general product with common attributes like SKU, name, price, quantity and category. It serves as the parent class for specific product types.

‍

```java
// Abstract Product class
public abstract class Product {
private String sku;
private String name;
private double price;
private int quantity;
private int threshold;
private ProductCategory category;

// Getters and setters
public String getSku() {
return sku;
}

public void setSku(String sku) {
this.sku = sku;
}

public String getName() {
return name;
}

public void setName(String name) {
this.name = name;
}

public double getPrice() {
return price;
}

public void setPrice(double price) {
this.price = price;
}

public int getQuantity() {
return quantity;
}

public void setQuantity(int quantity) {
this.quantity = quantity;
}

public ProductCategory getCategory() {
return category;
}

public void setCategory(ProductCategory category) {
this.category = category;
}
}
```

‍

• Product Categories Enum : 

An enumeration defining the various categories of products, such as electronics, clothing, grocery, furniture, and other miscellaneous categories. This helps in categorizing the products.

‍

```java
// Enum for product categories
public enum ProductCategory {
ELECTRONICS, CLOTHING, GROCERY, FURNITURE, OTHER
}
```

‍

• Concrete Products :

Concrete Products are the specific product implementations that extend the abstract Product class. Each concrete product class (like ElectronicsProduct, ClothingProduct, and GroceryProduct) represents a distinct type of product with attributes and behaviors specific to that type. This allows for the creation of varied products while maintaining a common interface and shared attributes.

‍

1.) ElectronicsProduct.java : 

‍

```java
package ProductsFactory.ConcreteProducts;

import CommonEnum.ProductCategory;
import ProductsFactory.Product;

public class ElectronicsProduct extends Product {
private String brand;
private int warrantyPeriod; // in months

public ElectronicsProduct(String sku, String name, double price, int quantity, int threshold) {
super();
setSku(sku);
setName(name);
setPrice(price);
setQuantity(quantity);
setCategory(ProductCategory.ELECTRONICS);
setThreshold(threshold);
}

// Getters and setters for electronics-specific attributes
public String getBrand() {
return brand;
}

public void setBrand(String brand) {
this.brand = brand;
}
}
```

‍

2.) ClothingProduct.java : 

‍

```java
package ProductsFactory.ConcreteProducts;
import CommonEnum.ProductCategory;
import ProductsFactory.Product;

public class ClothingProduct extends Product {
private String size;
private String color;

public ClothingProduct(String sku, String name, double price, int quantity,int threshold) {
super();
setSku(sku);
setName(name);
setPrice(price);
setQuantity(quantity);
setCategory(ProductCategory.CLOTHING);
setThreshold(threshold);
}

// Getters and setters for clothing-specific attributes
public String getSize() {
return size;
}

public void setSize(String size) {
this.size = size;
}

public String getColor() {
return color;
}

public void setColor(String color) {
this.color = color;
}
}
```

‍

3.) GroceryProduct.java : 

‍

```java
package ProductsFactory.ConcreteProducts;

import CommonEnum.ProductCategory;
import ProductsFactory.Product;
import java.util.Date;

public class GroceryProduct extends Product {
private Date expiryDate;
private boolean refrigerated;

public GroceryProduct(String sku, String name, double price, int quantity, int threshold) {
super();
setSku(sku);
setName(name);
setPrice(price);
setQuantity(quantity);
setCategory(ProductCategory.GROCERY);
setThreshold(threshold);
}

// Getters and setters for grocery-specific attributes
public Date getExpiryDate() {
return expiryDate;
}

public void setExpiryDate(Date expiryDate) {
this.expiryDate = expiryDate;
}

public boolean isRefrigerated() {
return refrigerated;
}

public void setRefrigerated(boolean refrigerated) {
this.refrigerated = refrigerated;
}
}
```

‍

• ProductFactory.java : 

A factory class implementing the Factory Pattern. It has a method to create product instances based on the given product category. It switches through the categories and returns the appropriate product instance. If an unsupported category is provided, it throws an IllegalArgumentException.

‍

```java
package ProductsFactory;

import CommonEnum.ProductCategory;
import ProductsFactory.ConcreteProducts.ClothingProduct;
import ProductsFactory.ConcreteProducts.ElectronicsProduct;
import ProductsFactory.ConcreteProducts.GroceryProduct;

// Product Factory class implementing Factory Pattern
public class ProductFactory {
public Product createProduct(ProductCategory category, String sku, String name, double price, int quantity, int threshold) {
switch (category) {
case ELECTRONICS:
return new ElectronicsProduct(sku, name, price, quantity,threshold);
case CLOTHING:
return new ClothingProduct(sku, name, price, quantity,threshold);
case GROCERY:
return new GroceryProduct(sku, name, price, quantity,threshold);
default:
throw new IllegalArgumentException(
"Unsupported product category: " + category);
}
}
}
```

‍

2\. Strategy Pattern for Product Replenishment : 

‍

• ReplenishmentStrategy.java : 

This is an interface for different replenishment strategies. It declares a method replenish(Product product) that will be implemented by concrete strategies to provide various ways to replenish stock for a given product.

‍

```java
// Interface for different replenishment strategies
public interface ReplenishmentStrategy {
// Method to replenish stock for a given product
void replenish(Product product);
}
```

‍

• Concrete Strategies : 

Concrete strategies implement the ReplenishmentStrategy interface. These are specific replenishment algorithms that can be used based on the needs of the product inventory management.

‍

JustInTimeStrategy.java : 

```java
// Just-In-Time replenishment strategy
public class JustInTimeStrategy implements ReplenishmentStrategy {
@Override
public void replenish(Product product) {
// Implement Just-In-Time replenishment logic
System.out.println("Applying Just-In-Time replenishment for " + product.getName());
// Calculate optimal order quantity based on demand rate
}
}
```

‍

2\. BulkOrderStrategy.java : 

‍

```java
// Bulk Order replenishment strategy
public class BulkOrderStrategy implements ReplenishmentStrategy {
@Override
public void replenish(Product product) {
// Implement Bulk Order replenishment logic
System.out.println("Applying Bulk Order replenishment for " + product.getName());
// Order in large quantities to minimize order costs
}
}
```

‍

3\. Singleton Pattern for Inventory Manager : 

The InventoryManager class implements the Singleton pattern, which ensures that only one instance of the inventory management system exists throughout the application lifecycle. This is crucial for maintaining data consistency and providing a single point of control for all inventory operations.

‍

InventoryManager.java : 

```java
public class InventoryManager {
// Singleton instance
private static InventoryManager instance;

// System components
private List<Warehouse> warehouses;
private ProductFactory productFactory;
private ReplenishmentStrategy replenishmentStrategy;

// Private constructor to prevent instantiation from outside
private InventoryManager() {
// Initialize collections and dependencies
warehouses = new ArrayList<>();
productFactory = new ProductFactory();
}

// Static method to get the singleton instance with thread safety
public static synchronized InventoryManager getInstance() {
if (instance == null) {
instance = new InventoryManager();
}
return instance;
}
}
```

‍

4\. Core Classes Implementation : 

Warehouse.java : 

‍

```java
public class Warehouse {
private int id;
private String name;
private String location;
private Map<String, Product> products; // SKU -> Product
public Warehouse(int id, String name, String location) {
this.id = id;
this.name = name;
this.location = location;
this.products = new HashMap<>();
}

public void setLocation(String location) {
this.location = location;
}

// Add a product to the warehouse
public void addProduct(Product product, int quantity) {
String sku = product.getSku();
if (products.containsKey(sku)) {
// Product exists, update quantity
Product existingProduct = products.get(sku);
existingProduct.addStock(quantity);
} else {
// New product, add to inventory
product.setQuantity(quantity);
products.put(sku, product);
}
System.out.println(quantity + " units of " + product.getName()
+ " (SKU: " + sku + ") added to " + name
+ ". New quantity: " + getAvailableQuantity(sku));
}

// Remove a product from the warehouse
public boolean removeProduct(String sku, int quantity) {
if (products.containsKey(sku)) {
Product product = products.get(sku);
int currentQuantity = product.getQuantity();
if (currentQuantity >= quantity) {
// Sufficient inventory to remove
product.removeStock(quantity);
System.out.println(quantity + " units of " + product.getName()
+ " (SKU: " + sku + ") removed from " + name
+ ". Remaining quantity: " + product.getQuantity());
// If quantity becomes zero, consider removing the product entirely
if (product.getQuantity() == 0) {
// Remove products with zero quantity
products.remove(sku);
System.out.println("Product " + product.getName()
+ " removed from inventory as quantity is now zero.");
}
return true;
} else {
System.out.println("Error: Insufficient inventory. Requested: "
+ quantity + ", Available: " + currentQuantity);
return false;
}
} else {
System.out.println(
"Error: Product with SKU " + sku + " not found in " + name);
return false;
}
}

// Get available quantity of a product
public int getAvailableQuantity(String sku) {
if (products.containsKey(sku)) {
return products.get(sku).getQuantity();
}
return 0; // Product not found
}

// Get a product by SKU
public Product getProductBySku(String sku) {
return products.get(sku);
}

// Get all products in this warehouse
public Collection<Product> getAllProducts() {
return products.values();
}
}
```

‍

• InventoryManager.java : 

‍

```java
public class InventoryManager {
// Singleton instance
private static InventoryManager instance;

// System components
private List<Warehouse> warehouses;
private ProductFactory productFactory;
private ReplenishmentStrategy replenishmentStrategy;

// Private constructor to prevent instantiation from outside
private InventoryManager() {
// Initialize collections and dependencies
warehouses = new ArrayList<>();
productFactory = new ProductFactory();
}

// Static method to get the singleton instance with thread safety
public static synchronized InventoryManager getInstance() {
if (instance == null) {
instance = new InventoryManager();
}
return instance;
}

// Strategy pattern method
public void setReplenishmentStrategy(ReplenishmentStrategy strategy) {
this.replenishmentStrategy = strategy;
}

// Warehouse management
public void addWarehouse(Warehouse warehouse) {
warehouses.add(warehouse);
}

public void removeWarehouse(Warehouse warehouse) {
warehouses.remove(warehouse);
}

// Product inventory operations
public Product getProductBySku(String sku) {
for (Warehouse warehouse : warehouses) {
Product product = warehouse.getProductBySku(sku);
if (product != null) {
return product;
}
}
return null;
}

// Check stock levels and apply replenishment strategy if needed
public void checkAndReplenish(String sku) {
Product product = getProductBySku(sku);
if (product != null) {
// If product is below threshold, notify observers
if (product.getQuantity() < product.getThreshold()) {
notifyObservers(product);
// Apply current replenishment strategy
if (replenishmentStrategy != null) {
replenishmentStrategy.replenish(product);
}
}
}
}

// Global inventory check
public void performInventoryCheck() {
for (Warehouse warehouse : warehouses) {
for (Product product : warehouse.getAllProducts()) {
if (product.getQuantity() < product.getThreshold()) {
notifyObservers(product);
if (replenishmentStrategy != null) {
replenishmentStrategy.replenish(product);
}
}
}
}
}
}
```

‍

5\. Main Method to run the System : 

‍

```java
public class Main {
public static void main(String[] args) {
// Get the singleton instance of InventoryManager
InventoryManager inventoryManager = InventoryManager.getInstance();

// Create and add warehouses
Warehouse warehouse1 = new Warehouse("Warehouse 1");
Warehouse warehouse2 = new Warehouse("Warehouse 2");
inventoryManager.addWarehouse(warehouse1);
inventoryManager.addWarehouse(warehouse2);

// Create products using ProductFactory
ProductFactory productFactory = new ProductFactory();
Product laptop = productFactory.createProduct(
ProductCategory.ELECTRONICS, "SKU123", "Laptop", 1000.0, 50, 25);
Product tShirt = productFactory.createProduct(
ProductCategory.CLOTHING, "SKU456", "T-Shirt", 20.0, 200, 100);
Product apple = productFactory.createProduct(
ProductCategory.GROCERY, "SKU789", "Apple", 1.0, 100, 200);

// Add products to warehouses
warehouse1.addProduct(laptop, 15);
warehouse1.addProduct(tShirt, 20);
warehouse2.addProduct(apple, 50);

// Set replenishment strategy to Just-In-Time
inventoryManager.setReplenishmentStrategy(new JustInTimeStrategy());

// Perform inventory check and replenish if needed
inventoryManager.performInventoryCheck();

// Switch replenishment strategy to Bulk Order
inventoryManager.setReplenishmentStrategy(new BulkOrderStrategy());

// Replenish a specific product if needed
inventoryManager.checkAndReplenish("SKU123");
}
}
```

‍

Interviewer: Looks good. What makes your approach effective? 

‍

Candidate: Here are the key strengths of my approach for the Inventory Management System:

• Scalability: The design allows easy addition of new product categories, replenishment strategies, and warehouses, ensuring that the system can grow with the business.

‍

• Modularity: Each component, such as product creation, inventory management, and replenishment strategies, is handled separately, ensuring a clean and maintainable structure.

‍

• Flexibility: The use of design patterns like Factory and Strategy allows seamless modifications and enhancements without affecting existing code. This enables the easy introduction of new features and strategies.

‍

• Clarity: The architecture is intuitive, making it easy for developers to understand, implement, and extend when needed. This ensures that the system remains maintainable and adaptable over time.

‍

Extensibility :

1\. Observer Pattern For Inventory Alerts : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743316444350-Frame-245-\(1\).png)

‍

• InventoryObserver.java : 

‍

This interface represents the observer in the Observer Pattern. It declares a method update(Product product) that will be implemented by concrete observers to react to changes in product inventory.

‍

```java
public interface InventoryObserver {
void update(Product product);
}
```

‍

• Concrete Listeners : 

Concrete listeners are the specific implementations of the InventoryObserver interface. These listeners will perform actions when notified about changes in product inventory.

‍

SupplierNotifier.java : (Used to notify the suppliers regarding inventory changes)

‍

```java
public class SupplierNotifier implements InventoryObserver {
private String supplierName;
private String contactEmail;

public SupplierNotifier(String supplierName, String contactEmail) {
this.supplierName = supplierName;
this.contactEmail = contactEmail;
}

@Override
public void update(Product product) {
if (product.getQuantity() < product.getThreshold()) {
// Send email notification to supplier
System.out.println("Notification sent to " + supplierName
+ " for low stock of " + product.getName());
}
}
}
```

‍

• DashboardAlertSystem.java : 

‍

```java
// Second concrete observer - Dashboard alert system
public class DashboardAlertSystem implements InventoryObserver {
private String alertLevel;
private List<String> adminUsers;

public DashboardAlertSystem(String alertLevel, List<String> adminUsers) {
this.alertLevel = alertLevel;
this.adminUsers = adminUsers;
}

@Override
public void update(Product product) {
double stockPercentage =
((double) product.getQuantity() / product.getThreshold()) * 100;

if (stockPercentage <= 25) {
// Critical alert - red notification
System.out.println("CRITICAL ALERT: " + product.getName()
+ " stock critically low at " + product.getQuantity() + " units ("
+ String.format("%.1f", stockPercentage) + "% of threshold)");
notifyAdmins(product, "CRITICAL");
} else if (stockPercentage <= 50) {
// Warning alert - yellow notification
System.out.println("WARNING ALERT: " + product.getName()
+ " stock low at " + product.getQuantity() + " units ("
+ String.format("%.1f", stockPercentage) + "% of threshold)");
notifyAdmins(product, "WARNING");
}
}

private void notifyAdmins(Product product, String level) {
for (String admin : adminUsers) {
System.out.println("Dashboard notification sent to admin: " + admin
+ " - " + level + " level alert for " + product.getName());
// Actual implementation would update dashboard UI and push notifications
}
}
}
```

‍

• Modify the InventoryManager Class to accommodate the observers: 

‍

the InventoryManager class is modified to include observer-related functionalities. It maintains a list of InventoryObserver instances and provides methods to add, remove, and notify these observers when there are changes in product inventory.

‍

```java
public class InventoryManager {
// Singleton instance
private static InventoryManager instance;

// System components
private List<Warehouse> warehouses;
private ProductFactory productFactory;
private List<InventoryObserver> observers;
private ReplenishmentStrategy replenishmentStrategy;

// Private constructor to prevent instantiation from outside
private InventoryManager() {
// Initialize collections and dependencies
warehouses = new ArrayList<>();
observers = new ArrayList<>();
productFactory = new ProductFactory();
}

// Static method to get the singleton instance with thread safety
public static synchronized InventoryManager getInstance() {
if (instance == null) {
instance = new InventoryManager();
}
return instance;
}

// Observer pattern methods
public void addObserver(InventoryObserver observer) {
observers.add(observer);
}

public void removeObserver(InventoryObserver observer) {
observers.remove(observer);
}

public void notifyObservers(Product product) {
for (InventoryObserver observer : observers) {
observer.update(product);
}
}
}
```

‍

2\. Addition of New Product Types : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743316682189-Frame-245-\(2\).png)

‍

New product types can be easily integrated by creating a concrete implementation for the new product type and making the necessary modifications to the Product Factory class to handle the newly added product.

‍

Example: Suppose we want to add a new product type, Furniture. Here's how we would extend our codebase to accommodate Furniture:

‍

Create a Concrete Implementation for Furniture:

‍

```java
public class FurnituresProduct extends Product {
private String brand;
private int warrantyPeriod;

public FurnituresProduct(String sku, String name, double price, int quantity, int threshold) {
super();
setSku(sku);
setName(name);
setPrice(price);
setQuantity(quantity);
setThreshold(threshold);
setCategory(ProductCategory.ELECTRONICS);
}

// Getters and setters for furniture-specific attributes
}
```

‍

• Modify the Product Factory Class : 

‍

```java
public class ProductFactory { 
public Product createProduct(ProductCategory category, String sku, String name, double price, int quantity) { 
switch (category) { 
case ELECTRONICS: 
return new ElectronicsProduct(sku, name, price, quantity); 
case CLOTHING: 
return new ClothingProduct(sku, name, price, quantity); 
case GROCERY: 
return new GroceryProduct(sku, name, price, quantity); 
case FURNITURE: 
return new FurnituresProduct(sku, name, price, quantity);
default: 
throw new IllegalArgumentException("Unsupported product category: " + category); 
} 
} 
}
```

‍

By following these steps, we ensure that our codebase remains flexible and adaptable, allowing for the seamless addition of new vehicle types while maintaining a clean and maintainable architecture.

‍

Builder Design Pattern for Complex Products : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743317220088-Frame-245-\(3\).png)

‍

Builder pattern would be a valuable addition to the Inventory Management System design. It would work particularly well for creating complex product objects with many optional parameters.

• Update the Product Class to accommodate for the Builder Design Pattern : 

‍

Product.java : 

The Product class can been modified to work with the Builder pattern. This includes a protected constructor that takes a Builder object and initializes the product's attributes. The Builder class is an abstract nested class within Product, providing methods to set optional parameters and build the final product object.

‍

```java
// Product class modified to work with Builder pattern
public abstract class Product {
// Core attributes
private final String sku;
private final String name;
private final double price;
private int quantity; // optional
private final int threshold; // optional
private final ProductCategory category;

// Protected constructor to be used by concrete builders
protected Product(Builder<?> builder) {
this.sku = builder.sku;
this.name = builder.name;
this.price = builder.price;
this.quantity = builder.quantity;
this.threshold = builder.threshold;
this.category = builder.category;
}

// Getters
public String getSku() {
return sku;
}
public String getName() {
return name;
}
public double getPrice() {
return price;
}
public int getQuantity() {
return quantity;
}
public int getThreshold() {
return threshold;
}
public ProductCategory getCategory() {
return category;
}

// Setters only for mutable properties
public void setQuantity(int quantity) {
this.quantity = quantity;
}

// Abstract Builder class
public static abstract class Builder<T extends Builder<T>> {
// Required parameters
private final String sku;
private final String name;
private final double price;
private final ProductCategory category;

// Optional parameters with default values
private int quantity = 0;
private int threshold = 10;

// Constructor with required parameters
public Builder(
String sku, String name, double price, ProductCategory category) {
this.sku = sku;
this.name = name;
this.price = price;
this.category = category;
}

// Methods to set optional parameters
public T quantity(int quantity) {
this.quantity = quantity;
return self();
}

public T threshold(int threshold) {
this.threshold = threshold;
return self();
}

// Method to be overridden by subclasses to return this (the current object)
protected abstract T self();

// Build method to be implemented by concrete builders
public abstract Product build();
}
}
```

‍

• Update Concrete Product Classes Implementation : 

‍

ElectronicsProduct.java : 

The ElectronicsProduct class has been updated to incorporate the Builder pattern. The ElectronicsBuilder class is a nested static class within ElectronicsProduct and extends the Builder class from Product. It includes methods to set electronics-specific optional parameters and builds the final ElectronicsProduct object.

‍

```java
// Electronics Product with Builder
public class ElectronicsProduct extends Product {
// Electronics-specific attributes
private final String brand;
private final int warrantyPeriod;
private final String modelNumber;
private final boolean wirelessConnectivity;
private final int powerConsumption;

private ElectronicsProduct(ElectronicsBuilder builder) {
super(builder);
this.brand = builder.brand;
this.warrantyPeriod = builder.warrantyPeriod;
this.modelNumber = builder.modelNumber;
this.wirelessConnectivity = builder.wirelessConnectivity;
this.powerConsumption = builder.powerConsumption;
}

// Getters for electronics-specific attributes
public String getBrand() {
return brand;
}
public int getWarrantyPeriod() {
return warrantyPeriod;
}
public String getModelNumber() {
return modelNumber;
}
public boolean hasWirelessConnectivity() {
return wirelessConnectivity;
}
public int getPowerConsumption() {
return powerConsumption;
}

// Concrete Builder for ElectronicsProduct
public static class ElectronicsBuilder extends Builder<ElectronicsBuilder> {
// Required electronics parameters
private final String brand;

// Optional electronics parameters with default values
private int warrantyPeriod = 12; // 12 months default
private String modelNumber = "";
private boolean wirelessConnectivity = false;
private int powerConsumption = 0;

public ElectronicsBuilder(
String sku, String name, double price, String brand) {
super(sku, name, price, ProductCategory.ELECTRONICS);
this.brand = brand;
}

// Methods to set optional electronics-specific parameters
public ElectronicsBuilder warrantyPeriod(int warrantyPeriod) {
this.warrantyPeriod = warrantyPeriod;
return this;
}

public ElectronicsBuilder modelNumber(String modelNumber) {
this.modelNumber = modelNumber;
return this;
}

public ElectronicsBuilder wirelessConnectivity(
boolean wirelessConnectivity) {
this.wirelessConnectivity = wirelessConnectivity;
return this;
}

public ElectronicsBuilder powerConsumption(int powerConsumption) {
this.powerConsumption = powerConsumption;
return this;
}

@Override
protected ElectronicsBuilder self() {
return this;
}

@Override
public ElectronicsProduct build() {
return new ElectronicsProduct(this);
}
}
}
```

‍

NOTE :

> Similarly, other classes can be modified to accommodate the Builder Design Pattern, which will help in managing complex objects. This pattern allows for the step-by-step construction of complex objects, making the code more readable and maintainable.

‍

## Conclusion : 

This low-level design for the Inventory Management System showcases a well-structured, scalable, and modular architecture. It emphasizes the use of key design patterns like Factory, Strategy, Observer, and Builder, which enhance the flexibility, maintainability, and extensibility of the system. By supporting various enhancements such as the addition of new product categories, replenishment strategies, and complex product configurations, this design ensures that the system can grow and adapt with the business needs.

‍

In an interview setting, presenting this design would demonstrate your ability to create robust and adaptable solutions, highlighting your proficiency in applying design patterns and best practices

---
