---
title: "Print Zero Even Odd"
type: lld
order: 65
---

# Print Zero Even Odd

Topic Tags:

system designlld

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

## ‍

## 🧐Question :

You have a function printNumber that can be called with an integer parameter and prints it to the console.

‍

• For example, calling printNumber(7) prints 7 to the console.

You are given an instance of the class ZeroEvenOdd that has three functions: zero, even, and odd.

‍

‍The same instance of ZeroEvenOdd will be passed to three different threads:

• Thread A: calls zero() that should only output 0's.

• Thread B: calls even() that should only output even numbers.

• Thread C: calls odd() that should only output odd numbers.

Modify the given class to output the series "010203040506..." where the length of the series must be 2n.

‍

Implement the ZeroEvenOdd class:

• ZeroEvenOdd(int n) Initializes the object with the number n that represents the numbers that should be printed.

• void zero(printNumber) Calls printNumber to output one zero.

• void even(printNumber) Calls printNumber to output one even number.

• void odd(printNumber) Calls printNumber to output one odd number.

‍

```
🚧 Constraints: 
▫️1 <= n <= 1000
```

```
Example 1 : 
Input: n = 2
Output: "0102"
Explanation: There are three threads being fired asynchronously.
One of them calls zero(), the other calls even(), and the last one calls odd().
"0102" is the correct output.
	
Example 2 : 
Input: n = 5	
Output: "0102030405"
```

‍

> 🔗 Problem link : [https://leetcode.com/problems/print-zero-even-odd/description/](https://leetcode.com/problems/print-zero-even-odd/description/)

‍

```
Level : Medium
Topics : Concurrency 
Companies : Goldman Sachs, Microsoft
```

‍‍

## 💡Solution :

The key challenge in this problem is synchronizing the three threads to ensure they execute in the correct order. We need to make sure that:

1\. A zero is printed before each number

2\. Odd and even numbers are printed in sequence

‍

We can use semaphores to control the execution flow. Semaphores are perfect for this kind of synchronization as they allow us to signal between threads.

‍

### 🧩 Approach 1 : Using Semaphores for Thread Synchronization

_🧠_ Intuition :

```
• We'll use three semaphores: one for the zero thread, one for the even thread, and one for the odd thread.
• The zero thread will alternate between signaling the odd and even threads.
• The odd and even threads will signal the zero thread after printing their respective numbers.
```

‍

## 🤖 Algorithm :

1\. Initialize three semaphores: 

• zeroSemaphore with initial permit of 1 (allowing the zero thread to run first)

• evenSemaphore with initial permit of 0 (blocking the even thread initially)

• oddSemaphore with initial permit of 0 (blocking the odd thread initially)

‍

2\. In the zero() method: 

• For each number from 1 to n: 

• Acquire zeroSemaphore to ensure exclusive access

• Print zero

• Release either oddSemaphore or evenSemaphore based on the next number

• Toggle between odd and even for the next iteration

‍

3\. In the even() method: 

• For each even number from 2 to n (increment by 2): 

• Acquire evenSemaphore to wait for the zero thread's signal

• Print the even number

• Release zeroSemaphore to allow the zero thread to continue

‍

4\. In the odd() method: 

• For each odd number from 1 to n (increment by 2): 

• Acquire oddSemaphore to wait for the zero thread's signal

• Print the odd number

• Release zeroSemaphore to allow the zero thread to continue

‍

## 📝 Implementation : 

```java
import java.util.concurrent.Semaphore;
import java.util.function.IntConsumer;

// Class to print numbers in a specific sequence: "0", "odd", "0", "even", ...
class ZeroEvenOdd {
private int n; // The maximum number to print (odd or even)
private Semaphore zeroSemaphore; // Ensures "0" is printed
private Semaphore evenSemaphore; // Ensures even numbers are printed
private Semaphore oddSemaphore; // Ensures odd numbers are printed

// Constructor to initialize the semaphores and the upper limit
public ZeroEvenOdd(int n) {
this.n = n;
zeroSemaphore = new Semaphore(1); // Initially "0" can be printed, so start with 1 permit
evenSemaphore = new Semaphore(0); // Even numbers cannot be printed yet
oddSemaphore = new Semaphore(0); // Odd numbers cannot be printed yet
}

// Method to print "0" alternately before odd and even numbers
// Takes an IntConsumer for printing numbers
public void zero(IntConsumer printNumber) throws InterruptedException {
boolean isOdd = true; // Flag to toggle between odd and even numbers
for (int i = 1; i <= n; i++) {
zeroSemaphore.acquire(); // Acquire permit to print "0"
printNumber.accept(0); // Print "0"
if (isOdd) {
oddSemaphore.release(); // Allow odd numbers to be printed next
} else {
evenSemaphore.release(); // Allow even numbers to be printed next
}
isOdd = !isOdd; // Toggle the flag
}
}

// Method to print even numbers
public void even(IntConsumer printNumber) throws InterruptedException {
for (int i = 2; i <= n; i += 2) { // Iterate over even numbers up to n
evenSemaphore.acquire(); // Wait for "0" to be printed and semaphore to be released
printNumber.accept(i); // Print the even number
zeroSemaphore.release(); // Release semaphore to allow "0" to be printed next
}
}

// Method to print odd numbers
public void odd(IntConsumer printNumber) throws InterruptedException {
for (int i = 1; i <= n; i += 2) { // Iterate over odd numbers up to n
oddSemaphore.acquire(); // Wait for "0" to be printed and semaphore to be released
printNumber.accept(i); // Print the odd number
zeroSemaphore.release(); // Release semaphore to allow "0" to be printed next
}
}
}
```

‍

## 🤹🏼Dry Run with Visualization

Let's walk through a dry run of the algorithm with n = 3 to understand how the threads interact:

‍

Step-by-Step Execution:

Initial State:

• zeroSemaphore = 1 (available)

• evenSemaphore = 0 (unavailable)

• oddSemaphore = 0 (unavailable)

> Output: ""

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745501686856-image.png)

