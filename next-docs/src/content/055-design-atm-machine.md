---
title: "Design ATM Machine"
type: lld
order: 55
---

# Design ATM Machine

Topic Tags:

System DesignLLD

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

## ‍

## Low-Level Design: ATM Machine System 💰

An ATM (Automated Teller Machine) system is designed to efficiently handle customer banking operations, authenticate users, process transactions, and manage cash inventory. The system needs to support multiple transaction types, maintain security, handle various states of operation, and provide a seamless user experience. The system should be reliable and capable of handling different machine states and transaction processing.

‍

## Rules of the System:

**Setup:**

• The ATM has a cash inventory with different denominations.

• Cards have attributes like card number, PIN, and associated account details.

• The system authenticates users before allowing access to their accounts.

‍

**Operation:**

• Users insert their cards and enter their PIN for authentication.

• The ATM has several states: idle, has card, select operation, cash withdrawal, check balance.

• Once authenticated, users can select from available operations (withdraw cash, check balance, etc.).

• After completing operations, the card is returned to the user.

‍

**Safety Features:**

• The system validates PIN for secure authentication.

• Transaction validation ensures secure and accurate processing.

• The system maintains transaction logs for auditing.

• Maintenance mode prevents user interaction during servicing.

‍

## Interview Setting 🤝

### Point 1: Introduction and Vague Problem Statement:

Interviewer: Let's start with a basic problem statement. Design an ATM Machine System.

‍

Candidate: Certainly! Here's my understanding of the ATM Machine System:

• The system will process customer transactions on a single ATM machine.

• Users can insert cards, authenticate, and perform various banking operations.

• The system authenticates users via PIN verification before allowing transactions.

• The ATM maintains cash inventory and prevents dispensing when insufficient.

• The system transitions through various states during the transaction cycle.

Is this the expected flow?

‍

Interviewer: Yes, you are aligned with the flow. Please continue ahead.

‍

Candidate: Great! Before diving into the design, I'd like to clarify a few requirements:

• What types of operations should the system support?

• How should the system handle user authentication?

• Are there specific states the ATM should manage?

### Point 2: Clarifying Requirements:

Interviewer: We want a system that:

• Supports basic operations like cash withdrawal and balance checking.

• Handles card insertion and PIN-based authentication.

• Manages the state transitions of the ATM during operations.

‍

Candidate: To summarize, the key requirements are:

• A system that authenticates users via card and PIN.

• State management to handle the flow from card insertion to transaction completion.

• Support for basic banking operations (withdraw cash, check balance).

• Ability to handle edge cases like incorrect PIN, insufficient funds, or machine maintenance.

‍

Interviewer: Perfect, let's proceed.

‍

### Point 3: Identifying Key Components:

Candidate: Now that we have the requirements, let's identify the key components of our ATM

Machine System:

• Card: Represents user's bank card with card number and PIN.

• Account: Contains user account details including balance.

• Cash: Represents different denominations of cash in the ATM.

• ATM Inventory: Manages the cash inventory in the ATM.

• ATM Machine: Contains the core functionality and manages operations.

• Transaction Type: Represents different types of transactions.

‍

Interviewer: That sounds good. Let's proceed with the design details.

‍

### Point 4: Design Challenges:

Interviewer: What design challenges do you anticipate?

‍

Candidate: The key challenges for the ATM Machine System include:

• State Management: Properly transitioning between different machine states.

• Authentication: Securely validating user credentials.

• Transaction Processing: Handling different transaction types correctly.

• Error Handling: Managing scenarios like incorrect PIN, insufficient funds, or hardware failures.

• Inventory Management: Ensuring accurate cash tracking and availability.

### Point 5: Approach:

Interviewer: How would you approach these challenges?

‍

Candidate: I propose using design patterns effectively. Here are my strategies:

State Pattern for ATM States: 

• Encapsulates state-specific behavior.

• Manages transitions between states (idle, has card, select operation, cash withdrawal, check balance).

• Prevents invalid operations based on current state.

‍

