---
title: "The Dining Philosophers"
type: lld
order: 68
---

# The Dining Philosophers

Topic Tags:

system designlld

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

## ‍

## 🧐Question :

Five silent philosophers sit at a round table with bowls of spaghetti. Forks are placed between each pair of adjacent philosophers.

‍

Each philosopher must alternately think and eat. However, a philosopher can only eat spaghetti when they have both left and right forks. Each fork can be held by only one philosopher and so a philosopher can use the fork only if it is not being used by another philosopher. After an individual philosopher finishes eating, they need to put down both forks so that the forks become available to others. A philosopher can take the fork on their right or the one on their left as they become available, but cannot start eating before getting both forks.

‍

Eating is not limited by the remaining amounts of spaghetti or stomach space; an infinite supply and an infinite demand are assumed.

‍

Design a discipline of behaviour (a concurrent algorithm) such that no philosopher will starve; i.e., each can forever continue to alternate between eating and thinking, assuming that no philosopher can know when others may want to eat or think.

‍

The philosophers' ids are numbered from 0 to 4 in a clockwise order. Implement the function void wantsToEat(philosopher, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork) where:

• philosopher is the id of the philosopher who wants to eat.

• pickLeftFork and pickRightFork are functions you can call to pick the corresponding forks of that philosopher.

• eat is a function you can call to let the philosopher eat once he has picked both forks.

• putLeftFork and putRightFork are functions you can call to put down the corresponding forks of that philosopher.

• The philosophers are assumed to be thinking as long as they are not asking to eat (the function is not being called with their number).

‍

Five threads, each representing a philosopher, will simultaneously use one object of your class to simulate the process. The function may be called for the same philosopher more than once, even before the last call ends.

‍![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746232542830-Frame-237-\(7\).png)

```
🚧 Constraints: 
▫️	• 1 <= n <= 60
```

```
Example 1:
Input: n = 1

Output: [[4,2,1],[4,1,1],[0,1,1],[2,2,1],[2,1,1],[2,0,3],[2,1,2],[2,2,2],[4,0,3],[4,1,2],[0,2,1],[4,2,2],[3,2,1],[3,1,1],[0,0,3],[0,1,2],[0,2,2],[1,2,1],[1,1,1],[3,0,3],[3,1,2],[3,2,2],[1,0,3],[1,1,2],[1,2,2]]

Explanation:
n is the number of times each philosopher will call the function.
The output array describes the calls you made to the functions controlling the forks and the eat function, its format is:
output[i] = [a, b, c] (three integers)
- a is the id of a philosopher.
- b specifies the fork: {1 : left, 2 : right}.
- c specifies the operation: {1 : pick, 2 : put, 3 : eat}.
```

‍

