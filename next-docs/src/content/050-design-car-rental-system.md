---
title: "Design Car Rental System"
type: lld
order: 50
---

# Design Car Rental System

Topic Tags:

System DesignLLD

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

## ‍

## Low-Level Design: Car Rental System 🚗

A car rental system is designed to efficiently manage vehicle inventory, handle reservations, process payments, and track rental operations. The system needs to support multiple vehicle types, manage availability across different locations, handle user reservations, and provide a seamless rental experience. The system should be scalable, reliable, and capable of handling concurrent operations.

## Rules of the System:

Setup:

• The business operates multiple rental stores across different locations.

• Each store has its own inventory of vehicles of various types (economy, luxury, SUV, etc.).

• Vehicles have attributes like registration number, model, make, year, condition, and rental price.

• The system tracks vehicle availability and manages reservations.

‍

Operation:

• Users can search for available vehicles based on location, date range, and vehicle preferences.

• Users can filter and sort vehicles based on various criteria (price, type, features).

• Reservations can be created, modified, or canceled by users.

• The system generates billing based on rental duration and additional services.

• Payment processing handles various payment methods.

‍

Safety Features:

• Reservation conflicts are prevented through proper availability tracking.

• User authentication ensures secure access to the system.

• Audit trails track all rental transactions and vehicle status changes.

• Damage reports and vehicle condition monitoring ensure fleet maintenance.

## Interview Setting 🤝

**Point 1: Introduction and Vague Problem Statement:**

Interviewer: Let's start with a basic problem statement. Design a Car Rental System.

‍

Candidate: Certainly! Here's my understanding of the Car Rental System:

• The system will manage multiple vehicles across different rental locations.

• Users can search, filter, and reserve vehicles based on their preferences.

• The system tracks vehicle availability and prevents booking conflicts.

• Billing and payment processing are integrated for a complete rental cycle.

• The system should be scalable to handle operations across multiple cities.

Is this the expected flow?

‍

Interviewer: Yes, you are aligned with the flow. Please continue ahead.

‍

Candidate: Great! Before diving into the design, I'd like to clarify a few requirements:

• What types of vehicles should the system support? Is the System that we are designing only for cars or can it support multiple Vehicle Types as well ? 

• How should the system handle reservation modifications and cancellations?

• Are there specific pricing strategies to implement for different vehicle types?

‍

**Point 2: Clarifying Requirements:**

‍

Interviewer: We want a system that:

• Supports multiple vehicle types across different rental locations.

• Handles reservations, modifications, and cancellations efficiently.

• Processes payments and generates appropriate billing.

‍

Candidate: To summarize, the key requirements are:

• A system with multiple rental stores and vehicle categories.

• Reservation management with conflict prevention.

• Dynamic pricing implementation based on vehicle type and duration.

• Ability to handle edge cases like late returns, damages, or early pickups.

‍

Interviewer: Perfect, let's proceed.

‍

**Point 3: Identifying Key Components:**

Candidate: Now that we have the requirements, let's identify the key components of our Car Rental System:

‍

Vehicle: Represents individual vehicles in the rental fleet.

Class:

Vehicle : This class represents individual vehicles with their attributes.

‍

```java
public class Vehicle {
private String registrationNumber;
private String make;
private String model;
private int year;
private VehicleType type;
private VehicleStatus status;
private double baseRentalPrice;
}
```

‍

RentalStore: Contains vehicles and manages operations at a location.

‍

Class: 

RentalStore Description: This class represents physical rental locations.

‍

```java
public class RentalStore {
private int id;
private String name;
private Location location;
private Map<String, Vehicle> vehicles; // Registration -> Vehicle

public List<Vehicle> getAvailableVehicles(Date startDate, Date endDate);
public void addVehicle(Vehicle vehicle);
public void removeVehicle(String registrationNumber);
public boolean isVehicleAvailable(String registrationNumber, Date startDate, Date endDate);
}
```

‍

RentalSystem: Manages the overall rental operations.

‍

Class: RentalSystem Description: This class handles rental operations and uses the Singleton pattern.

‍

