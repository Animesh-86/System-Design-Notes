---
title: "Strategy Design Pattern"
type: lld
order: 26
---

# Strategy Design Pattern

Topic Tags:

System DesignLLD

🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

‍

## Strategy Design Pattern: A Real-Life Example in Software Engineering 🛠️

When it comes to software development, flexibility and scalability are key factors in building systems that can evolve over time without becoming unmanageable. The Strategy Design Pattern is a powerful tool that enables software engineers to achieve just that by allowing different algorithms or behaviors to be selected dynamically at runtime.

‍

## Introduction to the Strategy Pattern 🧩

In simple terms, the Strategy Pattern allows you to define a family of algorithms or behaviors, and choose the one to use during runtime. It is like having a toolbox 🧰 where you can pick the best tool (or strategy) for the task at hand. This approach avoids hardcoding multiple behaviors into one class and promotes flexibility by separating the behavior logic into different classes.

‍

## Why is it Called the Strategy Pattern? 🏆

The name Strategy comes from the idea of different strategies to solve the same problem (in this case, processing payments). Each strategy encapsulates a different way to process payments, and we can switch between them dynamically based on user input or system requirements. This makes the system more flexible and easier to extend.

‍

## Real-Life Scenario: Payment Processing in E-commerce 🛒💳

Imagine you're developing an e-commerce platform where users can make purchases using various payment methods like Credit Cards, PayPal, or Cryptocurrency. Each payment method has its own unique processing logic.

‍

Without the Strategy Pattern, you'd likely have a large, monolithic class with many if-else or switch statements, checking for the payment method and executing the specific logic for each one. But what happens when you need to add another payment method (like Apple Pay or Stripe)? It becomes a nightmare to manage and extend. 😱

‍

## The Traditional Approach: Payment Processing 💳

### Step 1: The Problem – Different Payment Methods 🧩

We start with a PaymentProcessor class. This class will check the payment method (Credit Card, PayPal, or Crypto) and handle the payment accordingly.

Now, we don't want to keep writing a bunch of different methods for each payment method, so we try using an if-else block to determine the payment method and process it. But we need to change this block every time we add a new payment method. Let me show you how it looks:

‍

### Code Example: Traditional Payment Processor 💻

```java

public class PaymentProcessor {
// This method will process payment based on payment method type
public void processPayment(String paymentMethod) {
if (paymentMethod.equals("CreditCard")) {
// Process Credit Card payment
System.out.println("Processing credit card payment...");
} else if (paymentMethod.equals("PayPal")) {
// Process PayPal payment
System.out.println("Processing PayPal payment...");
} else if (paymentMethod.equals("Crypto")) {
// Process Crypto payment
System.out.println("Processing crypto payment...");
} else {
// If an unsupported payment method is entered
System.out.println("Payment method not supported.");
}
}
}
```

‍

## How It Works:

• We have a single method called processPayment().

• Inside the method, we check what type of payment method the user has selected using if-else statements.

• For each payment method (Credit Card, PayPal, or Crypto), we print a message like "Processing credit card payment...".

‍

## What Happens When We Want to Add a New Payment Method? 🤔

Let’s say you now want to add a new payment method, like Stripe.

If we were using the above approach, we’d have to modify the processPayment() method like this:

‍

```java

public class PaymentProcessor {
// This method will process payment based on payment method type
public void processPayment(String paymentMethod) {
if (paymentMethod.equals("CreditCard")) {
// Process Credit Card payment
System.out.println("Processing credit card payment...");
} else if (paymentMethod.equals("PayPal")) {
// Process PayPal payment
System.out.println("Processing PayPal payment...");
} else if (paymentMethod.equals("Crypto")) {
// Process Crypto payment
System.out.println("Processing crypto payment...");
} else if (paymentMethod.equals("Stripe")) { // New method added
// Process Stripe payment
System.out.println("Processing Stripe payment...");
} else {
// If an unsupported payment method is entered
System.out.println("Payment method not supported.");
}
}
}
```

‍

**What’s Wrong with This?** 😓

Here’s where the problem comes in:

• Adding new payment methods: Every time you want to add a new payment method, you have to go into the processPayment() method and modify the code.

• Code duplication: We keep repeating similar blocks of code for each payment method, which can get messy when we add more and more methods.

• Scalability issues: As you keep adding new methods (Stripe, Google Pay, Apple Pay, etc.), this if-else block becomes harder to maintain and less flexible. Imagine what happens when you have 20 payment methods. The code gets huge and difficult to read.

‍‍

### Step 2: Slight Improvement Using Interfaces – PaymentProcessor Class 🔄

In Step 1, we had a monolithic method that handled every payment method type with an if-else block. The problem with that approach is that we had to modify the method each time we added a new payment method. This leads to code duplication and hard-to-maintain code.

In Step 2, we make a slight improvement by using interfaces. We will define a PaymentMethod interface that each payment method will implement. This is a good improvement, but we will still have to modify the PaymentProcessor class when we add a new payment method.

Let’s take a look at how we can improve the code by using interfaces.

‍

**Step 2: Slight Improvement Using Interfaces**

PaymentMethod Interface

