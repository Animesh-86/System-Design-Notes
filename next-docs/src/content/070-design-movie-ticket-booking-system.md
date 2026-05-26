---
title: "Design Movie Ticket Booking System"
type: lld
order: 70
---

# Design Movie Ticket Booking System

Topic Tags:

System DesignLLD

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

# ‍

# Low-Level Design: Movie Ticket Booking System 🎬

A movie ticket booking system is designed to efficiently manage movie shows, seat reservations, and payment processing in a theatre. The system needs to handle multiple concurrent requests, manage seat availability states, and ensure a smooth user experience while maintaining data consistency.

‍

**Setup:**

• The theatre has multiple screens, each with a specific seating arrangement.

• Each screen can host multiple shows for different movies throughout the day.

• Users can browse available shows and select seats for booking.

• Each booking session has a configurable timeout period.

‍

**Operation:**

• Users can view all available shows and select a particular show.

• Users can view available seats for a selected show.

• Users can select seats, which become temporarily unavailable to other users.

• Users must complete payment within the session timeout period.

• The system handles concurrent booking requests and prevents double bookings.

‍

**Safety Features:**

• Seat locking mechanism to prevent double booking.

• Session timeout to release locked seats if payment isn't completed.

• Notification system for users when selected seats become unavailable.

‍

## Interview Setting 🤝 : 

### Point 1: Introduction and Vague Problem Statement:

Interviewer: Let's start with a basic problem statement. Design a Movie Ticket Booking System.

‍

Candidate: Certainly! Here's my understanding of the Movie Ticket Booking System:

• The system will manage multiple shows for different movies across screens in a theatre.

• Users can browse shows and select seats for booking.

• The system needs to handle concurrent seat selections and prevent double bookings.

• A booking process includes seat selection, payment, and ticket generation.

• The system should be scalable and maintain data consistency.

Is this the expected direction?

‍

Interviewer: Yes, you are aligned with the direction. Please continue ahead.

‍

Candidate: Great! Before diving into the design, I'd like to clarify a few requirements:

• How should we handle concurrent users trying to book the same seats?

• What happens if a user selects seats but doesn't complete payment?

• Are there any timing constraints for completing a booking?

‍

### Point 2: Clarifying Requirements:

Interviewer: We want a system that:

• Supports multiple screens in a theatre showing different movies.

• Handles both browse requests (viewing shows/seats) and booking requests.

• Efficiently manages concurrent booking attempts to prevent double bookings.

• Implements session timeouts to release seats if payment isn't completed.

‍

Candidate: To summarize, the key requirements are:

• A theatre with multiple screens and shows.

• User authentication and booking session management.

• Temporary seat locking during the booking process.

• Seat status tracking (available, temporarily unavailable, permanently unavailable).

• Session timeout to handle abandoned bookings.

‍

Interviewer: Perfect, let's proceed.

‍

### Point 3: Identifying Key Components:

Candidate: Now that we have the requirements, let's identify the key components of our Movie Ticket Booking system:

1\. Theatre: Represents the physical theatre with screens. 

2\. Screen: Represents a movie screen within the theatre. 

3\. Movie: Represents a movie that can be shown. 

4\. Show: Represents a movie screening at a specific time and screen. 

5\. Seat: Represents an individual seat in a screen.

6\. User: Represents a registered user of the system. 

7\. SeatLockProvider : Common Interface for Locking Mechanisms during Ticket Booking

‍

State Management with Enums: To effectively manage seat statuses, we'll use enums:

‍

```java

// Enum to represent the status of a booking session

public enum BookingStatus {
CREATED,// Booking has been created but not yet confirmed
CONFIRMED, // Booking has been successfully confirmed
EXPIRED; // Booking has expired due to timeout or other factors
}

// Enum to represent seat categories in a movie ticket booking system.
public enum SeatCategory {
SILVER, // Standard seating with basic amenities
GOLD, // Premium seating with better view and comfort
PLATINUM; // Luxurious seating with highest comfort and exclusive benefits
}
```

‍

Interviewer: That sounds good. Let's proceed with the design details.

‍

### Point 4: Design Challenges:

Interviewer: What design challenges do you anticipate?

‍

Candidate: The key challenges for the Movie Ticket Booking system include:

• Concurrency Management: Handling multiple users trying to book the same seats simultaneously.

• Session Management: Tracking and timing out booking sessions to prevent seat hoarding.

• Payment Integration: Managing the payment process with retry capabilities.

• Scalability: Supporting multiple theatres, screens, and concurrent users.

‍

### Point 5: Approach:

Interviewer: How would you approach these challenges?

‍

Candidate: I propose using design patterns effectively. Here are my strategies:

1\. **Repository Pattern:** 

• We have different Services like MovieService and TheatreService acting as repositories, managing collections of entities.

• They handle creation, retrieval, and management of domain objects.

‍

2\. **Strategy Pattern for Seat Locking Mechanism :** 

• Defines a family of Locking algorithms and makes them interchangeable. 

• Allows the booking system to support various locking methods (e.g., database-backed or distributed lock providers) to be used without changing the dependent code.

‍

3.  **Controller/Handler/Manager -> Service Pattern for Clean Architecture :** 

• Promotes separation of concerns by delegating HTTP request handling to controllers and business logic to service classes.

• Enables a clean, maintainable, and scalable architecture that aligns well with popular frameworks like Spring Boot, Django, and Express.js.

