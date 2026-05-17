---
title: "Design Vending Machine"
type: lld
order: 51
---

# Design Vending Machine

Topic Tags:

System DesignLLD

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

## ‍

## Low-Level Design: Vending Machine System 🥤

A vending machine system is designed to efficiently manage product inventory, handle customer selections, process payments, and dispense products. The system needs to support multiple product types, manage inventory availability, handle various payment methods, and provide a seamless purchase experience. The system should be reliable and capable of handling different machine states and payment strategies.

‍

## Rules of the System:

Setup:

• The vending machine has an inventory of products of various types (beverages, snacks, etc.).

• Products have attributes like product ID, name, price, category, and quantity available.

• The system tracks product availability and manages inventory.

‍

Operation:

• Users can browse available products and select items they wish to purchase.

• The vending machine has several states: ready, item selected, payment pending, dispensing, and maintenance.

• The system accepts various payment methods (cash, credit card, mobile payment).

• Once payment is confirmed, the machine dispenses the selected product.

‍

Safety Features:

• The system prevents dispensing when products are out of stock.

• Payment validation ensures secure transactions.

• Audit trails track all purchases and inventory changes.

• Maintenance mode prevents user interaction during servicing.

## Interview Setting 🤝

**Point 1: Introduction and Vague Problem Statement:**

Interviewer: Let's start with a basic problem statement. Design a Vending Machine System.

‍

Candidate: Certainly! Here's my understanding of the Vending Machine System:

• The system will manage products within a single vending machine.

• Users can browse, select, and purchase products based on their preferences.

• The system tracks product availability and prevents dispensing unavailable items.

• Payment processing is integrated for coin-based payments only.

• The system transitions through various states during the purchase cycle.

Is this the expected flow?

‍

Interviewer: Yes, you are aligned with the flow. Please continue ahead.

Candidate: Great! Before diving into the design, I'd like to clarify a few requirements:

• What types of products should the system support?

• How should the system handle coin-based payments?

• Are there specific states the vending machine should manage?

‍

**Point 2: Clarifying Requirements:**

Interviewer: We want a system that:

• Supports multiple product types within a single vending machine.

• Handles coin-based payments methods efficiently.

• Manages the state transitions of the vending machine during operations.

‍

Candidate: To summarize, the key requirements are:

• A system with a vending machine containing various product categories.

• State management to handle the flow from product selection to dispensing.

• Coin-based payment implementation to support various payment methods.

• Ability to handle edge cases like out-of-stock items, payment failures, or machine maintenance.

‍

Interviewer: Perfect, let's proceed.

‍

**Point 3: Identifying Key Components:**

Candidate: Now that we have the requirements, let's identify the key components of our Vending Machine System:

• Item: Represents individual items in the vending machine.

• ItemType Enum : Represents Different Types of Product.

• Item Shelf: Contains a Product

• Coin : Represents Different Denominations of Coins which the Vending Machine can accept.

• Inventory : Manages the Inventory of the Items in the Vending Machine.

‍

Interviewer: That sounds good. Let's proceed with the design details.

‍

**Point 4: Design Challenges:**

Interviewer: What design challenges do you anticipate?

‍

Candidate: The key challenges for the Vending Machine System include:

• State Management: Properly transitioning between different machine states.

• Payment Processing: Supporting multiple payment methods securely. (Currently Coin, but extensible in future)

• Inventory Management: Ensuring accurate product tracking and availability.

• Error Handling: Managing scenarios like payment failures or product jams.

• Maintenance Operations: Supporting restocking and machine servicing.

‍

**Point 5: Approach:**

Interviewer: How would you approach these challenges?

‍

Candidate: I propose using design patterns effectively. Here are my strategies:

1\. State Pattern for Machine States:

○ Encapsulates state-specific behavior.

○ Manages transitions between states (ready, item selected, payment pending, dispensing, maintenance).

○ Prevents invalid operations based on current state.

‍

2\. Strategy Pattern for Payment Methods:

○ Enables different payment strategies (cash, credit card, mobile payment).

○ Can switch between payment methods dynamically.

○ Encapsulates payment processing logic.

‍

Interviewer: That sounds like a solid approach. Let's delve into the implementation details.

