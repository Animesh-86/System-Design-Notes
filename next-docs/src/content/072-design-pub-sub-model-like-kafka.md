---
title: "Design Pub-Sub Model like Kafka"
type: lld
order: 72
---

# Design Pub-Sub Model like Kafka

Topic Tags:

system designlld

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

# ‍

# Low-Level Design: Pub-Sub Message Queue System (Kafka) 📝

A Pub-Sub Message Queue system is designed to facilitate asynchronous communication between publishers and subscribers through topics. The system needs to support multiple topics, efficient message publishing, reliable message delivery to subscribers, and parallel subscriber execution while maintaining high throughput and low latency.

‍

## Kafka Key Concepts : 

### Topic : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745292252963-image.png)

‍

A topic is a category or feed name to which messages are published. Publishers send messages to specific topics, and subscribers consume messages from the topics they're interested in. Topics act as logical channels that separate different streams of data.

‍

### Partition : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745292259944-image.png)

‍

Each topic is split into partitions, which are the fundamental unit of parallelism in Kafka:

• Partitions allow horizontal scaling of message processing

• Each partition is an ordered, immutable sequence of messages

• Messages within a partition are assigned a sequential ID called an offset

• Partitions are distributed across the brokers in a Kafka cluster

‍

### Offset : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745292267666-image.png)

‍

An offset is a unique identifier for each message within a partition:

• It's a sequential integer assigned when a message is published to a partition

• Consumers track their position in each partition using offsets

• This allows consumers to resume from where they left off after a failure

• Offsets enable at-least-once, at-most-once and exactly-once delivery semantics

‍

### Consumer : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745292276254-image.png)

‍

### Producers : 

• Multiple producers (Producer1, Producer2, Producer3) generate data streams like order, access\_log, and user\_behavior, which are then consumed by corresponding consumers. 🧾➡️📦

‍

### Consumers read messages from topics:

• Consumers can be part of consumer groups for parallel processing

• When multiple consumers belong to the same group, each consumer receives messages from a subset of partitions

• This enables horizontal scaling of message consumption

• Consumers track the latest offset they've processed for each partition

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745292302872-image.png)

‍

### Consumer Lag :

Consumer lag is the difference between the producer offset and the consumer offset, indicating how many messages the consumer is behind—here, a lag of 4 (7 - 3). 🕒📉

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745292312492-image.png)

‍

### Consumer Pulling Mechanism : 

In a messaging system, there are two modes for data consumption:

• Push Model: The topic pushes data directly into the consumer.

• Pull Model: The consumer actively pulls data from the topic. (Mostly used)

‍

As illustrated in the image, the Pull model involves the consumer requesting data from the topic queue, typically tracking message offsets (like g, f, e, etc.) to know which messages to consume next.

‍

## System Design Considerations for Topics and Consumers : 

• ✅ Multiple Topic Support:

 The system allows the creation of multiple topics where messages can be published.

• ✅ Publisher Flexibility:

 Publishers can send messages to specific topics of interest.

• ✅ Subscriber Flexibility:

 Subscribers have the option to subscribe to one or more topics based on their needs.

• ✅ Broadcast to Subscribers:

 Messages published to a topic are delivered to all subscribers of that topic.

• ✅ Parallel Consumption:

 Subscribers (consumers) should be designed to run in parallel, improving throughput and scalability.

‍

Operation:

• Publishers create and send messages to specific topics

• The system stores messages and manages their distribution

• Subscribers receive messages from topics they've subscribed to

• The system handles concurrent message processing by multiple subscribers

‍

Features:

• Topic-based message routing

• Parallel processing of messages by subscribers

• Message persistence for reliability

• Support for multiple publishers and subscribers

‍

## Interview Setting 🤝

### Point 1: Introduction and Vague Problem Statement : 

Interviewer: Let's start with a basic problem statement. Design a Message Queue supporting the publisher-subscriber model like Kafka.

‍

Candidate: Sure! Here's my understanding of the requirements for a Pub-Sub Message Queue:

• The system will allow messages to be published to specific topics

• Multiple consumers/subscribers can subscribe to these topics

