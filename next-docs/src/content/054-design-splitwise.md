---
title: "Design Splitwise"
type: lld
order: 54
---

# Design Splitwise

Topic Tags:

system designlld

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

## ‍

## Low-Level Design: Splitwise Expense Sharing System 💰

A Splitwise-like expense sharing system is designed to efficiently track shared expenses among a group of people, calculate balances, and determine the minimum number of transactions needed to settle all debts. The system needs to handle multiple users, various expense types, and provide an optimal solution for debt settlement. The system should be reliable, maintainable, and provide an intuitive interface for expense management and balance calculation.

‍

## Rules of the System:

Setup:

• The system maintains a record of users and their associated transactions.

• Expenses can be split in various ways: equally, percentage-based, or custom amounts.

• The system tracks who owes whom and how much.

‍

Operation:

• Users can add expenses, specifying payers, participants, and split methods.

• The system calculates balances between users after each transaction.

• Users can view their total balance, as well as detailed balances with specific users.

• The system provides a simplified settlement plan with minimal transactions.

‍

Features:

• The system optimizes debt settlement to minimize the number of transactions.

• Transaction history is maintained for auditing purposes.

‍

## Interview Setting 🤝

### Point 1: Introduction and Vague Problem Statement:

Interviewer: Let's start with a basic problem statement. Design a Splitwise-like expense sharing system.

‍

Candidate: I understand that we need to design a system similar to Splitwise, which helps groups of people track shared expenses and settle accounts.

Here's my high-level understanding:

• Users can record expenses where one person pays and multiple people owe that person.

• The system tracks balances between users, calculating who owes whom.

• The system should provide an optimal way to settle all debts with minimal transactions.

• Users should be able to view their total balance and balances with specific users.

Is this aligned with your expectations?

‍

Interviewer: Yes, that's correct. Please proceed with your approach.

Candidate: Before diving into the design, I'd like to clarify a few requirements:

• What types of expense splits should we support?

• How should the system handle multi-person debt settlement?

• What kinds of operations do we need to prioritize?

‍

### Point 2: Clarifying Requirements:

Interviewer: We want a system that:

• Supports basic equal splits for now, but should be extensible to other split types.

• Calculates the minimum number of transactions to settle all debts.

• Handles tracking of expenses and balances efficiently.

‍

Candidate: To summarize, the key requirements are:

• A system that tracks expenses and participants.

• Support for equal splits initially, with extensibility for other split types.

• Balance calculation between users.

• An algorithm to minimize the number of transactions for settling debts.

• User interface for adding expenses and viewing balances.

‍

Interviewer: Perfect, let's proceed.

‍

### Point 3: Identifying Key Components:

Candidate: Now that we have the requirements, let's identify the key components of our Splitwise system:

• User: Represents a user in the system with a unique identifier.

• Expense: Contains details about who paid, how much, and how it's split.

• Split: Interface for different split types (equal, percentage, etc.).

• Group: Optional component for organizing expenses among specific sets of users.

• Balance Sheet: Tracks who owes whom and calculates simplified settlements.

• Transaction: Represents a payment between users for settling debts.

‍

Interviewer: That sounds good. Let's proceed with the design details.

‍

### Point 4: Design Challenges:

Interviewer: What design challenges do you anticipate?

‍

Candidate: The key challenges for the Splitwise system include:

• Balance Management: Efficiently tracking balances between multiple users.

• Optimization Problem: Finding the minimum number of transactions to settle all debts.

• Split Type Extensibility: Designing a flexible system for different split types like equal, unequal and percentage based splits.

• Transaction Management: Handling the creation and tracking of transactions.

• Data Consistency: Ensuring balance calculations are correct and consistent.

‍

### Point 5: Approach:

Interviewer: How would you approach these challenges?

‍

Candidate: I propose using design patterns effectively. Here are my strategies:

1\. Factory Pattern for Split Types:

○ Centralizes split type creation logic.

○ Allows for easy addition of new split types (equal, percentage, exact).

○ Keeps split type creation separate from expense management.

‍

2\. Observer Pattern for Balance Updates:

○ Notifies appropriate components when new expenses are added.

○ Ensures balance calculations stay up-to-date.

○ Decouples expense creation from balance calculation.

‍

Interviewer: That sounds like a solid approach. Let's delve into the implementation details.

‍

### Point 6: Implementation:

Interviewer: Ready to discuss implementation?

‍

Candidate: Yes. I'll focus on implementing the design patterns we discussed and show how they work together in the Splitwise system:

‍

### Splitwise Design with Design Patterns : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744092867857-Frame-246-\(6\).png)

‍

1.) Implement Core Classes : 

User Class : 

‍

```java
/**
- Represents a user in the system.
*/
oublic class User {
private String id;       // Unique identifier for the user
private String name;     // Name of the user
private String email;    // Email address of the user

// Constructor to initialize User attributes
public User(String id, String name, String email) {
this.id = id;
this.name = name;
this.email = email;
}

// Getters for the user's attributes
public String getId() { return id; }
public String getName() { return name; }
public String getEmail() { return email; }

// Override equals() to compare users by ID
@Override
public boolean equals(Object o) {
if (this == o) return true;
if (!(o instanceof User)) return false;
User user = (User) o;
return id.equals(user.id);
}

// Override hashCode() to generate hash based on user ID
@Override
public int hashCode() {
return Objects.hash(id);
}
}
```

‍

• Expense Class : 

‍

```java
/**
- Represents an expense shared between users.
*/
public class Expense {
private String id;                     // id of the expense
private String description;           // Description of the expense
private double amount;                // Total amount of the expense
private User payer;                   // User who paid the expense
private List<User> participants;      // List of users sharing the expense
private Map<User, Double> shares;     // Split amounts owed by each participant

// Constructor to initialize Expense attributes
public Expense(String id, String description, double amount, User payer, List<User> participants, Map<User, Double> shares) {
this.id = id;
this.description = description;
this.amount = amount;
this.payer = payer;
this.participants = participants;
this.shares = shares;
}

// Getters for the expense attributes
public String getId() { return id; }
public String getDescription() { return description; }
public double getAmount() { return amount; }
public User getPayer() { return payer; }
public List<User> getParticipants() { return participants; }
public Map<User, Double> getShares() { return shares; }
}
```

‍

• Transaction Class : 

‍‍

