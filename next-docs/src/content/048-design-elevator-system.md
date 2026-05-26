---
title: "Design Elevator System"
type: lld
order: 48
---

# Design Elevator System

Topic Tags:

system designlld

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

## ‍

## Low-Level Design: Elevator System 🏗️

An elevator system is designed to efficiently transport people between floors in a building. The system needs to handle multiple requests, optimize elevator movement, and ensure safety. The system should be able to accommodate different priorities, handle emergency situations, and provide a smooth user experience.

‍

## Rules of the System: 

 Setup:

• The building has multiple floors and can have multiple elevators.

• Elevators can be called from any floor and can travel to any floor.

• Each elevator has a maximum capacity and weight limit.

• The system schedules elevator movement based on requests and optimizes for efficiency.

‍

Operation:

• Users can request an elevator from any floor by pressing up/down buttons.

• Inside the elevator, users can select destination floors. (There is one more type, where users can choose destination floors outside only, but we are not covering those here !!)

• The system prioritizes and schedules these requests efficiently.

• Elevators have indicators showing current floor and direction.

 ‍

Safety Features:

• Emergency stop functionality must be available.

• Overload detection prevents elevator movement if capacity is exceeded.

• Door sensors prevent doors from closing if obstructed.

## ‍

## Interview Setting 🤝

### Point 1: Introduction and Vague Problem Statement:

Interviewer: Let's start with a basic problem statement. Design an Elevator system.

‍

Candidate: Certainly! Here's my understanding of the Elevator system:

• The system will manage multiple elevators within a building.

• Users can request elevators from different floors.

• The system optimizes elevator assignments to minimize wait times.

• Safety features must be implemented to handle emergencies.

• The system should be scalable to handle buildings of different sizes.

Is this the expected flow?

‍

Interviewer: Yes, you are aligned with the flow. Please continue ahead.

‍

Candidate: Great! Before diving into the design, I'd like to clarify a few requirements:

• How many elevators should the system support?

• Are there special considerations like express elevators or service elevators?

• How should the system optimize elevator assignment?

‍

### Point 2: Clarifying Requirements:

Interviewer: We want a system that:

• Supports multiple elevators in a building with any number of floors.

• Handles both external requests (from floors) and internal requests (from inside elevators).

• Efficiently schedules elevator movement to minimize wait times. 

‍

Candidate: To summarize, the key requirements are:

• A building with multiple floors and elevators.

• External and internal request handling.

• Intelligent scheduling algorithm for elevator assignment.

• Ability to handle edge cases like power outages or maintenance.

 ‍

Interviewer: Perfect, let's proceed.

 ‍

### Point 3: Identifying Key Components:

Candidate: Now that we have the requirements, let's identify the key components of our Elevator system:

1\. Elevator: Represents individual elevator cars.

     Class: Elevator

     Description: This class represents individual elevators with their current state.

‍‍

```java

// Core Elevator class with a simple queue for managing requests
class Elevator {
private int id; // Unique identifier for the elevator
private int currentFloor; // The floor where the elevator is currently located
private Direction
direction; // The current direction of the elevator (UP, DOWN, or IDLE)
private ElevatorState state; // The current operational state of the elevator
// (e.g., MOVING, IDLE, etc.)
private List<ElevatorObserver>
observers; // A list of observers (listeners) that monitor the elevator's
// status
private Queue<ElevatorRequest>
requests; // A simple queue to manage floor requests in the order they are
// received

// Get the elevator's ID
public int getId() {
return id;
}

// Get the elevator's current floor
public int getCurrentFloor() {
return currentFloor;
}

// Get the elevator's current direction
public Direction getDirection() {
return direction;
}

// Get the elevator's current state
public ElevatorState getState() {
return state;
}

// Get a copy of the current requests queue to prevent external modification
public Queue<ElevatorRequest> getRequestsQueue() {
return new LinkedList<>(requests);
}

// Get a list of all destination floors for display purposes
public List<ElevatorRequest> getDestinationFloors() {
return new ArrayList<>(requests);
}
}
```

‍

2\. Building: Contains floors and elevators.

     Class: Building

     Description: This class represents the building structure.

‍

```java

class Building {
private String name; // Name of the building
private int numberOfFloors; // Total number of floors in the building
private ElevatorController
elevatorController; // Controller to manage all elevators in the building
}
```

‍

3\. Floor : Contains a Single Floor : 

Class : Floor 

Description : This class represents a Single Floor

‍

```java

// Represents a floor in a building
public class Floor {
private int floorNumber;

public Floor(int floorNumber) {
this.floorNumber = floorNumber;
}

public int getFloorNumber() {
return floorNumber;
}
}
```

‍

4\. ElevatorController: Manages elevator operations and scheduling.

     Class: ElevatorController

     Description: This class handles request processing and elevator assignment.

‍

```java

// Manages the operations and coordination of all elevators in a building
class ElevatorController {
private List<Elevator> elevators; // List of all elevators controlled by this system
private List<Floor> floors; // List of floors in the building
private SchedulingStrategy schedulingStrategy; // Strategy to decide which elevator should handle a request
private int currentElevatorId; // Keeps track of the current elevator's ID for handling internal requests
}
```

‍

5\. State Management with Enums:

To effectively manage elevator states, we'll use enums to achieve the functionality.

‍

```java

// Enum to represent the direction of the elevator
enum Direction {
UP,      // The elevator is moving upward
DOWN,    // The elevator is moving downward
IDLE     // The elevator is stationary, not moving
}

// Enum to represent the state of the elevator
enum ElevatorState {
IDLE,         // The elevator is not moving, waiting for requests
MOVING,       // The elevator is in motion (either up or down)
STOPPED,      // The elevator has temporarily stopped (e.g., at a floor)
MAINTENANCE   // The elevator is out of service and undergoing maintenance
}
```