Factory Pattern for Creation of ATM States : 

• Centralizes creation of state objects

• Decouples client code from concrete state implementations

• Allows for easy extension with new states

‍

Interviewer: That sounds like a solid approach. Let's delve into the implementation details.

‍

### Point 6: Implementation:

Interviewer: Ready to discuss implementation?

‍

Candidate: Yes. I'll focus on implementing the design patterns we discussed and show how they work together in the ATM Machine Problem:

‍

ATM Machine Design with Design Patterns : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744176850678-Frame-249-\(4\).png)

‍

State Diagram : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744176866169-Frame-247-\(1\).png)

‍

1.) Implementing the Core Classes : 

This section outlines the fundamental components needed for the ATM machine design, such as the card, account, cash denominations, and ATM inventory management.

‍

• Card.java : 

This class represents a user's bank card.

‍

```java

// Class representing a user's bank card
public class Card {
private String cardNumber;
private int pin;
private String accountNumber;
// Constructor
public Card(String cardNumber, int pin, String accountNumber) {
this.cardNumber = cardNumber;
this.pin = pin;
this.accountNumber = accountNumber;
}
// Getters and Setters
public String getCardNumber() {
return cardNumber;
}

public boolean validatePin(int enteredPin) {
return this.pin == enteredPin;
}

public String getAccountNumber() {
return accountNumber;
}
}
```

‍

• Account.java : 

This class represents a user's bank account.

‍

```java

// Account class
public class Account {
private String accountNumber;
private double balance;

public Account(String accountNumber, double initialBalance) {
this.accountNumber = accountNumber;
this.balance = initialBalance;
}

public boolean withdraw(double amount) {
if (balance >= amount) {
balance -= amount;
return true;
}
return false;
}

public void deposit(double amount) {
balance += amount;
}

public double getBalance() {
return balance;
}

public String getAccountNumber() {
return accountNumber;
}
}
```

‍

• CashType Enum : 

This enum represents different cash denominations available in the ATM. Each denomination has an associated value.

‍

```java

// Enum representing different cash denominations
// Cash Type Enum
public enum CashType {
BILL_100(100),
BILL_50(50),
BILL_20(20),
BILL_10(10),
BILL_5(5),
BILL_1(1);

public final int value;

CashType(int value) {
this.value = value;
}
}
```

‍

• AtmInventory.java : 

This class manages the ATM's cash inventory.

‍

```java

// Class to manage the ATM's cash inventory
public class ATMInventory {
private Map<CashType, Integer> cashInventory;

// Constructor
public ATMInventory() {
cashInventory = new HashMap<>();
initializeInventory();
}

// Initialize the inventory with
private void initializeInventory() {
// Initialize with some cash
cashInventory.put(CashType.BILL_100, 10);
cashInventory.put(CashType.BILL_50, 10);
cashInventory.put(CashType.BILL_20, 20);
cashInventory.put(CashType.BILL_10, 30);
cashInventory.put(CashType.BILL_5, 20);
cashInventory.put(CashType.BILL_1, 50);
}

// Get total cash available in the ATM
public int getTotalCash() {
int total = 0;
for (Map.Entry<CashType, Integer> entry : cashInventory.entrySet()) {
total += entry.getKey().value * entry.getValue();
}
return total;
}

// Check if ATM has sufficient cash for a withdrawal
public boolean hasSufficientCash(int amount) {
return getTotalCash() >= amount;
}

// Dispense cash for a withdrawal
public Map<CashType, Integer> dispenseCash(int amount) {
if (!hasSufficientCash(amount)) {
return null;
}
Map<CashType, Integer> dispensedCash = new HashMap<>();
int remainingAmount = amount;
// Dispense from largest denomination to smallest
for (CashType cashType : CashType.values()) {
int count = Math.min(
remainingAmount / cashType.value, cashInventory.get(cashType));
if (count > 0) {
dispensedCash.put(cashType, count);
remainingAmount -= count * cashType.value;
cashInventory.put(cashType, cashInventory.get(cashType) - count);
}
}
// If we couldn't make exact change
if (remainingAmount > 0) {
// Rollback the transaction
for (Map.Entry<CashType, Integer> entry : dispensedCash.entrySet()) {
cashInventory.put(entry.getKey(),
cashInventory.get(entry.getKey()) + entry.getValue());
}
return null;
}
return dispensedCash;
}

// Add cash to inventory (for maintenance/refill)
public void addCash(CashType cashType, int count) {
cashInventory.put(cashType, cashInventory.get(cashType) + count);
}
}
```