```java
public class RentalSystem {
private List<RentalStore> stores; // list of stores
private VehicleFactory vehicleFactory; // Vehicle Factory for creation of different Vehicles
private ReservationManager reservationManager; // to manage User reservations
private PaymentProcessor paymentProcessor; // to manage payments 
private List<SystemObserver> observers; // to notify users and systems about the changes
}
```

Interviewer: That sounds good. Let's proceed with the design details.

‍

**Point 4: Design Challenges:**

Interviewer: What design challenges do you anticipate?

‍

Candidate: The key challenges for the Car Rental System include:

• Concurrency: Managing multiple simultaneous reservation requests.

• Availability Tracking: Ensuring accurate vehicle availability across time slots.

• Pricing Complexity: Handling various pricing models and discounts.

• Payment Processing: Securely handling different payment methods.

• Edge Cases: Managing late returns, damages, maintenance schedules, and location transfers.

‍

**Point 5: Approach:**

Interviewer: How would you approach these challenges?

‍

Candidate: I propose using design patterns effectively. Here are my strategies:

‍

1\. Factory Pattern for Vehicle Creation:

○ Encapsulates vehicle creation logic.

○ Allows for easy addition of new vehicle types.

‍

2\. Singleton Pattern for RentalSystem:

○ Ensures a single point of control for the entire rental operation.

○ Maintains consistency across all stores and operations.

‍

3\. Strategy Pattern for Payment :

○ Enables different Payment strategies based on different payment types like Credit Card , Debit Card, Cash etc.

○ Can switch between Different payment strategies dynamically.

‍

4\. Enumerations for Reservation Status:

○ Manages the lifecycle of reservations.

○ Handles transitions between different states (pending, confirmed, in-progress, completed, canceled).

‍

5\. State Management with Enums:

To effectively manage vehicle types and statuses, we'll use enums.

‍

```java
public enum VehicleType { ECONOMY, COMPACT, SEDAN, SUV, LUXURY, VAN, TRUCK }

public enum VehicleStatus {
AVAILABLE,
RESERVED,
RENTED,
MAINTENANCE,
OUT_OF_SERVICE
}

public enum ReservationStatus {
PENDING,
CONFIRMED,
IN_PROGRESS,
COMPLETED,
CANCELED
}
```

‍

Interviewer: That sounds like a solid approach. Let's delve into the implementation details.

‍

**Point 6: Implementation:**

Interviewer: Ready to discuss implementation?

‍

Candidate: Yes. I'll focus on implementing the design patterns we discussed and show how they work together in the Car Rental System:

‍

Car Rental System Design With Design Patterns : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743757600023-Frame-245-\(7\).png)

‍

1. Factory Pattern for Vehicle Creation : 

‍

> NOTE : The term "Vehicle" is being used instead of "Car" to emphasize that our design is not limited to cars alone. It is extensible and adaptable to various vehicle types, including bikes, cycles, and auto-rickshaws, among others.

‍

This section implements the Factory pattern for creating different types of vehicles. It allows for easy addition of new vehicle types without modifying client code.

‍

Base Vehicle Abstract Class : 

```java
// Base Vehicle abstract class
public abstract class Vehicle {
private String registrationNumber;
private String model;
private VehicleType type;
private VehicleStatus status;
private double baseRentalPrice;

// Constructor
public Vehicle(String registrationNumber, String model, VehicleType type,
double baseRentalPrice) {
this.registrationNumber = registrationNumber;
this.model = model;
this.type = type;
this.status = VehicleStatus.AVAILABLE;
this.baseRentalPrice = baseRentalPrice;
}

// Abstract method for calculating rental fee
public abstract double calculateRentalFee(int days);

// Getters and setters
public String getRegistrationNumber() {
return registrationNumber;
}

public String getModel() {
return model;
}

public VehicleType getType() {
return type;
}

public VehicleStatus getStatus() {
return status;
}

public void setStatus(VehicleStatus status) {
this.status = status;
}

public double getBaseRentalPrice() {
return baseRentalPrice;
}
}
```

‍

• Concrete Car Vehicle Types : 

EconomyVehicle : 

‍