‍

Interviewer: That sounds good. Let's proceed with the design details.

 ‍

Point 4: Design Challenges:

Interviewer: What design challenges do you anticipate?

 ‍

Candidate: The key challenges for the Elevator system include:

• Efficient Scheduling Algorithm: Minimizing wait times and optimizing elevator assignments.

• Handling Concurrent Requests: Managing multiple simultaneous requests. (Can be ignored also)

• Fault Tolerance: Ensuring system functionality if an elevator fails. (Edge Case)

• Load Balancing: Distributing requests across multiple elevators.

• Handling emergency stops, power outages, and maintenance modes. (Edge Cases)

 ‍

Point 5: Approach:

Interviewer: How would you approach these challenges?

‍

Candidate: I propose using design patterns effectively. Here are my strategies:

1\. Observer Pattern for Event Handling:

  - Notifies system components of state changes.

  - Enables real-time updates for display panels and monitoring systems.

 ‍

2\. Command Pattern for Request Processing:

  - Encapsulates each request as an object.

  - Allows for request queuing, prioritization, and cancellation.

 ‍

3\. Strategy Pattern for Scheduling Algorithms:

  - Enables different scheduling strategies.

  - Can switch between algorithms based on time of day or building needs.

 ‍‍

Interviewer: That sounds like a solid approach. Let's delve into the implementation details.

 ‍

Point 6: Implementation:

Interviewer: Ready to discuss implementation?

Candidate: Yes. I'll focus on a modular and scalable design that meets the core Elevator system requirements.

‍

Elevator System Implementation With Design Patterns : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743478554267-Frame-245-\(4\).png)

‍

1.) Observer Pattern for Event Handling:

The Observer pattern will help notify relevant components about elevator state changes and events.

ElevatorObserver Interface : 

‍

```java

// Observer interface for handling elevator events
interface ElevatorObserver {
// Called when an elevator's state changes
void onElevatorStateChange(Elevator elevator, ElevatorState state);


// Called when an elevator changes its current floor
void onElevatorFloorChange(Elevator elevator, int floor);
}
```

‍

• Elevator Display Concrete Observer Class :

‍

```java

// Concrete implementation of the Observer interface
class ElevatorDisplay implements ElevatorObserver {
@Override
public void onElevatorStateChange(Elevator elevator, ElevatorState state) {
// Display the new state of the elevator
System.out.println("Elevator " + elevator.getId() + " state changed to " + state);
}

@Override
public void onElevatorFloorChange(Elevator elevator, int floor) {
// Display the elevator's movement to a new floor
System.out.println("Elevator " + elevator.getId() + " moved to floor " + floor);
}
}
```

‍

2.) Command Pattern for Request Processing : 

‍

Command Interface : 

```java

// Command Pattern for Request Processing
interface ElevatorCommand {
// Method to execute the command
void execute();
}
```

‍‍

‍ • Elevator Request for all the elevator requests.

‍

```java

package CommandPatternIMP.ConcreteClasses;
import CommandPatternIMP.ElevatorCommand;
import CommonEnums.Direction;
import UtilityClasses.ElevatorController;

public class ElevatorRequest implements ElevatorCommand {
private int elevatorId; // ID of the elevator involved in the request
private int floor; // Floor where the request is made
private Direction requestDirection; // The direction of the elevator request
private ElevatorController controller; // Reference to the ElevatorController to handle the request
private boolean isInternalRequest; // Distinguishes internal vs external requests
// Constructor to initialize the elevator request
public ElevatorRequest(int elevatorId, int floor, boolean isInternalRequest,
Direction direction) {
this.elevatorId = elevatorId;
this.floor = floor;
this.isInternalRequest = isInternalRequest;
this.requestDirection = direction;
this.controller = new ElevatorController();
}

// Execute method to process the request via the controller
@Override
public void execute() {
if (isInternalRequest)
controller.requestFloor(elevatorId, floor);
else
controller.requestElevator(elevatorId, floor, requestDirection);
}

// Getters and Setters for the ElevatorRequest
public Direction getDirection() {
return requestDirection;
}

public int getFloor() {
return floor;
}

public boolean checkIsInternalRequest(){
return isInternalRequest;
}
}
```

‍‍

2.) Strategy Pattern for Scheduling Algorithms :

• SchedulingStrategy.java, Common Interface for Different Scheduling Strategies : 

This interface defines the common method selectElevator for different scheduling strategies. It takes a list of elevators, the requested floor, and the direction as parameters and returns the selected elevator.

‍‍

```java

// Strategy Pattern for Scheduling
interface SchedulingStrategy {
// Determines the next stop for the given elevator
int getNextStop(Elevator elevator);
}
```

‍

Concrete Strategies : 

• First Come first Serve Scheduling Strategy:

This class implements the FCFS algorithm, where the elevator completes the requests in the same order as they are received.

‍‍

```java

// First-Come-First-Served Algorithm
class FCFSSchedulingStrategy implements SchedulingStrategy {
@Override
public int getNextStop(Elevator elevator) {
// Get the elevator's current direction and floor
Direction elevatorDirection = elevator.getDirection();
int currentFloor = elevator.getCurrentFloor();

// Retrieve the FIFO queue of floor requests
Queue<ElevatorRequest> requestQueue = elevator.getRequestsQueue();

// If the request queue is empty, stay on the current floor
if (requestQueue.isEmpty())
return currentFloor;

// Fetch the next requested floor
int nextRequestedFloor = requestQueue.poll().getFloor();

// If the next floor is the current floor, return it
if (nextRequestedFloor == currentFloor)
return currentFloor;
// Set elevator's direction based on its current state and next floor
if (elevatorDirection == Direction.IDLE) {
elevator.setDirection(
nextRequestedFloor > currentFloor ? Direction.UP : Direction.DOWN);
} else if (elevatorDirection == Direction.UP
&& nextRequestedFloor < currentFloor) {
elevator.setDirection(Direction.DOWN);
} else if (nextRequestedFloor > currentFloor) {
elevator.setDirection(Direction.UP);
}

// Return the next requested floor
return nextRequestedFloor;
}
}
```