‍

2\. State Pattern For ATM States : 

• Atm State Interface : 

Defines the contract for all ATM states, ensuring consistency across different states by defining the necessary operations.

‍

```java

// Base ATM State interface with common methods
public interface ATMState {
// Get the name of the current state
String getStateName();

// Method to handle state transitions
ATMState next(ATMMachine context);
}
```

‍

• ATM State Factory : 

A singleton factory class responsible for creating instances of different ATM states.

‍

```java

// ATM State Factory (Singleton)
public class ATMStateFactory {
private static ATMStateFactory instance = null;

private ATMStateFactory() {}

public static ATMStateFactory getInstance() {
if (instance == null) {
instance = new ATMStateFactory();
}
return instance;
}

public ATMState createIdleState() {
return new IdleState();
}

public ATMState createHasCardState() {
return new HasCardState();
}

public ATMState createSelectOperationState() {
return new SelectOperationState();
}

public ATMState createTransactionState() {
return new TransactionState();
}
}
```

‍

• Transaction Type Enum : 

Represents the types of transactions an ATM can process, such as cash withdrawal and balance checking.

‍

```java

// Enum representing different transaction types
public enum TransactionType {
WITHDRAW_CASH,
CHECK_BALANCE
}
```

‍

• Concrete States : 

• Idle State : 

Represents the initial state of the ATM, waiting for a user to insert a card.

‍

```java

// Idle State Implementation
public class IdleState implements ATMState {
public IdleState() {
System.out.println("ATM is in Idle State - Please insert your card");
}

@Override
public String getStateName() {
return "IdleState";
}

@Override
public ATMState next(ATMMachineContext context) {
if (context.getCurrentCard() != null) {
return context.getStateFactory().createHasCardState();
}
return this;
}
}
```

‍

• Has Card State : 

Indicates that a card has been inserted and requires PIN authentication before proceeding.

‍

```java

// Has Card State Implementation
public class HasCardState implements ATMState {
public HasCardState() {
System.out.println("ATM is in Has Card State - Please enter your PIN");
}

@Override
public String getStateName() {
return "HasCardState";
}

@Override
public ATMState next(ATMMachineContext context) {
if (context.getCurrentCard() == null) {
return context.getStateFactory().createIdleState();
}
if (context.getCurrentAccount() != null) {
return context.getStateFactory().createSelectOperationState();
}
return this;
}
}
```

‍

• Select Operation State : 

Represents the state where a user selects an operation after successful authentication.

‍

```java

// Select Operation State Implementation
public class SelectOperationState implements ATMState {
public SelectOperationState() {
System.out.println("ATM is in Select Operation State - Please select an operation");
System.out.println("1. Withdraw Cash");
System.out.println("2. Check Balance");
}	    
@Override
public String getStateName() {
return "SelectOperationState";
}	    
@Override
public ATMState next(ATMMachineContext context) {
if (context.getCurrentCard() == null) {
return context.getStateFactory().createIdleState();
}

if (context.getSelectedOperation() != null) {
return context.getStateFactory().createTransactionState();
}	        
return this;
}
}
```

‍

• Transaction State : 

Represents the state where a user performs a transaction after successful authentication.

‍

```java

// Transaction State Implementation (combines both withdrawal and balance check)
public class TransactionState implements ATMState {
public TransactionState() {
System.out.println("ATM is in Transaction State");
}

@Override
public String getStateName() {
return "TransactionState";
}

@Override
public ATMState next(ATMMachineContext context) {
if (context.getCurrentCard() == null) {
return context.getStateFactory().createIdleState();
}

// After transaction completion, go back to select operation
return context.getStateFactory().createSelectOperationState();
}
}
```