```java
package VehicleFactoryPattern.ConcreteVehicles;
import CommonEnums.VehicleEnums.VehicleType;
import VehicleFactoryPattern.Vehicle;

public class EconomyVehicle extends Vehicle {
private static final double RATE_MULTIPLIER = 1.0;
public EconomyVehicle(String registrationNumber, String model, VehicleType type, double baseRentalPrice) {
super(registrationNumber, model, type, baseRentalPrice);
}

@Override
public double calculateRentalFee(int days) {
return getBaseRentalPrice() * days * RATE_MULTIPLIER;
}
}
```

‍

○ LuxuryVehicle : 

‍

```java
package VehicleFactoryPattern.ConcreteVehicles;
import CommonEnums.VehicleEnums.VehicleType;
import VehicleFactoryPattern.Vehicle;

public class LuxuryVehicle extends Vehicle {
private static final double RATE_MULTIPLIER = 2.5;
private static final double PREMIUM_FEE = 50.0;
public LuxuryVehicle(String registrationNumber, String model, VehicleType type, double baseRentalPrice) {
super(registrationNumber, model, type, baseRentalPrice);
}

@Override
public double calculateRentalFee(int days) {
return (getBaseRentalPrice() * days * RATE_MULTIPLIER) + PREMIUM_FEE;
}
}
```

‍

○ SUVVehicle : 

‍

```java
package VehicleFactoryPattern.ConcreteVehicles;

import CommonEnums.VehicleEnums.VehicleType;
import VehicleFactoryPattern.Vehicle;

public class SUVVehicle extends Vehicle {
private static final double RATE_MULTIPLIER = 1.5;
public SUVVehicle(String registrationNumber, String model, VehicleType type, double baseRentalPrice) {
super(registrationNumber, model, type, baseRentalPrice);
}
@Override
public double calculateRentalFee(int days) {
return getBaseRentalPrice() * days * RATE_MULTIPLIER;
}
}
```

‍

• VehicleFactory class : 

‍

```java
public class VehicleFactory {
public static Vehicle createVehicle(VehicleType vehicleType, String registrationNumber, String model, double baseRentalPrice) {
switch (vehicleType) {
case ECONOMY:
return new EconomyVehicle(registrationNumber, model, vehicleType,  baseRentalPrice);
case LUXURY:
return new LuxuryVehicle(registrationNumber, model, vehicleType, baseRentalPrice);
case SUV:
return new SUVVehicle(registrationNumber, model,vehicleType,  baseRentalPrice);
default:
throw new IllegalArgumentException("Unsupported vehicle type: " + vehicleType);
}
}
}
```

‍

NOTE : 

‍

> The Car Rental System can be extended to support new vehicle types as well. By adding BIKE and AUTO as valid vehicle types, we make the system more versatile and capable of managing a wider variety of vehicles in our rental platform.

‍

○ Update Vehicle Type Enum to Accommodate New Vehicles : 

‍

The VehicleType enum will now include the new types BIKE and AUTO alongside the existing types. This ensures that the new vehicle types are formally recognized in our system and can be used consistently throughout the codebase.

‍

```java
public enum VehicleType {
ECONOMY,
LUXURY,
SUV,
BIKE,
AUTO
}
```

‍

○ Create New Concrete Vehicle Classes : 

For each new vehicle type, a corresponding concrete class is created. These classes inherit from the Vehicle abstract class and implement the calculateRentalFee method uniquely for each type.

‍

BikeVehicle.java : 

‍

```java
// Bike Vehicle class
public class BikeVehicle extends Vehicle {
private static final double RATE_MULTIPLIER = 0.5;

public BikeVehicle(
String registrationNumber, String model, vehicleType type, double baseRentalPrice) {
super(registrationNumber, model, type, baseRentalPrice);
}

@Override
public double calculateRentalFee(int days) {
return getBaseRentalPrice() * days * RATE_MULTIPLIER;
}
}
```

‍

▪ AutoVehicle.java : 

‍

```java
// Auto Vehicle class
public class AutoVehicle extends Vehicle {
private static final double RATE_MULTIPLIER = 1.2;

public AutoVehicle(
String registrationNumber, String model, vehicleType type, double baseRentalPrice) {
super(registrationNumber, model, type, baseRentalPrice);
}

@Override
public double calculateRentalFee(int days) {
return getBaseRentalPrice() * days * RATE_MULTIPLIER;
}
}
```

‍

○ Update VehicleFactory Class : 