Instead of hardcoding the payment methods inside the PaymentProcessor class, we can define an interface PaymentMethod with a method processPayment(). All payment methods will implement this interface and provide their own implementation of processPayment().

‍

```java

// PaymentMethod interface (defines the common method for all payment types)
public interface PaymentMethod {
void processPayment(); // Abstract method for processing payments
}
```

‍

Now, let's create separate classes for each payment method, and each class will implement the PaymentMethod interface:

‍

Concrete Payment Method Classes

```java

public class CreditCardPayment implements PaymentMethod {
public void processPayment() {
System.out.println("Processing credit card payment...");
}
}

public class PayPalPayment implements PaymentMethod {
public void processPayment() {
System.out.println("Processing PayPal payment...");
}
}

public class CryptoPayment implements PaymentMethod {
public void processPayment() {
System.out.println("Processing crypto payment...");
}
}

public class StripePayment implements PaymentMethod {
public void processPayment() {
System.out.println("Processing Stripe payment...");
}
}
```

‍

**PaymentProcessor Class in Step 2** 🏗️

Now that we have modularized the payment methods into separate classes, the next step is to make the PaymentProcessor class work with these payment strategy classes. We can pass the payment method as a parameter to the PaymentProcessor class.

‍

However, here’s the catch: while this is better, we still need to modify the PaymentProcessor class every time a new payment method is added.

```java

public class PaymentProcessor {
// This method processes payment based on the payment method type
public void processPayment(String paymentMethod) {
if (paymentMethod.equals("CreditCard")) {
CreditCardPayment creditCard = new CreditCardPayment();
creditCard.processPayment(); // Process Credit Card payment
} else if (paymentMethod.equals("PayPal")) {
PayPalPayment payPal = new PayPalPayment();
payPal.processPayment(); // Process PayPal payment
} else if (paymentMethod.equals("Crypto")) {
CryptoPayment crypto = new CryptoPayment();
crypto.processPayment(); // Process Crypto payment
} else if (paymentMethod.equals("Stripe")) {
StripePayment stripe = new StripePayment();
stripe.processPayment(); // Process Stripe payment
} else {
System.out.println("Payment method not supported.");
}
}
}
```

‍

### What’s the Issue Now? ⚠️

Even though we’ve moved the payment logic to individual classes (for each payment method), we still have to modify the PaymentProcessor class every time we introduce a new payment method. This is because we are still checking the payment method inside the processPayment() method and manually creating instances of the corresponding class.

‍

Example: Adding a New Payment Method (Apple Pay)

To add a new payment method, like Apple Pay, we would need to:

1\. Create a new strategy class for Apple Pay.

2\. Modify the PaymentProcessor class and add a new else if block for Apple Pay.

‍

Here's how we would do it:

```java

public class PaymentProcessor {
// This method processes payment based on the payment method type
public void processPayment(String paymentMethod) {
if (paymentMethod.equals("CreditCard")) {
CreditCardPayment creditCard = new CreditCardPayment();
creditCard.processPayment(); // Process Credit Card payment
} else if (paymentMethod.equals("PayPal")) {
PayPalPayment payPal = new PayPalPayment();
payPal.processPayment(); // Process PayPal payment
} else if (paymentMethod.equals("Crypto")) {
CryptoPayment crypto = new CryptoPayment();
crypto.processPayment(); // Process Crypto payment
} else if (paymentMethod.equals("Stripe")) {
StripePayment stripe = new StripePayment();
stripe.processPayment(); // Process Stripe payment
} else if (paymentMethod.equals("ApplePay")) { // New payment method added
ApplePayPayment applePay = new ApplePayPayment();
applePay.processPayment(); // Process Apple Pay payment
} else {
System.out.println("Payment method not supported.");
}
}
}
```

### Why Is This Still a Problem? 🔴

1\. Adding New Payment Methods:

Every time a new payment method is added, you need to go into the PaymentProcessor class and add a new else if block. This results in code duplication and poor maintainability.

‍

2\. Scalability Issues:

As the number of payment methods increases (imagine 20+ methods), the PaymentProcessor class will become massive, making it hard to read and hard to modify.

‍

## Step 3: The Strategy Pattern – The Right Way 🦸‍♂️✨

Now that we've seen the limitations of the traditional approach, let's apply the Strategy Design Pattern to solve the problem more elegantly.

In the Strategy Pattern, we create a family of algorithms (in this case, payment methods), and we allow the client (in this case, PaymentProcessor) to choose the appropriate algorithm at runtime. The key benefit is that we can easily add new payment methods without modifying the existing code.

‍

Let's break it down step-by-step and walk through the complete code.

‍

### 1: Define the Strategy Interface 🎯

The first step is to define a common interface that all the payment methods will follow. This interface will have a method called processPayment(), which each payment method class will implement.

‍

```java

// PaymentStrategy interface (defines the common method for all payment types)
public interface PaymentStrategy {
void processPayment(); // Abstract method for processing payments
}
```

‍

Here, we’ve created a PaymentStrategy interface with a single method processPayment(). Each payment method will implement this interface and provide its own implementation of the processPayment() method.

‍

