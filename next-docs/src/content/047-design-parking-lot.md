---
title: "Design Parking Lot"
type: lld
order: 47
---

# Design Parking Lot

Topic Tags:

system designlld

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

# ‍

# Low-Level Design: Parking Lot System 🏧

A parking lot management system is designed to handle the operations of parking vehicles, collecting payments, and managing available space efficiently. The system should be able to accommodate different types of vehicles, provide payment options, and ensure a smooth user experience.

‍

## Rules of the System : 

Setup:

• The parking lot has multiple slots available for parking.

• Different types of vehicles (bike, car, truck) can occupy different slot sizes.

• Each vehicle is issued a parking ticket upon entry.

• The system calculates the parking fee based on the duration of stay and vehicle type.

‍

Exit and Payment:

• A vehicle needs to make a payment before exiting.

• Multiple payment methods (Cash, Card, UPI) should be supported.

• Once payment is successful, the vehicle is allowed to exit, and the parking slot is freed.

‍

Illegal Actions:

• A vehicle cannot park in an already occupied slot.

• Vehicles cannot vacate without completing the payment process.

## Interview Setting 🤝

### Point 1: Introduction and Vague Problem Statement : 

Interviewer: Let's start with a basic problem statement. Design a Parking Lot system.

‍

Candidate: Certainly! Here’s my understanding of the Parking Lot system:

• The system will manage different types of vehicles.

• Vehicles will enter and exit after making a payment.

• A parking slot is assigned upon entry and freed upon exit.

• Payment must be completed before leaving.

• The system should handle different vehicle sizes and slot allocations efficiently.

Is this the expected flow?

‍

Interviewer: Yes, you are aligned with the flow. Please continue ahead.

‍

Candidate: Great! Before diving into the design, I’d like to clarify a few requirements:

• Will we have multiple types of parking slots based on vehicle size?

• Are we supporting multiple payment methods?

• Should the system track the duration of each parked vehicle?

• Can there be multiple floors parking lots ?

‍

### Point 2: Clarifying Requirements : 

Interviewer: We want a system that:

• Supports different vehicle types (Bike, Car, Truck).

• Has different slot sizes based on vehicle type.

• Allows multiple payment methods.

• Ensures smooth entry and exit with parking fee calculation.

‍

Candidate: To summarize, the key requirements are:

• A parking lot with multiple slot types.

• Support for bikes, cars, and trucks.

• Dynamic slot allocation based on vehicle size.

• Payment processing with multiple methods.

• Entry ticket issuance and exit validation.

‍

Interviewer: Perfect, let’s proceed.

‍

### Point 3: Identifying Key Components : 

Candidate: Now that we have the requirements, let’s identify the key components of our Parking Lot system:

1\. Vehicle: Represents different types of vehicles.

Class: Vehicle

Description: This class represents vehicles entering the parking lot.

‍

```java
public abstract class Vehicle {
protected String licensePlate; 
protected VehicleType type; 
}
```

‍

2\. Parking Lot: Manages parking slots and vehicle allocations.

Class: ParkingLot

Description: This class manages the allocation and release of parking slots.

‍

```java
public class ParkingLot {
private List<ParkingSlot> slots; 
}
```

‍

3\. Parking Slot: Represents an individual parking space.

Class: ParkingSlot

Description: A slot has a type (Bike, Car, Truck) and an availability status.

‍

```java
public class ParkingSlot {
private VehicleType slotType;
private boolean isOccupied; 
}
```

‍

4\. Payment System: Handles different payment methods like Credit Card, Cash, UPI etc

Class: Payment

Description: This class processes payments before exit.

‍

```java
public interface PaymentStrategy { 
boolean processPayment(double amount);
}
```

‍

Interviewer: That sounds good. Let’s proceed with the design details.

‍

### Point 4: Design Challenges : 

Interviewer: What design challenges do you anticipate?

‍

Candidate: The key challenges for the Parking Lot system include:

1\. Efficient Slot Allocation: Ensuring vehicles are assigned to the correct slot type.

2\. Tracking Vehicle Duration: Keeping a record of entry times for payment calculations.

3\. Handling Payments: Supporting multiple payment methods dynamically.

4\. Managing Concurrency: Ensuring simultaneous vehicle entries and exits are handled properly.

‍

### Point 5: Approach :