‍

**Point 6: Implementation:**

Interviewer: Ready to discuss implementation?

‍

Candidate: Yes. I'll focus on implementing the design patterns we discussed and show how they work together in the Vending Machine Problem :

‍

## Vending Machine Design with Design Patterns : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743830302760-Frame-245-\(8\).png)

‍

State Diagram : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743830348526-Frame-245-\(9\).png)

‍

1\. Implementing Core Classes : 

• Item: Represents individual items in the vending machine.

• ItemType Enum : Represents Different Types of Products

‍

Enum : 

```java
// Enum representing different types of items in the vending machine
public enum ItemType {
COKE,
PEPSI,
JUICE,
SODA
}
```

‍

Class:

```java
// Class representing an item in the vending machine
public class Item {
// Type of the item (e.g., COKE, PEPSI)
private ItemType type;

// Price of the item
private int price;
// Getters and Setters
public ItemType getType() {
return type;
}
public void setType(ItemType type) {
this.type = type;
}

public int getPrice() {
return price;
}

public void setPrice(int price) {
this.price = price;
}
}
```

‍

• ItemShelf: Contains a Product 

Class : 

‍

```java
// Class representing a slot in the vending machine that holds multiple items
public class ItemShelf {
// Code to identify the slot
private int code;
// List of items stored in the slot
private List<Item> items;
// Flag to indicate if the shelf is sold out
private boolean isSoldOut;

// Constructor to initialize the item shelf
public ItemShelf(int code) {
this.code = code;
this.items = new ArrayList<>(); // Initialize the list of items
this.isSoldOut = false;
}

// Getters and Setters
public int getCode() {
return code;
}

public void setCode(int code) {
this.code = code;
}

public List<Item> getItems() {
return items;
}

public boolean checkIsSoldOut() {
return isSoldOut;
}

public void setIsSoldOut(boolean isSoldOut) {
this.isSoldOut = isSoldOut;
}

public void setItems(List<Item> items) {
this.items = items;
if(isSoldOut) setIsSoldOut(false); // Update the sold-out status when items are set
}

// Add an item to the shelf
public void addItem(Item item) {
items.add(item);
if(isSoldOut) setIsSoldOut(false); // Update sold-out status after adding an item
}

// Remove an item from the shelf
public void removeItem(Item item) {
items.remove(item);
if(items.isEmpty()) setIsSoldOut(true); // Update sold-out status after removing an item
}

public boolean hasItems() { 
for(ItemShelf itemShelf : inventory){ 
if(!itemShelf.checkIsSoldOut()) return true; 
} 
return false;  
} 
}
```

‍

• Coin : Represents Different Denominations of Coins which the Vending Machine can accept 

‍

```java
// Enum representing different types of Indian coins in the vending machine
public enum Coin {
ONE_RUPEE(1),
TWO_RUPEES(2),
FIVE_RUPEES(5),
TEN_RUPEES(10);
// Value of the coin in Indian rupees
public int value;
// Constructor to initialize the coin's value
Coin(int value) {
this.value = value;
}
}
```

‍

• Inventory : Manages the Inventory of the Items in the Vending Machine

Class : 

‍