The VehicleFactory class is updated to accommodate the new vehicle types. Now, when a VehicleType of BIKE or AUTO is provided, the factory will return a BikeVehicle or AutoVehicle instance, respectively. This ensures that the new vehicle types are seamlessly integrated into the existing vehicle creation process.

‍

```java
public class VehicleFactory {
public static Vehicle createVehicle(VehicleType type,
String registrationNumber, String model, double baseRentalPrice) {
switch (type) {
case ECONOMY:
return new EconomyVehicle(
type, registrationNumber, model, baseRentalPrice);
case LUXURY:
return new LuxuryVehicle(
type, registrationNumber, model, baseRentalPrice);
case SUV:
return new SUVVehicle(
type, registrationNumber, model, baseRentalPrice);
case VAN:
return new VanVehicle(
type, registrationNumber, model, baseRentalPrice);
case BIKE:
return new BikeVehicle(
type, registrationNumber, model, baseRentalPrice);
case AUTO:
return new AutoVehicle(
type, registrationNumber, model, baseRentalPrice);
default:
throw new IllegalArgumentException(
"Unsupported vehicle type: " + type);
}
}‍ 
}
```

‍

2\. Core Classes Implementation : 

With the Vehicle Design in place, we can now proceed to implement the coding for the following classes: RentalStore, User, Reservation, ReservationManager and RentalSystem.

‍

○ Rental Store Class : 

Since a rental store will always be tied to a specific location, we should begin by designing the Location class as the foundation.

‍

▪ Location.java : 

This class represents the geographical location of a rental store, containing attributes like address, city, state, and zip code.

‍

```java
// Location class
public class Location {
private String address;
private String city;
private String state;
private String zipCode;

public Location(String address, String city, String state, String zipCode) {
this.address = address;
this.city = city;
this.state = state;
this.zipCode = zipCode;
}
// Getters and setters can be defined here
}
```

‍

▪ RentalStore.java :

The RentalStore class represents a physical rental location. It maintains a list of vehicles and provides methods to add, remove, and check availability of vehicles. 

‍

```java
// Rental Store class
public class RentalStore {
private int id;
private String name;
private Location location;
private Map<String, Vehicle> vehicles; // Registration Number (Key) -> Vehicle (Value)

public RentalStore(int id, String name, Location location) {
this.id = id;
this.name = name;
this.location = location;
this.vehicles = new HashMap<>();
}

public List<Vehicle> getAvailableVehicles(Date startDate, Date endDate) {
List<Vehicle> availableVehicles = new ArrayList<>();
for (Vehicle vehicle : vehicles.values()) {
if (vehicle.getStatus() == VehicleStatus.AVAILABLE) {
availableVehicles.add(vehicle);
}
}
return availableVehicles;
}

public void addVehicle(Vehicle vehicle) {
vehicles.put(vehicle.getRegistrationNumber(), vehicle);
}

public void removeVehicle(String registrationNumber) {
vehicles.remove(registrationNumber);
}

public boolean isVehicleAvailable(
String registrationNumber, Date startDate, Date endDate) {
Vehicle vehicle = vehicles.get(registrationNumber);
return vehicle != null
&& vehicle.getStatus() == VehicleStatus.AVAILABLE;
}

public Vehicle getVehicle(String registrationNumber) {
return vehicles.get(registrationNumber);
}
// Getters and setters can be defined here
}
```

‍

○ User Class : 

This class represents a user who can make reservations and interact with the rental system.

‍

```java
public class User {
private int id;
private String name;
private String email;
private List<Reservation> reservations;

public User(int id, String name, String email) {
this.id = id;
this.name = name;
this.email = email;
this.reservations = new ArrayList<>();
}

public void addReservation(Reservation reservation) {
reservations.add(reservation);
}

public void deleteReservation(Reservation reservation) {
reservations.remove(reservation);
}
public int getId() {
return id;
}

// Getters and Setters can be defined here
public int getId(){
return id;
}
}
```

‍

○ Reservation Class : 

The Reservation class manages vehicle bookings, containing details about the user, vehicle, store locations, and rental period.

‍