‍

4\. **Dependency Injection:** 

• The system uses constructor-based dependency injection to provide required services.

• For example, the BookingService requires a SeatLockProvider which is injected through its constructor.

‍

5\. **Factory Method Pattern for Entity Creation:** 

• Centralizes the creation logic for complex objects like Movies, Shows, and Theatres

• Encapsulates instantiation logic in dedicated factory methods, making it easier to change creation algorithms.

‍

6.  **Observer Pattern for Notification System:** 

• Allows for adding multiple notification channels (email, SMS, push notifications) without modifying the booking logic

• Provides real-time updates to users about their bookings and relevant show information

‍

Interviewer: That sounds like a solid approach. Let's delve into the implementation details.

‍

### Point 6: Implementation:

Interviewer: Ready to discuss implementation?

‍

Candidate: Yes. I'll focus on a modular and scalable design that meets the core Movie Ticket Booking system requirements.

‍

Movie ticket Booking Design with Design Patterns : (Below code is good for Machine Coding Rounds, but not possible to write for an LLD Interview, so make sure to watch the video, to know, what to write so that you can display design skills and also not run out of time - Or watch past Design Videos)

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1745202082866-Frame-243-\(2\).png)

‍

### 1\. Implementing Core Classes : 

**Movie Class :** 

‍

```java

public class Movie {
private final int movieId;
private final String movieName;
private final int movieDurationInMinutes;
public Movie(int i, String movieName, int movieDurationInMinutes) {
this.movieId = i;
this.movieName = movieName;
this.movieDurationInMinutes = movieDurationInMinutes;
}
// Getters and Setters Section Start
public int getMovieId() {return movieId;}
public String getMovieName() {return movieName;}
public int getMovieDuration() { return movieDurationInMinutes;}
// Getters and Setters Section End
}
```

‍

**Seat.class**

```java

public class Seat {
private final int seatId; // Unique identifier for the seat
private final int row; // Row number where the seat is located
private final SeatCategory seatCategory; // Category of the seat (e.g., Silver, Gold, Platinum)
public Seat(final int seatId,final int row, final SeatCategory seatCategory) {
this.seatId = seatId;
this.row = row;
this.seatCategory = seatCategory;
}
// Getters and Setters Section Start
public int getSeatId() {
return seatId;
}
public int getRow() {
return row;
}
public SeatCategory getSeatCategory() {
return seatCategory;
}
// Getters and Setters Section End
}
```

‍

**Screen Class**

```java

public class Screen {
private final int id; // Unique identifier for the screen
private final String name;  // Name of the screen
private final Theatre theatre;  // The theater to which this screen belongs
private final List<Seat> seats;   // List of seats available in this screen
public Screen(final int id, final String name, final Theatre theatre) {
this.id = id;
this.name = name;
this.theatre = theatre;
this.seats = new ArrayList<>();
}
public void addSeat(final Seat seat) {
this.seats.add(seat);
}

// Getters and Setters Section Start
public int getScreenId() {
return id;
}
public List<Seat> getSeats() {
return seats;
}
public Theatre getTheatre() {
return theatre;
}
// Getters and Setters Section End
}
```

‍

**Show class**

```java

public class Show {
// Unique identifier for the show
private final int id;
// The movie being shown
private final Movie movie;

// The screen where the show is played
private final Screen screen;
// Start time of the show
private final Date startTime;
// Duration of the show in seconds
private final Integer durationInMinutes;

public Show(final int id, final Movie movie, final Screen screen, final Date startTime, final Integer durationInMinutes) {
this.id = id;
this.movie = movie;
this.screen = screen;
this.startTime = startTime;
this.durationInMinutes = durationInMinutes;
}
// Getters Section Start
public int getId() {
return id;
}
public Movie getMovie() { return movie;}
public Screen getScreen() {
return screen;
}
public Date getStartTime() {
return startTime;
}
public Integer getdurationInMinutes() {
return durationInMinutes;
}
// Getters Section End
}
```

‍

**Theatre Class**

```java

public class Theatre {

private final int id;  // Unique identifier for the theatre
private final String name; // Name of the theatre
private final List<Screen> screens; // List of screens available in the theatre
public Theatre(final int id,final String name) {
this.id = id;
this.name = name;
this.screens = new ArrayList<>();
}
public void addScreen(final  Screen screen) {
screens.add(screen);
}
// Getters Section Start
public int getTheatreId() {
return id;
}
public List<Screen> getScreen() {
return screens;
}
// Getters Section End
}
```

‍

**User class**

```java

public class User {
private final String name; // Name of the user 
private final String emailAddress;  // Email of the User

public User(final String name, final String emailAddress) {
this.name = name;
this.emailAddress = emailAddress;
}
// Getters Section Start
public String getUserName() {
return name;
}
public String getUserEmail() {
return emailAddress;
}
// Getters Section End
}
```

‍

**Booking class**