```java
// Class representing the inventory of the vending machine
public class Inventory {
// Array to hold item shelves in the inventory
ItemShelf[] inventory = null;

// Constructor for Inventory
public Inventory(int itemCount) {
inventory = new ItemShelf[itemCount]; // Initialize the array with the given item count
initialEmptyInventory(); // Initialize the inventory with empty shelves
}

// Getter for the inventory array
public ItemShelf[] getInventory() {
return inventory;
}

// Setter for the inventory array
public void setInventory(ItemShelf[] inventory) {
this.inventory = inventory;
}

// Method to initialize the inventory with empty shelves
public void initialEmptyInventory() {
int startCode = 101; // Starting code for item shelves
for (int i = 0; i < inventory.length; i++) {
ItemShelf space = new ItemShelf(startCode); // Create a new item shelf with a code
inventory[i] = space; // Add the shelf to the inventory
startCode++; // Increment the code for the next shelf
}
}

// Method to add an item to the inventory at a specific code number
public void addItem(Item item, int codeNumber) throws Exception {
for (ItemShelf itemShelf : inventory) {
if (itemShelf.getCode() == codeNumber) {
// Add the item to the shelf
itemShelf.addItem(item);
return;
}
}
throw new Exception("Invalid Code");
}

// Method to get and remove an item from the inventory by its code number
public Item getItem(int codeNumber) throws Exception {
for (ItemShelf itemShelf : inventory) {
if (itemShelf.getCode() == codeNumber) {
if (itemShelf.checkIsSoldOut()) {
throw new Exception("Item already sold out");
} else {
// Get and remove the first item from the shelf
Item item = itemShelf.getItems().get(0); // Get the first item
return item;
}
}
}
throw new Exception("Invalid Code");
}

// Method to update an item shelf as sold out by its code number
public void updateSoldOutItem(int codeNumber) {
for (ItemShelf itemShelf : inventory) {
if (itemShelf.getCode() == codeNumber) {
if (itemShelf.getItems().isEmpty())
itemShelf.setIsSoldOut(true); // Mark the shelf as sold out
}
}
}

// Method to remove a specific item from the inventory by its code number
public void removeItem(int codeNumber) throws Exception {
for (ItemShelf itemShelf : inventory) {
if (itemShelf.getCode() == codeNumber) {
itemShelf.removeItem(
itemShelf.getItems().get(0)); // Remove the specific item from the shelf
return;
}
}
throw new Exception("Invalid Code");
}
}
```

‍‍

2\. State Pattern for Vending Machine States : 

1.) Define the Vending Machine State Interface : 

‍

```java
// Interface defining the common methods for all states
public interface VendingMachineState {
// Get the name of the current state
String getStateName();

// Method to handle state transitions
VendingMachineState next(VendingMachineContext context);
}
```

‍

     2.) Define the Context Handler : 

‍

```java
// Context class that maintains state and handles transitions in the vending machine
public class VendingMachineContext {
private VendingMachineState currentState; // Current state of the vending machine
private Inventory inventory; // Inventory to store items
private List<Coin> coinList; // List to keep track of inserted coins
private int selectedItemCode; // Code of the selected item


// Constructor to initialize the vending machine with an idle state
public VendingMachineContext() {
inventory = new Inventory(10); // Initialize inventory with 10 slots
coinList = new ArrayList<>(); // Initialize the coin list
currentState = new IdleState(); // Set initial state to idle
System.out.println("Initialized: " + currentState.getStateName());
}

// Gets the current state of the vending machine
public VendingMachineState getCurrentState() {
return currentState;
}

// Advances the vending machine to the next state
public void advanceState() {
VendingMachineState nextState = currentState.next(this); // Get the next state
currentState = nextState; // Transition to the next state
System.out.println("Current state: " + currentState.getStateName());
}

// Handles the insertion of a coin
public void clickOnInsertCoinButton(Coin coin) {
if (currentState instanceof IdleState || currentState instanceof HasMoneyState) {
System.out.println("Inserted " + coin.name() + " worth " + coin.value);
coinList.add(coin); // Add the coin to the list
advanceState(); // Move to the next state
} else {
System.out.println("Cannot insert coin in " + currentState.getStateName());
}
}

// Handles the product selection process
public void clickOnStartProductSelectionButton(int codeNumber) {
if (currentState instanceof HasMoneyState) {
advanceState(); // Move to selection state
selectProduct(codeNumber); // Select the product
} else {
System.out.println("Product selection button can only be clicked in HasMoney state");
}
}

// Selects a product based on its code
public void selectProduct(int codeNumber) {
if (currentState instanceof SelectionState) {
try {
Item item = inventory.getItem(codeNumber); // Fetch the item from inventory

int balance = getBalance(); // Calculate the total balance
if (balance < item.getPrice()) { // Check for sufficient funds
System.out.println(
"Insufficient amount. Product price: " + item.getPrice() + ", paid: " + balance);
return;
}
setSelectedItemCode(codeNumber); // Set the selected item code
advanceState(); // Move to dispense state
dispenseItem(codeNumber); // Dispense the item

if (balance >= item.getPrice()) { // Return change if applicable
int change = balance - item.getPrice();
System.out.println("Returning change: " + change);
}
} catch (Exception e) {
System.out.println("Error: " + e.getMessage());
}
} else {
System.out.println("Products can only be selected in Selection state");
}
}

// Dispenses the selected item
public void dispenseItem(int codeNumber) {
if (currentState instanceof DispenseState) {
try {
Item item = inventory.getItem(codeNumber);
System.out.println("Dispensing: " + item.getType());
inventory.removeItem(codeNumber); // Remove item from inventory
// Update inventory
inventory.updateSoldOutItem(codeNumber);
// Reset machine state
resetBalance();
resetSelection();
advanceState(); // Move to the next state
} catch (Exception e) {
System.out.println("Failed to Dispense the Product with code : " + codeNumber);
}
} else {
System.out.println("System cannot dispense in : " + currentState);
}
}

// Updates the inventory by adding a new item
public void updateInventory(Item item, int codeNumber) {
if (currentState instanceof IdleState) { // Only update inventory in Idle state
try {
inventory.addItem(item, codeNumber); // Add the item to inventory
System.out.println("Added " + item.getType() + " to slot " + codeNumber);
} catch (Exception e) {
System.out.println("Error updating inventory: " + e.getMessage());
}
} else {
System.out.println("Inventory can only be updated in Idle state");
}
}

// Getters and setters for context properties
public Inventory getInventory() {
return inventory;
}

public void setInventory(Inventory inventory) {
this.inventory = inventory;
}

public List<Coin> getCoinList() {
return coinList;
}

public void setCoinList(List<Coin> coinList) {
this.coinList = coinList;
}

public int getSelectedItemCode() {
return selectedItemCode;
}

public void setSelectedItemCode(int codeNumber) {
this.selectedItemCode = codeNumber;
}

// Resets the product selection
public void resetSelection() {
this.selectedItemCode = 0;
}

// Calculates the total balance from inserted coins
public int getBalance() {
int balance = 0;
for (Coin coin : coinList) {
balance += coin.value; // Sum up the coin values
}
return balance;
}

// Resets the balance by clearing all coins
public void resetBalance() {
coinList.clear();
}
}
```