```java
// Reservation class
public class Reservation {
private int id;
private User user;
private Vehicle vehicle;
private RentalStore pickupStore;
private RentalStore returnStore;
private Date startDate;
private Date endDate;
private ReservationStatus status;
private double totalAmount;

public Reservation(int id, User user, Vehicle vehicle,
RentalStore pickupStore, RentalStore returnStore, Date startDate,
Date endDate) {
this.id = id;
this.user = user;
this.vehicle = vehicle;
this.pickupStore = pickupStore;
this.returnStore = returnStore;
this.startDate = startDate;
this.endDate = endDate;
this.status = ReservationStatus.PENDING;

// Calculate days between start and end dates
long diffInMillies = endDate.getTime() - startDate.getTime();
int days = (int) (diffInMillies / (1000 * 60 * 60 * 24)) + 1;
this.totalAmount = vehicle.calculateRentalFee(days);
}

public void confirmReservation() {
if (status == ReservationStatus.PENDING) {
status = ReservationStatus.CONFIRMED;
vehicle.setStatus(VehicleStatus.RESERVED);
}
}

public void startRental() {
if (status == ReservationStatus.CONFIRMED) {
status = ReservationStatus.IN_PROGRESS;
vehicle.setStatus(VehicleStatus.RENTED);
}
}

public void completeRental() {
if (status == ReservationStatus.IN_PROGRESS) {
status = ReservationStatus.COMPLETED;
vehicle.setStatus(VehicleStatus.AVAILABLE);
}
}

public void cancelReservation() {
if (status == ReservationStatus.PENDING
|| status == ReservationStatus.CONFIRMED) {
status = ReservationStatus.CANCELED;
vehicle.setStatus(VehicleStatus.AVAILABLE);
}
}
public Integer getId() {
return id;
}


public double getTotalAmount() {
return totalAmount;
}
// Getters and setters can be defined here
}
```

‍

○ ReservationManager.java :

This class manages all reservations, providing methods to create, confirm, start, complete, and cancel reservations.

‍

```java
// Reservation Manager class
public class ReservationManager {
private Map<Integer, Reservation> reservations;
private int nextReservationId;

public ReservationManager() {
this.reservations = new HashMap<>();
this.nextReservationId = 1;
}

public Reservation createReservation(User user, Vehicle vehicle,
RentalStore pickupStore, RentalStore returnStore, Date startDate,
Date endDate) {
Reservation reservation = new Reservation(nextReservationId++, user,
vehicle, pickupStore, returnStore, startDate, endDate);
reservations.put(reservation.getId(), reservation);
user.addReservation(reservation);
return reservation;
}

public void confirmReservation(int reservationId) {
Reservation reservation = reservations.get(reservationId);
if (reservation != null) {
reservation.confirmReservation();
}
}

public void startRental(int reservationId) {
Reservation reservation = reservations.get(reservationId);
if (reservation != null) {
reservation.startRental();
}
}

public void completeRental(int reservationId) {
Reservation reservation = reservations.get(reservationId);
if (reservation != null) {
reservation.completeRental();
}
}

public void cancelReservation(int reservationId) {
Reservation reservation = reservations.get(reservationId);
if (reservation != null) {
reservation.cancelReservation();
}
}

public Reservation getReservation(int reservationId) {
return reservations.get(reservationId);
}
}
```

‍

○ RentalSystem.java : 

This is the main class managing the entire rental service. It is implemented as a singleton and handles users, stores, reservations, and payments.

‍