### 2: Implement Concrete Payment Strategies 💳💻

Now, we create the concrete payment strategies. These are the actual implementations for each payment method like Credit Card, PayPal, Crypto, etc.

‍

```java

// Concrete strategy for credit card payment
public class CreditCardPayment implements PaymentStrategy {
public void processPayment() {
System.out.println("Processing credit card payment...");
}
}

// Concrete strategy for PayPal payment
public class PayPalPayment implements PaymentStrategy {
public void processPayment() {
System.out.println("Processing PayPal payment...");
}
}

// Concrete strategy for crypto payment
public class CryptoPayment implements PaymentStrategy {
public void processPayment() {
System.out.println("Processing crypto payment...");
}
}

// Concrete strategy for Stripe payment
public class StripePayment implements PaymentStrategy {
public void processPayment() {
System.out.println("Processing Stripe payment...");
}
}
```

‍

Each class (like CreditCardPayment, PayPalPayment, etc.) implements the PaymentStrategy interface. They each have their own version of processPayment() that contains the logic for processing that specific payment method.

‍

### 3: Modify the PaymentProcessor Class to Use the Strategy 🛠️

The key idea in the Strategy Pattern is that we will delegate the payment processing to the appropriate strategy. So, we’ll modify the PaymentProcessor class to hold a reference to a PaymentStrategy and delegate the call to processPayment().

‍

Here’s how we do that:

```java

public class PaymentProcessor {
private PaymentStrategy paymentStrategy; // Reference to a payment strategy
// Constructor to set the payment strategy
public PaymentProcessor(PaymentStrategy paymentStrategy) {
this.paymentStrategy = paymentStrategy;
}

// Process payment using the current strategy
public void processPayment() {
paymentStrategy
.processPayment(); // Delegate the payment processing to the strategy
}

// Dynamically change payment strategy at runtime
public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
this.paymentStrategy = paymentStrategy;
}
}
```

‍

In this class:

1\. The PaymentProcessor class has a reference to a PaymentStrategy (i.e., one of the payment methods).

‍

2\. It uses this reference to call the processPayment() method.

‍

3\. We can dynamically change the strategy at runtime using the setPaymentStrategy() method. This means that if the user wants to switch from CreditCard to PayPal, we can change the strategy without changing the rest of the code!

‍

4: Use the Strategy Pattern in Action 🎉

Now, let’s use our PaymentProcessor class with different payment strategies.

Here’s how it works:

‍

```java

public class Main {
public static void main(String[] args) {
// Create strategy instances for each payment type
PaymentStrategy creditCard = new CreditCardPayment();
PaymentStrategy payPal = new PayPalPayment();
PaymentStrategy crypto = new CryptoPayment();
PaymentStrategy stripe = new StripePayment();
// Use the Strategy Pattern to process payments
PaymentProcessor processor =
new PaymentProcessor(creditCard); // Initially using CreditCardPayment
processor.processPayment(); // Processing credit card payment...
// Dynamically change the payment strategy to PayPal
processor.setPaymentStrategy(payPal);
processor.processPayment(); // Processing PayPal payment...
// Switch to Crypto
processor.setPaymentStrategy(crypto);
processor.processPayment(); // Processing crypto payment...
// Switch to Stripe
processor.setPaymentStrategy(stripe);
processor.processPayment(); // Processing Stripe payment...
}
}
```

‍

### Explanation of Code:

• Create strategy instances:

We create different strategy objects like CreditCardPayment, PayPalPayment, etc.

‍

• PaymentProcessor:

We instantiate PaymentProcessor and pass a specific payment strategy (e.g., CreditCardPayment) to it.

‍

• Dynamically change strategies:

We can change the payment method dynamically using the setPaymentStrategy() method, and no modification to the PaymentProcessor class is required.

‍

• Process payment:

We call processor.processPayment() to process the payment using the current strategy.

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1742182066716-Frame-241-\(1\).png)

‍

## Advantages of the Strategy Pattern 🌟

1\. Flexibility:

We can switch between different payment strategies at runtime without modifying the PaymentProcessor class. 🔄

‍

2\. Maintainability:

New payment methods can be added by simply creating new strategy classes. We don't need to touch the existing code. 🛠️

‍

3\. Separation of Concerns:

Each payment method has its own class, making the code easier to understand and maintain. 🧹

‍

4\. Extensibility:

As new payment methods become available, we can simply add them by creating new strategy classes. 💡

‍

## Real-Life Use Cases for the Strategy Pattern 🌍

• Payment Methods 💳:

Process payments via different methods like Credit Card, PayPal, Crypto, etc.

‍

• Sorting Algorithms 📊:

Use different sorting strategies (e.g., quick sort, merge sort) depending on the situation.

‍

• Shipping Costs 📦:

Calculate shipping costs based on various factors such as location, delivery speed, and package size.

‍

## Conclusion 🎯

The Strategy Pattern is a powerful tool for making your code modular, flexible, and scalable. By encapsulating behaviors (like payment methods) into separate strategy classes, you can easily change or add new behaviors without modifying the existing code. This results in a cleaner, more maintainable codebase that can adapt to future requirements without significant changes. 🌟🚀

---
