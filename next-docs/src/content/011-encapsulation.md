---
title: "Encapsulation"
type: lld
order: 11
---

# Encapsulation

Topic Tags:

OOPSystem DesignLLD

🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

‍

> Encapsulation is one of the fundamental principles of Object-Oriented Programming (OOP). It involves bundling data (variables) and methods (functions) that operate on the data into a single unit called a class.

‍

Encapsulation also restricts direct access to certain components, ensuring controlled interaction through methods. This prevents unauthorized or accidental interference with the object’s data and ensures better control over the data flow in a program. 🔒

‍

In Java, encapsulation is typically achieved by:

• Declaring class variables as private. 🔐

• Providing public getter and setter methods to access and modify these variables. 🏷️

‍

## 🔑 Key Features of Encapsulation:

**1\. Data Hiding:**

○ Prevents direct access to sensitive data, ensuring that changes can only be made through controlled methods. 🛡️

‍

**2\. Modularity:**

○ Promotes modular design by separating data and behavior, making the code easier to manage and debug. 🧩

‍

**3\. Security:**

○ Protects the integrity of the data by restricting unwanted modifications. 🔒

‍

**4\. Flexibility:**

○ Allows developers to change the internal implementation of a class without affecting external code. 🔄

‍

### Example :

```java

class BankAccount {
// Private variables (data hiding)
private String accountNumber;
private double balance;

// Constructor
public BankAccount(String accountNumber, double initialBalance) {
this.accountNumber = accountNumber;
this.balance = initialBalance;
}

// Public getter method
public String getAccountNumber() {
return accountNumber;
}

// Public getter method
public double getBalance() {
return balance;
}

// Public setter method for deposit
public void deposit(double amount) {
if (amount > 0) {
balance += amount;
System.out.println("Deposited: " + amount);
} else {
System.out.println("Invalid deposit amount.");
}
}

// Public setter method for withdrawal
public void withdraw(double amount) {
if (amount > 0 && amount <= balance) {
balance -= amount;
System.out.println("Withdrawn: " + amount);
} else {
System.out.println("Invalid withdrawal amount.");
}
}
}

public class Main {
public static void main(String[] args) {
BankAccount account = new BankAccount("12345", 1000.00);
System.out.println("Account Number: " + account.getAccountNumber());
System.out.println("Initial Balance: " + account.getBalance());
account.deposit(500.00);
System.out.println("Updated Balance: " + account.getBalance());
account.withdraw(200.00);
System.out.println("Final Balance: " + account.getBalance());
}
}
```

‍

### 📃Explanation:

1\. **Private Variables:**

○ The variables accountNumber and balance are private, restricting direct access from outside the class.

‍

2\. **Public Methods:**

○ Getter methods provide controlled access to the variables.

○ Setter methods ensure valid updates to the variables.

‍

3\. **Data Integrity:**

○ The class ensures that only valid operations are performed on its data.

‍

## 👍🏼Advantages of Encapsulation : 

1\. **Improved Data Security:**

○ Prevents unauthorized access and modifications to the data.

‍

Example : 

```java

class BankAccount {
private String accountNumber; // Data is hidden
private double balance; // Data is hidden
public BankAccount(String accountNumber, double initialBalance) {
this.accountNumber = accountNumber;
this.balance = initialBalance;
}

// Public getter for balance (read-only access)
public double getBalance() {
return balance;
}

// Public method for deposit (controlled access)
public void deposit(double amount) {
if (amount > 0) {
balance += amount;
System.out.println("Deposited: " + amount);
} else {
System.out.println("Invalid deposit amount.");
}
}

// Public method for withdrawal (controlled access)
public void withdraw(double amount) {
if (amount > 0 && amount <= balance) {
balance -= amount;
System.out.println("Withdrawn: " + amount);
} else {
System.out.println("Invalid withdrawal amount.");
}
}
}

public class Main {
public static void main(String[] args) {
BankAccount account = new BankAccount("12345", 1000.00);

// Accessing balance only through public methods
account.deposit(500.00);
account.withdraw(300.00);

// Unauthorized access prevented: No direct modification
System.out.println("Account Balance: " + account.getBalance());
}
}
```

‍

In this example, direct access to balance and accountNumber is not allowed, ensuring that sensitive information is not exposed or modified arbitrarily. This enhances data security and prevents accidental errors.

‍

2.  **Ease of Maintenance:**

○ Encapsulated code is easier to modify and debug without affecting external components.

‍

Example : 

```java

class BankAccount {
private double balance;

public BankAccount(double initialBalance) {
this.balance = initialBalance;
}

public double getBalance() {
return balance;
}

// Centralized logic for deposit and withdrawal
public void updateBalance(double amount, boolean isDeposit) {
if (isDeposit) {
balance += amount;
System.out.println("Deposited: " + amount);
} else if (amount <= balance) {
balance -= amount;
System.out.println("Withdrawn: " + amount);
} else {
System.out.println("Invalid transaction.");
}
}
}

public class Main {
public static void main(String[] args) {
BankAccount account = new BankAccount(1000.00);
// Maintenance: Any bug in updateBalance can be fixed in one place
account.updateBalance(500.00, true); // Deposit
account.updateBalance(300.00, false); // Withdraw
System.out.println("Final Balance: " + account.getBalance());
}
}
```