Interviewer: How would you approach these challenges?

Candidate: I propose using design patterns effectively. Here are my strategies:

1\. Factory for Vehicle Creation : 

• Allows easy extension for new vehicle types.

• Ensures consistent object creation.

2\. Strategy Pattern for Payments and Parking Fares : 

• Enables flexible payment methods and Parking fares based on the vehicle type and duration for the parking.

• Easily extendable for future payment integrations and new fare strategy additions.

3\. Singleton Pattern for Parking Lot Management : 

• Ensures only one instance of the parking lot exists.

4\. Observer Pattern for Exit Notifications : 

• Notifies the system when a vehicle exits.

• Can be extended for alerts or logging.

‍

Interviewer: That sounds like a solid approach. Let’s delve into the implementation details.

‍

### Point 6: Implementation : 

Interviewer: Ready to discuss implementation?

Candidate: Yes. I'll focus on a modular and scalable design that meets the core Parking Lot requirements.

‍

## Parking Lot Implementation with Design Patterns 🚗: 

‍

1. Strategy Pattern for Parking Fare : 

• ParkingFeeStrategy Interface : 

Defines a common interface for different parking fee calculation strategies.

‍

```java
// Interface for Parking Fee Calculation Strategy
public interface ParkingFeeStrategy {
/**
- Calculate parking fee based on vehicle type and duration
- 
- @param vehicleType Type of vehicle being parked
- @param duration Duration of parking (in hours or days)
- @param durationType Type of duration (HOURS or DAYS)
- @return Calculated parking fee
*/
double calculateFee(String vehicleType, int duration, DurationType durationType);
}
```

‍

• DurationType Enum : 

Specifies the type of duration for parking (HOURS or DAYS).

‍

```java
// Enum to specify duration type
public enum DurationType {
HOURS, 
DAYS
}
```

‍

• Define Concrete Strategies : 

a. BasicHourlyRateStrategy Class : 

Concrete strategy for basic hourly rates. Rates vary based on vehicle type.

‍

```java
// Concrete Strategy for Basic Hourly Rates
public class BasicHourlyRateStrategy implements ParkingFeeStrategy {
@Override
public double calculateFee(String vehicleType, int duration, DurationType durationType) {
// Different rates for different vehicle types
switch (vehicleType.toLowerCase()) {
case "car":
return durationType == DurationType.HOURS 
? duration * 10.0   // $10 per hour for cars
: duration * 10.0 * 24;  // Daily rate

case "bike":
return durationType == DurationType.HOURS 
? duration * 5.0    // $5 per hour for bikes
: duration * 5.0 * 24;  // Daily rate

case "auto":
return durationType == DurationType.HOURS 
? duration * 8.0    // $8 per hour for autos
: duration * 8.0 * 24;  // Daily rate

default:
return durationType == DurationType.HOURS 
? duration * 15.0   // $15 per hour for other vehicles
: duration * 15.0 * 24;  // Daily rate
}
}
}
```

‍

‍ b. PremiumRateStrategy Class : 

Concrete strategy for premium rates. Premium rates have higher multipliers.

‍

```java
// Concrete Strategy for Premium Rates
public class PremiumRateStrategy implements ParkingFeeStrategy {
@Override
public double calculateFee(String vehicleType, int duration, DurationType durationType) {
// Premium rates with higher multipliers
switch (vehicleType.toLowerCase()) {
case "car":
return durationType == DurationType.HOURS 
? duration * 15.0   // $15 per hour for cars
: duration * 15.0 * 24;  // Daily rate

case "bike":
return durationType == DurationType.HOURS 
? duration * 8.0    // $8 per hour for bikes
: duration * 8.0 * 24;  // Daily rate

case "auto":
return durationType == DurationType.HOURS 
? duration * 12.0   // $12 per hour for autos
: duration * 12.0 * 24;  // Daily rate

default:
return durationType == DurationType.HOURS 
? duration * 20.0   // $20 per hour for other vehicles
: duration * 20.0 * 24;  // Daily rate
}
}
}
```

‍

2\. Factory Pattern for Vehicle Creation : (FYI - Not necessarily a CORE PART OF THE PROBLEM !!)

     ‍

To efficiently manage families of related objects such as cars, bikes, and scooters, we will utilize the Factory pattern for Vehicle Creation. First, let's define the Factory interfaces and their corresponding concrete factories.