```java

public class Booking {
private final String id; // Unique identifier for this booking.
private final Show show; // The specific show for which the booking is made.
private final List<Seat> seatsBooked; // The list of seats that are part of this booking.
private final User user; // The user who made this booking.
private BookingStatus bookingStatus; // The current status of the booking (e.g., Created, Confirmed, Expired).

public Booking(final String id, final Show show, final User user, final List<Seat> seatsBooked) {
this.id = id;
this.show = show;
this.seatsBooked = seatsBooked;
this.user = user;
this.bookingStatus = BookingStatus.CREATED; // Initial booking status is set to Created.
}

public boolean isConfirmed() {
return this.bookingStatus == BookingStatus.CONFIRMED;
}

public void confirmBooking() throws Exception {
if (this.bookingStatus != BookingStatus.CREATED) {
throw new Exception("Cannot confirm a booking that is not in the Created state.");
}
this.bookingStatus = BookingStatus.CONFIRMED; // Update the booking status to Confirmed.
}

public void expireBooking() throws Exception {
if (this.bookingStatus != BookingStatus.CREATED) {
throw new Exception("Cannot expire a booking that is not in the Created state.");
}
this.bookingStatus = BookingStatus.EXPIRED; // Update the booking status to expire.
}

// Getters Section Start
public String getId() {
return id;
}

public Show getShow() {
return show;
}

public List<Seat> getSeatsBooked() {
return seatsBooked;
}

public User getUser() {
return user;
}

public BookingStatus getBookingStatus() {
return bookingStatus;
}
// Getters Section End
}
```

‍

• **Seat Lock Class (V.V. Important):** 

This class is designed to represent a temporary lock on a specific seat. These locks are acquired by users during the booking process to prevent concurrent bookings of the same seat by multiple users. The purpose of this class is to manage and track which seats are temporarily held, ensuring that only one user can ultimately book a given seat at a time

‍

```java

public class SeatLock {
private Seat seat; // The specific seat that is locked.
private Show show; // The show for which the seat is locked.
private Integer timeoutInSeconds; // The duration for which the lock is valid, in seconds.
private Date lockTime; // The timestamp when the lock was acquired.
private User lockedBy; // Identifier of the user or process that holds the lock.

public SeatLock(Seat seat, Show show, Integer timeoutInSeconds, Date date, User user) {
this.seat = seat;
this.show = show;
this.timeoutInSeconds = timeoutInSeconds;
this.lockTime = date;
this.lockedBy = user;
}

public boolean isLockExpired() {
final Instant lockInstant = lockTime.toInstant().plusSeconds(timeoutInSeconds);
final Instant currentInstant = new Date().toInstant();
return lockInstant.isBefore(currentInstant);
}

public Seat getSeat() {
return seat;
}
public void setSeat(Seat seat) {
this.seat = seat;
}

public Show getShow() {
return show;
}
public void setShow(Show show) {
this.show = show;
}
public Integer getTimeoutInSeconds() {
return timeoutInSeconds;
}

public void setTimeoutInSeconds(Integer timeoutInSeconds) {
this.timeoutInSeconds = timeoutInSeconds;
}

public Date getLockTime() {
return lockTime;
}

public void setLockTime(Date lockTime) {
this.lockTime = lockTime;
}

public User getLockedBy() {
return lockedBy;
}

public void setLockedBy(User lockedBy) {
this.lockedBy = lockedBy;
}
}
```

‍

### 2\. Implementing ISeatLockProvider for Dependency Inversion : 

• **ISeatLockProvider Interface :** 

This interface defines the contract for any class that provides seat locking functionality in the movie ticket booking system. It outlines the essential operations for temporarily reserving seats for users during the booking process, ensuring that different locking mechanisms can be used interchangeably within the BookingService.

‍

```java

public interface ISeatLockProvider {
void lockSeats(Show show, List<Seat> seat, User user) throws Exception;
void unlockSeats(Show show, List<Seat> seat, User user);
boolean validateLock(Show show, Seat seat, User user);
List<Seat> getLockedSeats(Show show);
}
```

‍

**• Concrete Lock Providers :** 

**• Seat Lock Provider :** 

This is a concrete implementation of the SeatLockProvider interface that manages seat locks in the application's memory. It uses a Map to store the lock information, associating shows and seats with the user who locked them and the lock's expiration time. This provider is suitable for scenarios where persistence of locks across application restarts is not required.

‍

```java

public class SeatLockProvider implements ISeatLockProvider {
// Timeout in seconds after which a lock expires
private final Integer lockTimeout;

// Stores the locks per show and seat
private final Map<Show, Map<Seat, SeatLock>> locks;

// Constructor to initialize lock store and timeout
public SeatLockProvider(Integer lockTimeout) {
this.locks = new ConcurrentHashMap<>();
this.lockTimeout = lockTimeout;
}

@Override
public void lockSeats(final Show show, final List<Seat> seats,
final User user) throws Exception {
// Get or initialize the seat lock map for this show
Map<Seat, SeatLock> seatLocks =
locks.computeIfAbsent(show, s -> new ConcurrentHashMap<>());
synchronized (seatLocks) {
// Check if any of the requested seats is already locked and the lock is
// still valid
for (Seat seat : seats) {
if (seatLocks.containsKey(seat)) {
SeatLock existingLock = seatLocks.get(seat);
if (!existingLock.isLockExpired()) {
throw new Exception(
"Seat " + seat.getSeatId() + " is already locked.");
}
}
}
// All seats available; lock them together
Date now = new Date();
for (Seat seat : seats) {
SeatLock lock = new SeatLock(seat, show, lockTimeout, now, user);
seatLocks.put(seat, lock);
}
}
}

@Override
public void unlockSeats(
final Show show, final List<Seat> seats, final User user) {
Map<Seat, SeatLock> seatLocks = locks.get(show);
if (seatLocks == null)
return;
synchronized (seatLocks) {
for (Seat seat : seats) {
SeatLock lock = seatLocks.get(seat);
if (lock != null && lock.getLockedBy().equals(user)) {
seatLocks.remove(seat);
}
}
}
}

@Override
public boolean validateLock(
final Show show, final Seat seat, final User user) {
Map<Seat, SeatLock> seatLocks = locks.get(show);
if (seatLocks == null)
return false;
synchronized (seatLocks) {
SeatLock lock = seatLocks.get(seat);
return lock != null && !lock.isLockExpired()
&& lock.getLockedBy().equals(user);
}
}

@Override
public List<Seat> getLockedSeats(final Show show) {
Map<Seat, SeatLock> seatLocks = locks.get(show);
if (seatLocks == null) {
return Collections.emptyList();
}
synchronized (seatLocks) {
return seatLocks.entrySet()
.stream()
.filter(entry -> !entry.getValue().isLockExpired())
.map(Map.Entry::getKey)
.collect(Collectors.toList());
}
}
}
```