```java
/**
- Represents a financial transaction between two users.
*/
public class Transaction {
private User from;        // User who owes the money
private User to;          // User who is owed the money
private double amount;    // Transaction amount

// Constructor to initialize Transaction attributes
public Transaction(User from, User to, double amount) {
this.from = from;
this.to = to;
this.amount = amount;
}

// Getters for the transaction attributes
public User getFrom() { return from; }
public User getTo() { return to; }
public double getAmount() { return amount; }
}
```

‍

• User Pair Class : 

```java
public class UserPair {
private User user1;
private User user2;
public UserPair(User user1, User user2){
this.user1 = user1;
this.user2 = user2;
}
public User getUser1(){
return user1;
}
public User getUser2(){
return user2;
}
}
```

‍‍

2.) Factory Pattern for Different Split Types : 

Split Interface : 

‍

```java
// Interface defining the behavior for all types of splits
interface Split {
/**
- Calculates the split for the given amount among participants based on specific split details.
- 
- @param amount        The total amount to split.
- @param participants  The list of users participating in the split.
- @param splitDetails  Additional details required for the specific split type.
- @return A map where the key is the User and the value is the amount they owe.
*/
Map<User, Double> calculateSplit(double amount, List<User> participants, Map<String, Object> splitDetails);
}
```

‍

• Concrete Split Classes : 

Equal Split : 

‍

```java
// Implementation of the Split interface for equal split
public class EqualSplit implements Split {
@Override
public Map<User, Double> calculateSplit(double amount, List<User> participants, Map<String, Object> splitDetails) {
double amountPerPerson = amount / participants.size(); // Divide the amount equally among all participants
Map<User, Double> splits = new HashMap<>(); // Map to hold the calculated split
for (User user : participants) {
splits.put(user, amountPerPerson); // Assign each participant the equal amount
}
return splits;
}
}
```

‍

• Percentage Split : 

‍

```java
// Implementation of the Split interface for percentage-based split
public class PercentageSplit implements Split {
@Override
public Map<User, Double> calculateSplit(double amount, List<User> participants, Map<String, Object> splitDetails) {
// Retrieve the percentage allocation for each participant from the split details
Map<User, Double> percentages = (Map<User, Double>) splitDetails.get("percentages");
Map<User, Double> splits = new HashMap<>(); // Map to hold the calculated split


for (User user : participants) {
double percentage = percentages.getOrDefault(user, 0.0); // Get the percentage for the user
splits.put(user, amount * percentage / 100.0); // Calculate the share based on the percentage
}
return splits;
}
}
```

‍

• Split Factory :

‍

```java
// Factory class for creating instances of different Split types
public class SplitFactory {
/**
- Factory method to create a Split instance based on the specified split type.
- 	     - @param splitType The type of split to create ("EQUAL", "PERCENTAGE", "EXACT").
- @return An instance of the corresponding Split implementation.
- @throws IllegalArgumentException if the split type is unknown.
*/
public static Split createSplit(String splitType) {
switch (splitType) {
case "EQUAL":
return new EqualSplit(); // Return an EqualSplit instance
case "PERCENTAGE":
return new PercentageSplit(); // Return a PercentageSplit instance
default:
// Throw an exception if the split type is invalid
throw new IllegalArgumentException("Unknown split type: " + splitType);
}
}
}
```

‍

3.) Observer Pattern for Balance Updates (Not a core part of the Problem): 

Observer Interface : 

‍

```java
// Interface for observers that need to be notified of expense updates.
interface ExpenseObserver {
// Called when a new expense is added to the system.
void onExpenseAdded(Expense expense);

// Called when an expense is updated in the system.
void onExpenseUpdated(Expense expense);
}
```

‍

• Interface for Observable Objects : 

‍

```java
// Interface for objects that can be observed for expense updates.
interface ExpenseSubject {
// Adds an observer to the notification list.
void addObserver(ExpenseObserver observer);

// Removes an observer from the notification list.
void removeObserver(ExpenseObserver observer);

// Notifies all observers about a new expense.
void notifyExpenseAdded(Expense expense);

// Notifies all observers about an updated expense.
void notifyExpenseUpdated(Expense expense);
}
```

‍

• Concrete Implementation of Expense Subject : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744093312100-Frame-246-\(7\).png)

‍

```java
// Concrete implementation of ExpenseSubject that manages expense notifications.
public class ExpenseManager implements ExpenseSubject {
private List<ExpenseObserver> observers = new ArrayList<>();
private List<Expense> expenses = new ArrayList<>();

@Override
public void addObserver(ExpenseObserver observer) {
observers.add(observer);
}

@Override
public void removeObserver(ExpenseObserver observer) {
observers.remove(observer);
}

@Override
public void notifyExpenseAdded(Expense expense) {
for (ExpenseObserver observer : observers) observer.onExpenseAdded(expense);
}

@Override
public void notifyExpenseUpdated(Expense expense) {
for (ExpenseObserver observer : observers) observer.onExpenseUpdated(expense);
}

// Adds a new expense to the system and notifies observers.
public void addExpense(Expense expense) {
expenses.add(expense);
notifyExpenseAdded(expense);
}

// Updates an existing expense and notifies observers.
public void updateExpense(Expense expense) {
// Find and replace the expense with the same ID in the list
for (int i = 0; i < expenses.size(); i++) {
if (expenses.get(i).getId().equals(expense.getId())) { // Check if the IDs match
expenses.set(i, expense); // Replace the old expense with the updated one
notifyExpenseUpdated(expense); // Notify all observers about the update
return; // Exit the method after updating
}
}
// Throw an exception if the expense with the given ID is not found
throw new IllegalArgumentException("Expense with ID " + expense.getId() + " not found.");
}

// Retrieves all expenses in the system.
public List<Expense> getAllExpenses() {
return new ArrayList<>(expenses);
}
}
```

‍

4.) Balance Sheet Algorithm :

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744093519101-Frame-246-\(8\).png)

‍