```java
// Singleton Rental System class
public class RentalSystem {
private static RentalSystem instance;
private List<RentalStore> stores;
private VehicleFactory vehicleFactory;
private ReservationManager reservationManager;
private PaymentProcessor paymentProcessor;
private Map<Integer, User> users;
private int nextUserId;

private RentalSystem() {
this.stores = new ArrayList<>();
this.vehicleFactory = new VehicleFactory();
this.reservationManager = new ReservationManager();
this.paymentProcessor = new PaymentProcessor();
this.users = new HashMap<>();
this.nextUserId = 1;
}

public static synchronized RentalSystem getInstance() {
if (instance == null) {
instance = new RentalSystem();
}
return instance;
}

public void addStore(RentalStore store) {
stores.add(store);
}

public RentalStore getStore(int storeId) {
for (RentalStore store : stores) {
if (store.getId() == storeId) {
return store;
}
}
return null;
}

public List<RentalStore> getStores() {
return stores;
}

public User getUser(int userId) {
return users.get(userId);
}

public Reservation createReservation(int userId, String vehicleRegistration,
int pickupStoreId, int returnStoreId, Date startDate, Date endDate) {
User user = users.get(userId);
RentalStore pickupStore = getStore(pickupStoreId);
RentalStore returnStore = getStore(returnStoreId);
Vehicle vehicle = (pickupStore != null) ? pickupStore.getVehicle(vehicleRegistration): null;

if (user != null && pickupStore != null && returnStore != null && vehicle != null) {
return reservationManager.createReservation(
user, vehicle, pickupStore, returnStore, startDate, endDate);
}
return null;
}

public boolean processPayment(
int reservationId, PaymentStrategy paymentStrategy) {
Reservation reservation =
reservationManager.getReservation(reservationId);
if (reservation != null) {
boolean result = paymentProcessor.processPayment(
reservation.getTotalAmount(), paymentStrategy);
if (result) {
reservationManager.confirmReservation(reservationId);
return true;
}
}
return false;
}

public void startRental(int reservationId) {
reservationManager.startRental(reservationId);
}

public void completeRental(int reservationId) {
reservationManager.completeRental(reservationId);
}

public void cancelReservation(int reservationId) {
reservationManager.cancelReservation(reservationId);
}

public void registerUser(User user){
int userID = user.getId();
if(users.containsKey(userID)){
System.out.println("User with id : " + userID + "Already exists in the system");
return;
}
users.put(userID , user);
}
}
```

‍

3\. Strategy Pattern for Payments :

To efficiently manage parking payments for different Vehicles, we will utilize the Strategy pattern for User Payments. let's define the Strategy interfaces and their corresponding concrete strategies.

PaymentStrategy.java (Common Interface for Different Payment Strategies) : 

‍

```java
// Payment Strategy interface
public interface PaymentStrategy {
void processPayment(double amount);
}
```

‍

• Concrete Payment Strategies : 

CreditCardPayment.java :

‍

```java
// Credit Card Payment class
public class CreditCardPayment implements PaymentStrategy {
@Override
public void processPayment(double amount) {
System.out.println("Processing credit card payment of $" + amount);
System.out.println("Card details: " + maskCardNumber(cardNumber) + ", "
+ name + ", expires: " + expiryDate);
// Logic for credit card payment processing would go here
}
}
```

‍

• CashPayment.java : 

‍

```java
// Cash Payment class
public class CashPayment implements PaymentStrategy {
@Override
public void processPayment(double amount) {
System.out.println("Processing cash payment of $" + amount);
// Logic for cash payment processing would go here
}
}
```

‍

• PaypalPayment.java : 

‍

```java
// PayPal Payment class
public class PayPalPayment implements PaymentStrategy {
@Override
public void processPayment(double amount) {
System.out.println("Processing PayPal payment of $" + amount);
System.out.println("PayPal Account: " + email);
// Logic for PayPal payment processing would go here
}
}
```

‍

• PaymentProcessor.java for Handling Payments : 

‍

```java
// Payment Processor
public class PaymentProcessor {
public boolean processPayment(double amount, PaymentStrategy paymentStrategy) {
paymentStrategy.processPayment(amount);
return true; // Assume payment is successful for simplicity
}
}
```

‍

NOTE : 

Just like we can add a new Vehicle type directly, we can also add new payment strategies easily by incorporating new Concrete Payment Strategy and use It whenever we need.

‍

To extend our payment strategy system to support Debit Card payments as well, we can easily incorporate a new Debit Card payment Strategy by just adding a new Payment Strategy Debit Card Strategy : 

‍

```java
public class DebitCardPayment implements PaymentStrategy { 
@Override 
public void processPayment(double amount) { 
System.out.println("Processing debit card payment of $" + amount); 
// Logic for debit card payment processing 
} 
}
```

‍

4\. Main Method to Run the Car Rental System : 

 This section demonstrates how all the components work together in the Car Rental System.

‍