‍

> Note : Other Lock Providers can be Third Party Lock Providers or another algorithmic lock providers

‍

### 3\. Controller -> Service Pattern for Clean Architecture : 

• **Implementing Core Services :** 

‍

_Movie Service :_ 

```java

public class MovieService {
private final Map<Integer, Movie> movies;
private final AtomicInteger movieCounter; // Private counter for generating movie IDs
public MovieService() {
this.movies = new HashMap<>();
this.movieCounter = new AtomicInteger(0); // Initialize the counter to 0
}


public Movie getMovie(final int movieId) throws Exception {
if (!movies.containsKey(movieId)) {
throw new Exception("Movie with ID " + movieId + " not found.");
}
return movies.get(movieId);
}
public Movie createMovie(final String movieName, final int durationInMinutes) {
int movieId = movieCounter.incrementAndGet(); // Increment the counter and get the new value.
Movie movie = new Movie(movieId, movieName, durationInMinutes);
movies.put(movieId, movie);
return movie;
}
}
```

‍

_Theatre Service_

```java

public class TheatreService {

// Maps to hold all created theatres, screens, and seats
private final Map<Integer, Theatre> theatres;
private final Map<Integer, Screen> screens;
private final Map<Integer, Seat> seats;

// Atomic counters for generating unique IDs
private final AtomicInteger theatreCounter;
private final AtomicInteger screenCounter;
private final AtomicInteger seatCounter;
// Constructor initializing all maps and counters
public TheatreService() {
this.theatres = new HashMap<>();
this.screens = new HashMap<>();
this.seats = new HashMap<>();
this.theatreCounter = new AtomicInteger(0);
this.screenCounter = new AtomicInteger(0);
this.seatCounter = new AtomicInteger(0);
}
// Retrieves a seat by ID, throws exception if not found
public Seat getSeat(final int seatId) throws Exception {
if (!seats.containsKey(seatId)) {
throw new Exception("Seat with ID " + seatId + " not found.");
}
return seats.get(seatId);
}

// Retrieves a theatre by ID, throws exception if not found
public Theatre getTheatre(final int theatreId) throws Exception{
if (!theatres.containsKey(theatreId)) {
throw new Exception("Theatre with ID " + theatreId + " not found.");
}
return theatres.get(theatreId);
}
// Retrieves a screen by ID, throws exception if not found
public Screen getScreen(final int screenId) throws Exception  {
if (!screens.containsKey(screenId)) {
throw new Exception("Screen with ID " + screenId + " not found.");
}
return screens.get(screenId);
}
// Creates a new theatre with a unique ID and stores it
public Theatre createTheatre(final String theatreName) {
int theatreId = theatreCounter.incrementAndGet(); // Generate unique ID
Theatre theatre = new Theatre(theatreId, theatreName);
theatres.put(theatreId, theatre); // Store theatre in map
return theatre;
}
// Creates a new screen in the given theatre and links it
public Screen createScreenInTheatre(final String screenName, final Theatre theatre) {
Screen screen = createScreen(screenName, theatre); // Create screen
theatre.addScreen(screen); // Add to theatre
return screen;
}
// Creates a new seat in the given screen and stores it
public Seat createSeatInScreen(final Integer rowNo, SeatCategory seatCategory,  final Screen screen) {
int seatId = seatCounter.incrementAndGet(); // Generate unique seat ID
Seat seat = new Seat(seatId, rowNo, seatCategory);
seats.put(seatId, seat); // Store seat in map
screen.addSeat(seat); // Link seat to screen
return seat;
}
// Private helper to create a screen with unique ID and store it
private Screen createScreen(final String screenName, final Theatre theatre) {
int screenId = screenCounter.incrementAndGet(); // Generate unique ID
Screen screen = new Screen(screenId, screenName, theatre);
screens.put(screenId, screen); // Store screen in map
return screen;
}
}
```

‍

_Show Service_

