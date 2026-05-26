---
title: "Facade Design Pattern"
type: lld
order: 39
---

# Facade Design Pattern

Topic Tags:

System DesignLLD

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

# Problem Statement: Simplifying Complexity with a Unified Interface ✨

Imagine you’re designing a multimedia application. The app needs to provide users with an easy way to perform actions like playing music, watching videos, or viewing images. However, each type of media has its own complex subsystem:

‍

• Music Player: Requires initializing audio drivers, decoding audio formats, and managing playback.

• Video Player: Involves setting up rendering engines, handling codecs, and managing screen resolutions.

• Image Viewer: Needs to load image files, apply scaling, and render them on the screen.

‍

The Problem: Users want a simple, intuitive interface to interact with the application, but the underlying subsystems are complex and diverse. Exposing these subsystems directly to users would overwhelm them and increase the likelihood of errors.

‍

## Solving It the Traditional Way: A Messy Solution 🚧

Here’s how you might approach the problem in a straightforward but inflexible way:

‍

```java

import java.util.Scanner;
public class MultimediaApp {
public static void main(String[] args) {
Scanner scanner = new Scanner(System.in);
System.out.println("Choose an action: playMusic, playVideo, viewImage");
String action = scanner.nextLine();
if (action.equalsIgnoreCase("playMusic")) {
MusicPlayer musicPlayer = new MusicPlayer();
musicPlayer.initializeAudioDrivers();
musicPlayer.decodeAudio();
musicPlayer.startPlayback();
} else if (action.equalsIgnoreCase("playVideo")) {
VideoPlayer videoPlayer = new VideoPlayer();
videoPlayer.setupRenderingEngine();
videoPlayer.loadVideoFile();
videoPlayer.playVideo();
} else if (action.equalsIgnoreCase("viewImage")) {
ImageViewer imageViewer = new ImageViewer();
imageViewer.loadImageFile();
imageViewer.applyScaling();
imageViewer.displayImage();
} else {
System.out.println("Invalid action!");
}
scanner.close();
}
}
```

‍

While this code works, it exposes the complexity of each subsystem. The MultimediaApp class is tightly coupled to the specific implementations of the MusicPlayer, VideoPlayer, and ImageViewer. This tight coupling means that any changes to the implementation details of these classes will directly impact the MultimediaApp class, making the code less flexible and harder to maintain. Adding new media types or changing existing implementations would require significant modifications to the MultimediaApp class, leading to a higher risk of introducing bugs and increasing the overall complexity of the system.

‍

Moreover, this approach does not promote code reusability or scalability. Each time a new media type is introduced, the MultimediaApp class must be updated to accommodate the new type, resulting in repetitive and error-prone code. This makes the system less adaptable to changes and harder to extend.

‍

## The Challenge: Handling Complexity Without Losing Simplicity 🤔

An interviewer might ask:

• What if you need to add support for new media types in the future, such as eBooks or podcasts?

• How would you handle a change in subsystem implementation, such as the VideoPlayer switching to a new rendering engine?

• What if you wanted to test or replace a specific subsystem without affecting the rest of the application?

‍

_How can we ensure the client interacts with these subsystems seamlessly without getting entangled in their complexities?_

‍

## Ugly Code: When We Realize the Code Needs Restructuring 🛠️

While the traditional approach works for small systems, it quickly becomes unmanageable as complexity increases:

‍

```java

import java.util.Scanner;

public class MultimediaApp {
public static void main(String[] args) {
Scanner scanner = new Scanner(System.in);
System.out.println("Choose an action: playMusic, playVideo, viewImage, "
+ "readEbooks, playPodcast");
String action = scanner.nextLine();
if (action.equalsIgnoreCase("playMusic")) {
MusicPlayer musicPlayer = new MusicPlayer();
musicPlayer.initializeAudioDrivers();
musicPlayer.decodeAudio();
musicPlayer.startPlayback();
} else if (action.equalsIgnoreCase("playVideo")) {
VideoPlayer videoPlayer = new VideoPlayer();
videoPlayer.setupRenderingEngine();
videoPlayer.loadVideoFile();
videoPlayer.playVideo();
} else if (action.equalsIgnoreCase("viewImage")) {
ImageViewer imageViewer = new ImageViewer();
imageViewer.loadImageFile();
imageViewer.applyScaling();
imageViewer.displayImage();
} else if (action.equalsIgnoreCase("readEbooks")) {
EbookReader ebookReader = new EbookReader();
ebookReader.loadEbookFile();
ebookReader.displayEbook();
} else if (action.equalsIgnoreCase("playPodcast")) {
PodcastPlayer podcastPlayer = new PodcastPlayer();
podcastPlayer.loadPodcast();
podcastPlayer.playPodcast();
} else {
System.out.println("Invalid action!");
}
scanner.close();
}
}
```

‍

### Why is this code Problematic ? 

1.  Tight Coupling:

The MultimediaApp class is directly tied to the implementations of MusicPlayer, VideoPlayer, and ImageViewer. Adding a new media type requires modifying the client code.

‍

2\. Poor Maintainability:

Any change in subsystem behavior (e.g., VideoPlayer switching rendering engines) necessitates updates across the client.

‍

3\. Lack of Scalability:

As more subsystems are added, the client becomes bloated with conditional logic.

‍

## The Savior: Facade Design Pattern 🕸️

The Facade Design Pattern is designed to solve this problem by providing a unified interface to a set of interfaces in a subsystem. It simplifies the interaction between the client and the subsystems, reducing complexity and decoupling the client from subsystem implementations.

‍

## How the Facade Pattern Works 🛠️

The Facade Pattern introduces a facade class that acts as a single point of access to the subsystems. The client interacts with the facade, which delegates requests to the appropriate subsystems. This hides the complexity of the subsystems and provides a clean, simplified interface. Here's how you can implement the Façade Pattern.

‍

## Solving the Problem with the Facade Design Pattern 🌐

### Step 1: Define the Subsystems : 

Each subsystem represents a specific functionality of the multimedia application. By breaking down the application into distinct subsystems, we can manage complexity more effectively and ensure that each part of the application is responsible for a single aspect of functionality and can be developed, tested, and maintained independently.

‍

MusicPlayer.java

```java

import java.util.Scanner;
public class MusicPlayer {
public void initializeAudioDrivers() {
System.out.println("Audio drivers initialized.");
}
public void decodeAudio() {
System.out.println("Audio decoded.");
}
public void startPlayback() {
System.out.println("Music playback started.");
}
}
```

‍

VideoPlayer.java

```java

import java.util.Scanner;
public class VideoPlayer {
public void setupRenderingEngine() {
System.out.println("Rendering engine set up.");
}
public void loadVideoFile() {
System.out.println("Video file loaded.");
}
public void playVideo() {
System.out.println("Video playback started.");
}
}
```

‍

ImageViewer.java

```java

import java.util.Scanner;
public class ImageViewer {
public void loadImageFile() {
System.out.println("Image file loaded.");
}
public void applyScaling() {
System.out.println("Image scaled.");
}
public void displayImage() {
System.out.println("Image displayed.");
}
}
```

‍

### Step 2: Create the Facade Class : 

The facade provides a unified interface to interact with the subsystems. By using a facade, we can simplify the interaction with the complex subsystems and provide a higher-level interface that is easier to use. 

‍

MediaFacade.java

```java

import java.util.Scanner;
public class MediaFacade {
private MusicPlayer musicPlayer;
private VideoPlayer videoPlayer;
private ImageViewer imageViewer;
public MediaFacade() {
this.musicPlayer = new MusicPlayer();
this.videoPlayer = new VideoPlayer();
this.imageViewer = new ImageViewer();
}
public void performAction(String action) {
switch (action.toLowerCase()) {
case "playmusic":
musicPlayer.initializeAudioDrivers();
musicPlayer.decodeAudio();
musicPlayer.startPlayback();
break;
case "playvideo":
videoPlayer.setupRenderingEngine();
videoPlayer.loadVideoFile();
videoPlayer.playVideo();
break;
case "viewimage":
imageViewer.loadImageFile();
imageViewer.applyScaling();
imageViewer.displayImage();
break;
default:
System.out.println("Invalid action!");
}
}
}
```

‍

### Step 3: Use the Facade in the Client : 

The client interacts with the facade instead of the subsystems directly. By doing so, the client code becomes simpler and more manageable, as it no longer needs to be aware of the complexities of each subsystem.

‍

MultiMediaApp.java

```java

import java.util.Scanner;
public class MultimediaApp {
public static void main(String[] args) {
MediaFacade mediaFacade = new MediaFacade();
Scanner scanner = new Scanner(System.in);
System.out.println("Welcome to Multimedia App!");
System.out.println("Choose an action: playMusic, playVideo, viewImage");
String action = scanner.nextLine();
mediaFacade.performAction(action);
scanner.close();
}
}
```

‍![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1742792168914-Frame-233.png)

## ‍

## Advantages of Using the Facade Design Pattern 🏆

1\. Simplified Interface

The facade provides a clean, unified interface to interact with the subsystems, hiding their complexity.

‍

2\. Decoupling

The client is decoupled from the subsystem implementations, making the system easier to maintain and extend.

‍

3\. Scalability

Adding new subsystems or modifying existing ones only requires changes in the facade, not in the client.

‍

4\. Flexibility

The facade centralizes the interaction logic, enabling changes to subsystem communication without affecting the client.

‍

## Real-life Use Cases of the Facade Pattern 🌍

1\. Smart Home Systems

A smart home controller app uses a facade to provide a unified interface for managing devices like lights, thermostats, and security cameras.

‍

2\. Payment Gateways

Payment processing systems use a facade to abstract the complexities of interacting with multiple payment providers.

‍

3.  Database Management

Applications use a facade to provide a simplified interface for interacting with database connections, queries, and transactions.

‍

4\. Multimedia Applications

As shown in this example, the facade simplifies interaction with subsystems like music players, video players, and image viewers.

‍

## Conclusion 🎯

The Facade Design Pattern simplifies complex systems by providing a unified interface that hides the intricacies of subsystems. In our multimedia application example, the facade enables users to play music, videos, and images seamlessly without worrying about the underlying details.

By centralizing interaction logic, the facade pattern improves maintainability, scalability, and flexibility, making it an essential tool for designing clean, user-friendly systems. 🌟

---