```java
/**
- Balance sheet that observes expenses and calculates balances.
*/
public class BalanceSheet implements ExpenseObserver {
// Stores the net balance between pairs of users
private Map<UserPair, Double> balances = new HashMap<>();

@Override
public void onExpenseAdded(Expense expense) {
// Update balances when a new expense is added
updateBalances(expense);
}

@Override
public void onExpenseUpdated(Expense expense) {
// To simplify logic, just update balances without reversing the previous state
updateBalances(expense);
}

/**
- Updates the balances based on a new or updated expense.
- Each participant's share is added to their balance with the payer.
-    - @param expense The expense to process.
*/
private void updateBalances(Expense expense) {
User payer = expense.getPayer(); // User who paid for the expense
Map<User, Double> shares = expense.getShares(); // Participants and their shares
for (Map.Entry<User, Double> entry : shares.entrySet()) {
User participant = entry.getKey(); // A participant in the expense
Double amount = entry.getValue(); // The amount owed by the participant
if (!participant.equals(payer)) {
// Create a unique pair for the payer and participant
UserPair userPair = new UserPair(participant, payer);
// Update the balance (add the amount owed by the participant)
Double currentBalance = balances.getOrDefault(userPair, 0.0);
balances.put(userPair, currentBalance + amount);
}
}
}

/**
- Gets the net balance between two users.
-    - @param user1 First user.
- @param user2 Second user.
- @return The amount user1 owes user2 (negative if user2 owes user1).
*/
public double getBalance(User user1, User user2) {
// Represent the balance both ways (user1 -> user2 and user2 -> user1)
UserPair pair1 = new UserPair(user1, user2);
UserPair pair2 = new UserPair(user2, user1);
// Retrieve balances in both directions and calculate the net
double balance1 = balances.getOrDefault(pair1, 0.0);
double balance2 = balances.getOrDefault(pair2, 0.0);
return balance1 - balance2;
}

/**
- Calculates the total balance for a single user.
- The balance is negative if the user owes money and positive if they are owed money.
-    - @param user The user to calculate the balance for.
- @return The total balance for the user.
*/
public double getTotalBalance(User user) {
double total = 0.0
// Iterate through all user pairs and calculate the total
for (Map.Entry<UserPair, Double> entry : balances.entrySet()) {
UserPair pair = entry.getKey();
double amount = entry.getValue();
if (pair.getUser1().equals(user)) {
total -= amount; // Money owed by the user (He has to give money)
} else if (pair.getUser2().equals(user)) {
total += amount; // Money owed to the user (He has to take money)
}
}
return total;
}

/**
- Simplifies the balances into a list of transactions to settle all debts.
- Simple and Straightforward implementation of the problem
- @return List of transactions needed to settle all debts.
*/
public List<Transaction> getSimplifiedSettlements() {
// Step 1: Calculate net balances for each user
Map<User, Double> netBalances = new HashMap<>();
for (Map.Entry<UserPair, Double> entry : balances.entrySet()) {
UserPair pair = entry.getKey();
double amount = entry.getValue();

User debtor = pair.getUser1(); // User who owes money (Who has to pay)
User creditor = pair.getUser2(); // User who is owed money (Who gets the money)
// Update the net balances for debtor and creditor
netBalances.put(debtor, netBalances.getOrDefault(debtor, 0.0) - amount);
netBalances.put(creditor, netBalances.getOrDefault(creditor, 0.0) + amount);
}

// Step 2: Separate users into debtors and creditors
List<User> debtors = new ArrayList<>();
List<User> creditors = new ArrayList<>();
for (Map.Entry<User, Double> entry : netBalances.entrySet()) {
User user = entry.getKey();
double balance = entry.getValue();
if (balance < 0) {
debtors.add(user); // Users who owe money (Who has to pay)
} else if (balance > 0) {
creditors.add(user); // Users who are owed money (Who gets the money back)
}
}

// Step 3: Match debtors and creditors to create transactions
List<Transaction> transactions = new ArrayList<>();
int debtorIndex = 0;
int creditorIndex = 0;

while (debtorIndex < debtors.size() && creditorIndex < creditors.size()) {
User debtor = debtors.get(debtorIndex);
User creditor = creditors.get(creditorIndex);
double debtorBalance = netBalances.get(debtor);
double creditorBalance = netBalances.get(creditor);

// Determine the transfer amount as the smaller of the two balances
double transferAmount = Math.min(Math.abs(debtorBalance), creditorBalance);

// Create a transaction for the transfer amount
transactions.add(new Transaction(debtor, creditor, transferAmount));

// Update net balances after the transaction
netBalances.put(debtor, debtorBalance + transferAmount);
netBalances.put(creditor, creditorBalance - transferAmount);

// Move to the next debtor or creditor if their balance is settled
if (Math.abs(netBalances.get(debtor)) < 0.001) {
debtorIndex++;
}
if (Math.abs(netBalances.get(creditor)) < 0.001) {
creditorIndex++;
}
}
return transactions;
}

/**
- Calculates the minimum number of transactions needed to settle all balances.
- Uses backtracking approach to find the solution.
-    - @return minimum count needed to settle all debts.
*/
public int getSubOptimalMinimumSettlements() {
// Step 1: Calculate net balances for each user
Map<User, Double> netBalances = new HashMap<>();
for (Map.Entry<UserPair, Double> entry : balances.entrySet()) {
UserPair pair = entry.getKey();
double amount = entry.getValue();
User debtor = pair.getUser1(); // The user who owes money
User creditor = pair.getUser2(); // The user who is owed money

// Update the net balance of each user
netBalances.put(debtor, netBalances.getOrDefault(debtor, 0.0) - amount);
netBalances.put(creditor, netBalances.getOrDefault(creditor, 0.0) + amount);
}
List<Double> creditList = new ArrayList<>();
for (Map.Entry<User, Double> entry : netBalances.entrySet()) {
if (Math.abs(entry.getValue()) > 0.001) { // Ignore near-zero balances
allUsers.add(entry.getKey()); // Store the user
creditList.add(entry.getValue()); // Store the net balance
}
}
int n = creditList.size(); // Total number of users with non-zero balance
return subOptimalDfs(0, creditList, n); // Call DFS to compute the minimum transactions
}

/**
- Recursively finds the minimum number of transactions required to settle debts.
- Uses a greedy approach by settling the current user's balance with future users.
-    - @param currentUserIndex Index of the user whose balance needs to be settled.
- @param creditList List of net balances for all users.
- @param n Number of users with non-zero balances.
- @return Minimum transactions required to settle all debts.
*/
private int subOptimalDfs(int currentUserIndex, List<Double> creditList, int n) {
// Skip already settled users (those with zero balance)
while (currentUserIndex < n && creditList.get(currentUserIndex) == 0) {
currentUserIndex++;
}

// Base case: If all users have zero balance, no further transactions are needed
if (currentUserIndex == n)
return 0;
int cost = Integer.MAX_VALUE; // Variable to track the minimum number of transactions
// Try to settle currentUserBalance with a future user having an opposite balance
for (int nextIndex = currentUserIndex + 1; nextIndex < n; nextIndex++) {
// Ensure we only settle debts between users with opposite balances
if (creditList.get(nextIndex) * creditList.get(currentUserIndex) < 0) {
// Transfer current user's balance to the next valid user
creditList.set(nextIndex, creditList.get(nextIndex) + creditList.get(currentUserIndex));
// Recursively settle the remaining balances
cost = Math.min(cost, 1 + subOptimalDfs(currentUserIndex + 1, creditList, n));

// Backtrack: Undo the transaction to explore other possibilities
creditList.set(nextIndex, creditList.get(nextIndex) - creditList.get(currentUserIndex));
}
}
return cost; // Return the minimum transactions required
}
```

