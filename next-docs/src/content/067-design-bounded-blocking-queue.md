---
title: "Design Bounded Blocking Queue"
type: lld
order: 67
---

# Design Bounded Blocking Queue

Topic Tags:

system designlld

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

## ‍

## 🧐Question :

Implement a thread-safe bounded blocking queue that has the following methods:

• BoundedBlockingQueue(int capacity) The constructor initializes the queue with a maximum capacity.

• void enqueue(int element) Adds an element to the front of the queue. If the queue is full, the calling thread is blocked until the queue is no longer full.

• int dequeue() Returns the element at the rear of the queue and removes it. If the queue is empty, the calling thread is blocked until the queue is no longer empty.

• int size() Returns the number of elements currently in the queue.

Your implementation will be tested using multiple threads at the same time. Each thread will either be a producer thread that only makes calls to the enqueue method or a consumer thread that only makes calls to the dequeue method. The size method will be called after every test case.

‍

```
🚧 Constraints: 
▫️1 <= Number of Prdoucers <= 8
▫️1 <= Number of Consumers <= 8
▫️1 <= size <= 30
▫️0 <= element <= 20
▫️The number of calls to enqueue is greater than or equal to the number of calls to dequeue.
At most 40 calls will be made to enque, deque, and size.
```

```
Example 1:
Input:


["BoundedBlockingQueue","enqueue","dequeue","dequeue","enqueue","enqueue","enqueue","enqueue","dequeue"]
[[2],[1],[],[],[0],[2],[3],[4],[]]

Output:
[1,0,2,2]
Explanation:
Number of producer threads = 1
Number of consumer threads = 1
BoundedBlockingQueue queue = new BoundedBlockingQueue(2);   // initialize the queue with capacity = 2.
queue.enqueue(1);   // The producer thread enqueues 1 to the queue.
queue.dequeue();    // The consumer thread calls dequeue and returns 1 from the queue.
queue.dequeue();    // Since the queue is empty, the consumer thread is blocked.
queue.enqueue(0);   // The producer thread enqueues 0 to the queue. The consumer thread is unblocked and returns 0 from the queue.
queue.enqueue(2);   // The producer thread enqueues 2 to the queue.
queue.enqueue(3);   // The producer thread enqueues 3 to the queue.
queue.enqueue(4);   // The producer thread is blocked because the queue's capacity (2) is reached.
queue.dequeue();    // The consumer thread returns 2 from the queue. The producer thread is unblocked and enqueues 4 to the queue.
queue.size();       // 2 elements remaining in the queue. size() is always called at the end of each test case.


Example 2:
Input:


["BoundedBlockingQueue","enqueue","enqueue","enqueue","dequeue","dequeue","dequeue","enqueue"]
[[3],[1],[0],[2],[],[],[],[3]]

Output:
[1,0,2,1]

Explanation:
Number of producer threads = 3
Number of consumer threads = 4
BoundedBlockingQueue queue = new BoundedBlockingQueue(3);   // initialize the queue with capacity = 3.
queue.enqueue(1);   // Producer thread P1 enqueues 1 to the queue.
queue.enqueue(0);   // Producer thread P2 enqueues 0 to the queue.
queue.enqueue(2);   // Producer thread P3 enqueues 2 to the queue.
queue.dequeue();    // Consumer thread C1 calls dequeue.
queue.dequeue();    // Consumer thread C2 calls dequeue.
queue.dequeue();    // Consumer thread C3 calls dequeue.
queue.enqueue(3);   // One of the producer threads enqueues 3 to the queue.
queue.size();       // 1 element remaining in the queue.
Since the number of threads for producer/consumer is greater than 1, we do not know how the threads will be scheduled in the operating system, even though the input seems to imply the ordering. Therefore, any of the output [1,0,2] or [1,2,0] or [0,1,2] or [0,2,1] or [2,0,1] or [2,1,0] will be accepted.
```

‍

