---
title: "Fizz Buzz Multithreaded"
type: lld
order: 66
---

# Fizz Buzz Multithreaded

Topic Tags:

system designlld

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

## ‍

## 🧐Question :

You have the four functions:

• printFizz that prints the word "fizz" to the console,

• printBuzz that prints the word "buzz" to the console,

• printFizzBuzz that prints the word "fizzbuzz" to the console, and

• printNumber that prints a given integer to the console.

‍

You are given an instance of the class FizzBuzz that has four functions: fizz, buzz, fizzbuzz and number. The same instance of FizzBuzz will be passed to four different threads:

‍

• Thread A: calls fizz() that should output the word "fizz".

• Thread B: calls buzz() that should output the word "buzz".

• Thread C: calls fizzbuzz() that should output the word "fizzbuzz".

• Thread D: calls number() that should only output the integers.

‍

Modify the given class to output the series \[1, 2, "fizz", 4, "buzz", ...\] where the ith token (1-indexed) of the series is:

• "fizzbuzz" if i is divisible by 3 and 5,

• "fizz" if i is divisible by 3 and not 5,

• "buzz" if i is divisible by 5 and not 3, or

• if i is not divisible by 3 or 5.

‍

Implement the FizzBuzz class:

• FizzBuzz(int n) Initializes the object with the number n that represents the length of the sequence that should be printed.

• void fizz(printFizz) Calls printFizz to output "fizz".

• void buzz(printBuzz) Calls printBuzz to output "buzz".

• void fizzbuzz(printFizzBuzz) Calls printFizzBuzz to output "fizzbuzz".

• void number(printNumber) Calls printnumber to output the numbers.

‍

```
🚧 Constraints: 
▫️ 1 <= n <= 50
```

```
Example 1:
Input: n = 15
Output: 
[1,2,"fizz",4,"buzz","fizz",7,8,"fizz","buzz",11,"fizz",13,14,"fizzbuzz"]

Example 2:
Input: n = 5
Output: [1,2,"fizz",4,"buzz"]
```

‍