• When a message is published, all consumers/subscribers of that topic should receive it in parallel

• Subscribers should process messages independently and in parallel

Is this the expected direction for the design?

‍

Interviewer: Yes, you are on the right track. Please continue.

‍

Candidate: Great! Before diving into the design, I'd like to clarify a few requirements:

• Do we need to support message persistence if subscribers are offline?

• Are there any ordering guarantees for messages?

• Do we need to support message acknowledgment or retry mechanisms?

### Point 2: Clarifying Requirements : 

Interviewer: We want a system that:

• Supports multiple topics where publishers can send messages

• Allows subscribers to subscribe to one or more topics

• Delivers each message to all subscribers of the topic

• Supports parallel execution/consumption by subscribers

• Maintains message ordering within a topic (partition in more granular terms)

• Provides basic persistence to handle temporary subscriber unavailability

‍

Candidate: To summarize, the key requirements are:

• A flexible pub-sub system with topic-based message routing

• Support for parallel subscriber consumption & processing

• Message persistence and ordering within topics

• Ability to scale with multiple publishers and subscribers

‍

Interviewer: Perfect, let's proceed.

‍

### Point 3: Identifying Key Components : 

Candidate: Now that we have the requirements, let's identify the key components of our Pub-Sub Message Queue system:

• Message: Class representing the message payload

• Topic: Entity that categorizes messages and maintains a list of messages

• IPublisher: Interface for publishing messages to topics

• ISubscriber: Interface for receiving and processing messages from subscribed topics

• TopicSubscriber: Associates a subscriber with a topic and tracks message consumption offset

• TopicPublisher: Associates a publisher with a topic

• KafkaController: Central component that manages topics, publishers, subscribers and message delivery

‍

Interviewer: That sounds good. Let's proceed with the design details.

‍

### Point 4: Design Challenges : 

Interviewer: What design challenges do you anticipate?

‍‍

Candidate: The key challenges for the Pub-Sub Message Queue system include:

• Concurrency Control: Managing concurrent access to topics and messages

• Message Delivery: Ensuring all subscribers receive messages reliably & concurrently

• Offset Management: Tracking which messages each subscriber has processed

• Parallelism: Supporting parallel message processing by subscribers

• State Management: Maintaining topic state and subscriber positions in message streams

‍

### Point 5: Implementation : 

Interviewer: Ready to discuss implementation?

‍

Candidate: Yes. I'll implement a system with the above discussed key components:

‍

### Kafka Design with Design Patterns : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745292328186-image.png)

‍

1.) Implement Core Publisher and Subscriber Interfaces : 

_• IPublisher Interface (for Publisher):_

Interface representing a message publisher in the pub-sub system. Publishers will implement this interface to publish messages to topics.

```java

public interface IPublisher {
String getId();
void publish(String topicId, Message message) throws IllegalArgumentException;
}
```

‍

_• ISubscriber Interface (for Subscriber ) :_  

Interface representing a message subscriber in the pub-sub system.

Subscribers implement this interface to receive and process messages from topics.

```java

public interface ISubscriber {
String getId();
void onMessage(Message message) throws InterruptedException;
}
```

‍‍

2.) Implement Concrete Publishers and Subscribers :

Concrete Subscribers : 

Simple Subscriber :

```java

public class SimpleSubscriber implements ISubscriber {
private final String id;
public SimpleSubscriber(String id) {
this.id = id;
}
@Override
public String getId() {
return id;
}

@Override
public void onMessage(Message message) throws InterruptedException {
// Processing the received message.
System.out.println("Subscriber " + id + " received: " + message.getMessage());
// Simulate processing delay if desired
Thread.sleep(500);
}
}
```

‍

Concrete Publishers : 

Simple Publisher : 

```java

public class SimplePublisher implements IPublisher {
private final String id;
private final KafkaController kafkaController;

public SimplePublisher(String id, KafkaController kafkaController) {
this.id = id;
this.kafkaController = kafkaController;
}

@Override
public String getId() {
return id;
}
@Override
public void publish(String topicId, Message message) throws IllegalArgumentException {
kafkaController.publish(this, topicId, message);
System.out.println("Publisher " + id + " published: " + message.getMessage() + " to topic " + topicId);
}
}
```