‍

• Scan Scheduling Strategy : 

‍

```java

/* SIMULATION SCENARIO : Down Request While Elevator is Moving Down
- 
- Setup:
- - Elevator is at floor 10
- - Elevator is moving DOWN
- - Elevator has destinations at floors 7, 5, and 2
- - External DOWN request arrives from floor 8
- 
- System Reaction: 
- The elevator controller will assign Elevator to serve this request since it's already 
- moving DOWN and will pass floor 8. The external request will be inserted into 
- Elevator's request queue in proper order (between floors 10 and 7).
- The elevator will stop at floor 8 to pick up the passenger without changing
- its overall downward journey pattern, continuing to floors 7, 5, and 2 afterward.
*/
```

‍

This class implements the SCAN algorithm, where the elevator scans in one direction until the elevator has reached the last floor of the 

Current direction it is moving in.

‍

```java

// Scan Scheduling Strategy for handling elevator requests
class ScanSchedulingStrategy implements SchedulingStrategy {
@Override
public int getNextStop(Elevator elevator) {
// Retrieve elevator's current direction and floor
Direction elevatorDirection = elevator.getDirection();
int currentFloor = elevator.getCurrentFloor();
Queue<ElevatorRequest> requests = elevator.getRequestsQueue();


// If there are no requests, stay on the current floor
if (requests.isEmpty())
return currentFloor;


// Priority queues to handle requests in up and down directions
PriorityQueue<ElevatorRequest> upQueue =
new PriorityQueue<>(); // Min-heap for upward requests
PriorityQueue<ElevatorRequest> downQueue =
new PriorityQueue<>((a, b) -> b.getFloor() - a.getFloor()); // Max-heap for downward requests


// Categorize requests based on their relative position to the current floor
while (!requests.isEmpty()) {
ElevatorRequest elevatorRequest = requests.poll();
int floor = elevatorRequest.getFloor();
if (floor > currentFloor)
upQueue.add(elevatorRequest);
else
downQueue.add(elevatorRequest);
}


// Handle the case when the elevator is IDLE
if (elevatorDirection == Direction.IDLE) {
// Determine the nearest request and set direction accordingly
int nearestUpwardRequest =
upQueue.isEmpty() ? -1 : upQueue.peek().getFloor();
int nearestDownwardRequest =
downQueue.isEmpty() ? -1 : downQueue.peek().getFloor();


if (nearestUpwardRequest == -1) {
elevator.setDirection(Direction.DOWN);
return downQueue.poll().getFloor();
} else if (nearestDownwardRequest == -1) {
elevator.setDirection(Direction.UP);
return upQueue.poll().getFloor();
} else {
// Choose the closest request
if (Math.abs(nearestUpwardRequest - currentFloor)
< Math.abs(nearestDownwardRequest - currentFloor)) {
elevator.setDirection(Direction.UP);
return upQueue.poll().getFloor();
} else {
elevator.setDirection(Direction.DOWN);
return downQueue.poll().getFloor();
}
}
}


// Handle movement in the UP direction
if (elevatorDirection == Direction.UP) {
return !upQueue.isEmpty() ? UpQueue.poll().getFloor()
: switchDirection(elevator, downQueue);
}
// Handle movement in the DOWN direction
else {
return !downQueue.isEmpty() ? DownQueue.poll().getFloor()
: switchDirection(elevator, upQueue);
}
}


// Helper method to switch the elevator's direction when no further requests
// exist in the current direction
private int switchDirection(
Elevator elevator, PriorityQueue<Integer> requestsQueue) {
elevator.setDirection(elevator.getDirection() == Direction.UP
? Direction.DOWN
: Direction.UP);
return requestsQueue.isEmpty() ? elevator.getCurrentFloor()
: requestsQueue.poll().getFloor();
}
}


/* SIMULATION SCENARIO : Up Request While Elevator is Moving Down
-  - Setup:
- - Elevator is at floor 10
- - Elevator is moving DOWN
- - Elevator has destinations at floors 6 and 2
- - External UP request arrives from floor 4
-  - System Reaction:
- The Scan Scheduling Strategy would not assign Elevator to this request
- because its current direction doesn't match the request direction. Instead,
- this request would be queued. the Elevator will complete its current DOWN
- journey to floor 2, then reverse direction and fulfill the UP request from
- floor 4.
*/
```

‍

### • Difference Between Scan and Look Strategies Algorithms : 

• **Scan Algorithm :** 

The Scan algorithm serves requests in the elevator's current direction until the end, the elevator moves till the last floor for a particular direction and serves requests as they come, then switches direction. It completely ignores requests that require the elevator to reverse its current direction of travel.

‍

• **Look Algorithm :** 

The Look algorithm also prioritizes requests in the current direction. The elevator does not goes till the end in one direction, it only goes till The floor where the last request was received for a particular direction and it keeps track of requests that would require changing direction. It stores these requests in a queue and serves them when it changes direction, before taking new requests.

‍

• Example Explained : 

Imagine an elevator at the 4th floor moving upward:

In the Scan algorithm:

• It will serve all requests from floors 5, 6, 7, etc.

• If someone on floor 2 presses the "up" button, the Scan algorithm ignores this request until it has finished all upward requests and reversed direction.

‍

In the Look algorithm:

• It will also serve all requests from floors 5, 6, 7, etc. first

• If someone on floor 2 presses the "up" button, the Look algorithm remembers this request

• After completing all upward requests and changing to downward direction, it will store all these pending requests in a pending queue

• When it switches back to upward direction, it will first serve the pending requests present int the queue from floor 2 (if it hasn't been handled by another elevator), then take any new upward requests

‍

The key difference is that Look is more efficient by remembering and prioritizing previously skipped requests when it changes direction.

‍

### • Look Scheduling Strategy : (Explained better in Video, please watch video)

Example to understand flow:

• Starting Floor: 5

• Internal Requests (in order):

1\. -1(first request, so the elevator initially plans to go down)

2\. 8

3\. 2

4\. 6

5\. -5

6\. 10

• External Requests (with direction):

• Floor 3with direction DOWN

• Floor 4with direction UP

• Floor -8with direction DOWN

‍

How the Code Works

1\. Determine the Primary Target & Direction:

• The method first inspects the first request in the queue.

• In our example, the first request is for floor -1.

• Since -1is below 5, the travel direction is set to DOWN.

‍

2\. Scan for Intermediate Stops:

• The algorithm then iterates through all requests in the queue to find any floor that lies between the current floor (5) and the primary target (-1).

• For Internal Requests:

• Every internal request is eligible if its floor lies between 5 and -1.

• In our example, floor 2qualifies because 5 > 2 > -1.

• For External Requests:

• Only those external requests that are also in the DOWNdirection are considered.

• Among the external requests, only floor 3with direction DOWN qualifies if it lies between 5 and -1.

• However, notice that even though both floor 2 (internal) and floor 3 (external) are in range, the method chooses the one that appears first along the journey from floor 5 toward -1 (i.e. the candidate that is closest to 5).

‍

3\. Choosing the Next Stop:

• The algorithm compares all candidates found in the scan.

• In our example:

• Although the primary target is -1, the intermediate candidate floor 2(or 3if the external request is encountered before 2) is considered first based on the order in the journey.

• According to your example details, the elevator should stop at 2because that is the first floor encountered on the way from 5 to -1 that meets the criteria.

• Once an intermediate stop is found, it is returned as the next stop, and the elevator will later continue toward the primary target after handling the intermediate stop.

‍

4\. Handling Mixed Requests:

• Internal requestsare always accepted if they lie in the travel range.

• External requestsare only accepted if they:

• Are in the same travel direction (in this case, DOWN).

• Lie within the range between the current floor and the primary target.

• This ensures that if, for instance, an external request from floor 4(UP) is present, it will be ignored since it does not match the DOWN direction.

‍

In Summary

• Step 1:The first request (-1) sets the direction to DOWN.

• Step 2:As the elevator starts moving from 5toward -1, it scans the queue for any stops that fall between these floors.

• Step 3:Internal requests (like floor 2) and matching external requests (like floor 3with DOWN direction) are candidates.

• Step 4:The method returns the first encountered candidate (e.g., floor 2) as the next stop.

‍

This design ensures that the elevator optimizes its journey by stopping at all intermediate requests that lie along the planned path, and it only honors external requests that match the travel direction.

‍

```java

public class LookSchedulingStrategy implements SchedulingStrategy {
@Override
public int getNextStop(Elevator elevator) {
int currentFloor = elevator.getCurrentFloor();
Queue<ElevatorRequest> requests = elevator.getRequestsQueue();
// If there are no pending requests, remain on the current floor.
if (requests == null || requests.isEmpty()) {
return currentFloor;
}
// Determine the primary target from the first request in the queue.
ElevatorRequest primaryRequest = requests.peek();
int primaryFloor = primaryRequest.getFloor();
// Determine the travel direction based on the primary target.
Direction travelDirection;
if (primaryFloor > currentFloor) {
travelDirection = Direction.UP;
} else if (primaryFloor < currentFloor) {
travelDirection = Direction.DOWN;
} else {
return currentFloor; // Already at the requested floor.
}
// Look for any request along the journey from currentFloor to primaryFloor.
// For upward movement, we need the smallest floor greater than currentFloor and <=
// primaryFloor. For downward movement, we need the largest floor less than currentFloor and >=
// primaryFloor.
Integer candidate = null;


for (ElevatorRequest req : requests) {
int reqFloor = req.getFloor();
// Check if the request is within the range between currentFloor and primaryFloor.
if (travelDirection == Direction.UP && reqFloor > currentFloor && reqFloor <= primaryFloor) {
// For internal requests we always consider; for external requests, only if they are going
// UP.
if (req.checkIsInternalRequest()
|| (!req.checkIsInternalRequest() && req.getDirection() == Direction.UP)) {
// Choose the candidate that is closest to the current floor (i.e. the smallest floor
// greater than currentFloor).
if (candidate == null || reqFloor < candidate) {
candidate = reqFloor;
}
}
} else if (travelDirection == Direction.DOWN && reqFloor < currentFloor
&& reqFloor >= primaryFloor) {
// For downward movement, consider the request if internal or if external with direction
// DOWN.
if (req.checkIsInternalRequest()
|| (!req.checkIsInternalRequest() && req.getDirection() == Direction.DOWN)) {
// For a downward journey, we choose the candidate that is closest to the current floor
// (i.e. the largest floor less than currentFloor).
if (candidate == null || reqFloor > candidate) {
candidate = reqFloor;
}
}
}
}
// If a candidate was found in the path, return that as the next stop;
// otherwise, fall back to the primary target.
return (candidate != null) ? candidate : primaryFloor;
}
}
```

‍

4.) Core Classes Implementation:

To begin, let's create the core classes for our elevator system design, which will be responsible for managing the elevator operations.

‍

• Elevator Class : 

• The Elevator class manages the core functionalities and state of an elevator system. It also implements the Observer Pattern to notify observers about state and floor changes.

‍

```java

// Core Elevator class with simple queue for managing requests
class Elevator {
// Unique ID for the elevator
private int id;
// Current floor where the elevator is located
private int currentFloor;
// Current direction of the elevator (UP, DOWN, or IDLE)
private Direction direction;
// Current operational state of the elevator (IDLE, MOVING, etc.)
private ElevatorState state;
// List of observers to monitor elevator events
private List<ElevatorObserver> observers;
// Queue to manage all requests (both internal and external)
private Queue<ElevatorRequest> requests;
// Constructor to initialize the elevator
public Elevator(int id) {
this.id = id;
this.currentFloor = 1; // Default initial floor
this.direction = Direction.IDLE;
this.state = ElevatorState.IDLE;
this.observers = new ArrayList<>();
this.requests = new LinkedList<>();
}
// Add an observer to monitor elevator events
public void addObserver(ElevatorObserver observer) {
observers.add(observer);
}

// Remove an observer
public void removeObserver(ElevatorObserver observer) {
observers.remove(observer);
}

// Notify all observers about a state change
private void notifyStateChange(ElevatorState state) {
for (ElevatorObserver observer : observers) {
observer.onElevatorStateChange(this, state);
}
}

// Notify all observers about a floor change
private void notifyFloorChange(int floor) {
for (ElevatorObserver observer : observers) {
observer.onElevatorFloorChange(this, floor);
}
}

// Set a new state for the elevator and notify observers
public void setState(ElevatorState newState) {
this.state = newState;
notifyStateChange(newState);
}

// Set the direction of the elevator
public void setDirection(Direction newDirection) {
this.direction = newDirection;
}

// Add a new floor request to the queue
public void addRequest(ElevatorRequest elevatorRequest) {
// Avoid duplicate requests
if (!requests.contains(elevatorRequest)) {
requests.add(elevatorRequest);
}

int requestedFloor = elevatorRequest.getFloor();
// If elevator is idle, determine direction and start moving
if (state == ElevatorState.IDLE && !requests.isEmpty()) {
if (requestedFloor > currentFloor) {
direction = Direction.UP;
} else if (requestedFloor < currentFloor) {
direction = Direction.DOWN;
}
setState(ElevatorState.MOVING);
}
}

/* SIMULATION SCENARIO : Down Request from Above Current Position
-    - Setup:
- - Elevator is at floor 5
- - Elevator is IDLE
- - External DOWN request arrives from floor 11
-    - System Reaction:
- The elevator controller would send Elevator UP to floor 11 to service the
- DOWN request. After reaching floor 11, Elevator would change its direction
- to DOWN and wait for the passenger to select their destination floor. This
- demonstrates how the system correctly handles serving a request that
- initially requires moving in the opposite direction of the requested
- travel.
*/


// Move the elevator to the next stop as decided by the scheduling strategy
public void moveToNextStop(int nextStop) {
// Only move if the elevator is currently in the MOVING state
if (state != ElevatorState.MOVING)
return;
while (currentFloor != nextStop) {
// Update floor based on direction
if (direction == Direction.UP) {
currentFloor++;
} else {
currentFloor--;
}
// Notify observers about the floor change
notifyFloorChange(currentFloor);
// Complete arrival once the target floor is reached
if (currentFloor == nextStop) {
completeArrival();
return;
}
}
}
// Handle the elevator's arrival at a destination floor
private void completeArrival() {
// Stop the elevator and notify observers
setState(ElevatorState.STOPPED);
// Remove the current floor from the requests queue
requests.removeIf(request = > request.getFloor() == currentFloor);
// If no more requests, set state to IDLE
if (requests.isEmpty()) {
direction = Direction.IDLE;
setState(ElevatorState.IDLE);
} else {
// Otherwise, continue moving after a brief stop
setState(ElevatorState.MOVING);
}
}
// Get the elevator's ID
public int getId() {
return id;
}
// Get the elevator's current floor
public int getCurrentFloor() {
return currentFloor;
}
// Get the elevator's current direction
public Direction getDirection() {
return direction;
}
// Get the elevator's current state
public ElevatorState getState() {
return state;
}
// Get a copy of the current requests queue to prevent external modification
public Queue<ElevatorRequest> getRequestsQueue() {
return new LinkedList<>(requests);
}
// Get a list of all destination floors for display purposes
public List<ElevatorRequest> getDestinationFloors() {
return new ArrayList<>(requests);
}
}
```

‍

• Elevator Controller class : 

The Elevator Controller class manages the operation of multiple elevators within a building. It initializes elevators, handles external and internal requests, sets scheduling strategies, and simulates elevator movement.

‍