‍

3.) Concrete States : 

 Idle State : Initial state where the only possible option is to insert coins into the machine  

‍

```java
// Implementation of the Idle state
public class IdleState implements VendingMachineState {
public IdleState() {
System.out.println("Vending machine is now in Idle State");
}

@Override
public String getStateName() {
return "IdleState";
}

@Override
public VendingMachineState next(VendingMachineContext context) {
// Check if inventory has items
if (!context.getInventory().hasItems()) {
return new OutOfStockState();
}
// If money has been inserted, transition to HasMoneyState
if (!context.getCoinList().isEmpty()) {
return new HasMoneyState();
}
// Otherwise, remain in idle state
return this;
}
}
```

‍

• Has Money State : The Possible actions which can be performed in the Has Money State can be : 

a. Insert Coins.

b. Start the Product Selection. 

c. Cancel Product Selection. 

d. Get Refund. 

‍

```java
package VendingMachineStates.ConcreteStates;

import VendingMachineStates.VendingMachineContext;
import VendingMachineStates.VendingMachineState;

public class HasMoneyState implements VendingMachineState {
public HasMoneyState() {
System.out.println("Vending machine is now in HasMoney State");
}

@Override
public String getStateName() {
return "HasMoneyState";
}

@Override
public VendingMachineState next(VendingMachineContext context) {
if (!context.getInventory().hasItems()) {
return new OutOfStockState();
}
if (context.getCoinList().isEmpty()) {
return new IdleState();
}
// Transition to SelectionState if user starts product selection
if (context.getCurrentState() instanceof HasMoneyState) {
return new SelectionState();
}
return this;
}
}
```

‍

• Selection State : The Possible actions which can be performed in the Selection State can be : 

a. Choose the Product. 

b. Cancel Selected Product. 

c. Get Refund. 

Get Change after purchasing the product

‍