‍

Vehicle.java: Common Abstract Class for vehicles : 

‍

```java
// Abstract class representing a vehicle
public abstract class Vehicle {  
private String licensePlate; // Stores the vehicle's license plate number
private String vehicleType; // Stores the type of vehicle (e.g., car, bike, truck)
private ParkingFeeStrategy feeStrategy; // Strategy for calculating parking fees
// Constructor to initialize a vehicle with its license plate, type, and fee strategy
public Vehicle(String licensePlate, String vehicleType, ParkingFeeStrategy feeStrategy) {  
this.licensePlate = licensePlate;  
this.vehicleType = vehicleType;  
this.feeStrategy = feeStrategy;  
}  
// Getter method to retrieve the vehicle type
public String getVehicleType() {  
return vehicleType;  
}  
// Getter method to retrieve the vehicle's license plate number
public String getLicensePlate() {  
return licensePlate;  
}  
// Method to calculate parking fee based on duration and duration type
public double calculateFee(int duration, DurationType durationType) {  
return feeStrategy.calculateFee(vehicleType, duration, durationType);
}  
}
```

‍

• Concrete Classes For Vehicle Types :

CarVehicle.java : 

‍

```java
package VehicleFactoryPattern.ConcreteVehicles;
import FareStrategyPattern.ParkingFeeStrategy;
import VehicleFactoryPattern.Vehicle;

public class CarVehicle extends Vehicle {
public CarVehicle(String licensePlate, String vehicleType, ParkingFeeStrategy feeStrategy) {
super(licensePlate, vehicleType, feeStrategy);
}
}
```

‍

2\. BikeVehicle.java : 

‍

```java
package VehicleFactoryPattern.ConcreteVehicles;
import FareStrategyPattern.ParkingFeeStrategy;
import VehicleFactoryPattern.Vehicle;

public class BikeVehicle extends Vehicle {
public BikeVehicle(String licensePlate, String vehicleType, ParkingFeeStrategy feeStrategy) {
super(licensePlate, vehicleType, feeStrategy);
}
}
```

‍

3\. OtherVehicles.java : 

‍

> NOTE : We can add multiple types of vehicles similarly like we have added for Car and Bikes, OtherVehicles.java is just a common example to generalize all other types of vehicles .

‍

```java
package VehicleFactoryPattern.ConcreteVehicles;
import FareStrategyPattern.ParkingFeeStrategy;
import VehicleFactoryPattern.Vehicle;

public class OtherVehicle extends Vehicle {
public OtherVehicle(String licensePlate, String vehicleType, ParkingFeeStrategy feeStrategy) {
super(licensePlate, vehicleType, feeStrategy);
}
}
```

‍

• VehicleFactory.java Class : 

‍

```java
package VehicleFactoryPattern;

import FareStrategyPattern.ParkingFeeStrategy;
import VehicleFactoryPattern.ConcreteVehicles.BikeVehicle;
import VehicleFactoryPattern.ConcreteVehicles.CarVehicle;
import VehicleFactoryPattern.ConcreteVehicles.OtherVehicle;

public class VehicleFactory {
public static Vehicle createVehicle(String vehicleType, String licensePlate, ParkingFeeStrategy feeStrategy) {
if (vehicleType.equalsIgnoreCase("Car")) {
return new CarVehicle(licensePlate, vehicleType, feeStrategy);
} else if (vehicleType.equalsIgnoreCase("Bike")) {
return new BikeVehicle(licensePlate, vehicleType, feeStrategy);
}
return new OtherVehicle(licensePlate, vehicleType, feeStrategy); // For unsupported vehicle types
}
}
```

‍

3\. Strategy Pattern for Payments : 

To efficiently manage parking payments for different Vehicles, we will utilize the Strategy pattern for Vehicle Payments. let's define the Strategy interfaces and their corresponding concrete strategies.

‍

PaymentStrategy.java, Common Interface for Different Payment Strategies : 

‍

```java
public interface PaymentStrategy {
void processPayment(double amount);
}
```

‍

• Concrete Payment Strategies : 

CashPayment.java : 

‍