‍

• Implement Core ATM Machine Context Class : 

‍

```java

// The ATM Machine context class
public class ATMMachineContext {
private ATMState currentState;
private Card currentCard;
private Account currentAccount;
private ATMInventory atmInventory;
private Map<String, Account> accounts; // Simplified account storage
private ATMStateFactory stateFactory;
private TransactionType selectedOperation;

// Constructor
public ATMMachineContext() {
this.stateFactory = ATMStateFactory.getInstance();
this.currentState = stateFactory.createIdleState();
this.atmInventory = new ATMInventory();
this.accounts = new HashMap<>();
System.out.println("ATM initialized in: " + currentState.getStateName());
}

// Method to advance to the next state
public void advanceState() {
ATMState nextState = currentState.next(this);
currentState = nextState;
System.out.println("Current state: " + currentState.getStateName());
}

// Card insertion operation
public void insertCard(Card card) {
if (currentState instanceof IdleState) {
System.out.println("Card inserted");
this.currentCard = card;
advanceState();
} else {
System.out.println(
"Cannot insert card in " + currentState.getStateName());
}
}

// PIN authentication operation
public void enterPin(int pin) {
if (currentState instanceof HasCardState) {
if (currentCard.validatePin(pin)) {
System.out.println("PIN authenticated successfully");
currentAccount = accounts.get(currentCard.getAccountNumber());
advanceState();
} else {
System.out.println("Invalid PIN. Please try again");
// Could implement PIN retry logic here
}
} else {
System.out.println("Cannot enter PIN in " + currentState.getStateName());
}
}

// Select operation (withdrawal, balance check, etc.)
public void selectOperation(TransactionType transactionType) {
if (currentState instanceof SelectOperationState) {
System.out.println("Selected operation: " + transactionType);
this.selectedOperation = transactionType;
advanceState();
} else {
System.out.println(
"Cannot select operation in " + currentState.getStateName());
}
}

// Perform the selected transaction
public void performTransaction(double amount) {
if (currentState instanceof TransactionState) {
try {
if (selectedOperation == TransactionType.WITHDRAW_CASH) {
performWithdrawal(amount);
} else if (selectedOperation == TransactionType.CHECK_BALANCE) {
checkBalance();
}
// Ask if user wants another transaction
advanceState();
} catch (Exception e) {
System.out.println("Transaction failed: " + e.getMessage());
// Go back to select operation state
currentState = stateFactory.createSelectOperationState();
}
} else {
System.out.println(
"Cannot perform transaction in " + currentState.getStateName());
}
}

// Return card to user
public void returnCard() {
if (currentState instanceof HasCardState
|| currentState instanceof SelectOperationState
|| currentState instanceof TransactionState) {
System.out.println("Card returned to customer");
resetATM();
} else {
System.out.println("No card to return in " + currentState.getStateName());
}
}

// Cancel current transaction
public void cancelTransaction() {
if (currentState instanceof TransactionState
|| currentState instanceof TransactionState) {
System.out.println("Transaction cancelled");
returnCard();
} else {
System.out.println(
"No transaction to cancel in " + currentState.getStateName());
}
}

// Helper method to perform withdrawal
private void performWithdrawal(double amount) throws Exception {
// Check if user has sufficient balance
if (!currentAccount.withdraw(amount)) {
throw new Exception("Insufficient funds in account");
}
// Check if ATM has sufficient cash
if (!atmInventory.hasSufficientCash((int) amount)) {
// Rollback the account withdrawal
currentAccount.deposit(amount);
throw new Exception("Insufficient cash in ATM");
}
Map<CashType, Integer> dispensedCash =
atmInventory.dispenseCash((int) amount);
if (dispensedCash == null) {
// Rollback the account withdrawal
currentAccount.deposit(amount);
throw new Exception("Unable to dispense exact amount");
}
System.out.println("Transaction successful. Please collect your cash:");
for (Map.Entry<CashType, Integer> entry : dispensedCash.entrySet()) {
System.out.println(entry.getValue() + " x $" + entry.getKey().value);
}
}

// Helper method to check balance
private void checkBalance() {
System.out.println(
"Your current balance is: $" + currentAccount.getBalance());
}

// Reset ATM state
private void resetATM() {
this.currentCard = null;
this.currentAccount = null;
this.selectedOperation = null;
this.currentState = stateFactory.createIdleState();
}

// Getters and setters
public ATMState getCurrentState() {
return currentState;
}

public void setCurrentState(ATMState state) {
this.currentState = state;
}

public Card getCurrentCard() {
return currentCard;
}

public Account getCurrentAccount() {
return currentAccount;
}

public ATMInventory getATMInventory() {
return atmInventory;
}

public TransactionType getSelectedOperation() {
return selectedOperation;
}

public ATMStateFactory getStateFactory() {
return stateFactory;
}

// Add an account to the ATM (for demo purposes)
public void addAccount(Account account) {
accounts.put(account.getAccountNumber(), account);
}

// Get account by number
public Account getAccount(String accountNumber) {
return accounts.get(accountNumber);
}
}
```