‍

3.) Implement Core Classes :

These are the core entities of our system.

Message : 

```java

public class Message {
private final String message;
public Message(String message) {
this.message = message;
}
public String getMessage() {
return message;
}
}
```

‍

_• TopicSubscriber :_ 

```java

public class TopicSubscriber {
private final Topic topic;
private final ISubscriber subscriber;
private final AtomicInteger offset;

public TopicSubscriber(Topic topic, ISubscriber subscriber) {
this.topic = topic;
this.subscriber = subscriber;
this.offset = new AtomicInteger(0);
}

public Topic getTopic() {
return topic;
}

public ISubscriber getSubscriber() {
return subscriber;
}

public AtomicInteger getOffset() {
return offset;
}
}
```

‍

_• Topic Publisher :_ 

```java

public class TopicPublisher {
private final Topic topic;
private final IPublisher publisher;

public TopicPublisher(Topic topic, IPublisher publisher) {
this.topic = topic;
this.publisher = publisher;
}
public Topic getTopic() {
return topic;
}

public IPublisher getPublisher() {
return publisher;
}
}
```

‍

• _Topic_ : 

A topic maintains a list of messages.

```java

public class Topic {
private final String topicName; // Name of the topic, used for identification/display purposes.
private final String topicId; // Unique identifier for the topic.
// List to store all messages published to this topic.
// This list is exposed to the outside using an immutable getter.
private final List<Message> messages;
public Topic(final String topicName, final String topicId) {
this.topicName = topicName;
this.topicId = topicId;
this.messages = new ArrayList<>();
}

public String getTopicName() {
return topicName;
}
public String getTopicId() {
return topicId;
}
public synchronized void addMessage(Message message) {
messages.add(message);
}

public synchronized List<Message> getMessages() {
return Collections.unmodifiableList(messages);
}
// Getters Section End
}
```

‍

3.) Implement Corresponding Controllers : 

_Topic Publisher Controller :_ 

```java

public class TopicPublisherController {
private final Topic topic; //We could have used TopicPublisher also directly 
private final IPublisher publisher;
public TopicPublisherController(Topic topic, IPublisher publisher) {
this.topic = topic;
this.publisher = publisher;
}
// Synchronized publish method ensures thread-safe publishing for this topic.
public synchronized void publish(Message message, KafkaController controller) {
controller.publish(publisher, topic.getTopicId(), message);
System.out.println("Publisher " + publisher.getId() + " published to topic " + topic.getTopicName());
}
}
```

‍

• _Topic Subscriber Controller :_ 

```java

public class TopicSubscriberController implements Runnable {
private final TopicSubscriber topicSubscriber;
public TopicSubscriberController(TopicSubscriber topicSubscriber) {
this.topicSubscriber = topicSubscriber;
}

@Override
public void run() {
Topic topic = topicSubscriber.getTopic();
ISubscriber subscriber = topicSubscriber.getSubscriber();
while (true) {
Message messageToProcess = null;

synchronized (topicSubscriber) {
// Wait until there is a new message (offset is less than the number of messages)
while (topicSubscriber.getOffset().get() >= topic.getMessages().size()) {
try {
topicSubscriber.wait();
} catch (InterruptedException e) {
Thread.currentThread().interrupt();
return;
}
}
// Retrieve the next message and increment the offset
int currentOffset = topicSubscriber.getOffset().getAndIncrement();
messageToProcess = topic.getMessages().get(currentOffset);
}
// Process the message outside of the synchronized block & this processing can also be done in parallel in some other threads
try {
subscriber.onMessage(messageToProcess);
} catch (InterruptedException e) {
Thread.currentThread().interrupt();
return;
}
}
}
}
```

‍

• Kafka Controller : 