```java
package PaymentStrategyPattern.ConcretePaymentStrategies;
import PaymentStrategyPattern.PaymentStrategy;

public class CashPayment implements PaymentStrategy {
public CashPayment(double fee) {
}
@Override
public void processPayment(double amount) {
System.out.println("Processing cash payment of $" + amount);
// Logic for cash payment processing
}
}
```

‍

○ CreditCardPayment.java : 

‍

```java
package PaymentStrategyPattern.ConcretePaymentStrategies;
import PaymentStrategyPattern.PaymentStrategy;

public class CreditCardPayment implements PaymentStrategy {
public CreditCardPayment(double fee) {
}
@Override
public void processPayment(double amount) {
System.out.println("Processing credit card payment of $" + amount);
}
}
```

‍

○ Payment.java Client class for handling Payments : 

‍

```java
public class Payment {
private double amount;
private PaymentStrategy paymentStrategy; // Payment strategy interface
// Constructor to initialize the payment amount and payment strategy
public Payment(double amount, PaymentStrategy paymentStrategy) {
this.amount = amount;
this.paymentStrategy = paymentStrategy;
}
// Process the payment using the assigned strategy
public void processPayment() {
if (amount > 0) {
paymentStrategy.processPayment(amount);  // Delegating to strategy
} else {
System.out.println("Invalid payment amount.");
}
}
}
```

‍

4\. Parking Lot Logic and Implementation : 

• In a parking lot, we can have multiple parking spots for different types of vehicles, such as cars, bikes, autos, scooters, etc. To efficiently manage these spots, we will start by defining a common abstract class for parking spots and then create concrete implementations for each type of vehicle.

‍

• Here's how we can approach this:‍

Abstract Parking Spot Class: This class will serve as the base class for all types of parking spots and will define the common properties and methods shared by all spots.

‍

```java
public abstract class ParkingSpot {
private int spotNumber;
private boolean isOccupied;
private Vehicle vehicle;
private String spotType;
// Constructor to initialize parking spot with spot number and type
public ParkingSpot(int spotNumber, String spotType) {
this.spotNumber = spotNumber;
this.isOccupied = false;
this.spotType = spotType;
}
// Method to check if the spot is occupied
public boolean isOccupied() {
return isOccupied;
}
// Abstract method to check if a vehicle can park in this spot
public abstract boolean canParkVehicle(Vehicle vehicle);
// Method to park a vehicle in the spot
public void parkVehicle(Vehicle vehicle) {
// Check if the spot is already occupied
if (isOccupied) {
throw new IllegalStateException("Spot is already occupied.");
}
// Check if the vehicle can be parked in this spot
if (!canParkVehicle(vehicle)) {
throw new IllegalArgumentException(
"This spot is not suitable for" + vehicle.getVehicleType());
}
this.vehicle = vehicle;
this.isOccupied = true;
}
// Method to vacate the parking spot
public void vacate() {
// Check if the spot is already vacant
if (!isOccupied) {
throw new IllegalStateException("Spot is already vacant.");
}
this.vehicle = null;
this.isOccupied = false;
}
// Getter for spot number
public int getSpotNumber() {
return spotNumber;
}
// Getter for the vehicle parked in the spot
public Vehicle getVehicle() {
return vehicle;
}
// Getter for spot type
public String getSpotType() {
return spotType;
}
}
```

‍

○ Concrete Parking Spot Classes: These classes will extend the abstract class and will represent specific types of parking spots for different vehicles (e.g., car, bike, scooter).

‍

CarParkingSpot.java : 

```java
package ParkingSpots.ConcreteParkingSpots;
import ParkingSpots.ParkingSpot;
import VehicleFactoryPattern.Vehicle;

public class CarParkingSpot extends ParkingSpot {
public CarParkingSpot(int spotNumber, String spotType) {
super(spotNumber, spotType);
}
@Override
public boolean canParkVehicle(Vehicle vehicle) {
return "Car".equalsIgnoreCase(vehicle.getVehicleType());
}
}
```

‍

  b.   BikeParkingSpot.java : 

```java
package ParkingSpots.ConcreteParkingSpots;
import ParkingSpots.ParkingSpot;
import VehicleFactoryPattern.Vehicle;

public class BikeParkingSpot extends ParkingSpot {
public BikeParkingSpot(int spotNumber, String spotType) {
super(spotNumber, spotType);
}
@Override
public boolean canParkVehicle(Vehicle vehicle) {
return "Bike".equalsIgnoreCase(vehicle.getVehicleType());
}
}
```