> 🔗 Problem link : [https://leetcode.com/problems/fizz-buzz-multithreaded/description/](https://leetcode.com/problems/fizz-buzz-multithreaded/description/%E2%80%8D)

[‍](https://leetcode.com/problems/fizz-buzz-multithreaded/description/%E2%80%8D)

```
Level : Medium
Topics : Concurrency 
Companies :  Gartner
```

‍‍

## 💡Solution :

### Understanding the Challenge : 

The main challenge is synchronizing the execution of four different threads so that they print numbers and strings in the correct sequence. We need to:

• Ensure only one thread prints at a time.

• Control execution order so that numbers, "fizz", "buzz", and "fizzbuzz" appear at the right moments.

• Avoid race conditions and deadlocks.

‍

### 🧩 Approach 1 : Using Semaphores for Thread Synchronization

_🧠_ Intuition :

```
We'll use four semaphores to control the flow:
	• numberSemaphore: Controls when numbers can be printed.
	• fizzSemaphore: Controls when "fizz" can be printed.
	• buzzSemaphore: Controls when "buzz" can be printed.
	• fizzBuzzSemaphore: Controls when "fizzbuzz" can be printed.
Each thread will wait for its respective semaphore before printing and then release the numberSemaphore for the next iteration.
```

‍

## 🤖 Algorithm :

1\. Initialize four semaphores:

○ numberSemaphore with 1 permit (starts first).

○ fizzSemaphore, buzzSemaphore, fizzBuzzSemaphore with 0 permits (blocked initially).

‍

2\. In number(), check conditions and release the appropriate semaphore.

‍

3.In fizz(), buzz(), and fizzbuzz(), wait for their semaphores, print, and then release numberSemaphore.

‍

## 📝 Implementation : 

```java
class FizzBuzz { 
// Number up to which FizzBuzz needs to be calculated
private int n; 

// Semaphore to allow only the correct thread to print numbers
private Semaphore numberSemaphore; 

// Semaphore to allow the "Fizz" thread to print
private Semaphore fizzSemaphore; 

// Semaphore to allow the "Buzz" thread to print
private Semaphore buzzSemaphore; 

// Semaphore to allow the "FizzBuzz" thread to print
private Semaphore fizzBuzzSemaphore; 

// Constructor to initialize semaphores and set the limit
public FizzBuzz(int n) { 
this.n = n; 

// Initially allow printing of numbers
numberSemaphore = new Semaphore(1); 

// Block "Fizz", "Buzz", and "FizzBuzz" threads initially
fizzSemaphore = new Semaphore(0); 
buzzSemaphore = new Semaphore(0); 
fizzBuzzSemaphore = new Semaphore(0); 
} 

// Method to print "Fizz" if the number is divisible by 3 but not by 5
public void fizz(Runnable printFizz) throws InterruptedException { 
for(int i = 1; i <= n; i++) { 
if(i % 3 == 0 && i % 5 != 0) { 
// Wait for permission to print "Fizz"
fizzSemaphore.acquire(); 

// Execute the provided function to print "Fizz"
printFizz.run(); 

// Signal the next thread to proceed
numberSemaphore.release(); 
} 
} 
} 

// Method to print "Buzz" if the number is divisible by 5 but not by 3
public void buzz(Runnable printBuzz) throws InterruptedException { 
for(int i = 1; i <= n; i++) { 
if(i % 3 != 0 && i % 5 == 0) { 
// Wait for permission to print "Buzz"
buzzSemaphore.acquire(); 

// Execute the provided function to print "Buzz"
printBuzz.run(); 

// Signal the next thread to proceed
numberSemaphore.release(); 
} 
} 
} 

// Method to print "FizzBuzz" if the number is divisible by both 3 and 5
public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException { 
for(int i = 1; i <= n; i++) { 
if(i % 3 == 0 && i % 5 == 0) { 
// Wait for permission to print "FizzBuzz"
fizzBuzzSemaphore.acquire(); 

// Execute the provided function to print "FizzBuzz"
printFizzBuzz.run(); 

// Signal the next thread to proceed
numberSemaphore.release(); 
} 
} 
} 

// Method to print numbers if they are not divisible by 3 or 5
public void number(IntConsumer printNumber) throws InterruptedException { 
for(int i = 1; i <= n; i++) { 
// Wait for permission to print a number
numberSemaphore.acquire(); 

// Check divisibility and signal the appropriate thread
if(i % 3 == 0 && i % 5 == 0) { 
fizzBuzzSemaphore.release(); 
} else if(i % 3 == 0) { 
fizzSemaphore.release(); 
} else if(i % 5 == 0) { 
buzzSemaphore.release(); 
} else { 
// Execute the provided function to print the number
printNumber.accept(i); 
// Allow the next thread to proceed
numberSemaphore.release(); 
} 
} 
} 
}
```

‍

## 🤹🏼Dry Run with Visualization

Let's perform a dry run for n = 5:

‍

### Step 1: Initialization

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745651413475-image.png)

The FizzBuzz class is initialized with n = 5, and four semaphores are created:

• numberSemaphore starts with 1 permit (allows first operation)

• fizzSemaphore starts with 0 permits (blocked)

• buzzSemaphore starts with 0 permits (blocked)

fizzBuzzSemaphore starts with 0 permits (blocked)

‍

### Step 2:Thread Creation and Start : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745651478148-image.png)

Four threads are created and started:

• Thread A calls fizz()

• Thread B calls buzz()

• Thread C calls fizzbuzz()

Thread D calls number()

‍

### Step 3:Processing i=1

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745651516562-image.png)

Thread D (number()) acquires numberSemaphore and checks i=1:

• 1 is not divisible by 3 or 5, so printNumber(1) is called

numberSemaphore is released for the next iteration

‍

### Step 4 : Processing i=2 : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745651559347-image.png)

Thread D (number()) acquires numberSemaphore again and checks i=2:

• 2 is not divisible by 3 or 5, so printNumber(2) is called

numberSemaphore is released for the next iteration

‍

### Step 5:Processing i=3

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745651594975-image.png)

Thread D (number()) acquires numberSemaphore and checks i=3:

• 3 is divisible by 3, so fizzSemaphore is released

• Thread A (fizz()) is waiting for fizzSemaphore, now it can proceed

Thread A calls printFizz() and releases numberSemaphore

‍

### Step 6:Processing i=4

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745651702478-image.png)

Thread D (number()) acquires numberSemaphore and checks i=4:

• 4 is not divisible by 3 or 5, so printNumber(4) is called

numberSemaphore is released for the next iteration

‍

### Step 7:Processing i=5

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745651752674-image.png)

Thread D (number()) acquires numberSemaphore and checks i=5:

• 5 is divisible by 5, so buzzSemaphore is released

• Thread B (buzz()) is waiting for buzzSemaphore, now it can proceed

Thread B calls printBuzz() and releases numberSemaphore

‍

## ‍📈 Complexity Analysis :

```
>⏳ Time Complexity : O(n) 
as each number is processed once.

>🗃️ Space Complexity : O(n)
as only a few semaphores are used.
```

‍

## 🗝️Key Insights : 

• **Semaphore Usage:** Perfect for controlling execution order in multi-threading.

• **Thread Coordination:** Ensures numbers, "fizz", "buzz", and "fizzbuzz" appear in the correct sequence.

• **No Busy Waiting:** Efficient execution using synchronization primitives.

‍

This approach guarantees correct and synchronized execution of the FizzBuzz problem using four threads.

---