```java

public class KafkaController {
// Map of topic IDs to Topic objects.
private final Map<String, Topic> topics;
// Map of topic IDs to their list of TopicSubscriber associations.
private final Map<String, List<TopicSubscriber>> topicSubscribers;
// ExecutorService to run subscriber tasks concurrently.
private final ExecutorService subscriberExecutor;
private final AtomicInteger topicIdCounter;

public KafkaController() {
topics = new ConcurrentHashMap<>();
topicSubscribers = new ConcurrentHashMap<>();
// Using a cached thread pool to dynamically manage threads.
subscriberExecutor = Executors.newCachedThreadPool();
topicIdCounter = new AtomicInteger(0);
}

public Topic createTopic(String topicName) {
String topicId = String.valueOf(topicIdCounter.incrementAndGet());
Topic topic = new Topic(topicName, topicId);
topics.put(topicId, topic);
topicSubscribers.put(topicId, new CopyOnWriteArrayList<>());
System.out.println("Created topic: " + topicName + " with id: " + topicId);
return topic;
}

public void subscribe(ISubscriber subscriber, String topicId) {
Topic topic = topics.get(topicId);
if (topic == null) {
System.err.println("Topic with id " + topicId + " does not exist");
return;
}
TopicSubscriber ts = new TopicSubscriber(topic, subscriber);
topicSubscribers.get(topicId).add(ts);
// Submit the subscriber task to the executor.
subscriberExecutor.submit(new TopicSubscriberController(ts));
System.out.println(
"Subscriber " + subscriber.getId() + " subscribed to topic: " + topic.getTopicName());
}

public void publish(IPublisher publisher, String topicId, Message message) {
Topic topic = topics.get(topicId);
if (topic == null) {
throw new IllegalArgumentException("Topic with id " + topicId + " does not exist");
}
topic.addMessage(message);
// wake up each subscriber on its own monitor
List<TopicSubscriber> subs = topicSubscribers.get(topicId);
for (TopicSubscriber topicSubscriber : subs) {
synchronized (topicSubscriber) {
topicSubscriber.notify();
}
}
System.out.println(
"Message \"" + message.getMessage() + "\" published to topic: " + topic.getTopicName());
}

// Resets the offset for the given subscriber on the specified topic.
public void resetOffset(String topicId, ISubscriber subscriber, int newOffset) {
List<TopicSubscriber> subscribers = topicSubscribers.get(topicId);
if (subscribers == null) {
System.err.println("Topic with id " + topicId + " does not exist");
return;
}
for (TopicSubscriber ts : subscribers) {
if (ts.getSubscriber().getId().equals(subscriber.getId())) {
ts.getOffset().set(newOffset);
// Notify in case the subscriber thread is waiting.
synchronized (ts) {
ts.notify();
}
System.out.println("Offset for subscriber " + subscriber.getId() + " on topic "
+ ts.getTopic().getTopicName() + " reset to " + newOffset);
break;
}
}
}

// Shutdown the ExecutorService gracefully.
public void shutdown() {
subscriberExecutor.shutdown();
try {
if (!subscriberExecutor.awaitTermination(5, TimeUnit.SECONDS)) {
subscriberExecutor.shutdownNow();
}
} catch (InterruptedException e) {
subscriberExecutor.shutdownNow();
}
}
}
```

‍

4.) Client Code to Run the System : 

```java

public class Main {
public static void main(String[] args) {
KafkaController kafkaController = new KafkaController();
// Create topics.
Topic topic1 = kafkaController.createTopic("Topic1");
Topic topic2 = kafkaController.createTopic("Topic2");

// Create subscribers.
SimpleSubscriber subscriber1 = new SimpleSubscriber("Subscriber1");
SimpleSubscriber subscriber2 = new SimpleSubscriber("Subscriber2");
SimpleSubscriber subscriber3 = new SimpleSubscriber("Subscriber3");
// Subscribe: subscriber1 subscribes to both topics,
// subscriber2 subscribes to topic1, and subscriber3 subscribes to topic2.
kafkaController.subscribe(subscriber1, topic1.getTopicId());
kafkaController.subscribe(subscriber1, topic2.getTopicId());
kafkaController.subscribe(subscriber2, topic1.getTopicId());
kafkaController.subscribe(subscriber3, topic2.getTopicId());
// Create publishers.
SimplePublisher publisher1 = new SimplePublisher("Publisher1", kafkaController);
SimplePublisher publisher2 = new SimplePublisher("Publisher2", kafkaController);
// Publish some messages.
publisher1.publish(topic1.getTopicId(), new Message("Message m1"));
publisher1.publish(topic1.getTopicId(), new Message("Message m2"));
publisher2.publish(topic2.getTopicId(), new Message("Message m3"));

// Allow time for subscribers to process messages.
try {
Thread.sleep(5000);
} catch (InterruptedException e) {
e.printStackTrace();
}
publisher2.publish(topic2.getTopicId(), new Message("Message m4"));
publisher1.publish(topic1.getTopicId(), new Message("Message m5"));
// Reset offset for subscriber1 on topic1 (for example, to re-process messages).
kafkaController.resetOffset(topic1.getTopicId(), subscriber1, 0);
// Allow some time before shutting down.
try {
Thread.sleep(5000);
} catch (InterruptedException e) {
e.printStackTrace();
}
kafkaController.shutdown();
}
}
```