```java
// Implementation of the Selection state
public class SelectionState implements VendingMachineState {
public SelectionState() {
System.out.println("Vending machine is now in Selection State");
}

@Override
public String getStateName() {
return "SelectionState";
}

@Override
public VendingMachineState next(VendingMachineContext context) {
// If inventory has no items, transition to OutOfStock
if (!context.getInventory().hasItems()) {
return new OutOfStockState();
}	        
// If no money left, go back to idle
if (context.getCoinList().isEmpty()) {
return new IdleState();
}	        
// If an item has been selected, transition to dispense state
if (context.getSelectedItemCode() > 0) {
return new DispenseState();
}	       
// Otherwise, remain in Selection state
return this;
}
}
```

‍

• Dispense State : The Possible actions which can be performed in the Dispense State can only be of dispensing the product.

‍

```java
// Implementation of the Dispense state
public class DispenseState implements VendingMachineState {
public DispenseState() {
System.out.println("Vending machine is now in Dispense State");
}

@Override
public String getStateName() {
return "DispenseState";
}

@Override
public VendingMachineState next(VendingMachineContext context) {
// Dispense the selected product
return new IdleState();
}
}
```

‍

• OutOfStockState : The Possible actions which can be performed in the Out of Stock State can only be going to the idle state 

If the current selected item is out of stock.

‍

```java
// Implementation of the Out of Stock state
public class OutOfStockState implements VendingMachineState {
public OutOfStockState() {
System.out.println("Vending machine is now in Out of Stock State");
}

@Override
public String getStateName() {
return "OutOfStockState";
}

@Override
public VendingMachineState next(VendingMachineContext context) {
// If inventory has items again, return to idle state
if (context.getInventory().hasItems()) {
return new IdleState();
}

// Otherwise, remain in out of stock state
return this;
}
}
```

‍

3\. Main Method to Run the Vending Machine : 

‍

```java
public class Main {
// Main method to execute the vending machine operations
public static void main(String args[]) {
// Create a new vending machine context
VendingMachineContext vendingMachine = new VendingMachineContext();
try {
System.out.println("|");
System.out.println("Filling up the inventory");
System.out.println("|");
fillUpInventory(vendingMachine); // Fill up the inventory with items
displayInventory(vendingMachine); // Display the current inventory
System.out.println("|");
System.out.println("Inserting coins");
System.out.println("|");
// Insert coins using the context methods
vendingMachine.clickOnInsertCoinButton(Coin.TEN_RUPEES);
vendingMachine.clickOnInsertCoinButton(Coin.FIVE_RUPEES);
System.out.println("|");
System.out.println("Clicking on ProductSelectionButton");
System.out.println("|");
// Start product selection and choose a product
vendingMachine.clickOnStartProductSelectionButton(102);
// Display the updated inventory
displayInventory(vendingMachine);
} catch (Exception e) {
System.out.println("Error: " + e.getMessage());
displayInventory(vendingMachine);
}
}

// Method to fill up the inventory of the vending machine
private static void fillUpInventory(VendingMachineContext vendingMachine) {
for (int i = 0; i < 10; i++) {
Item newItem = new Item();
int codeNumber = 101 + i; // Shelf code
// Set item type and price based on the index range
if (i >= 0 && i < 3) {
newItem.setType(ItemType.COKE);
newItem.setPrice(12);
} else if (i >= 3 && i < 5) {
newItem.setType(ItemType.PEPSI);
newItem.setPrice(9);
} else if (i >= 5 && i < 7) {
newItem.setType(ItemType.JUICE);
newItem.setPrice(13);
} else if (i >= 7 && i < 10) {
newItem.setType(ItemType.SODA);
newItem.setPrice(7);
}
// Update the inventory with multiple same items per shelf
for (int j = 0; j < 5; j++) {
// Add 5 items to each shelf
vendingMachine.updateInventory(newItem, codeNumber);
}
}
}

// Method to display the current inventory of the vending machine
private static void displayInventory(VendingMachineContext vendingMachine) {
ItemShelf[] slots = vendingMachine.getInventory().getInventory();
for (ItemShelf slot : slots) {
List<Item> items = slot.getItems(); // Get the list of items in the shelf
if (!items.isEmpty()) {
System.out.println("CodeNumber: " + slot.getCode() + " Items: ");
for (Item item : items) { // Display all items in the shelf
System.out.println(
"    - Item: " + item.getType().name() + ", Price: " + item.getPrice());
}
System.out.println("SoldOut: " + slot.checkIsSoldOut());
} else {
// Display empty shelf information
System.out.println("CodeNumber: " + slot.getCode() + " Items: EMPTY"
+ " SoldOut: " + slot.checkIsSoldOut());
}
}
}
}
```