‍

### Complexity Analysis of Backtracking Approach : 

Let n be the length of transactions.

‍

> Time complexity: O((n−1)!) :

‍

• In dfs(0), there exists a maximum of n−1 persons as possible nxt, each of which leads to a recursive call to dfs(1). Therefore, we have

```
dfs(0)=(n−1)⋅dfs(1)=(n−1)⋅((n−2)⋅dfs(2))=(n−1)⋅(n−2)⋅((n−3)⋅dfs(3))=...=(n−1)!⋅dfs(n−1)
```

• dfs(n - 1) can be determined in O(1) time.

‍

> Space complexity: O(n) :

‍

• Both balance\_map and balance\_list possess at most n net balances.

‍

• The space complexity of a recursive call relies on the maximum depth of the recursive call stack, which is equal to n. As each recursive call increments cur by 1, and each level consumes a constant amount of space.

‍

### Dynamic Programming Approach : 

Imagine there are 8 people in which we can make 4 groups of size 2 each, which will have a sum of 0. I.e Each group will have a 

Sum of 0, then we only need 4 transactions thus what it ultimately means is that In General, If we divide n people into m groups 

Whose balance sum is 0, then it only takes n – m transactions. Each group we create saves us one transaction.

‍

1.) Let's take an example of 8 People divided in 4 groups each of size 2 : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744170072751-Frame-248-\(1\).png)

‍

For the above Example, Since the Number of people are 8 and the number of groups is 4, based on our algorithm, 

The Minimum number of transactions required to complete the settlement will be 8 – 4 which is 4 transactions.

‍

2.) Let's take another example of 8 People divided in 3 groups of size 3,3,2 :

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744170086671-Frame-249.png)

‍

In this case, Since the Number of people are 8 and the number of groups is 3, based on our algorithm, 

The Minimum number of transactions required to complete the settlement will be 8 – 3 which is 5 transactions.

```
/**
	     - Calculates the minimum number of transactions needed to settle all balances.
	     - Uses dynamic programming to find the optimal solution.
	     - 
	     - @return minimum count needed to settle all debts.
	     */
```

‍

Let's Showcase the example of 8 People and 3 Groups here for better understanding : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744094021940-Frame-246-\(9\).png)

‍

Consider a scenario where we have N = 8 ndividuals divided into M = 3 groups. Let the sizes of these groups be Z₁, Z₂, and Z₃, representing the number of people in each group. Thus, the total number of people can be expressed as:

```
Z₁ + Z₂ + Z₃ = N
```

To settle transactions within each group efficiently, the number of required transactions per group follows the pattern Z(group\_number) - 1. This is because each individual can settle with another person, who then continues the process until all members in the group are accounted for.

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744094094147-Frame-246-\(10\).png)

Total Number of Transactions : 

The total number of transactions required across all groups is calculated as:

```
(Z1−1)+(Z2−1)+(Z3−1)
```

Rearranging the equation:

```
(Z1+Z2+Z3)−(1+1+1)=N−M
```

Thus, the total number of transactions required for complete settlement among N individuals divided into M groups is:

```
N−M
```

‍

1.) Map Balances to Net Balances : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744170146985-Frame-249-\(1\).png)

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744170200092-Frame-248-\(2\).png)

‍

2.) Credit List and bitmask Representation : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744170275935-Frame-249-\(2\).png)

‍

3.) Finding the Optimal Number of Transactions :  

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744170404385-Frame-249-\(3\).png)

‍

```java
public int getOptimalMinimumSettlements() {
// Step 1: Calculate net balances for each user
Map<User, Double> netBalances = new HashMap<>();
for (Map.Entry<UserPair, Double> entry : balances.entrySet()) {
UserPair pair = entry.getKey();
double amount = entry.getValue();
User debtor = pair.getUser1(); // The user who owes money
User creditor = pair.getUser2(); // The user who is owed money
// Update the net balance of each user
netBalances.put(debtor, netBalances.getOrDefault(debtor, 0.0) - amount);
netBalances.put(creditor, netBalances.getOrDefault(creditor, 0.0) + amount);
}
List<Double> creditList = new ArrayList<>();


for (Map.Entry<User, Double> entry : netBalances.entrySet()) {
if (Math.abs(entry.getValue()) > 0.001) { // Ignore near-zero balances
creditList.add(entry.getValue()); // Store the net balance
}
}
// Step 3: Apply Dynamic Programming to find the minimum transactions required
int n = creditList.size(); // Number of users with non-zero balance
int[] dp = new int[1 << n]; // DP array for memoization
Arrays.fill(dp, -1);
dp[0] = 0; // Base case: No users left means zero transactions


// Find the maximum number of fully settled subgroups using DFS + DP
int maxSubGroups = dfs((1 << n) - 1, dp, creditList);

// Minimum transactions needed = Total users - Maximum fully settled groups
return n - maxSubGroups;
}
/**
- Helper method to calculate the sum of balances in a subset, given by a bitmask.
- 
- @param values The list of credit balances.
- @param mask The bitmask representing a subset of users.
- @return The sum of balances in the subset.
*/
private double sumOfMask(List<Double> values, int mask) {
double sum = 0;
for (int i = 0; i < values.size(); i++) {
if ((mask & (1 << i)) != 0) { // Check if the i-th bit is set in the mask
sum += values.get(i); // Add the corresponding balance to the sum
}
}
return sum;
}
/**
- DFS with memoization to determine the maximum number of balanced subgroups.
- 
- @param mask Bitmask representing the remaining users.
- @param dp Memoization array for storing computed results.
- @param creditList List of net balances for each user.
- @return The maximum number of fully settled subgroups.
*/
private int dfs(int mask, int[] dp, List<Double> creditList) {
if (mask == 0) // Base case: No users left to process
return 0;
if (dp[mask] != -1) // Return cached result if already computed
return dp[mask];
int maxSubGroups = 0;
int n = creditList.size();
// Try all possible subsets (submasks) of the current mask
for (int submask = 1; submask < (1 << n); submask++) {
// Check if submask is a subset of mask and sums to zero (i.e., can be settled)
if ((submask & mask) == submask && Math.abs(sumOfMask(creditList, submask)) < 0.001) {
// If a subset can be settled, find the remaining subgroups recursively
maxSubGroups = Math.max(maxSubGroups, 1 + dfs(mask ^ submask, dp, creditList));
}
}
dp[mask] = maxSubGroups; // Store result in memoization table
return maxSubGroups;
}
}
```