```java

// Elevator Controller class to manage elevators and floor requests
class ElevatorController {
// List of all elevators in the system
private List<Elevator> elevators;
// List of all floors in the building
private List<Floor> floors;
// Strategy to determine the scheduling of elevators
private SchedulingStrategy schedulingStrategy;
// ID of the current elevator (used for internal operations)
private int currentElevatorId;
// Constructor to initialize elevators and floors
public ElevatorController(int numberOfElevators, int numberOfFloors) {
this.elevators = new ArrayList<>();
this.floors = new ArrayList<>();
this.schedulingStrategy = new ScanSchedulingStrategy(); // Default strategy
// Initialize elevators with unique IDs
for (int i = 1; i <= numberOfElevators; i++) {
elevators.add(new Elevator(i));
}
// Initialize floors
for (int i = 1; i <= numberOfFloors; i++) {
floors.add(new Floor(i));
}
}

// Set the scheduling strategy dynamically
public void setSchedulingStrategy(SchedulingStrategy strategy) {
this.schedulingStrategy = strategy;
}

// Handle external elevator requests from a specific floor
public void requestElevator(
int elevatorId, int floorNumber, Direction direction) {
System.out.println(
"External request: Floor " + floorNumber + ", Direction " + direction);
// Find the elevator by its ID
Elevator selectedElevator = getElevatorById(elevatorId);
if (selectedElevator != null) {
// Add the request to the selected elevator
selectedElevator.addRequest(
new ElevatorRequest(elevatorId, floorNumber, false, direction));
System.out.println("Assigned elevator " + selectedElevator.getId()
+ " to floor " + floorNumber);
} else {
// If no suitable elevator is found
System.out.println("No elevator available for floor " + floorNumber);
}
}

// Handle internal elevator requests to a specific floor
public void requestFloor(int elevatorId, int floorNumber) {
// Find the elevator by its ID
Elevator elevator = getElevatorById(elevatorId);
System.out.println("Internal request: Elevator " + elevator.getId()
+ " to floor " + floorNumber);
// Determine the direction of the request
Direction direction = floorNumber > elevator.getCurrentFloor()
? Direction.UP
: Direction.DOWN;
// Add the request to the elevator
elevator.addRequest(
new ElevatorRequest(elevatorId, floorNumber, true, direction));
}

// Find an elevator by its ID
private Elevator getElevatorById(int elevatorId) {
for (Elevator elevator : elevators) {
if (elevator.getId() == elevatorId)
return elevator;
}
return null; // Return null if no matching elevator is found
}

// Perform a simulation step by moving all elevators
public void step() {
// Iterate through all elevators
for (Elevator elevator : elevators) {
// Only process elevators with pending requests
if (!elevator.getRequestsQueue().isEmpty()) {
// Use the scheduling strategy to find the next stop
int nextStop = schedulingStrategy.getNextStop(elevator);


// Move the elevator to the next stop if needed
if (elevator.getCurrentFloor() != nextStop)
elevator.moveToNextStop(nextStop);
}
}
}

// Get the list of all elevators
public List<Elevator> getElevators() {
return elevators;
}

// Get the list of all floors
public List<Floor> getFloors() {
return floors;
}

// Set the ID of the current elevator
public void setCurrentElevator(int elevatorId) {
this.currentElevatorId = elevatorId;
}
}
```

‍

• Building Class : 

‍

```java

// Represents a building with elevators and multiple floors
class Building {
private String name; // Name of the building
private int numberOfFloors; // Total number of floors in the building
private ElevatorController
elevatorController; // Controller to manage all elevators in the building
// Constructor to initialize the building's details and its elevator system
public Building(String name, int numberOfFloors, int numberOfElevators) {
this.name = name; // Assign the building's name
this.numberOfFloors = numberOfFloors; // Set the total number of floors
// Initialize the elevator controller with the specified number of elevators
// and floors
this.elevatorController =
new ElevatorController(numberOfElevators, numberOfFloors);
}

// Getters and Setters for the Building
public String getName() {
return name;
}

public int getNumberOfFloors() {
return numberOfFloors;
}

public ElevatorController getElevatorController() {
return elevatorController;
}
}
```

‍

5.) Main Method to Run the Code : 

‍

```java

public class Main {
public static void main(String[] args) {
// Initialize a building with 10 floors and 3 elevators
Building building = new Building("Office Tower", 10, 3);
ElevatorController controller = building.getElevatorController();
// Create an ElevatorDisplay to observe and display elevator events
ElevatorDisplay display = new ElevatorDisplay();
for (Elevator elevator : controller.getElevators()) {
elevator.addObserver(display); // Add the display as an observer for all elevators
}
// Simulate elevator requests using a command-line interface
Scanner scanner = new Scanner(System.in);
boolean running = true;
// Display simulation details and options
System.out.println("Elevator System Simulation");
System.out.println("Building: " + building.getName());
System.out.println("Floors: " + building.getNumberOfFloors());
System.out.println("Elevators: " + controller.getElevators().size());
// Main loop for user interactions
while (running) {
System.out.println("nSelect an option:");
System.out.println("1. Request elevator (external)");
System.out.println("2. Request floor (internal)");
System.out.println("3. Simulate next step");
System.out.println("4. Change scheduling strategy");
System.out.println("5. Exit simulation");
int choice = scanner.nextInt(); // Read user's menu choice
switch (choice) {
case 1:
// Handle external elevator request
// Handle internal elevator floor request
System.out.print("Enter elevator ID: ");
int externalElevatorId = scanner.nextInt();
controller.setCurrentElevator(externalElevatorId); // Set the selected elevator
System.out.print("Enter floor number: ");
int floorNum = scanner.nextInt();
System.out.print("Direction (1 for UP, 2 for DOWN): ");
int dirChoice = scanner.nextInt();
Direction dir = dirChoice == 1 ? Direction.UP : Direction.DOWN;
controller.requestElevator(externalElevatorId, floorNum, dir);
break;
case 2:
// Handle internal elevator floor request
System.out.print("Enter elevator ID: ");
int elevatorId = scanner.nextInt();
controller.setCurrentElevator(elevatorId); // Set the selected elevator
System.out.print("Enter destination floor: ");
int destFloor = scanner.nextInt();
controller.requestFloor(elevatorId, destFloor);
break;
case 3:
// Simulate the next step in the system
System.out.println("Simulating next step...");
controller.step(); // Perform the simulation step
displayElevatorStatus(
controller.getElevators()); // Display elevator statuses
break;
case 4:
// Change the scheduling strategy
System.out.println("Select strategy:");
System.out.println("1. SCAN Algorithm");
System.out.println("2. FCFS Algorithm");
System.out.println("3. Look Algorithm");
int strategyChoice = scanner.nextInt();
if (strategyChoice == 1) {
controller.setSchedulingStrategy(new ScanSchedulingStrategy());
System.out.println("Strategy set to SCAN Algorithm");
} else {
controller.setSchedulingStrategy(new FCFSSchedulingStrategy());
System.out.println("Strategy set to Nearest Elevator First");
}
break;
case 5:
// Exit the simulation
running = false;
break;
default:
// Handle invalid choices
System.out.println("Invalid choice!");
}
}
scanner.close(); // Close the scanner to release resources
System.out.println("Simulation ended"); // End of simulation
}


// Display the status of all elevators in the system
private static void displayElevatorStatus(List<Elevator> elevators) {
System.out.println("nElevator Status:");
for (Elevator elevator : elevators) {
// Print details of each elevator, including current floor, direction, and
// state
System.out.println("Elevator " + elevator.getId() + ": Floor "
+ elevator.getCurrentFloor() + ", Direction "
+ elevator.getDirection() + ", State " + elevator.getState()
+ ", Destinations " + elevator.getDestinationFloors());
}
}
}
```