```java

public class ShowService {
private final Map<Integer, Show> shows;  // Map to hold all created shows (key = show ID)
private final AtomicInteger showCounter;  // Counter to generate unique IDs for each show
// Constructor initializing the shows map and show counter
public ShowService() {
this.shows = new HashMap<>();
this.showCounter = new AtomicInteger(0);
}
// Retrieves a show by ID, throws exception if not found
public Show getShow(final int showId) throws Exception {
if (!shows.containsKey(showId)) {
throw new Exception("Show with ID " + showId + " not found.");
}
return shows.get(showId);
}
public Show createShow(final Movie movie, final Screen screen, final Date startTime, final Integer durationInSeconds) {
// Generate a unique show ID
int showId = showCounter.incrementAndGet();
// Create and store the new show
final Show show = new Show(showId, movie, screen, startTime, durationInSeconds);
this.shows.put(showId, show);
return show;
}
private List<Show> getShowsForScreen(final Screen screen) {
final List<Show> response = new ArrayList<>();
for (Show show : shows.values()) {
if (show.getScreen().getScreenId() == screen.getScreenId()) { // Compare by screen ID
response.add(show);
}
}
return response;
}
}
```

‍

_Seat Availibilty service_

```java

public class SeatAvailabilityService {
// Dependency for checking booked seats
private final BookingService bookingService;
// Dependency for checking currently locked (but not yet booked) seats
private final ISeatLockProvider seatLockProvider;
// Constructor to initialize dependencies
public SeatAvailabilityService(final BookingService bookingService, final ISeatLockProvider seatLockProvider) {
this.bookingService = bookingService;
this.seatLockProvider = seatLockProvider;
}
public List<Seat> getAvailableSeats(final Show show) {
// Fetch all seats for the show’s screen
final List<Seat> allSeats = show.getScreen().getSeats();


// Get the list of currently unavailable seats (booked or locked)
final List<Seat> unavailableSeats = getUnavailableSeats(show);
// Start with all seats, and remove unavailable ones
final List<Seat> availableSeats = new ArrayList<>(allSeats);
availableSeats.removeAll(unavailableSeats);
return availableSeats;
}


private List<Seat> getUnavailableSeats(final Show show) {
// Seats that are already booked
final List<Seat> unavailableSeats = bookingService.getBookedSeats(show);


// Seats that are locked (e.g., being held in another user’s session)
unavailableSeats.addAll(seatLockProvider.getLockedSeats(show));
return unavailableSeats;
}
}
```

‍

_Booking Service_

```java

public class BookingService {
// Stores all bookings made across shows (key = booking ID)
// Changed to a thread-safe concurrent map.
private final Map<String, Booking> showBookings;
// Provider responsible for handling temporary seat locks
private final ISeatLockProvider seatLockProvider;
// Atomic integer to generate unique booking IDs
private final AtomicInteger bookingIdCounter = new AtomicInteger(1);
// Constructor to initialize dependencies
public BookingService(ISeatLockProvider seatLockProvider) {
this.seatLockProvider = seatLockProvider;
this.showBookings = new ConcurrentHashMap<>();
}

public Booking getBooking(final String bookingId) throws Exception  {
if (!showBookings.containsKey(bookingId)) {
throw new Exception("No Booking exists for the ID : " + bookingId);
}
return showBookings.get(bookingId);
}

public List<Booking> getAllBookings(final Show show) {
List<Booking> response = new ArrayList<>();
for (Booking booking : showBookings.values()) {
if (booking.getShow().equals(show)) response.add(booking);
}
return response;
}

public Booking createBooking(final User user, final Show show, final List<Seat> seats) throws Exception {
// Check if any requested seat is already booked
if (isAnySeatAlreadyBooked(show, seats)) throw new Exception("Seat Already Booked");
// Lock the seats temporarily for the user (this will throw an exception if any seat is already locked)
seatLockProvider.lockSeats(show, seats, user);
// Create a new booking with a unique booking ID using AtomicInteger
final String bookingId = String.valueOf(bookingIdCounter.getAndIncrement());
final Booking newBooking = new Booking(bookingId, show, user, seats);
// Save the booking
showBookings.put(bookingId, newBooking);
return newBooking;
}

public List<Seat> getBookedSeats(final Show show) {
return getAllBookings(show).stream()
.filter(Booking::isConfirmed)      // Only confirmed bookings
.map(Booking::getSeatsBooked)      // Extract booked seats
.flatMap(Collection::stream)       // Flatten seat lists
.collect(Collectors.toList());
}

public void confirmBooking(final Booking booking, final User user) throws Exception {
if (!booking.getUser().equals(user)) {
throw new Exception("Cannot confirm a booking made by another user"); // User mismatch
}
// Validate locks for each seat
for (Seat seat : booking.getSeatsBooked()) {
if (!seatLockProvider.validateLock(booking.getShow(), seat, user)) {
throw new Exception("Acquired Lock is either invalid or has Expired");
}
}
// Mark booking as confirmed
booking.confirmBooking();
}

private boolean isAnySeatAlreadyBooked(final Show show, final List<Seat> seats) {
final List<Seat> bookedSeats = getBookedSeats(show);
for (Seat seat : seats) {
if (bookedSeats.contains(seat)) return true;
}
return false;
}
}
```

‍

**• Payment Service :** 

• _Strategy Pattern for Payments :_

Payment Strategy Interface : 

```java

public interface PaymentStrategy {
boolean processPayment();
}
```

‍

**• Concrete Payment Strategies :** 

_Debit Card Strategy :_ 

```java

public class DebitCardStrategy implements PaymentStrategy {
@Override
public boolean processPayment() {
// In a real-world scenario, this would include logic to integrate with a payment gateway,
// validate card details, handle 3D secure authentication, check balance, and process the transaction.
return true;
}
}
```