```java
public class CarRentalMain {
public static void main(String[] args) throws ParseException {
// Get the Rental System instance (Singleton)
RentalSystem rentalSystem = RentalSystem.getInstance();

// Create rental stores
RentalStore store1 = new RentalStore(
1, "Downtown Rentals", new Location("123 Main St", "New York", "NY", "10001"));
RentalStore store2 = new RentalStore(
2, "Airport Rentals", new Location("456 Airport Rd", "Los Angeles", "CA", "90045"));
rentalSystem.addStore(store1);
rentalSystem.addStore(store2);

// Create vehicles using Factory Pattern
Vehicle economyCar = VehicleFactory.createVehicle(
VehicleType.ECONOMY, "EC001", "Toyota", 50.0);
Vehicle luxuryCar = VehicleFactory.createVehicle(
VehicleType.LUXURY, "LX001", "Mercedes", 200.0);
Vehicle suvCar =
VehicleFactory.createVehicle(VehicleType.SUV, "SV001", "Honda", 75.0);

// Add vehicles to stores
store1.addVehicle(economyCar);
store1.addVehicle(luxuryCar);
store2.addVehicle(suvCar);

// Register user
User user1 = new User(123, "ABC" , "abc@gmail.com");
User user2 = new User(345 , "BCD" , "bcd@yahoo.com");


rentalSystem.registerUser(user1);
rentalSystem.registerUser(user2);

// Create reservations
Reservation reservation1 = rentalSystem.createReservation(user1.getId(), economyCar.getRegistrationNumber(),
store1.getId(), store1.getId(), new Date(2025 - 1900, 4, 1),
new Date(2025 - 1900, 5, 15));

// Process payment using different strategies (Strategy Pattern)
Scanner scanner = new Scanner(System.in);
System.out.println("
Processing payment for reservation #" + reservation1.getId());
System.out.println("Total amount: $" + reservation1.getTotalAmount());
System.out.println("Select payment method:");
System.out.println("1. Credit Card");
System.out.println("2. Cash");
System.out.println("3. PayPal");

int choice = 1; // Default to credit card for this example
// In a real application, you would get user input:
// int choice = scanner.nextInt();
PaymentStrategy paymentStrategy;
switch (choice) {
case 1:
paymentStrategy = new CreditCardPayment();
break;
case 2:
paymentStrategy = new CashPayment();
break;
case 3:
paymentStrategy = new PayPalPayment();
break;
default:
System.out.println("Invalid choice! Defaulting to credit card payment.");
paymentStrategy = new CreditCardPayment();
break;
}
boolean paymentSuccess = rentalSystem.processPayment(reservation1.getId(), paymentStrategy);
if (paymentSuccess) {
System.out.println("Payment successful!");

// Start the rental
rentalSystem.startRental(reservation1.getId());

// Simulate rental period
System.out.println("
Simulating rental period...");

// Complete the rental
rentalSystem.completeRental(reservation1.getId());
} else {
System.out.println("Payment failed!");
}
}
}
```

‍

Interviewer: Looks good. What makes your approach effective? 

‍

Candidate: Here are the key strengths of my approach for the car rental application:

• Scalability: The design supports seamless expansion to accommodate more vehicle types, rental locations, and additional features like loyalty programs and subscription models.

‍

• Modularity: Each component, such as vehicle management, reservation handling, and payment processing, is implemented separately, ensuring a clean, maintainable, and testable architecture.

‍

• Flexibility: The use of design patterns like Factory (for vehicle creation), Singleton (for rental system management), and Strategy (for payment processing) enables easy modifications and enhancements without impacting existing functionality.

‍

• Clarity: The well-structured architecture ensures that developers can easily understand, implement, and extend the system when needed, making it adaptable for future business requirements.

‍

Extensibility : 

1.) Strategy Pattern for Pricing : ‍

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1743764155901-image.png)

• Define the Pricing Strategy Interface : 

The PricingStrategy interface defines a method to calculate rental prices, allowing for flexible pricing models.

‍

```java
// Pricing Strategy Interface
public interface PricingStrategy {
double calculateRentalPrice(Vehicle vehicle, int rentalPeriod);
}
```

‍

• Implement Concrete Payment Strategies : 

‍

Three concrete strategies are implemented: 

• HourlyPricingStrategy: Calculates price as a fraction of the daily rate

• DailyPricingStrategy: Standard per-day pricing