‍

### Complexity Analysis of the DP Approach : 

Let n be the length of transactions.

‍

> Time complexity: O(n⋅2^n) :

‍

• We build memo, an array of size O(2^n) as memory, equal to the number of possible states. Each state is computed with a traverse through balance\_list, which takes O(n) time.

‍

> Space complexity: O(2^n) :

‍

• The length of memo is 2^n.

‍

• The space complexity of a recursive call depends on the maximum depth of the recursive call stack, which is n. As each recursive call removes one set bit from total\_mask. Therefore, at most O(n) levels of recursion will be created, and each level consumes a constant amount of space.

‍

 5.) Client Code to run the Algorithm :

‍

```java
// Main class to demonstrate the system
public class SplitwiseSystem {
public static void main(String[] args) {
// Create users
User alice = new User("u1", "Alice", "alice@example.com");
User bob = new User("u2", "Bob", "bob@example.com");
User charlie = new User("u3", "Charlie", "charlie@example.com");

// Create expense manager and balance sheet
ExpenseManager expenseManager = new ExpenseManager();
BalanceSheet balanceSheet = new BalanceSheet();

// Register the balance sheet as an observer
expenseManager.addObserver(balanceSheet);

// Create and add users to a list for expenses
List<User> participants = new ArrayList<>();
participants.add(alice);
participants.add(bob);
participants.add(charlie);

// Alice pays for dinner - Create an equal split expense
Split equalSplit = SplitFactory.createSplit("EQUAL");
Map<String, Object> splitDetails = new HashMap<>();
Map<User, Double> dinnerShares = equalSplit.calculateSplit(60.0, participants, splitDetails);

Expense dinnerExpense = new Expense("e1", "Dinner", 60.0, alice, participants, dinnerShares);

// Add the expense to the expense manager which will notify observers
expenseManager.addExpense(dinnerExpense);

// Bob pays for movie tickets - Create a percentage split expense
Map<String, Object> percentageSplitDetails = new HashMap<>();
Map<User, Double> percentages = new HashMap<>();
percentages.put(alice, 40.0);
percentages.put(bob, 30.0);
percentages.put(charlie, 30.0);
percentageSplitDetails.put("percentages", percentages);

Split percentageSplit = SplitFactory.createSplit("PERCENTAGE");
Map<User, Double> movieShares = percentageSplit.calculateSplit(45.0, participants, percentageSplitDetails);

Expense movieExpense = new Expense("e2", "Movie", 45.0, bob, participants, movieShares);

// Add the movie expense to the expense manager
expenseManager.addExpense(movieExpense);

// Get individual balances
System.out.println("Individual balances:");
System.out.println("Alice's total balance: $" + balanceSheet.getTotalBalance(alice));
System.out.println("Bob's total balance: $" + balanceSheet.getTotalBalance(bob));
System.out.println("Charlie's total balance: $" + balanceSheet.getTotalBalance(charlie));

// Print specific balances between users
System.out.println("
Pairwise balances:");
System.out.println("Alice and Bob: $" + balanceSheet.getBalance(alice, bob));
System.out.println("Alice and Charlie: $" + balanceSheet.getBalance(alice, charlie));
System.out.println("Bob and Charlie: $" + balanceSheet.getBalance(bob, charlie));

// Get the simplified settlements
List<Transaction> settlements = balanceSheet.getSimplifiedSettlements();

// Display optimal minimum settlements (DP algorithm)
System.out.println("
=== OPTIMAL MINIMUM SETTLEMENTS ===");
int optimalSettlements = balanceSheet.getOptimalMinimumSettlements();
System.out.println(optimalSettlements);

// Print the settlements
System.out.println("
Simplified settlements:");
for (Transaction transaction : settlements) {
System.out.println(transaction.getFrom().getName() + " pays " + 
transaction.getTo().getName() + " $" + 
transaction.getAmount());
}
}
}
```

‍

Interviewer: Looks good. What makes your approach effective?

‍

Candidate: Here are the key strengths of my approach to the Splitwise solution:

• Extensibility: The design patterns I've used, particularly the Factory Pattern for split types, make it easy to add new ways of splitting expenses (like equal, percentage, and potentially custom splits) without modifying existing code.

‍

• Maintainability: By separating concerns into distinct components (users, expenses, splits, balances), the codebase remains organized and easy to understand, reducing technical debt over time.

‍

• Decoupling: The Observer Pattern ensures that components like the BalanceSheet stay updated without tight coupling to the ExpenseManager, making the system more robust to changes.

‍

• Optimized Settlements: The BalanceSheet algorithm efficiently calculates the minimum number of transactions needed to settle debts, simplifying the user experience considerably.

‍

Extensibility : 

1.) Addition of Group based Interfaces : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1744094356105-image.png)

‍

We can extend our solution to include support for Group based functionalities as well, where multiple users can create a group and share the expenses on to the group which can be split between the users of the group based on the type of split the group users want to achieve 

‍

Here are the steps to achieve the Same : 

‍

Create a New group Class : 

‍