‍

Output : 

```
Created topic: Topic1 with id: 1
	Created topic: Topic2 with id: 2
	Subscriber Subscriber1 subscribed to topic: Topic1
	Subscriber Subscriber1 subscribed to topic: Topic2
	Subscriber Subscriber2 subscribed to topic: Topic1
	Subscriber Subscriber3 subscribed to topic: Topic2
	Message "Message m1" published to topic: Topic1
	Subscriber Subscriber1 received: Message m1
	Subscriber Subscriber2 received: Message m1
	Publisher Publisher1 published: Message m1 to topic 1
	Message "Message m2" published to topic: Topic1
	Publisher Publisher1 published: Message m2 to topic 1
	Message "Message m3" published to topic: Topic2
	Subscriber Subscriber1 received: Message m3
	Publisher Publisher2 published: Message m3 to topic 2
	Subscriber Subscriber3 received: Message m3
	Subscriber Subscriber2 received: Message m2
	Subscriber Subscriber1 received: Message m2
	Message "Message m4" published to topic: Topic2
	Subscriber Subscriber1 received: Message m4
	Subscriber Subscriber3 received: Message m4
	Publisher Publisher2 published: Message m4 to topic 2
	Message "Message m5" published to topic: Topic1
	Publisher Publisher1 published: Message m5 to topic 1
	Subscriber Subscriber1 received: Message m5
	Subscriber Subscriber2 received: Message m5
	Offset for subscriber Subscriber1 on topic Topic1 reset to 0
	Subscriber Subscriber1 received: Message m1
	Subscriber Subscriber1 received: Message m2
	Subscriber Subscriber1 received: Message m5
	
	‍
```

Interviewer: Looks good. What makes your approach effective?

‍

Candidate: Here are the key strengths of my approach to the Kafka-like messaging system:

**Separation of Concerns: Each component in the architecture has a clearly defined responsibility:** 

• Interfaces (IPublisher, ISubscriber) define clear contracts for message publication and consumption

• Core classes like Message, Topic, TopicSubscriber handle data and state management

• Controller classes (KafkaController, TopicSubscriberController) manage the coordination of messaging operations

• Concrete implementations like SimplePublisher and SimpleSubscriber provide specific behaviors

‍‍

**Single Responsibility: Each class has one primary responsibility:** 

• Topic only maintains messages and notification logic

• TopicSubscriber tracks subscription state for a single subscriber

• TopicSubscriberController manages message delivery to a specific subscriber

• KafkaController coordinates the entire system while delegating specific tasks

• Following SRP results in smaller, focused classes that are easier to understand and extend

‍

**Thread Safety:** 

• Using ConcurrentHashMap for thread-safe collections

• Synchronized blocks to protect critical sections

• AtomicInteger for offset tracking to prevent race conditions

• Wait/notify mechanism for efficient thread coordination

• This allows the system to handle concurrent operations safely while minimizing resource usage

‍

## Conclusion:

The Kafka-like messaging system we've designed showcases how solid architectural principles can be combined to create a robust, scalable solution for distributed messaging. By implementing interfaces like IPublisher and ISubscriber, along with concrete implementations and appropriate controllers, we've built a system that captures the essence of Kafka's publish-subscribe model while maintaining clean code principles.

---