‍

> NOTE : Similarly, We can add for Other types of Vehicles as well.

‍

Having defined our parking spots, let's proceed with implementing the ParkingLot class, which will handle the logic for managing parking spots and vehicles.

‍

ParkingLot.java : 

‍

```java
public class ParkingLot {
private List<ParkingSpot> parkingSpots;
// Constructor to initialize the parking lot with parking spots
public ParkingLot(List<ParkingSpot> parkingSpots) {
this.parkingSpots = parkingSpots;
}
// Method to find an available spot based on vehicle type
public ParkingSpot findAvailableSpot(String vehicleType) {
for (ParkingSpot spot : parkingSpots) {
if (!spot.isOccupied() && spot.getSpotType().equals(vehicleType)) {
return spot; // Found an available spot for the vehicle type
}
}
return null; // No available spot found for the given vehicle type
}
// Method to park a vehicle
public ParkingSpot parkVehicle(Vehicle vehicle) {
ParkingSpot spot = findAvailableSpot(vehicle.getVehicleType());
if (spot != null) {
spot.parkVehicle(vehicle); // Mark the spot as occupied
System.out.println(
"Vehicle parked successfully in spot: " + spot.getSpotNumber());
return spot;
}
System.out.println(
"No parking spots available for " + vehicle.getVehicleType() + "!");
return null;
}
// Method to vacate a parking spot
public void vacateSpot(ParkingSpot spot, Vehicle vehicle) {
if (spot != null && spot.isOccupied()
&& spot.getVehicle().equals(vehicle)) {
spot.vacate(); // Free the spot
System.out.println(vehicle.getVehicleType()
+ " vacated the spot: " + spot.getSpotNumber());
} else {
System.out.println("Invalid operation! Either the spot is already vacant "
+ "or the vehicle does not match.");
}
}
// Method to find a spot by its number
public ParkingSpot getSpotByNumber(int spotNumber) {
for (ParkingSpot spot : parkingSpots) {
if (spot.getSpotNumber() == spotNumber) {
return spot;
}
}
return null; // Spot not found
}
// Getter for parking spots
public List<ParkingSpot> getParkingSpots() {
return parkingSpots;
}
}
```

‍

4\. Main Method to Run the Parking Lot : 

‍

```java
public class ParkingLotMain {
public static void main(String[] args) {
// Initialize parking spots
List<ParkingSpot> parkingSpots = new ArrayList<>();
parkingSpots.add(new CarParkingSpot(1));
parkingSpots.add(new CarParkingSpot(2));
parkingSpots.add(new BikeParkingSpot(3));
parkingSpots.add(new BikeParkingSpot(4));
// Initialize parking lot
ParkingLot parkingLot = new ParkingLot(parkingSpots);
// Create fee strategies
ParkingFeeStrategy basicHourlyRateStrategy = new BasicHourlyRateStrategy();
ParkingFeeStrategy premiumRateStrategy = new PremiumRateStrategy();
// Create vehicles using Factory Pattern with fee strategies
Vehicle car1 = VehicleFactory.createVehicle("Car", "CAR123", basicHourlyRateStrategy);
Vehicle car2 = VehicleFactory.createVehicle("Car", "CAR345", basicHourlyRateStrategy);

Vehicle bike1 = VehicleFactory.createVehicle("Bike", "BIKE456", premiumRateStrategy);
Vehicle bike2 = VehicleFactory.createVehicle("Bike", "BIKE123", premiumRateStrategy);

// Park vehicles
ParkingSpot carSpot = parkingLot.parkVehicle(car1);
ParkingSpot bikeSpot = parkingLot.parkVehicle(bike1);
Scanner scanner = new Scanner(System.in);
System.out.println("Select payment method for your vehicle:");
System.out.println("1. Credit Card");
System.out.println("2. Cash");
int paymentMethod = scanner.nextInt();
// Process payments using Strategy Patterns
if (carSpot != null) {
// Calculate fee using the specific strategy for the vehicle
double carFee = car1.calculateFee(2, DurationType.HOURS);
PaymentStrategy carPaymentStrategy =
getPaymentStrategy(paymentMethod, carFee);
carPaymentStrategy.processPayment(carFee);
parkingLot.vacateSpot(carSpot, car1);
}
if (bikeSpot != null) {
// Calculate fee using the specific strategy for the vehicle
double bikeFee = bike1.calculateFee(3, DurationType.HOURS);
PaymentStrategy bikePaymentStrategy =
getPaymentStrategy(paymentMethod, bikeFee);
bikePaymentStrategy.processPayment(bikeFee);
parkingLot.vacateSpot(bikeSpot, bike1);
}
scanner.close();
}
private static PaymentStrategy getPaymentStrategy(
int paymentMethod, double fee) {
switch (paymentMethod) {
case 1:
return new CreditCardPayment(fee);
case 2:
return new CashPayment(fee);
default:
System.out.println("Invalid choice! Default to Credit card payment.");
return new CreditCardPayment(fee);
}
}
}
```