> 🔗 Problem link :  [https://leetcode.com/problems/the-dining-philosophers/description/](https://leetcode.com/problems/the-dining-philosophers/description/)

‍

```
Level : Medium
Topics : Concurrency 
Companies :  Apple
```

‍‍

## 💡Solution :

### Understanding the Challenge :

The Dining Philosophers problem is a classic synchronization problem in computer science that illustrates challenges in resource allocation and deadlock prevention. We need to:

• Prevent deadlock (all philosophers holding one fork and waiting forever for another)

• Ensure no philosopher starves (each philosopher gets to eat eventually)

• Handle concurrent access to shared resources (forks)

• Implement proper synchronization between multiple threads

‍

### 🧩 Approach: Using Semaphores for Resource Management and Deadlock Prevention : 

_🧠_ Intuition :

```
We'll use two types of semaphores to manage the dining process:

• A counting semaphore to limit the number of philosophers who can attempt to eat simultaneously
• An array of binary semaphores to control access to individual forks

By allowing at most 4 philosophers to compete for resources simultaneously, we guarantee that at least one philosopher can acquire both forks and eat, preventing deadlock.
```

‍

## 🤖 Algorithm :

1\. Create a counting semaphore initialized to 4 permits to limit concurrent eating attempts

‍

2\. Create an array of 5 binary semaphores (one for each fork)

‍

3\. When a philosopher wants to eat: 

• Acquire the counting semaphore (limiting concurrent attempts)

• Determine the left and right fork indices

• Acquire semaphores for both forks

• Pick up forks, eat, then put down forks

• Release both fork semaphores

‍

Release the counting semaphore

‍

## 📝 Implementation : 

```java

class DiningPhilosophers {
// Semaphore to limit the number of philosophers trying to eat simultaneously
private Semaphore semaphore;


// Array of semaphores to control access to each fork
private Semaphore[] forkSemaphore;


public DiningPhilosophers() {
// Allow at most 4 philosophers to try to eat at the same time
semaphore = new Semaphore(4);


// Initialize semaphores for each fork
forkSemaphore = new Semaphore[5];
for (int i = 0; i < 5; i++) forkSemaphore[i] = new Semaphore(1);
}


// call the run() method of any runnable to execute its code
public void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork,
Runnable eat, Runnable putLeftFork, Runnable putRightFork) throws InterruptedException {
// Limit the number of philosophers who can try to eat simultaneously
semaphore.acquire();


// Identify the forks needed by this philosopher
int left = philosopher;
int right = (philosopher + 1) % 5;


// Get semaphores for the left and right forks
Semaphore leftForkSemaphore = forkSemaphore[left];
Semaphore rightForkSemaphore = forkSemaphore[right];


// Acquire both forks (resources)
leftForkSemaphore.acquire();
rightForkSemaphore.acquire();


// Perform the eating process
pickLeftFork.run();
pickRightFork.run();
eat.run();


// Put down the forks
putLeftFork.run();
leftForkSemaphore.release();
putRightFork.run();
rightForkSemaphore.release();


// Allow another philosopher to try to eat
semaphore.release();
}
}
```

‍

## 🤹🏼Dry Run with Visualization

Let's perform a dry run with 5 philosophers (ids 0-4) at a round table:

### Step 1: Initialization :

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746232776102-Frame-237-\(8\).png)

• A counting semaphore is created with 4 permits

• 5 binary semaphores are created for the 5 forks (one per fork)

• All semaphores are initially available

‍

### Step 2: Philosophers Try to Eat : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746232671824-image.png)

Suppose all 5 philosophers get hungry simultaneously:

• Philosophers 0, 1, 2, and 3 acquire the counting semaphore (4 permits)

• Philosopher 4 is blocked waiting for the counting semaphore

‍

### Step 3: Resource Acquisition : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746232692684-image.png)

Philosopher 0: 

• Acquires fork 0 (left) and fork 1 (right)

• Picks up both forks and eats

Philosopher 1: 

• Tries to acquire fork 1 (left) but it's held by Philosopher 0

• Waits for fork 1 to be released

‍

Philosopher 2: 

• Acquires fork 2 (left) and fork 3 (right)

• Picks up both forks and eats

‍

Philosopher 3: 

• Tries to acquire fork 3 (left) but it's held by Philosopher 2

• Waits for fork 3 to be released

‍

### Step 4: Resource Release : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746232699804-image.png)

Philosopher 0 finishes eating: 

• Puts down both forks

• Releases fork semaphores 0 and 1

• Releases the counting semaphore

‍

Philosopher 4 acquires the counting semaphore

‍

Philosopher 1 acquires fork 1 (left) and fork 2 (right) 

• Picks up both forks and eats

‍

### Step 5: Continuous Operation : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746232706600-image.png)

The process continues with philosophers acquiring and releasing resources, with the counting semaphore preventing deadlock by ensuring at least one philosopher can always acquire both forks.

‍

## ‍📈 Complexity Analysis :

```
>⏳ Time Complexity : 
O(1) for each call to wantsToEat

>🗃️ Space Complexity : 
 O(n) where n is the number of philosophers (5 in this case)‍
```

## ‍

## 🗝️Key Insights : 

1\. Deadlock Prevention:

By limiting the number of philosophers who can try to eat simultaneously to 4 (when there are 5 philosophers), we ensure that at least one philosopher can acquire both forks. This is because even in the worst case, 4 philosophers can only hold 4 forks, leaving 1 fork free, which means at least one philosopher can acquire both needed forks.

‍

2\. Resource Allocation Strategy:

Our implementation uses a straightforward approach where each philosopher attempts to acquire both forks at once. This prevents the classic deadlock scenario where each philosopher holds one fork and is waiting for another.

‍

3\. Fairness Considerations:

The semaphore implementation in Java does not guarantee fairness by default. For a more fair solution, we could use new Semaphore(4, true) which creates a fair semaphore that grants access in FIFO order.

---