```java
public class Group {
private String id;                 // Unique identifier for the group
private String name;               // Name of the group
private String description;        // Description of the group
private Set<User> members;         // Members of the group
private List<Expense> expenses;    // Expenses associated with the group

// Constructor to initialize Group attributes
public Group(String id, String name, String description) {
this.id = id;
this.name = name;
this.description = description;
this.members = new HashSet<>();
this.expenses = new ArrayList<>();
}

// Getters and setters
public String getId() { return id; }
public String getName() { return name; }
public String getDescription() { return description; }
public Set<User> getMembers() { return Collections.unmodifiableSet(members); }
public List<Expense> getExpenses() { return Collections.unmodifiableList(expenses); }

// Method to add a member to the group
public void addMember(User user) {
members.add(user);
}

// Method to remove a member from the group
public void removeMember(User user) {
members.remove(user);
}

// Method to add an expense to the group
public void addExpense(Expense expense) {
expenses.add(expense);
}

// Method to check if a user is a member of the group
public boolean isMember(User user) {
return members.contains(user);
}

// Override equals() to compare groups by ID
@Override
public boolean equals(Object o) {
if (this == o) return true;
if (!(o instanceof Group)) return false;
Group group = (Group) o;
return id.equals(group.id);
}

// Override hashCode() to generate hash based on group ID
@Override
public int hashCode() {
return Objects.hash(id);
}
}
‍

.) Modify The Expense Class : 

/**
- Modified Expense class to include group information
*/
public class Expense {
private String id;                     // id of the expense
private String description;           // Description of the expense
private double amount;                // Total amount of the expense
private User payer;                   // User who paid the expense
private List<User> participants;      // List of users sharing the expense
private Map<User, Double> shares;     // Split amounts owed by each participant
private Group group;                 // Group associated with the expense (can be null for non-group expenses)

// Constructor for group expenses
public Expense(String id, String description, double amount, User payer, 
List<User> participants, Map<User, Double> shares, Group group) {
this.id = id;
this.description = description;
this.amount = amount;
this.payer = payer;
this.participants = participants;
this.shares = shares;
this.group = group;
}

// Constructor for non-group expenses (compatibility with existing code)
public Expense(String id, String description, double amount, User payer, 
List<User> participants, Map<User, Double> shares) {
this(id, description, amount, payer, participants, shares, null);
}

// Getters for the expense attributes
public Group getGroup() { return group; }
public boolean isGroupExpense() { return group != null; }


// Rest code remains the same 
}
‍

\. Create a New Group Manager Class : 

public class GroupManager {
private Map<String, Group> groups;
private ExpenseManager expenseManager;
private BalanceSheet balanceSheet;

public GroupManager(ExpenseManager expenseManager, BalanceSheet balanceSheet) {
this.groups = new HashMap<>();
this.expenseManager = expenseManager;
this.balanceSheet = balanceSheet;
}

// Create a new group
public Group createGroup(String id, String name, String description) {
Group group = new Group(id, name, description);
groups.put(id, group);
return group;
}

// Add an expense to a group
public void addExpenseToGroup(Expense expense, Group group) {
// Validate that all participants are group members
for (User participant : expense.getParticipants()) {
if (!group.isMember(participant)) {
throw new IllegalArgumentException("User " + participant.getName() + " is not a member of group " + group.getName());
}
}

// Validate that the payer is a group member
if (!group.isMember(expense.getPayer())) {
throw new IllegalArgumentException("Payer " + expense.getPayer().getName() + " is not a member of group " + group.getName());
}

// Add the expense to both the group and the expense manager
group.addExpense(expense);
expenseManager.addExpense(expense);
}


// Getters and Setters
public Group getGroup(String id) {
return groups.get(id);
}

public Collection<Group> getAllGroups() {
return Collections.unmodifiableCollection(groups.values());
}


public List<Expense> getGroupExpenses(Group group) {
return group.getExpenses();
}

// Get balance between two users within a group
public double getGroupBalance(User user1, User user2, Group group) {
return balanceSheet.getGroupBalance(user1, user2, group.getId());
}

// Get total balance for a user within a group
public double getGroupTotalBalance(User user, Group group) {
return balanceSheet.getGroupTotalBalance(user, group.getId());
}

// Get all balances within a group
public Map<UserPair, Double> getGroupBalances(Group group) {
return balanceSheet.getGroupBalances(group.getId());
}

// Get simplified settlements for a group
public List<Transaction> getGroupSettlements(Group group) {
return balanceSheet.getGroupSimplifiedSettlements(group.getId());
}
}
```

‍

4\. Modify Balance Sheet Class to Accommodate group Logic : 

‍