> 🔗 Problem link : [https://leetcode.com/problems/design-bounded-blocking-queue/description/](https://leetcode.com/problems/design-bounded-blocking-queue/description/)

‍

```
Level : Medium
Topics : Concurrency 
Companies :  Linkedin, Tesla, Rubrik
```

‍‍

## 💡Solution :

The problem requires a thread-safe implementation of a bounded blocking queue that supports concurrent access. We can use Semaphores to handle blocking behavior for enqueue and dequeue operations efficiently.

‍

### 🧩 Approach:

_🧠_ Intuition :

```
A bounded blocking queue is a queue that allows concurrent access but limits the number of elements that can be stored at a given time. The challenge lies in ensuring that:
	• Producers cannot insert elements when the queue is full and must wait.
	• Consumers cannot remove elements when the queue is empty and must wait.
	• The operations must be thread-safe to handle multiple producer and consumer threads simultaneously.
To achieve this, we use semaphores to control access to the queue, preventing race conditions and ensuring proper synchronization.
```

‍

1\. **Use a Semaphore :** 

• empty semaphore to track available slots.

• full semaphore to track the number of occupied slots.

‍

2\. **Use a Concurrent Data Structure :** 

• A ConcurrentLinkedDeque is used for safe concurrent access.

‍

3\. **Thread Synchronization :** 

• enqueue() acquires an empty slot before inserting.

• dequeue() acquires a full slot before removing an element.

‍

## 📝 Implementation : 

```java

class BoundedBlockingQueue { 
// Semaphore to track the number of items in the queue (full spots)
private Semaphore full; 

// Semaphore to track the number of available empty spots in the queue
private Semaphore empty; 

// A concurrent deque to store the elements of the queue
private ConcurrentLinkedDeque<Integer> deque; 

// Constructor to initialize the semaphores and the deque
public BoundedBlockingQueue(int capacity) { 
// 'full' starts with 0 since the queue is empty initially
full = new Semaphore(0); 
// 'empty' starts with the capacity of the queue
empty = new Semaphore(capacity); 
// Initialize the concurrent deque to hold queue elements
deque = new ConcurrentLinkedDeque<>(); 
} 

// Method to add an element to the queue
public void enqueue(int element) throws InterruptedException { 
// Acquire an empty spot before adding an element
empty.acquire(); 
// Add the element to the front of the deque
deque.addFirst(element); 
// Release a full spot after adding the element
full.release(); 
} 

// Method to remove and retrieve an element from the queue
public int dequeue() throws InterruptedException { 
int result = -1; 
// Acquire a full spot before removing an element
full.acquire(); 
// Remove the element from the end of the deque
result = deque.pollLast(); 
// Release an empty spot after removing the element
empty.release(); 
return result; 
} 

// Method to get the current size of the queue
public int size() throws InterruptedException { 
int result = 0; 
// Retrieve and return the size of the deque
result = deque.size();
return result; 
} 
}
```

‍

## 🤹🏼Dry Run with Visualization

Let's perform a dry run for Input : 

1

1

\["BoundedBlockingQueue","enqueue","dequeue","dequeue","enqueue","enqueue","enqueue","enqueue","dequeue"\]

\[\[2\],\[1\],\[\],\[\],\[0\],\[2\],\[3\],\[4\],\[\]\]

‍‍

### Step 1: Initilization

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745859853555-Frame-237.png)

### ‍

### Step 2: First Enqueue Operation 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745859889172-Frame-292.png)

‍The producer thread calls enqueue(1):

• Acquires a permit from empty semaphore (now 1 permit left)

• Adds element 1 to the front of the queue

Releases a permit to full semaphore (now 1 permit)

‍

### Step 3: First Dequeue Operation : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745859929206-Frame-238-\(1\).png)

The consumer thread calls dequeue():

• Acquires a permit from full semaphore (now 0 permits)

• Removes element 1 from the end of the queue

• Releases a permit to empty semaphore (now 2 permits)

Returns 1

‍‍

### Step 4 :  Second Dequeue Operation (Blocking) : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745859955452-Frame-251.png)

The consumer thread calls dequeue() again, but the queue is empty:

• Tries to acquire a permit from full semaphore, but it's blocked (0 permits)

Thread waits until a permit becomes available

‍‍

### Step 5: Second Enqueue Operation (Unblocks Consumer) : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745859978149-Frame-239.png)

The producer thread calls enqueue(0):

• Acquires a permit from empty semaphore (now 1 permit)

• Adds element 0 to the front of the queue

• Releases a permit to full semaphore (now 1 permit)

This unblocks the waiting consumer thread

‍‍

### Step 6: Third and Fourth Enqueue Operations : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745860000340-Frame-241-\(6\).png)

The producer thread calls enqueue(2) and enqueue(3):

• Both operations succeed, filling the queue to capacity

After these operations, empty semaphore has 0 permits, and full semaphore has 2 permits

‍

### Step 7: Fifth Enqueue Operation (Blocking) : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745860025189-Frame-242.png)

The producer thread calls enqueue(4), but the queue is full:

• Tries to acquire a permit from empty semaphore, but it's blocked (0 permits)

Thread waits until a permit becomes available

‍

### Step 8:Third Dequeue Operation (Unblocks Producer) : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745860207974-Frame-241-\(7\).png)

The consumer thread calls dequeue():

• Acquires a permit from full semaphore (now 1 permit)

• Removes element 2 from the end of the queue (remember FIFO - first in, first out)

• Releases a permit to empty semaphore (now 1 permit)

• This unblocks the waiting producer thread

The producer thread then adds element 4 to the queue

‍

### Step 9: Final Size Check : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745860224190-Frame-242-\(1\).png)

The size method is called to check the current size of the queue:

Returns 2 (elements 3 and 4 are in the queue)

‍

## ‍📈 Complexity Analysis :

```
>⏳ Time Complexity : 
enqueue(): O(1) (Adding to the front of the queue is constant time)
dequeue(): O(1) (Removing from the rear is constant time)

>🗃️ Space Complexity : 
size(): O(1) (ConcurrentLinkedDeque provides O(1) size retrieval)
```

‍

## 🗝️Key Insights : 

• Semaphores are used to control concurrent access and blocking behavior.

• ConcurrentLinkedDeque is used for thread-safe operations.

• Blocking behavior ensures producers wait if the queue is full and consumers wait if the queue is empty.

Efficient operations with O(1) complexity.

---