‍

Interviewer: Looks good. What makes your approach effective?

‍

Candidate: Here are the key strengths of my approach:

• Scalability: The design accommodates easy expansion to include additional elevators, floors, and scheduling algorithms. This ensures that the system can grow with the needs of the building without major redesigns.

‍

• Modularity: Each component, such as elevator control, scheduling, and state management, is handled separately. This separation ensures a clean and maintainable structure, making it easy to update or replace individual components without affecting the overall system.

‍

• Flexibility: The use of design patterns like Strategy and Observer allows for seamless modifications and enhancements. New scheduling strategies or state changes can be introduced without disrupting existing functionality, providing a robust and adaptable system.

‍

• Clarity: The architecture is intuitive, making it straightforward for developers to understand, implement, and extend. Clear responsibilities and interactions between classes and components enhance the overall readability and maintainability of the codebase.

‍

‍

Extensibility : 

1\. Adding New Elevator Types : 

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743482171576-Frame-245-\(5\).png)

‍

The modular design allows for easy integration of different elevator types (e.g., express elevators, freight elevators, or glass elevators) by extending the base Elevator class:

‍

Example : Adding a new Express Elevator

‍

```java

// Extend the base Elevator class for specialized elevator types
class ExpressElevator extends Elevator {
private static final int SPEED_MULTIPLIER = 2;
public ExpressElevator(int id) {
super(id); // Call the parent constructor
}

@Override
public void moveToNextStop(int nextStop) {
// Only move if the elevator is currently in the MOVING state
if (getState() != ElevatorState.MOVING)
return;
while (getCurrentFloor() != nextStop) {
// Express elevators move twice as fast (simplified)
if (getDirection() == Direction.UP) {
// Move up but ensure we don't overshoot
int newFloor = Math.min(getCurrentFloor() + SPEED_MULTIPLIER, nextStop);
int currentFloor = getCurrentFloor();
// Update the current floor
while (currentFloor < newFloor) {
currentFloor++;
// Notify observers about the floor change
notifyFloorChange(currentFloor);
}
} else {
// Move down but ensure we don't overshoot
int newFloor = Math.max(getCurrentFloor() - SPEED_MULTIPLIER, nextStop);
int currentFloor = getCurrentFloor();
// Update the current floor
while (currentFloor > newFloor) {
currentFloor--;
// Notify observers about the floor change
notifyFloorChange(currentFloor);
}
}
// Complete arrival once the target floor is reached
if (getCurrentFloor() == nextStop) {
completeArrival();
return;
}
}
}
}
```

‍

Similarly, to accommodate new elevator types, we can utilize the Factory Design Pattern. This approach ensures that our code remains clean, modular, and maintainable when adding new elevators. By defining a common interface for all elevator types and creating a factory class to instantiate the appropriate elevator objects, we can easily integrate new elevator types without affecting existing code.

‍

Example : 

 ElevatorFactory.java : 

‍

```java

// Factory for creating different elevator types
class ElevatorFactory {
public static Elevator createElevator(String type, int id) {
switch (type.toLowerCase()) {
case "standard":
return new Elevator(id);
case "express":
return new ExpressElevator(id);
default:
throw new IllegalArgumentException("Unknown elevator type: " + type);
}
}
}
```

‍

• Modify The Elevator Controller class to accommodate ElevatorFactory Class : 

‍