‍

Interviewer: Looks good. What makes your approach effective?

‍

Candidate: Here are the key strengths of my approach:

• Scalability:

The design allows easy expansion to accommodate more vehicle types, parking spot categories, and payment methods.

• Modularity:

Each component, such as vehicle creation, parking management, and payment processing, is handled separately, ensuring a clean and maintainable structure.

• Flexibility:

The use of design patterns like Factory and Strategy allows seamless modifications and enhancements without affecting existing code.

• Clarity:

The architecture is intuitive, making it easy for developers to understand, implement, and extend when needed.

‍

Extensibility : ‍

1.) Implementing Multi-Floor Parking Lot : 

Currently, our Parking Lot implementation is based on a single floor. However, if an interviewer asks how you would extend your solution to accommodate a multi-floor Parking Lot.

‍

Here’s how you should respond:

‍

To extend the solution for a multi-floor Parking Lot, we can create a concrete ParkingFloor class and encapsulate the logic of handling parking spots within this class. The ParkingLot class would then be responsible for managing multiple parking floors, while each floor would handle its own parking spots. This approach adheres to the Single Responsibility Principle, ensuring that each class has a clear and distinct responsibility.

‍

**Implementation :** 

1\. Concrete Parking Floor class : 

ParkingFloor.java : 

‍

```java
public class ParkingFloor {
// List of parking spots on this floor
private List<ParkingSpot> spots;
// Unique identifier for the floor
private int floorNumber;
public ParkingFloor(int floorNumber) {
this.floorNumber = floorNumber;
this.spots = new ArrayList<>();
}
// Adds a parking spot to this floor.
public void addParkingSpot(ParkingSpot spot) {
this.spots.add(spot);
}
// Finds an available parking spot for a specific vehicle type.
public ParkingSpot findAvailableSpot(String vehicleType) {
// Iterate through all spots to find an available spot matching the vehicle
// type
for (ParkingSpot spot : spots) {
// Check if the spot is not occupied and matches the vehicle type
if (!spot.isOccupied()
&& spot.getSpotType().equalsIgnoreCase(vehicleType)) {
return spot;
}
}
return null; // No available spot found
}
// Retrieves all parking spots on this floor.
public List<ParkingSpot> getParkingSpots() {
return spots;
}
public int getFloorNumber() {
return floorNumber;
}
}
```

‍

2\. Create a New Builder Class for Parking Lot : 

‍

```java
/**
- Builder class for creating a flexible and extensible parking lot.
- Provides a fluent interface for constructing multi-floor parking lots.
*/
public class ParkingLotBuilder {
// List of floors to be added to the parking lot
private List<ParkingFloor> floors;
// Constructor initializes the list of floors.
public ParkingLotBuilder() {
this.floors = new ArrayList<>();
}
// Adds a pre-configured parking floor to the parking lot.
public ParkingLotBuilder addFloor(ParkingFloor floor) {
floors.add(floor);
return this;
}
// Creates a floor with specified numbers of different vehicle parking spots.
public ParkingLotBuilder createFloor(int floorNumber, int numOfCarSpots,
int numOfBikeSpots, int... otherSpotCounts) {
// Create a new parking floor
ParkingFloor floor = new ParkingFloor(floorNumber);
// Add car spots
for (int i = 0; i < numOfCarSpots; i++) {
floor.addParkingSpot(new CarParkingSpot(i + 1));
}
// Add bike spots
for (int i = 0; i < numOfBikeSpots; i++) {
floor.addParkingSpot(new BikeParkingSpot(numOfCarSpots + i + 1));
}
// Add other types of spots if provided
int spotOffset = numOfCarSpots + numOfBikeSpots;
for (int i = 0; i < otherSpotCounts.length; i++) {
for (int j = 0; j < otherSpotCounts[i]; j++) {
// Dynamically add other vehicle type spots
// Note: This uses OtherVehicle as a placeholder. In a real system,
// you might want a more robust way to handle different vehicle types
floor.addParkingSpot(new OtherVehicle(
spotOffset + j + 1, new BasicHourlyRateStrategy()));
}
// Update the spot offset for the next type of vehicle
spotOffset += otherSpotCounts[i];
}
// Add the configured floor to the list of floors
floors.add(floor);
return this;
}
// Builds and returns the fully configured parking lot.
public ParkingLot build() {
return new ParkingLot(floors);
}
}
```

