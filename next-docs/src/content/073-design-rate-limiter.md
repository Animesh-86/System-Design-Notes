---
title: "Design Rate Limiter"
type: lld
order: 73
---

# Design Rate Limiter

Topic Tags:

System DesignLLD

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

# ‍

# Low-Level Design: Rate Limiter 🛑

A rate limiter controls the frequency of operations within a system. It manages multiple functions including processing incoming requests, monitoring resource availability, and making decisions to allow or reject requests based on defined policies. This helps maintain system performance and prevents overload situations.

‍

## Major Rate Limiting Algorithms:

1\. **Leaky Bucket Algorithm:**

Functions like a queue with a constant processing rate, similar to a bucket with a hole that leaks at a steady rate regardless of how quickly water flows in.

‍

2\. **Fixed Window Counter Algorithm:**

Counts requests within fixed time intervals, resetting the counter at the beginning of each new window.

‍

3.  **Sliding Window Log Algorithm:**

Keeps a record of request timestamps within a continuously moving time window, providing precise rate tracking.

‍

4\. **Sliding Window Counter Algorithm:**

Merges fixed window approach with weighted averaging to approximate a continuously sliding window while using less memory.

‍

### Token Bucket Algorithm : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745737205521-image.png)

‍

The Token Bucket algorithm uses a bucket that fills with tokens at a constant rate. When a request arrives, it must claim a token to proceed. If tokens are available, the request is allowed; otherwise, it's rejected. The bucket has a maximum capacity, preventing token accumulation beyond a certain point.

‍

### 🗝️Key characteristics:

○ Tokens are added to the bucket at a fixed rate (e.g., 3 token per second)

○ The bucket has a maximum capacity (e.g., 5 tokens)

○ Each request consumes one or more tokens

○ Allows for bursts of traffic up to the bucket's capacity

○ If the bucket is empty, requests are rejected/handled until more tokens are added

‍

### Implementation details:

○ Tokens are "refilled" based on the time elapsed since the last refill operation

○ When a request arrives, the algorithm first calculates and adds any newly generated tokens based on elapsed time. (or a background job/thread which does refill task)

○ Then it checks if sufficient tokens are available for the request

○ Thread synchronization is critical to prevent race conditions in concurrent environments

○ The algorithm efficiently handles both constant and bursty traffic patterns

‍

### 🤹🏼Example of Token Bucket in action:

Consider a token bucket with a maximum capacity of 5 tokens, generating 3 tokens per second, with each request requiring 1 token:

‍

• Initial state (t=0s): The bucket starts with 3 newly generated tokens.

• During first second: 2 requests arrive and consume 2 tokens, leaving 1 token in the bucket.

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745737249826-image.png)

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745737271178-image.png)

‍

• Start of second second (t=1s): 3 new tokens are added, bringing the total to 4 tokens.

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745737294878-image.png)

‍

• During second second: 5 requests arrive. The first 4 use the available tokens, but the 5th request is rejected due to lack of tokens.

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745737324300-image.png)

‍

Start of third second (t=2s): 3 new tokens are generated, bucket now has 3 tokens.

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745737352671-image.png)

‍

• During third second: No requests arrive, tokens remain in the bucket.

Start of fourth second (t=3s): 3 more tokens are generated, but since the maximum capacity is 5, the bucket now contains 5 tokens.

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745737535925-image.png)

‍

### Setup:

• The rate limiter has a configurable maximum capacity and tokens per second rate.

• Each request may require one or more tokens to be processed.

• The rate limiter supports different algorithms for controlling request flow.

• The system provides operations for trying to acquire tokens and adjusting rates.

‍

### Operation:

• Users send requests through an API client to the rate limiter.

• The rate limiter determines if the request can be processed based on available tokens.

• When tokens are depleted, requests are blocked until tokens are replenished.

• The system handles concurrent access to the rate limiter efficiently.

‍