WeeklyPricingStrategy: Applies a discount for weekly rentals and handles partial weeks

‍

```java
// Concrete Hourly Pricing Strategy
public class HourlyPricingStrategy implements PricingStrategy {
private static final double HOURLY_RATE_MULTIPLIER = 0.2; // 20% of daily rate per hour

@Override
public double calculateRentalPrice(Vehicle vehicle, int rentalPeriod) {
double dailyRate = vehicle.getBaseRentalPrice();
return dailyRate * HOURLY_RATE_MULTIPLIER * rentalPeriod;
}
}

// Concrete Daily Pricing Strategy
public class DailyPricingStrategy implements PricingStrategy {
@Override
public double calculateRentalPrice(Vehicle vehicle, int rentalPeriod) {
return vehicle.getBaseRentalPrice() * rentalPeriod;
}
}

// Concrete Weekly Pricing Strategy
public class WeeklyPricingStrategy implements PricingStrategy {
private static final double WEEKLY_DISCOUNT = 0.8; // 20% discount for weekly rentals

@Override
public double calculateRentalPrice(Vehicle vehicle, int rentalPeriod) {
double dailyRate = vehicle.getBaseRentalPrice();
int weeks = rentalPeriod / 7;
int remainingDays = rentalPeriod % 7;
double weeklyPrice = dailyRate * 7 * WEEKLY_DISCOUNT * weeks;
double remainingDaysPrice = dailyRate * remainingDays;
return weeklyPrice + remainingDaysPrice;
}
}
```

‍

• Modify Reservation and RentalSystem Class to accept the PricingStrategy : 

‍

```java
// Modified Reservation Class to Support Pricing Strategy
public class Reservation {
private PricingStrategy pricingStrategy;
public Reservation(int id, User user, Vehicle vehicle, RentalStore pickupStore,
RentalStore returnStore, Date startDate, Date endDate, PricingStrategy pricingStrategy) {
// ... existing constructor code ...
this.pricingStrategy = pricingStrategy;
// Calculate total amount using the selected pricing strategy
long diffInMillies = endDate.getTime() - startDate.getTime();
int days = (int) (diffInMillies / (1000 * 60 * 60 * 24)) + 1;
this.totalAmount = pricingStrategy.calculateRentalPrice(vehicle, days);
}
}

// Usage Example in RentalSystem
public class RentalSystem {
public Reservation createReservation(int userId, String vehicleRegistration, int pickupStoreId,
int returnStoreId, Date startDate, Date endDate, PricingStrategy pricingStrategy) {
// ... existing code ...

return reservationManager.createReservation(
user, vehicle, pickupStore, returnStore, startDate, endDate, pricingStrategy);
}
}
```

‍

• Incorporate Pricing Strategy in the Main Method as well : 

‍

```java
public class CarRentalMain {
public static void main(String[] args) throws ParseException {
// ...existing code
// Create reservations with different pricing strategies
Reservation dailyReservation =
rentalSystem.createReservation(user1.getId(), economyCar.getRegistrationNumber(),
store1.getId(), store1.getId(), sdf.parse("03/01/2025"), sdf.parse("03/05/2025"),
new DailyPricingStrategy() // Using Daily Pricing Strategy
);
Reservation weeklyReservation =
rentalSystem.createReservation(user1.getId(), luxuryCar.getRegistrationNumber(),
store1.getId(), store1.getId(), sdf.parse("03/01/2025"), sdf.parse("03/22/2025"),
new WeeklyPricingStrategy() // Using Weekly Pricing Strategy
);

// the Pricing strategies can be taken as user input as well while making the reservation
//...existing code
}
}
```

‍

## ✨ Conclusion : 

This low-level design for the Car Rental System demonstrates a well-structured, scalable, and extensible architecture. It emphasizes modularity by clearly defining components such as vehicles, reservations, and payment processing. The design supports a range of enhancements, including the addition of new vehicle types, diverse payment options, ensuring the system remains maintainable and flexible. These extensibility points make the system adaptable to future requirements and evolving business needs.  

In an interview setting, presenting this design showcases your ability to craft robust and versatile solutions, underscoring your expertise in applying design patterns, best practices, and thoughtful architecture to real-world scenarios.

---