‍

Interviewer: Looks good. What makes your approach effective?

‍

Candidate: Here are the key strengths of my approach for the Vending Machine System:

‍

• State Pattern Implementation: I've implemented the State pattern to model the vending machine's different states (Idle, HasMoney, Selection, Dispense). This allows the machine to behave differently based on its current state while encapsulating state-specific behavior in separate classes.

‍

• Single Responsibility Principle: Each class has a clear, focused responsibility. The Item class represents products, ItemShelf manages individual slots, Inventory handles the collection of items, and the VendingMachine orchestrates the overall operation.

‍

• Extensibility: The design easily accommodates new product types through the ItemType enum, and the state pattern allows for introducing new states or behaviors without modifying existing code.

‍

• Maintainability: The clean separation of concerns makes the code easy to maintain and modify. For example, changing the payment processing logic would only affect specific methods in relevant state classes.

‍

• Real-world Modeling: The implementation accurately models the behavior of an actual vending machine with its natural workflow from idle to money collection, product selection, and dispensing.

‍

Extensibility : 

1.) Addition of New Payment Methods Using Strategy pattern : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743830476162-Frame-245-\(10\).png)

‍

To efficiently incorporate different payment methods for Vending Machine, we can utilize the Strategy pattern for User Payments. let's define the Strategy interfaces and their corresponding concrete strategies.

‍

Here's how we can achieve this extension in our current code : 

‍

• Define the Payment Strategy interface : 

PaymentStrategy.java :

‍

```java
// Payment strategy interface
public interface PaymentStrategy {
boolean processPayment(double amount);
}
```

‍

• Implement Concrete Payment Strategies : 

CoinPaymentStrategy.java : 

‍

```java
// Coin payment strategy implementation
public class CoinPaymentStrategy implements PaymentStrategy {
private List<Coin> coins;
public CoinPaymentStrategy(List<Coin> coins) {
this.coins = coins;
}

@Override
public boolean processPayment(double amount) {
int total = 0;
for (Coin coin : coins) {
total += coin.value;
}
return total >= amount;
}
}
```

‍

• CardPaymentStrategy.java : 

‍

```java
// Card payment strategy implementation
public class CardPaymentStrategy implements PaymentStrategy {
private String cardNumber;
private String expiryDate;
private String cvv;
public CardPaymentStrategy(String cardNumber, String expiryDate, String cvv) {
this.cardNumber = cardNumber;
this.expiryDate = expiryDate;
this.cvv = cvv;
}

@Override
public boolean processPayment(double amount) {
// Simulate card payment processing (replace with actual logic)
System.out.println("Processing card payment of " + amount + " using card " + cardNumber);
// In real-world, integrate with a payment gateway here.
// For simulation, always return true for simplicity.
return true;
}
}
```

‍

• Modify Vending Machine Context Class to Accommodate Payment Strategy : 

VendingMachineContext.java : 

‍