### Safety Features:

• Thread safety mechanisms to handle concurrent operations. (Requesting access to the system)

• Automatic token refilling to manage request flow.

• Configurable rates and capacities for different use cases.

• Extensible design for various rate limiting algorithms.

‍

## Interview Setting 🤝:

### Point 1: Introduction and Vague Problem Statement:

Interviewer: Let's start with a basic problem statement. Design a Rate Limiter.

‍

Candidate: Certainly! Here's my understanding of the Rate Limiter:

• The system will control the rate at which requests can be processed.

• It needs to manage request flow by employing different rate limiting algorithms.

• The system supports two basic operations: giveAccess (check if request can proceed) and updateConfiguration (adjust rate and other parameters). (There can be onReject() as well, but we assume, we drop the request & don't handle it (handle as in put in a dead letter queue for backoff processing)

• The system should be thread-safe and handle concurrent operations.

• We need to ensure proper resource allocation for both global and per-user rate limiting.

Does this align with what you're looking for?

‍

Interviewer: Yes, you are aligned with the direction. Please continue ahead.

‍

Candidate: Great! Before diving into the design, I'd like to clarify a few requirements:

• What rate limiting algorithms should we implement?

• How should we handle concurrent access to ensure thread safety?

• Should we support both global and per-user rate limiting?

• How should token replenishment work? Automatic periodic refill or on-demand?

‍

### Point 2: Clarifying Requirements:

Interviewer: We want a system that:

• Supports different rate limiting algorithms, but only implements any one (Token Bucket) for now.

• Handles concurrent operations safely using appropriate synchronization mechanisms.

• Provides asynchronous request handling.

• Can be configured with different capacities and refill rates. (config values)

• Supports both global and per-user rate limiting. (Per resource i.e. user is also sufficient)

‍

Candidate: To summarize, the key requirements are:

• A rate limiter with configurable capacity and tokens per second.

• Implementation of Token Bucket algorithm with extensibility for other algorithms.

• Thread safety for concurrent operations using locks and concurrent collections.

• Asynchronous processing of requests.

• Support for both global and per-user rate limiting with a consistent key approach.

• Automatic token refilling using a scheduled background task.

‍

Interviewer: Perfect, let's proceed.

‍

### Point 3: Identifying Key Components:

Candidate: Now that we have the requirements, let's identify the key components of our Rate Limiter system:

IRateLimiter: Interface for different rate limiting algorithms with giveAccess, updateConfiguration, and shutdown methods.

TokenBucketStrategy: Implementation of Token Bucket rate limiting with inner Bucket class for token management.

‍

RateLimiterType: Enum to identify different rate limiting algorithms (TOKEN\_BUCKET, FIXED\_WINDOW, etc.).

RateLimiterFactory: Factory for creating rate limiters of different types based on configuration.

‍

RateLimiterController: Controller that delegates to underlying rate limiter and processes requests asynchronously.

‍

### Point 4: Design Challenges:

Interviewer: What design challenges do you anticipate?

Candidate: The key challenges for the Rate Limiter system include:

• Thread Safety: Ensuring thread-safe token consumption and refilling under high concurrency.

• Token Bucket Management: Efficiently managing potentially thousands of separate token buckets for per-user limiting.

• Extensibility: Designing a clean interface that accommodates different rate limiting algorithms.

‍

### Point 5: Approach:

Interviewer: How would you approach these challenges?

‍

Candidate: I propose the following approach:

• Strategy Pattern: Using IRateLimiter interface to allow different rate limiting implementations.

• Factory Pattern: Using RateLimiterFactory to create appropriate rate limiter instances.

• Thread Safety: Using ReentrantLock for fine-grained synchronization of individual buckets.

• Concurrent Collections: Using ConcurrentHashMap for thread-safe storage of per-user buckets.

• Scheduled Execution: Using ScheduledExecutorService for automatic token refilling at fixed intervals.

• Asynchronous Processing: Using CompletableFuture to process requests asynchronously.

• Token Bucket Algorithm: Implementing token consumption and refill with proper synchronization.

‍

Interviewer: That sounds like a solid approach. Let's delve into the implementation details.

‍

### Point 6: Implementation:

Interviewer: Ready to discuss implementation?

‍

Candidate: Yes, I'll outline the implementation for our key components:

‍

### Rate Limiter Design with Design Patterns : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745737570400-image.png)

‍

### 1\. Implementing the Token Bucket Strategy : 

a. Implement the Common Startegy Interface : 

▪ IRateLimiter : Core contract for all rate limiting algorithms.

• giveAccess(String rateLimitKey): Checks if a request is allowed based on available tokens.

• updateConfiguration(Map<String, Object>): Updates configuration parameters dynamically.

shutdown()/close(): Cleans up resources used by the rate limiter.

‍

```java

/**
- Interface for all rate limiting strategies.
- New strategies (e.g., fixed window, sliding window, leaky bucket, etc.)
- can easily be added by implementing this interface.
*/
public interface IRateLimiter {
/**
- Determines if a request should be allowed based on the rate limiting rules.
-    - @param rateLimitKey The key used for rate limiting; if non-null, used to
-     identify a per‑user bucket.
-                     A null (or empty) key indicates global rate limiting.
- @return true if the request is allowed; false otherwise.
*/
boolean giveAccess(String rateLimitKey);


/**
- Dynamically updates configuration parameters for the rate limiter.
-    - @param config A map of configuration options.
*/
void updateConfiguration(Map<String, Object> config);


/**
- Cleanly shuts down the rate limiter (e.g., stops background tasks).
*/
void shutdown();
}
```

‍

b. TokenBucketStrategy : Implements Token Bucket algorithm.

• Uses bucketCapacity to define maximum tokens per bucket.

• Uses refreshRate to define tokens added per second.

• Maintains a globalBucket for requests without a specific key.

• Uses ConcurrentHashMap<String, Bucket> for per-user buckets. (I might sound a lot of data to keep in-memory, in ideal cases, we'll back it up by a DB, and can store in cache for faster reads & writes)

‍

Implements automatic token refilling using a scheduled executor

‍

```java

/**
- Token Bucket algorithm implementation.
- Supports both global and per‑user rate limiting.
*/
public class TokenBucketStrategy implements IRateLimiter {
private final int bucketCapacity; // Maximum tokens per bucket.
private volatile int
refreshRate; // Tokens added per refill interval (per second).
// Global token bucket used when no key is provided.
private final Bucket globalBucket;
// Map of per‑user buckets indexed by a consistent rate limiting key.
private final ConcurrentHashMap<String, Bucket> userBuckets;
// Scheduled executor for automatic token refill.
private final ScheduledExecutorService scheduler;
private final long refillIntervalMillis; // Refill interval in milliseconds
// (1000 ms = 1 sec).

/**
- Inner class representing an individual token bucket.
- Uses simple locking (ReentrantLock) for ensuring thread-safe consumption
- and refill.
*/
private class Bucket {
private int tokens;
private final ReentrantLock lock = new ReentrantLock();

public Bucket(int initialTokens) {
this.tokens = initialTokens;
}

/**
- Attempts to consume one token.
- Uses explicit locking to ensure that only one thread can update the token
- count at a time.
-      - @return true if a token was available and consumed; false otherwise.
*/
public boolean tryConsume() {
lock.lock();
try {
if (tokens > 0) {
tokens--;
return true;
}
return false;
} finally {
lock.unlock();
}
}

/**
- Refills the bucket by adding refreshRate tokens without exceeding
- bucketCapacity.
*/
public void refill() {
lock.lock();
try {
tokens = Math.min(bucketCapacity, tokens + refreshRate);
} finally {
lock.unlock();
}
}
}

/**
- Constructs a TokenBucketStrategy.
-    - @param bucketCapacity Maximum tokens available per bucket.
- @param refreshRate    Tokens added per second.
*/
public TokenBucketStrategy(int bucketCapacity, int refreshRate) {
this.bucketCapacity = bucketCapacity;
this.refreshRate = refreshRate;
this.refillIntervalMillis = 1000; // 1 second refill interval.
this.globalBucket = new Bucket(bucketCapacity);
this.userBuckets = new ConcurrentHashMap<>();
this.scheduler = Executors.newSingleThreadScheduledExecutor();
startRefillTask();
}

/**
- Schedules a periodic task that refills tokens for both the global bucket
- and all per‑user buckets.
*/
private void startRefillTask() {
scheduler.scheduleAtFixedRate(() -> {
// Refill global bucket.
globalBucket.refill();
// Refill each per‑user bucket.
for (Bucket bucket : userBuckets.values()) {
bucket.refill();
}
}, 0, refillIntervalMillis, TimeUnit.MILLISECONDS);
}

/**
- Checks if a request is allowed.
- If a non-null, non‑empty key is provided, a per‑user bucket is used;
- otherwise, the global bucket is used.
*/
@Override
public boolean giveAccess(String rateLimitKey) {
if (rateLimitKey != null && !rateLimitKey.isEmpty()) {
// Use a per‑user bucket (always created with the same key for a given
// user).
Bucket bucket = userBuckets.computeIfAbsent(
rateLimitKey, key -> new Bucket(bucketCapacity));
return bucket.tryConsume();
} else {
// Use the global bucket.
return globalBucket.tryConsume();
}
}

/**
- Updates the configuration for the token bucket.
- Currently, only the refreshRate is adjustable.
*/
@Override
public void updateConfiguration(Map<String, Object> config) {
if (config.containsKey("refreshRate")) {
this.refreshRate = (int) config.get("refreshRate");
}
}

/**
- Shuts down the scheduler that refills tokens.
*/
@Override
public void shutdown() {
scheduler.shutdownNow();
}
}
```

‍

### 2\. Implement The Factory Pattern for Strategy Creations : 

‍

a. Create common Enum : 

RateLimiterType : 

```java

//Enumeration of supported rate limiter types.
public enum RateLimiterType {
TOKEN_BUCKET,
FIXED_WINDOW,
SLIDING_WINDOW,
LEAKY_BUCKET
}
```

‍

ii. Rate Limiter Factory : Creates rate limiters based on type and configuration.

• Uses a Map of factory functions for each RateLimiterType.

• Provides createLimiter method to instantiate appropriate rate limiters.

Allows registration of new limiter types through registerLimiterFactory method

‍

```java

/**
- Factory class that creates rate limiter instances based on the provided type
- and configuration. New rate limiting strategies can be added by registering
- additional factory functions.
*/
public class RateLimiterFactory {
private static final Map<RateLimiterType,
Function<Map<String, Object>, IRateLimiter>> limiterFactories =
new HashMap<>();


static {
// Factory registration for the Token Bucket rate limiter.
limiterFactories.put(RateLimiterType.TOKEN_BUCKET, config -> {
int capacity = (int) config.getOrDefault("capacity", 10);
int refreshRate;
if (config.containsKey("refreshRate")) {
refreshRate = (int) config.get("refreshRate");
} else {
double tokensPerSecond =
(double) config.getOrDefault("tokensPerSecond", 10.0);
refreshRate = (int) Math.round(tokensPerSecond);
}
return new TokenBucketStrategy(capacity, refreshRate);
});


// Additional strategies (FIXED_WINDOW, SLIDING_WINDOW, LEAKY_BUCKET, etc.)
// can be registered here.
}


/**
- Creates an IRateLimiter instance for the specified type using the provided
- configuration.
-    - @param type   The type of rate limiter.
- @param config The configuration parameters.
- @return A new IRateLimiter instance.
- @throws IllegalArgumentException if the specified type is not supported.
*/
public static IRateLimiter createLimiter(
RateLimiterType type, Map<String, Object> config) {
Function<Map<String, Object>, IRateLimiter> factory =
limiterFactories.get(type);
if (factory == null) {
throw new IllegalArgumentException(
"Unsupported rate limiter type: " + type);
}
return factory.apply(config);
}


/**
- Allows for dynamic registration of new rate limiter factory functions.
-    - @param type    The rate limiter type.
- @param factory The factory function to create the rate limiter.
*/
public static void registerLimiterFactory(RateLimiterType type,
Function<Map<String, Object>, IRateLimiter> factory) {
limiterFactories.put(type, factory);
}
}
```

‍

### 3\. Implement the Rate Limiter Controller : 

a. RateLimiterController : Processes requests using a rate limiter.

• Takes a RateLimiterType and configuration to create a limiter via the factory.

‍

• Uses ExecutorService for concurrent request processing.

‍

• Returns CompletableFuture<Boolean> from processRequest for asynchronous results. (Ideally it should be very fast, if not we can attach a timeout as discussed in CompletableFuture video & can let processRequest. -> In Ideal world when you are not able to come to a conclusion of to allowRequest or to throttle it, you allowRequest & let it go & async update your token count -> Obviously you might over-consume a bit of your tokens, but its FINE !! )

‍

• Provides updateConfiguration method to adjust rate limiter settings.

Provides shutdown method to clean up resources.

‍

```java

/**
- Controller that delegates incoming requests to a rate limiter.
- Processes requests concurrently using an ExecutorService.
*/
public class RateLimiterController {
private final IRateLimiter rateLimiter;
private final ExecutorService executor;

/**
- Constructs a RateLimiterController by creating a rate limiter using the
- factory and assigning an ExecutorService.
-    - @param type            The rate limiter type.
- @param config          Configuration for the rate limiter.
- @param executorService The ExecutorService for concurrent request
-     processing.
*/
public RateLimiterController(RateLimiterType type, Map<String, Object> config,
ExecutorService executorService) {
this.rateLimiter = RateLimiterFactory.createLimiter(type, config);
this.executor = executorService;
}

/**
- Processes a request asynchronously.
- The provided key is used for rate limiting (for per‑user buckets when
- applicable).
-    - @param rateLimitKey The key used for rate limiting; use a consistent key
-     for the same user.
-                     A null key indicates global rate limiting.
- @return A CompletableFuture that completes with true if the request is
-     allowed.
*/
public CompletableFuture<Boolean> processRequest(String rateLimitKey) {
return CompletableFuture.supplyAsync(() -> {
boolean allowed = rateLimiter.giveAccess(rateLimitKey);
if (allowed) {
System.out.printf("Request with key [%s]: ✅ Allowed%n", rateLimitKey);
} else {
System.out.printf("Request with key [%s]: ❌ Blocked%n", rateLimitKey);
}
return allowed;
}, executor);
}

/**
- Updates the configuration of the underlying rate limiter.
-    - @param config The configuration options to update.
*/
public void updateConfiguration(Map<String, Object> config) {
rateLimiter.updateConfiguration(config);
}

/**
- Shuts down the controller as well as the underlying rate limiter and
- executor.
*/
public void shutdown() {
rateLimiter.shutdown();
executor.shutdownNow();
}
}
```

‍

### 4\. Client Code to run the System : 

Main,java : 

‍

```java

/**
- Main class to demonstrate the rate limiting system.
*/
public class Main {
public static void main(String[] args) {
demonstrateRateLimiting();
}

private static void demonstrateRateLimiting() {
// Configure the token bucket: maximum 5 tokens and a refill rate of 1 token
// per second.
Map<String, Object> config = new HashMap<>();
config.put("capacity", 5);
config.put("refreshRate", 1);

ExecutorService executor = Executors.newFixedThreadPool(10);
RateLimiterController controller = new RateLimiterController(
RateLimiterType.TOKEN_BUCKET, config, executor);

// --- Example 1: Global rate limiting – Burst of requests ---
System.out.println(
"=== EXAMPLE 1: Global rate limiting – Burst of requests ===");
// For global requests, we pass a null key so that all requests use the
// global bucket.
sendBurstRequests(controller, 10, null);

// --- Example 2: Global rate limiting – After waiting for tokens refill ---
System.out.println("
=== EXAMPLE 2: Global rate limiting – After waiting "
+ "for tokens refill ===");
System.out.println("Waiting 5 seconds for tokens to refill...");
sleep(5000);
sendBurstRequests(controller, 10, null);


// --- Example 3: Per-user rate limiting ---
// Here we pass a consistent user key (e.g., "user1") so that all requests
// share the same bucket.
String[] users = {"user1", "user2", "user3"};
for (String user : users) {
System.out.println("
Requests for " + user + ":");
sendBurstRequests(controller, 7, user);
}

// --- Example 4: High concurrency scenario ---
System.out.println("
=== EXAMPLE 4: High concurrency scenario ===");
// Submit 20 requests rapidly using global rate limiting (null key) for
// demonstration.
List<CompletableFuture<Boolean>> futures = new ArrayList<>();
for (int i = 1; i <= 20; i++) {
futures.add(controller.processRequest(null));
}

// --- CompletableFuture.allOf explanation ---
// 'futures.toArray(new CompletableFuture[0])' converts the list of futures
// to an array. 'CompletableFuture.allOf(...).join()' waits (blocks) until
// all the supplied futures complete.
CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

// After all futures are complete, we calculate how many requests were
// allowed. The stream filters the completed futures (each future.join()
// returns the boolean result).
long allowed = futures.stream().filter(CompletableFuture::join).count();
System.out.printf("High concurrency results: %d allowed, %d blocked%n",
allowed, 20 - allowed);
controller.shutdown();
}

/**
- Sends a burst of requests using the provided controller.
-    - @param controller   The RateLimiterController instance.
- @param count        The number of requests to send.
- @param rateLimitKey For per-user requests, this should be the same key
-     (e.g., user ID);
-                     For global requests, pass null.
*/
private static void sendBurstRequests(
RateLimiterController controller, int count, String rateLimitKey) {
List<CompletableFuture<Boolean>> futures = new ArrayList<>();
for (int i = 1; i <= count; i++) {
// In this example, the same rateLimitKey is used for each request so that
// they share the same bucket.
futures.add(controller.processRequest(rateLimitKey));
}
// Wait for all requests in the burst to complete.
CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
.join(); // Blocks until all futures complete.
// Count how many requests were allowed.
long allowed = futures.stream()
.filter(CompletableFuture::join)
.count(); // Joins each future to get its boolean result.
System.out.printf("Results: %d allowed, %d blocked (total: %d)%n", allowed,
count - allowed, count);
}

/**
- Utility method to pause execution for a given number of milliseconds.
-    - @param millis Milliseconds to sleep.
*/
private static void sleep(long millis) {
try {
Thread.sleep(millis);
} catch (InterruptedException e) {
Thread.currentThread().interrupt();
}
}
}
```

‍

Output : 

```
=== EXAMPLE 1: Global rate limiting – Burst of requests ===
Request with key [null]: ✅ Allowed
Request with key [null]: ✅ Allowed
Request with key [null]: ✅ Allowed
Request with key [null]: ✅ Allowed
Request with key [null]: ✅ Allowed
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Results: 5 allowed, 5 blocked (total: 10)

=== EXAMPLE 2: Global rate limiting – After waiting for tokens refill ===
Waiting 5 seconds for tokens to refill...
Request with key [null]: ✅ Allowed
Request with key [null]: ✅ Allowed
Request with key [null]: ✅ Allowed
Request with key [null]: ✅ Allowed
Request with key [null]: ✅ Allowed
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Results: 5 allowed, 5 blocked (total: 10)
Requests for user1:
Request with key [user1]: ✅ Allowed
Request with key [user1]: ✅ Allowed
Request with key [user1]: ✅ Allowed
Request with key [user1]: ✅ Allowed
Request with key [user1]: ✅ Allowed
Request with key [user1]: ❌ Blocked
Request with key [user1]: ❌ Blocked
Results: 5 allowed, 2 blocked (total: 7)
Requests for user2:
Request with key [user2]: ✅ Allowed
Request with key [user2]: ❌ Blocked
Request with key [user2]: ✅ Allowed
Request with key [user2]: ✅ Allowed
Request with key [user2]: ✅ Allowed
Request with key [user2]: ✅ Allowed
Request with key [user2]: ❌ Blocked
Results: 5 allowed, 2 blocked (total: 7)
Requests for user3:
Request with key [user3]: ✅ Allowed
Request with key [user3]: ✅ Allowed
Request with key [user3]: ✅ Allowed
Request with key [user3]: ✅ Allowed
Request with key [user3]: ✅ Allowed
Request with key [user3]: ❌ Blocked
Request with key [user3]: ❌ Blocked
Results: 5 allowed, 2 blocked (total: 7)


=== EXAMPLE 4: High concurrency scenario ===
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
Request with key [null]: ❌ Blocked
High concurrency results: 0 allowed, 20 blocked
```

‍

Interviewer: Looks good. What makes your approach effective? 

‍

Candidate: Here are the key strengths of my approach to the Rate Limiter system:

**Separation of Concerns: Each component in the architecture has a clearly defined responsibility:** 

• Interface (IRateLimiter) defines a clear contract for all rate limiting strategies

• Core classes like TokenBucketStrategy and its inner Bucket class handle the rate limiting logic

• Factory class (RateLimiterFactory) manages the creation of different rate limiter implementations

• Controller class (RateLimiterController) coordinates request processing and delegates to the rate limiter

‍‍

**Single Responsibility: Each class has one primary responsibility:** 

• IRateLimiter defines operations for rate limiting

• TokenBucketStrategy implements token bucket algorithm logic

• Bucket manages token state for a single user or the global bucket

• RateLimiterFactory creates appropriate rate limiter instances

• RateLimiterController handles request processing and coordination

• Following SRP results in smaller, focused classes that are easier to understand and extend

**‍**

**Thread Safety:** 

• Using ConcurrentHashMap for thread-safe storage of per-user buckets

• ReentrantLock for fine-grained locking of individual bucket operations

• ScheduledExecutorService for safe, periodic token refilling

• ExecutorService for concurrent request processing

• CompletableFuture for asynchronous and thread-safe result handling

• This approach allows the system to handle high-concurrency scenarios efficiently

‍

**Extensibility:** 

• Strategy pattern enables adding new rate limiting algorithms without changing existing code

• Factory pattern with registerLimiterFactory method allows dynamic registration of new limiters

• Configuration via Map provides flexibility to customize limiter behavior

• Clear interface boundaries make it easy to extend or replace components

‍

**Resource Management:** 

• Proper shutdown methods to release resources (executor services, scheduled tasks)

• Efficient token management that balances memory usage with performance

• Support for both global and per-user rate limiting with the same interface

‍

## ✨Conclusion:

The Rate Limiter system we've designed demonstrates how to build a robust, concurrent utility that can control access to resources based on configurable limits. By implementing the strategy and factory patterns, along with proper concurrency controls, we've created a system that can efficiently manage request flow while remaining extensible for future enhancements. The Token Bucket implementation, with its automatic refill mechanism and thread-safe operations, provides a solid foundation that can be used in high-throughput production environments.

---