```java

class ElevatorController {
// Existing fields...

// Constructor that allows specifying elevator types
public ElevatorController(
int floors, Map<String, Integer> elevatorTypeQuantities) {
this.elevators = new ArrayList<>();
this.floors = new ArrayList<>();
this.schedulingStrategy = new ScanSchedulingStrategy(); // Default strategy
// Initialize floors
for (int i = 1; i <= floors; i++) {
this.floors.add(new Floor(i));
}
// Initialize elevators with different types
int idCounter = 1;
for (Map.Entry<String, Integer> entry : elevatorTypeQuantities.entrySet()) {
String type = entry.getKey();
int quantity = entry.getValue();
for (int i = 0; i < quantity; i++) {
Elevator elevator = ElevatorFactory.createElevator(type, idCounter++);
elevators.add(elevator);
}
}
}

// Original constructor now calls the new constructor
public ElevatorController(int numberOfElevators, int numberOfFloors) {
// Create a map with standard elevators
Map<String, Integer> elevatorTypes = new HashMap<>();
elevatorTypes.put("standard", numberOfElevators);
// Initialize floors
this.floors = new ArrayList<>();
for (int i = 1; i <= numberOfFloors; i++) {
this.floors.add(new Floor(i));
}
// Initialize elevators
this.elevators = new ArrayList<>();
for (int i = 1; i <= numberOfElevators; i++) {
this.elevators.add(new Elevator(i));
}
// Set default strategy
this.schedulingStrategy = new ScanSchedulingStrategy();
}

// Add methods to manage elevator types
public void addElevator(String type) {
int nextId = elevators.size() + 1;
elevators.add(ElevatorFactory.createElevator(type, nextId));
}

public boolean replaceElevator(int elevatorId, String newType) {
Elevator oldElevator = getElevatorById(elevatorId);
if (oldElevator != null) {
int index = elevators.indexOf(oldElevator);
Elevator newElevator =
ElevatorFactory.createElevator(newType, elevatorId);
elevators.set(index, newElevator);
return true;
}
return false;
}

// Rest of the ElevatorController code remains the same...
}
```

‍

2.) Implementing Additional Scheduling Strategies : 

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743482491450-Frame-245-\(6\).png)

‍

Since we are using the Strategy Pattern for our scheduling algorithms, we can easily extend our scheduling capabilities to incorporate new algorithms. This can be achieved by creating a new class that implements the new strategy and extends the Scheduling Strategy interface. 

‍

Example : 

Round Robin Scheduling Strategy : 

‍

```java

// Round Robin Scheduling Strategy
class RoundRobinSchedulingStrategy implements SchedulingStrategy {
private int lastAssignedIndex = -1;

@Override
public int getNextStop(Elevator elevator) {
// Current implementation focuses on determining the next stop
// for a specific elevator rather than selecting an elevator
// Get current floor and direction
int currentFloor = elevator.getCurrentFloor();
Direction currentDirection = elevator.getDirection();
// Get the requests queue
Queue<ElevatorRequest> requests = elevator.getRequestsQueue();
// If no requests, stay on current floor
if (requests.isEmpty()) {
return currentFloor;
}
// Get the next request in a round-robin fashion
ElevatorRequest nextRequest = requests.poll();
int nextFloor = nextRequest.getFloor();
// Update direction if needed
if (nextFloor > currentFloor) {
elevator.setDirection(Direction.UP);
} else if (nextFloor < currentFloor) {
elevator.setDirection(Direction.DOWN);
}
return nextFloor;
}
}
```

‍

• Energy Efficient Scheduling Algorithm : 

‍

```java

// Energy Efficient Scheduling Strategy
class EnergyEfficientSchedulingStrategy implements SchedulingStrategy {
@Override
public int getNextStop(Elevator elevator) {
// Get current floor and direction
int currentFloor = elevator.getCurrentFloor();
Direction currentDirection = elevator.getDirection();
// Retrieve the elevator's requests
Queue<ElevatorRequest> requests = elevator.getRequestsQueue();
// If no requests, stay on current floor
if (requests.isEmpty()) {
return currentFloor;
}
// Sort requests by energy efficiency (minimize direction changes)
// This is a simplified implementation - in a real system, you'd
// consider factors like motor power, acceleration, etc.
// Get requests in the current direction first
List<ElevatorRequest> sameDirectionRequests = new ArrayList<>();
List<ElevatorRequest> oppositeDirectionRequests = new ArrayList<>();
for (ElevatorRequest request : requests) {
int requestFloor = request.getFloor();
if ((currentDirection == Direction.UP && requestFloor > currentFloor)
|| (currentDirection == Direction.DOWN
&& requestFloor < currentFloor)) {
sameDirectionRequests.add(request);
} else {
oppositeDirectionRequests.add(request);
}
}
// Process same direction requests first to minimize direction changes
if (!sameDirectionRequests.isEmpty()) {
// Find the closest request in the same direction
ElevatorRequest closestRequest = sameDirectionRequests.get(0);
int closestDistance = Math.abs(closestRequest.getFloor() - currentFloor);
for (ElevatorRequest request : sameDirectionRequests) {
int distance = Math.abs(request.getFloor() - currentFloor);
if (distance < closestDistance) {
closestDistance = distance;
closestRequest = request;
}
}
return closestRequest.getFloor();
} else if (!oppositeDirectionRequests.isEmpty()) {
// Need to change direction, find the closest request
ElevatorRequest closestRequest = oppositeDirectionRequests.get(0);
int closestDistance = Math.abs(closestRequest.getFloor() - currentFloor);
for (ElevatorRequest request : oppositeDirectionRequests) {
int distance = Math.abs(request.getFloor() - currentFloor);
if (distance < closestDistance) {
closestDistance = distance;
closestRequest = request;
}
}
// Update direction based on the selected request
if (closestRequest.getFloor() > currentFloor) {
elevator.setDirection(Direction.UP);
} else {
elevator.setDirection(Direction.DOWN);
}


return closestRequest.getFloor();
}
// Fallback to current floor if no valid requests (should not happen)
return currentFloor;
}
}
```

‍

## ✨Conclusion : 

This low-level design for Elevator System showcases a well-structured and scalable architecture, emphasizing modularity and extensibility. By supporting various enhancements such as new Elevator Types and new scheduling strategies addition, this design ensures maintainability and flexibility. In an interview setting, presenting this design would demonstrate your ability to create robust and adaptable solutions, highlighting your proficiency in applying design patterns and best practices.

---