‍

_UPI stratergy:_

```java

public class UpiStrategy implements PaymentStrategy {
@Override
public boolean processPayment() {
// In a real-world scenario, this would include logic to integrate with a
// payment gateway, validate card details, handle 3D secure authentication,
// check balance, and process the transaction.
return false;
}
}

public class PaymentService {
// Keeps track of how many times payment has failed for a particular booking.
Map<Booking, Integer> bookingFailures;


// The strategy which the user will decide to do the payment
private final PaymentStrategy paymentStrategy;
private BookingService bookingService;

public PaymentService(
PaymentStrategy paymentStrategy, BookingService bookingService) {
this.bookingFailures = new ConcurrentHashMap<>();
this.paymentStrategy = paymentStrategy;
this.bookingService = bookingService;
}

// Called when payment fails for a booking attempt.
public void processPaymentFailed(final String bookingId, final User user)
throws Exception {
// Only the user who initiated the booking is allowed to report failure.
Booking booking = bookingService.getBooking(bookingId);
if (!booking.getUser().equals(user)) {
throw new Exception("Only the booking owner can report payment failure.");
}
// Initialize failure count for the booking if it's the first failure.
if (!bookingFailures.containsKey(booking))
bookingFailures.put(booking, 0);

// Increment failure count.
final Integer currentFailuresCount = bookingFailures.get(booking);
final Integer newFailuresCount = currentFailuresCount + 1;
bookingFailures.put(booking, newFailuresCount);
System.out.println(
"Could not process the payment for Booking with ID : " + bookingId);
}

public void processPayment(final String bookingId, final User user)
throws Exception {
if (paymentStrategy.processPayment()) {
bookingService.confirmBooking(bookingService.getBooking(bookingId), user);
} else {
processPaymentFailed(bookingId, user);
}
}
}
```

‍

• **Implementing Core Controller Classes :** 

_Movie Controller :_ 

‍

```java

public class MovieController {
// Reference to the MovieService which contains the business logic related to movies
private final MovieService movieService;

// Constructor to initialize the MovieService dependency
public MovieController(final MovieService movieService) {
this.movieService = movieService;
}
public int createMovie(final String movieName, final int durationInMinutes) {
return movieService.createMovie(movieName, durationInMinutes).getMovieId();
}
}
```

‍

_Theatre Controller :_ 

```java

public class TheatreController {
private final TheatreService theatreService;
// Constructor to inject TheatreService
public TheatreController(final TheatreService theatreService) {
this.theatreService = theatreService;
}
public int createTheatre(final String theatreName) {
return theatreService.createTheatre(theatreName).getTheatreId();
}
public int createScreenInTheatre(final String screenName, final int theatreId) throws Exception {
final Theatre theatre = theatreService.getTheatre(theatreId);
return theatreService.createScreenInTheatre(screenName, theatre).getScreenId();
}

public int createSeatInScreen(final Integer rowNo, final SeatCategory seatCategory, final int screenId) throws Exception {
final Screen screen = theatreService.getScreen(screenId);
return theatreService.createSeatInScreen(rowNo, seatCategory, screen).getSeatId();
}
}
```

‍

_• Show Controller :_ 

```java

public class ShowController {
// Dependencies injected for handling show operations, theatre data, movie data, and seat availability.
private final SeatAvailabilityService seatAvailabilityService;
private final ShowService showService;
private final TheatreService theatreService;
private final MovieService movieService;
// Constructor to inject all required services
public ShowController(SeatAvailabilityService seatAvailabilityService, ShowService showService,
TheatreService theatreService, MovieService movieService) {
this.seatAvailabilityService = seatAvailabilityService;
this.showService = showService;
this.theatreService = theatreService;
this.movieService = movieService;
}
public int createShow(final int movieId, final int screenId, final Date startTime,
final Integer durationInSeconds) throws Exception{
final Screen screen = theatreService.getScreen(screenId);
final Movie movie = movieService.getMovie(movieId);
return showService.createShow(movie, screen, startTime, durationInSeconds).getId();
}
public List<Integer> getAvailableSeats(final int showId) throws Exception{
final Show show = showService.getShow(showId);
final List<Seat> availableSeats = seatAvailabilityService.getAvailableSeats(show);
return availableSeats.stream().map(Seat::getSeatId).collect(Collectors.toList());
}
}
```

‍

_Booking Controller_

```java

public class BookingController {
// Services required to handle booking-related operations
private final ShowService showService;
private final BookingService bookingService;
private final TheatreService theatreService;
public BookingController(final ShowService showService, final BookingService bookingService,
final TheatreService theatreService){
this.showService = showService;
this.bookingService = bookingService;
this.theatreService = theatreService;
}
public String createBooking(final User user, final int showId, final List<Integer> seatsIds) throws Exception{
final Show show = showService.getShow(showId); // Retrieve the show object
// Convert seat IDs to Seat objects
final List<Seat> seats = new ArrayList<>();
for (Integer seatsId : seatsIds) {
Seat seat = theatreService.getSeat(seatsId);
seats.add(seat);
}
return bookingService.createBooking(user, show, seats).getId(); // Create and return booking ID
}
}
```

‍

_Payment Controller_

```java

public class PaymentController {
// Service to handle payment-related logic
private final PaymentService paymentService;
public PaymentController(PaymentService paymentService) {
this.paymentService = paymentService;
}
public void processPayment(final String bookingId, final User user) throws Exception {
paymentService.processPayment(bookingId, user);
}
}
```