‍

3\. Modify The parkingLot class to Accommodate the Multiple Floors logic : 

‍

```java
import java.util.List;

// Class representing a parking lot with multiple floors
public class ParkingLot {
private List<ParkingFloor>
floors; // List of parking floors in the parking lot
// Constructor to initialize the parking lot with given floors
public ParkingLot(List<ParkingFloor> floors) {
this.floors = floors;
}
// Method to find the first available parking spot for a given vehicle type
public ParkingSpot findAvailableSpot(String vehicleType) {
for (ParkingFloor floor : floors) {
ParkingSpot spot = floor.findAvailableSpot(vehicleType);
if (spot != null) {
return spot; // Return the first available spot found
}
}
return null; // Return null if no spot is available
}
// Method to park a vehicle in an available spot
public ParkingSpot parkVehicle(Vehicle vehicle) {
ParkingSpot spot = findAvailableSpot(vehicle.getVehicleType());
if (spot != null) {
spot.parkVehicle(vehicle); // Park the vehicle in the found spot
System.out.println(
"Vehicle parked successfully in spot: " + spot.getSpotNumber());
return spot;
}
// If no spot is available, notify the user
System.out.println(
"No parking spots available for " + vehicle.getVehicleType() + "!");
return null;
}
// Method to vacate a parking spot
public void vacateSpot(ParkingSpot spot, Vehicle vehicle) {
// Ensure the spot is occupied and the vehicle matches before vacating
if (spot != null && spot.isOccupied()
&& spot.getVehicle().equals(vehicle)) {
spot.vacate(); // Free up the parking spot
System.out.println(vehicle.getVehicleType()
+ " vacated the spot: " + spot.getSpotNumber());
} else {
System.out.println("Invalid operation! Either the spot is already vacant "
+ "or the vehicle does not match.");
}
}
// Method to retrieve a parking spot by its spot number
public ParkingSpot getSpotByNumber(int spotNumber) {
for (ParkingFloor floor : floors) {
for (ParkingSpot spot : floor.getParkingSpots()) {
if (spot.getSpotNumber() == spotNumber) {
return spot; // Return the parking spot if found
}
}
}
return null; // Return null if no spot with the given number exists
}
// Getter method to retrieve the list of parking floors
public List<ParkingFloor> getFloors() {
return floors;
}
}
```

‍

4\. Modify the parking lot Main class to Accommodate the Multiple floors logic : 

‍

```java
// Demonstrates the usage of the flexible parking lot builder.
public class ParkingLotMain {
public static void main(String[] args) {
// Create a parking lot with multiple floors and varied spot configurations
ParkingLot parkingLot =
new ParkingLotBuilder()
// First floor: 2 car spots, 2 bike spots
.createFloor(1, 2, 2)
// Second floor: 3 car spots, 1 bike spot, 1 other vehicle spot
.createFloor(2, 3, 1, 1)
.build();
// Existing parking lot logic can be applied as before
// Example: parking vehicles, calculating fees, etc.
}
}
```

‍

## Conclusion : 

This low-level design for Parking Lot showcases a well-structured and scalable architecture, emphasizing modularity and extensibility. By supporting various enhancements such as new Vehicles and new payment types addition and multiple floors feature, this design ensures maintainability and flexibility. In an interview setting, presenting this design would demonstrate your ability to create robust and adaptable solutions, highlighting your proficiency in applying design patterns and best practices.

---