```java
public class VendingMachineContext {
// ... other fields ...
private PaymentStrategy paymentStrategy; // Added payment strategy

// ... other methods ...

public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
this.paymentStrategy = paymentStrategy;
}

public boolean processPayment(double amount) {
if (paymentStrategy == null) {
System.out.println("No payment strategy set.");
return false;
}
return paymentStrategy.processPayment(amount);
}

public void clickOnInsertCoinButton(Coin coin) {
if (currentState instanceof IdleState || currentState instanceof HasMoneyState) {
System.out.println("Inserted " + coin.name() + " worth " + coin.value);
coinList.add(coin);
advanceState();
} else {
System.out.println("Cannot insert coin in " + currentState.getStateName());
}
}

public void clickOnCardPaymentButton(String cardNumber, String expiryDate, String cvv) {
if (currentState instanceof IdleState || currentState instanceof HasMoneyState) {
System.out.println("Starting card payment process.");
setPaymentStrategy(
new CardPaymentStrategy(cardNumber, expiryDate, cvv)); // Set the card payment strategy
advanceState();
} else {
System.out.println("Cannot start card payment in " + currentState.getStateName());
}
}

// Dispenses the selected item
public void dispenseItem(int codeNumber, double amount) {
try {
// can also be taken as user input
setPaymentStrategy(new CoinPaymentStrategy(coinList)); // Set the coin payment strategy
processPayment(amount) inventory.removeItem(codeNumber); // Remove item from inventory
advanceState(); // Move to the next state
} catch (Exception e) {
System.out.println("Failed to Dispense the Product with code : " + codeNumber);
}
}

public int getBalance() {
if (paymentStrategy instanceof CoinPaymentStrategy) {
int balance = 0;
for (Coin coin : coinList) {
balance += coin.value;
}
return balance;
}
return 0;
}

public void resetBalance() {
coinList.clear();
paymentStrategy = null;
}

// ... other methods ...
}
```

‍

• Update the Dispense State Class:

Modify the Dispense State Class to use the Payment Strategy.

‍

```java
// modified dispense state next method including the paymentStrategy
public VendingMachineState next(VendingMachineContext context) {
// ...
try {
// ...
context.resetBalance();
context.resetSelection();
context.setPaymentStrategy(null); // Reset payment strategy
return new IdleState();
} catch (Exception e) {
// ...
context.refundMoney();
context.setPaymentStrategy(null); // Reset payment strategy
return new IdleState();
}
}
```

‍

• Modify The Client Code to include the Payment Strategies : 

‍

```java
import java.util.Scanner;

public class Main {
public static void main(String args[]) {
VendingMachineContext vendingMachine = new VendingMachineContext();
try {
System.out.println("|");
System.out.println("Filling up the inventory");
System.out.println("|");
fillUpInventory(vendingMachine);
displayInventory(vendingMachine);
System.out.println("|");
System.out.println("Select Payment Method:");
System.out.println("1. Coin Payment");
System.out.println("2. Card Payment");
System.out.print("Enter your choice: ");
Scanner scanner = new Scanner(System.in);
int paymentChoice = scanner.nextInt();
scanner.nextLine(); // Consume the newline character
switch (paymentChoice) {
case 1:
System.out.println("Inserting coins");
vendingMachine.clickOnInsertCoinButton(Coin.TEN_RUPEES);
vendingMachine.clickOnInsertCoinButton(Coin.FIVE_RUPEES);
break;
case 2:
System.out.println("Making card payment");
System.out.print("Enter card number: ");
String cardNumber = scanner.nextLine();
System.out.print("Enter expiry date (MM/YY): ");
String expiryDate = scanner.nextLine();
System.out.print("Enter CVV: ");
String cvv = scanner.nextLine();
vendingMachine.clickOnCardPaymentButton(cardNumber, expiryDate, cvv);
break;
default:
System.out.println("Invalid payment choice.");
return;
}
System.out.println("|");
System.out.println("Clicking on ProductSelectionButton");
System.out.println("|");
vendingMachine.clickOnStartProductSelectionButton(102);
displayInventory(vendingMachine);
scanner.close();
} catch (Exception e) {
System.out.println("Error: " + e.getMessage());
displayInventory(vendingMachine);
}
}

// ... (fillUpInventory and displayInventory methods remain the same) ...
}
```

‍

This demonstrates how the Strategy Pattern can be implemented to extend the design for multiple payment strategies.

‍

## ✨Conclusion : 

This low-level design for the Vending Machine System demonstrates a well-structured, scalable, and extensible architecture. It emphasizes modularity by clearly defining components such as Item, Inventory, and VendingMachine. The design supports a range of enhancements, including the addition of new payment options, ensuring the system remains maintainable and flexible. These extensibility points make the system adaptable to future requirements and evolving business needs.  

‍

In an interview setting, presenting this design showcases your ability to craft robust and versatile solutions, underscoring your expertise in applying design patterns, best practices, and thoughtful architecture to real-world scenarios.

---