‍

### Step 1:

• Thread A acquires zeroSemaphore (now 0)

• Thread A prints 0

• Thread A releases oddSemaphore (now 1) since isOdd = true

• Thread A toggles isOdd to false

Output: "0"

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745501707843-image.png)

‍

### Step 2:

• Thread C acquires oddSemaphore (now 0)

• Thread C prints 1

• Thread C releases zeroSemaphore (now 1)

• Output: "01"

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745501724180-image.png)

‍

### Step 3:

• Thread A acquires zeroSemaphore (now 0)

• Thread A prints 0

• Thread A releases evenSemaphore (now 1) since isOdd = false

• Thread A toggles isOdd to true

Output: "010"

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745501740585-image.png)

‍

### Step 4 : 

• Thread B acquires evenSemaphore (now 0)

• Thread B prints 2

• Thread B releases zeroSemaphore (now 1)

Output: "0102"

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745501762849-image.png)

‍

### Step 5:

• Thread A acquires zeroSemaphore (now 0)

• Thread A prints 0

• Thread A releases oddSemaphore (now 1) since isOdd = true

• Thread A toggles isOdd to false

Output: "01020"

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745501778992-image.png)

‍

### Step 6:

• Thread C acquires oddSemaphore (now 0)

• Thread C prints 3

• Thread C releases zeroSemaphore (now 1)

Output: "010203"

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745502092696-Frame-248-\(5\).png)

‍

## ‍📈 Complexity Analysis :

```
>⏳ Time Complexity : O(n) 
We process each number once.

>🗃️ Space Complexity : O(n)
We use a constant amount of extra space.
```

‍

## 🗝️Key Insights : 

1\. Semaphore Usage:

Semaphores are perfect for controlling the execution order of multiple threads. By initializing them with appropriate permits, we can ensure that threads run in the desired sequence.

‍

2\. Alternating Pattern:

The zero() method alternates between signaling the odd and even threads, which maintains the required pattern of "010203...".

‍

3\. Thread Coordination:

The solution demonstrates how to coordinate multiple threads to achieve a specific output pattern. Each thread is responsible for a specific part of the output.

‍

4.Clean Synchronization:

By using semaphores, we achieve clean synchronization without busy waiting or complex condition variables.

---