In the above example, the updateBalance method is the single point of truth for both deposits and withdrawals. Any changes, such as adding transaction limits or fees, can be made in this method without affecting other parts of the code.

‍

3.  **Increased Flexibility:**

○ Internal implementation details can be changed without impacting external code.

‍

Example : 

```java

class BankAccount {
private double balance;
public BankAccount(double initialBalance) {
this.balance = initialBalance;
}
public double getBalance() {
return balance;
}

// Internal implementation can be updated (e.g., adding transaction fee)
public void withdraw(double amount) {
double transactionFee = 2.00; // New feature
if (amount > 0 && (amount + transactionFee) <= balance) {
balance -= (amount + transactionFee);
System.out.println("Withdrawn: " + amount + ", Fee: " + transactionFee);
} else {
System.out.println("Invalid withdrawal amount.");
}
}
}

public class Main {
public static void main(String[] args) {
BankAccount account = new BankAccount(1000.00);
// External code remains unchanged despite internal changes
account.withdraw(200.00);
System.out.println("Remaining Balance: " + account.getBalance());
}
}
```

‍

The internal implementation of the withdraw method was updated to include a transaction fee, but external code (e.g., the Main class) didn’t need any modifications. This ensures flexibility and backward compatibility.

‍

4\. **Enhanced Readability:**

○ Clearly defined interfaces improve code readability and usability.

‍

Example : 

```java

class BankAccount {
private String accountNumber;
private double balance;

public BankAccount(String accountNumber, double initialBalance) {
this.accountNumber = accountNumber;
this.balance = initialBalance;
}

// Clear and readable methods
public String getAccountNumber() {
return accountNumber;
}

public double getBalance() {
return balance;
}

public void deposit(double amount) {
if (amount > 0) {
balance += amount;
System.out.println("Deposited: " + amount);
}
}

public void withdraw(double amount) {
if (amount > 0 && amount <= balance) {
balance -= amount;
System.out.println("Withdrawn: " + amount);
}
}
}

public class Main {
public static void main(String[] args) {
BankAccount account = new BankAccount("12345", 1000.00);

// Clearly defined interfaces for readability
System.out.println("Account Number: " + account.getAccountNumber());
System.out.println("Initial Balance: " + account.getBalance());

account.deposit(500.00);
account.withdraw(200.00);
}
}
```

‍

The clear interface (getAccountNumber, deposit, and withdraw) makes it easy for developers to understand how to use the BankAccount class, even if they are unfamiliar with its internal workings.

‍

## 👎🏼Disadvantages of Encapsulation : 

1\. **Slight Overhead:**

○ Encapsulation introduces additional boilerplate code (getters and setters), which can increase verbosity.

‍

Example :

```java

class BankAccount {
private String accountNumber;
private double balance;
// Boilerplate getters and setters
public String getAccountNumber() {
return accountNumber;
}
public void setAccountNumber(String accountNumber) {
this.accountNumber = accountNumber;
}
public double getBalance() {
return balance;
}
public void setBalance(double balance) {
this.balance = balance;
}
}

public class Main {
public static void main(String[] args) {
BankAccount account = new BankAccount();
// Verbose code for simple tasks
account.setAccountNumber("12345");
account.setBalance(1000.00);
System.out.println("Account Number: " + account.getAccountNumber());
System.out.println("Balance: " + account.getBalance());
}
}
```

‍

Although encapsulation provides benefits, it can lead to more verbose code, especially when getters and setters are used extensively without adding significant value.

‍

2\. **Complexity:**

○ Beginners may find it challenging to understand and implement encapsulation effectively.

‍

Example : 

```java

class BankAccount {
private double balance;
public BankAccount(double initialBalance) {
this.balance = initialBalance;
}
public double getBalance() {
return balance;
}
public void deposit(double amount) {
if (amount > 0) {
balance += amount;
}
}
public void withdraw(double amount) {
if (amount > 0 && amount <= balance) {
balance -= amount;
}
}
}

public class Main {
public static void main(String[] args) {
BankAccount account = new BankAccount(1000.00);
// Beginners may find concepts like access modifiers and getters challenging
account.deposit(500.00);
account.withdraw(200.00);
System.out.println("Final Balance: " + account.getBalance());
}
}
```

‍

For beginners, understanding why direct access to fields is restricted and why getters/setters are used can be confusing. This might make it harder for them to implement encapsulation correctly.

‍

## 🎯Conclusion : 

Encapsulation is a vital aspect of OOP that fosters secure, modular, and maintainable code. By controlling data access through encapsulation, developers can ensure data integrity and create flexible, robust applications. Understanding and applying encapsulation effectively is essential for building scalable Java programs.

---