‍

_Client code to run on system_

```java

public class Main {
public static void main(String[] args) {
try {
// Initialize services
MovieService movieService = new MovieService();
TheatreService theatreService = new TheatreService();
ShowService showService = new ShowService();
// Create a seat lock provider with a 10-minute timeout (600 seconds)
ISeatLockProvider seatLockProvider = new SeatLockProvider(600);
// Initialize booking service with the seat lock provider
BookingService bookingService = new BookingService(seatLockProvider);
// Initialize seat availability service
SeatAvailabilityService seatAvailabilityService = new SeatAvailabilityService(bookingService, seatLockProvider);

// Initialize payment service with a simple payment strategy
PaymentService paymentService = new PaymentService(new DebitCardStrategy(), bookingService);

// Initialize controllers
MovieController movieController = new MovieController(movieService);
TheatreController theatreController = new TheatreController(theatreService);
ShowController showController = new ShowController(seatAvailabilityService, showService, theatreService, movieService);
BookingController bookingController = new BookingController(showService, bookingService, theatreService);
PaymentController paymentController = new PaymentController(paymentService);

// Step 1: Create a theatre
System.out.println("Creating a new theatre...");
int theatreId = theatreController.createTheatre("PVR Cinemas");
System.out.println("Theatre created with ID: " + theatreId);
// Step 2: Create a screen in the theatre
System.out.println("Creating a new screen...");
int screenId = theatreController.createScreenInTheatre("Screen 1", theatreId);
System.out.println("Screen created with ID: " + screenId);

// Step 3: Create seats in the screen
System.out.println("Creating seats...");
// Create 5 rows with 10 seats each
for (int row = 1; row <= 5; row++) {
SeatCategory category;
if (row == 1) {
category = SeatCategory.PLATINUM; // First row is premium
} else if (row <= 3) {
category = SeatCategory.GOLD;     // Next two rows are gold
} else {
category = SeatCategory.SILVER;   // Rest are silver
}
for (int seatNum = 1; seatNum <= 10; seatNum++) {
int seatId = theatreController.createSeatInScreen(row, category, screenId);
System.out.println("Created seat at row " + row + " with ID: " + seatId + " and category: " + category);
}
}

// Step 4: Create a movie
System.out.println("
Creating a new movie...");
int movieId = movieController.createMovie("Inception", 150);
System.out.println("Movie created with ID: " + movieId);

// Step 5: Create a show
System.out.println("
Creating a new show...");
Date showTime = new Date(); // Current time
int showId = showController.createShow(movieId, screenId, showTime, 150);
System.out.println("Show created with ID: " + showId);

// Step 6: Get available seats for the show
System.out.println("
Checking available seats...");
List<Integer> availableSeats = showController.getAvailableSeats(showId);
System.out.println("Available seats: " + availableSeats);

// Step 7: Create a user
System.out.println("
Creating a user...");
User user = new User("John Doe", "john.doe@example.com");
System.out.println("User created: " + user.getUserName() + " with email: " + user.getUserEmail());

// Step 8: Book tickets sequentially
System.out.println("
Sequential booking of seats 1, 2, 3...");
String bookingId = bookingController.createBooking(user, showId, Arrays.asList(1, 2, 3));
System.out.println("Booking created with ID: " + bookingId);

// Step 9: Process payment for the booking
System.out.println("
Processing payment...");
paymentController.processPayment(bookingId, user);
System.out.println("Payment processed successfully!");

// Step 10: Verify booking status
Booking booking = bookingService.getBooking(bookingId);
System.out.println("
Booking status: " + booking.getBookingStatus());
System.out.println("Is booking confirmed? " + booking.isConfirmed());

// Step 11: Check available seats again after booking
System.out.println("
Checking available seats after booking...");
availableSeats = showController.getAvailableSeats(showId);
System.out.println("Available seats: " + availableSeats);

// ------------------------------
// CONCURRENT BOOKING SIMULATION
// ------------------------------
System.out.println("
Simulating concurrent booking attempts...");
Thread t1 = new Thread(() -> {
try {
// User 1 (John Doe) trying to book seats 5, 6, 7
String bookingIdT1 = bookingController.createBooking(user, showId, Arrays.asList(5, 6, 7));
System.out.println("User1 booking (seats 5,6,7) succeeded with Booking ID: " + bookingIdT1);
} catch (Exception e) {
System.err.println("User1 booking (seats 5,6,7) failed: " + e.getMessage());
}
});
Thread t2 = new Thread(() -> {
try {
// User 2 trying to book seats 7, 8, 9 (seat 7 overlaps with User1’s attempt)
User user2 = new User("Jane Doe", "jane.doe@example.com");
String bookingIdT2 = bookingController.createBooking(user2, showId, Arrays.asList(7, 8, 9));
System.out.println("User2 booking (seats 7,8,9) succeeded with Booking ID: " + bookingIdT2);
} catch (Exception e) {
System.err.println("User2 booking (seats 7,8,9) failed: " + e.getMessage());
}
});
t1.start();
t2.start();
t1.join();
t2.join();
// Final available seats after concurrent attempts
System.out.println("
Final available seats after concurrent booking attempts: " + showController.getAvailableSeats(showId));
} catch (Exception e) {
System.err.println("Error occurred: " + e.getMessage());
e.printStackTrace();
}
}
}
```