```java
public class BalanceSheet implements ExpenseObserver {
// Stores the net balance between pairs of users
private Map<UserPair, Double> balances = new HashMap<>();

// Store group-specific balances
private Map<String, Map<UserPair, Double>> groupBalances = new HashMap<>();


@Override
public void onExpenseAdded(Expense expense) {
// Update balances when a new expense is added
updateBalances(expense);
}

@Override
public void onExpenseUpdated(Expense expense) {
// For simplicity, we just update the balances without trying to undo the previous state
updateBalances(expense);
}

/**
- Updates the balances based on a new or updated expense.
- If the expense belongs to a group, it also updates group-specific balances.
- 
- @param expense The expense to process.
*/
public void updateBalances(Expense expense) {
User payer = expense.getPayer();
Map<User, Double> shares = expense.getShares();

// Determine if this is a group expense
Group group = expense.getGroup();
String groupId = (group != null) ? group.getId() : null;

// Ensure the group's balance map exists if this is a group expense
if (groupId != null && !groupBalances.containsKey(groupId)) {
groupBalances.put(groupId, new HashMap<>());
}

// Get the appropriate balance map (either group-specific or global)
Map<UserPair, Double> targetBalances = balances; // Default to global balances

for (Map.Entry<User, Double> entry : shares.entrySet()) {
User participant = entry.getKey();
Double amount = entry.getValue();

if (!participant.equals(payer)) {
// Create a unique pair for the payer and participant
UserPair userPair = new UserPair(participant, payer);

// Update global balances
Double currentGlobalBalance = balances.getOrDefault(userPair, 0.0);
balances.put(userPair, currentGlobalBalance + amount);

// If this is a group expense, also update group-specific balances
if (groupId != null) {
Map<UserPair, Double> groupBalanceMap = groupBalances.get(groupId);
Double currentGroupBalance = groupBalanceMap.getOrDefault(userPair, 0.0);
groupBalanceMap.put(userPair, currentGroupBalance + amount);
}
}
}
}

/**
- Gets the net balance between two users.
- 
- @param user1 First user.
- @param user2 Second user.
- @return The amount user1 owes user2 (negative if user2 owes user1).
*/
public double getBalance(User user1, User user2) {
UserPair pair1 = new UserPair(user1, user2);
UserPair pair2 = new UserPair(user2, user1);

double balance1 = balances.getOrDefault(pair1, 0.0);
double balance2 = balances.getOrDefault(pair2, 0.0);

return balance1 - balance2;
}

/**
- Gets the net balance between two users within a specific group.
- 
- @param user1 First user.
- @param user2 Second user.
- @param groupId The ID of the group.
- @return The amount user1 owes user2 in the group (negative if user2 owes user1).
*/
public double getGroupBalance(User user1, User user2, String groupId) {
// Return 0 if the group doesn't exist in our records
if (!groupBalances.containsKey(groupId)) {
return 0.0;
}

Map<UserPair, Double> groupBalanceMap = groupBalances.get(groupId);
UserPair pair1 = new UserPair(user1, user2);
UserPair pair2 = new UserPair(user2, user1);

double balance1 = groupBalanceMap.getOrDefault(pair1, 0.0);
double balance2 = groupBalanceMap.getOrDefault(pair2, 0.0);

return balance1 - balance2;
}

/**
- Calculates the total balance for a single user.
- 
- @param user The user to calculate the balance for.
- @return The total balance for the user.
*/
public double getTotalBalance(User user) {
double total = 0.0;

for (Map.Entry<UserPair, Double> entry : balances.entrySet()) {
UserPair pair = entry.getKey();
double amount = entry.getValue();

if (pair.getUser1().equals(user)) {
total -= amount; // Money owed by the user
} else if (pair.getUser2().equals(user)) {
total += amount; // Money owed to the user
}
}

return total;
}

/**
- Calculates the total balance for a user within a specific group.
- 
- @param user The user to calculate the balance for.
- @param groupId The ID of the group.
- @return The total balance for the user within the group.
*/
public double getGroupTotalBalance(User user, String groupId) {
// Return 0 if the group doesn't exist in our records
if (!groupBalances.containsKey(groupId)) {
return 0.0;
}

double total = 0.0;
Map<UserPair, Double> groupBalanceMap = groupBalances.get(groupId);

for (Map.Entry<UserPair, Double> entry : groupBalanceMap.entrySet()) {
UserPair pair = entry.getKey();
double amount = entry.getValue();

if (pair.getUser1().equals(user)) {
total -= amount; // Money owed by the user
} else if (pair.getUser2().equals(user)) {
total += amount; // Money owed to the user
}
}

return total;
}

/**
- Returns a copy of all balances.
- 
- @return A copy of the balances map
*/
public Map<UserPair, Double> getAllBalances() {
return new HashMap<>(balances);
}

/**
- Returns a copy of group-specific balances.
- 
- @param groupId The ID of the group
- @return A copy of the group's balances map or an empty map if the group doesn't exist
*/
public Map<UserPair, Double> getGroupBalances(String groupId) {
if (!groupBalances.containsKey(groupId)) {
return new HashMap<>();
}
return new HashMap<>(groupBalances.get(groupId));
}


/**
- Simplifies the balances into a list of transactions to settle all debts.
- 
- @return List of transactions needed to settle all debts.
*/
public List<Transaction> getSimplifiedSettlements() {
return calculateSettlements(balances);
}

/**
- Simplifies the group-specific balances into a list of transactions to settle all debts within a group.
- 
- @param groupId The ID of the group.
- @return List of transactions needed to settle all debts within the group.
*/
public List<Transaction> getGroupSimplifiedSettlements(String groupId) {
if (!groupBalances.containsKey(groupId)) {
return new ArrayList<>();
}
return calculateSettlements(groupBalances.get(groupId));
}

/**
- Helper method to calculate settlements from a balance map
- 
- @param balanceMap The map of balances between user pairs
- @return List of transactions to settle all debts
*/
private List<Transaction> calculateSettlements(Map<UserPair, Double> balanceMap) {
// Step 1: Calculate net balances for each user
Map<User, Double> netBalances = new HashMap<>();

for (Map.Entry<UserPair, Double> entry : balanceMap.entrySet()) {
UserPair pair = entry.getKey();
double amount = entry.getValue();

User debtor = pair.getUser1();
User creditor = pair.getUser2();

netBalances.put(debtor, netBalances.getOrDefault(debtor, 0.0) - amount);
netBalances.put(creditor, netBalances.getOrDefault(creditor, 0.0) + amount);
}

// Step 2: Separate users into debtors and creditors
List<Map.Entry<User, Double>> debtors = new ArrayList<>();
List<Map.Entry<User, Double>> creditors = new ArrayList<>();

for (Map.Entry<User, Double> entry : netBalances.entrySet()) {
if (Math.abs(entry.getValue()) < 0.001) continue; // Skip users with zero balance

if (entry.getValue() < 0) debtors.add(entry);
else creditors.add(entry);
}

// Sort debtors and creditors by the absolute amount (largest first)
/* 
Matching the largest debtor to the largest creditor first ensures that large balances are settled early.
This minimizes the number of transactions because fewer people remain in debt.The approach is greedy, 
meaning at every step, the algorithm minimizes the remaining total debt in the most optimal way.
*/

debtors.sort((a, b) -> Double.compare(Math.abs(b.getValue()), Math.abs(a.getValue())));
creditors.sort((a, b) -> Double.compare(Math.abs(b.getValue()), Math.abs(a.getValue())));

// Step 3: Match debtors and creditors to create transactions
List<Transaction> transactions = new ArrayList<>();
int debtorIndex = 0;
int creditorIndex = 0;

while (debtorIndex < debtors.size() && creditorIndex < creditors.size()) {
Map.Entry<User, Double> debtor = debtors.get(debtorIndex);
Map.Entry<User, Double> creditor = creditors.get(creditorIndex);

double debtorBalance = debtor.getValue(); // Negative value
double creditorBalance = creditor.getValue(); // Positive value

// Determine the transfer amount as the smaller of the two balances
double transferAmount = Math.min(Math.abs(debtorBalance), creditorBalance);

if (transferAmount > 0.001) { // Only create transactions for significant amounts
transactions.add(new Transaction(debtor.getKey(), creditor.getKey(), transferAmount));
}

// Update balances after the transaction
debtor.setValue(debtorBalance + transferAmount);
creditor.setValue(creditorBalance - transferAmount);

// Move to the next debtor or creditor if their balance is settled
if (Math.abs(debtor.getValue()) < 0.001) {
debtorIndex++;
}
if (Math.abs(creditor.getValue()) < 0.001) {
creditorIndex++;
}
}

return transactions;
}
}
```