‍

3\. Main Method / Client Code to Run the ATM Machine : 

‍

```java

// Main class for demonstration
public class ATMDemo {
public static void main(String[] args) {
// Create and initialize ATM
ATMMachineContext atm = new ATMMachineContext();

// Add sample accounts
atm.addAccount(new Account("123456", 1000.0));
atm.addAccount(new Account("654321", 500.0));

try {
// Sample workflow
System.out.println("=== Starting ATM Demo ===");

// Insert card
atm.insertCard(new Card("123456", 1234, "654321"));

// Enter PIN
atm.enterPin(1234);

// Select operation
atm.selectOperation(TransactionType.WITHDRAW_CASH);

// Perform transaction
atm.performTransaction(100.0);

// Select another operation
atm.selectOperation(TransactionType.CHECK_BALANCE);

// Perform balance check
atm.performTransaction(0.0);

// Return card
atm.returnCard();

System.out.println("=== ATM Demo Completed ===");

} catch (Exception e) {
System.out.println("Error: " + e.getMessage());
}
}
}
```

‍

Interviewer: Looks good. What makes your approach effective?

‍

Candidate: Here are the key strengths of my approach for the ATM Machine System:

1\. State Pattern Implementation: I've implemented the State pattern to model the ATM's different states (Idle, HasCard, SelectOperation, CashWithdrawal, CheckBalance). This allows the machine to behave differently based on its current state while encapsulating state-specific behavior in separate classes.

‍

2\. Single Responsibility Principle: Each class has a clear, focused responsibility. The Card class represents bank cards, Account manages banking data, ATMInventory handles cash management, and the ATMMachine orchestrates the overall operation.

‍

3\. Extensibility: The design easily accommodates new transaction types through the TransactionType enum, and the state pattern allows for introducing new states or behaviors without modifying existing code.

‍

4\. Security: The design implements proper authentication flow, ensuring operations are only allowed after card validation and PIN verification.

‍

5\. Error Handling: The implementation gracefully handles various error conditions like insufficient funds, invalid PIN, or insufficient cash in the ATM.

‍

6\. Real-world Modeling: The implementation accurately models the behavior of an actual ATM with its natural workflow from idle to card insertion, authentication, operation selection, and transaction processing.

‍

## ✨ Conclusion : 

This low-level design for the ATM Machine System demonstrates a well-structured, scalable, and extensible architecture. It follows the State Design Pattern to manage different ATM states dynamically, ensuring clear separation of concerns and modularity. The design supports future enhancements, such as adding new transaction types or integrating transaction logs, while maintaining flexibility and ease of maintenance.

‍

In an interview setting, presenting this design highlights your ability to create robust and adaptable solutions, showcasing expertise in design patterns, best practices, and system architecture to handle real-world banking operations efficiently.

---