‍

Output : 

```
Creating a new theatre...
Theatre created with ID: 1
Creating a new screen...
Screen created with ID: 1
Creating seats...
Created seat at row 1 with ID: 1 and category: PLATINUM
Created seat at row 1 with ID: 2 and category: PLATINUM
Created seat at row 1 with ID: 3 and category: PLATINUM
Created seat at row 1 with ID: 4 and category: PLATINUM
Created seat at row 1 with ID: 5 and category: PLATINUM
Created seat at row 1 with ID: 6 and category: PLATINUM
Created seat at row 1 with ID: 7 and category: PLATINUM
Created seat at row 1 with ID: 8 and category: PLATINUM
Created seat at row 1 with ID: 9 and category: PLATINUM
Created seat at row 1 with ID: 10 and category: PLATINUM
Created seat at row 2 with ID: 11 and category: GOLD
Created seat at row 2 with ID: 12 and category: GOLD
Created seat at row 2 with ID: 13 and category: GOLD
Created seat at row 2 with ID: 14 and category: GOLD
Created seat at row 2 with ID: 15 and category: GOLD
Created seat at row 2 with ID: 16 and category: GOLD
Created seat at row 2 with ID: 17 and category: GOLD
Created seat at row 2 with ID: 18 and category: GOLD
Created seat at row 2 with ID: 19 and category: GOLD
Created seat at row 2 with ID: 20 and category: GOLD
Created seat at row 3 with ID: 21 and category: GOLD
Created seat at row 3 with ID: 22 and category: GOLD
Created seat at row 3 with ID: 23 and category: GOLD
Created seat at row 3 with ID: 24 and category: GOLD
Created seat at row 3 with ID: 25 and category: GOLD
Created seat at row 3 with ID: 26 and category: GOLD
Created seat at row 3 with ID: 27 and category: GOLD
Created seat at row 3 with ID: 28 and category: GOLD
Created seat at row 3 with ID: 29 and category: GOLD
Created seat at row 3 with ID: 30 and category: GOLD
Created seat at row 4 with ID: 31 and category: SILVER
Created seat at row 4 with ID: 32 and category: SILVER
Created seat at row 4 with ID: 33 and category: SILVER
Created seat at row 4 with ID: 34 and category: SILVER
Created seat at row 4 with ID: 35 and category: SILVER
Created seat at row 4 with ID: 36 and category: SILVER
Created seat at row 4 with ID: 37 and category: SILVER
Created seat at row 4 with ID: 38 and category: SILVER
Created seat at row 4 with ID: 39 and category: SILVER
Created seat at row 4 with ID: 40 and category: SILVER
Created seat at row 5 with ID: 41 and category: SILVER
Created seat at row 5 with ID: 42 and category: SILVER
Created seat at row 5 with ID: 43 and category: SILVER
Created seat at row 5 with ID: 44 and category: SILVER
Created seat at row 5 with ID: 45 and category: SILVER
Created seat at row 5 with ID: 46 and category: SILVER
Created seat at row 5 with ID: 47 and category: SILVER
Created seat at row 5 with ID: 48 and category: SILVER
Created seat at row 5 with ID: 49 and category: SILVER
Created seat at row 5 with ID: 50 and category: SILVER
 
Creating a new movie...
Movie created with ID: 1
 
Creating a new show...
Show created with ID: 1
 
Checking available seats...
Available seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
 
Creating a user...
User created: John Doe with email: john.doe@example.com
 
Sequential booking of seats 1, 2, 3...
Booking created with ID: 1
 
Processing payment...
Payment processed successfully!
 
Booking status: CONFIRMED
Is booking confirmed? true
 
Checking available seats after booking...
Available seats: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
 
Simulating concurrent booking attempts...
User1 booking (seats 5,6,7) succeeded with Booking ID: 2
 
Final available seats after concurrent booking attempts: [4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
User2 booking (seats 7,8,9) failed: Seat 7 is already locked.
```

‍

Interviewer: Looks good. What makes your approach effective?

‍

Candidate: Here are the key strengths of my approach are:

• **Separation of Concerns** : 

Each layer (Controller → Service → Domain) in the architecture has a clearly defined responsibility:

• Controllers are responsible for handling client requests and delegating logic.

• Services encapsulate business logic and coordination between components.

• Domain classes like Movie, Theatre, Show, and Seat represent the core data model.

‍

• **Single Responsibility** : 

Each class in the system has one and only one responsibility:

▪ TheatreService manages theatre-related operations.

▪ BookingService is responsible for bookings.

▪ PaymentsService handles payment retries and unlocking.

▪ SeatLockProvider abstracts seat locking strategy.

Following SRP (Single Responsibility Principle) results in smaller, focused classes that are easier to understand and extend.

‍

• **Immutability** : 

• Core domain models (like Screen, Movie, Show, etc.) declare their fields as final, ensuring that once initialized, their core identity doesn’t change.

• Services are injected as final fields in the controllers and are stateless, promoting thread safety in a multithreaded environment.

• Using final where appropriate enforces immutability, making code safer and less error-prone.

‍

## ✨Conclusion : 

This low-level design for the Movie Ticket Booking System demonstrates a well-structured, scalable, and extensible architecture. It leverages several key design patterns to achieve modularity, flexibility, and clear separation of concerns.

---