‍

5\. Modify The Client code to Handle the Grouping Logic : 

‍

```java
/**
- Modified client code to demonstrate group functionality with proper balance handling
*/
public class SplitwiseSystem {
public static void main(String[] args) {
// Create users
User alice = new User("u1", "Alice", "alice@example.com");
User bob = new User("u2", "Bob", "bob@example.com");
User charlie = new User("u3", "Charlie", "charlie@example.com");
User david = new User("u4", "David", "david@example.com");

// Create expense manager and balance sheet
ExpenseManager expenseManager = new ExpenseManager();
BalanceSheet balanceSheet = new BalanceSheet();

// Register the balance sheet as an observer
expenseManager.addObserver(balanceSheet);

// Create group manager with the balance sheet
GroupManager groupManager = new GroupManager(expenseManager, balanceSheet);

// Create a new group
Group roommates = groupManager.createGroup("g1", "Roommates", "Shared apartment expenses");

// Add users to the group
roommates.addMember(alice);
roommates.addMember(bob);
roommates.addMember(charlie);

// Create a different group
Group tripGroup = groupManager.createGroup("g2", "Weekend Trip", "Weekend trip expenses");
tripGroup.addMember(alice);
tripGroup.addMember(bob);
tripGroup.addMember(david);

// Create a list of participants for a group expense
List<User> roommatesParticipants = new ArrayList<>(roommates.getMembers());

// Alice pays for groceries - Create an equal split expense for the roommates group
Split equalSplit = SplitFactory.createSplit("EQUAL");
Map<String, Object> splitDetails = new HashMap<>();
Map<User, Double> groceryShares = equalSplit.calculateSplit(90.0, roommatesParticipants, splitDetails);

Expense groceryExpense = new Expense("e1", "Groceries", 90.0, alice, roommatesParticipants, groceryShares, roommates);

// Add the group expense
groupManager.addExpenseToGroup(groceryExpense, roommates);

// Bob pays for utilities - Create a percentage split for the roommates group
Map<String, Object> percentageSplitDetails = new HashMap<>();
Map<User, Double> percentages = new HashMap<>();
percentages.put(alice, 33.3);
percentages.put(bob, 33.3);
percentages.put(charlie, 33.4);
percentageSplitDetails.put("percentages", percentages);

Split percentageSplit = SplitFactory.createSplit("PERCENTAGE");
Map<User, Double> utilityShares = percentageSplit.calculateSplit(120.0, roommatesParticipants, percentageSplitDetails);

Expense utilityExpense = new Expense("e2", "Utilities", 120.0, bob, roommatesParticipants, utilityShares, roommates);

// Add the utility expense to the roommates group
groupManager.addExpenseToGroup(utilityExpense, roommates);

// Create an expense for the trip group
List<User> tripParticipants = new ArrayList<>(tripGroup.getMembers());
Map<User, Double> hotelShares = equalSplit.calculateSplit(300.0, tripParticipants, splitDetails);

Expense hotelExpense = new Expense("e3", "Hotel", 300.0, alice, tripParticipants, hotelShares, tripGroup);

// Add the hotel expense to the trip group
groupManager.addExpenseToGroup(hotelExpense, tripGroup);

// Create a non-group expense between Alice and David
List<User> nonGroupParticipants = new ArrayList<>();
nonGroupParticipants.add(alice);
nonGroupParticipants.add(david);

Map<User, Double> lunchShares = equalSplit.calculateSplit(30.0, nonGroupParticipants, splitDetails);
Expense lunchExpense = new Expense("e4", "Lunch", 30.0, david, nonGroupParticipants, lunchShares);

// Add the non-group expense
expenseManager.addExpense(lunchExpense);

// Print roommates group balances
System.out.println("Roommates Group Balances:");
List<Transaction> roommateSettlements = groupManager.getGroupSettlements(roommates);
for (Transaction transaction : roommateSettlements) {
System.out.println(transaction.getFrom().getName() + " pays " + 
transaction.getTo().getName() + " $" + 
transaction.getAmount());
}

// Print trip group balances
System.out.println("
Trip Group Balances:");
List<Transaction> tripSettlements = groupManager.getGroupSettlements(tripGroup);
for (Transaction transaction : tripSettlements) {
System.out.println(transaction.getFrom().getName() + " pays " + 
transaction.getTo().getName() + " $" + 
transaction.getAmount());
}

// Print overall balances (including both group and non-group expenses)
System.out.println("
Overall Balances for All Users:");
List<Transaction> allSettlements = balanceSheet.getSimplifiedSettlements();
for (Transaction transaction : allSettlements) {
System.out.println(transaction.getFrom().getName() + " pays " + 
transaction.getTo().getName() + " $" + 
transaction.getAmount());
}

// Print individual user balances within specific groups
System.out.println("
User Balances Within Groups:");
System.out.println("Alice's balance in Roommates group: $" + 
groupManager.getGroupTotalBalance(alice, roommates));
System.out.println("Bob's balance in Roommates group: $" + 
groupManager.getGroupTotalBalance(bob, roommates));
System.out.println("Alice's balance in Trip group: $" + 
groupManager.getGroupTotalBalance(alice, tripGroup));
System.out.println("David's balance in Trip group: $" + 
groupManager.getGroupTotalBalance(david, tripGroup));

// Print overall user balances
System.out.println("
Overall User Balances:");
System.out.println("Alice's total balance: $" + balanceSheet.getTotalBalance(alice));
System.out.println("Bob's total balance: $" + balanceSheet.getTotalBalance(bob));
System.out.println("Charlie's total balance: $" + balanceSheet.getTotalBalance(charlie));
System.out.println("David's total balance: $" + balanceSheet.getTotalBalance(david));
}
}
```

‍

## ✨ Conclusion : 

This low-level design for Splitwise showcases a well-structured and scalable architecture, emphasizing modularity and extensibility. By supporting various enhancements such as new Split Types and Grouping logic, this design ensures maintainability and flexibility. In an interview setting, presenting this design would demonstrate your ability to create robust and adaptable solutions, highlighting your proficiency in applying design patterns and best practices.

---
