---
title: "Command Design Pattern"
type: lld
order: 29
---

# Command Design Pattern

Topic Tags:

System DesignLLD

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

‍

## Understanding the Command Design Pattern 🛠️

The Command Design Pattern is one of the behavioral design patterns in software development. At its core, it’s about encapsulating a request as an object, which allows you to parameterize objects with operations, delay execution, and queue requests. The idea is that commands (actions you want to perform) are wrapped as objects, and these command objects can then be passed around, stored, or executed when needed. It's kind of like giving someone a "to-do" list where each item represents an action to be performed.

‍

## Why is it Named the Command Pattern? 📝

The pattern is named the Command pattern because it revolves around the concept of commanding an action. Instead of executing a method directly, you create a command object that represents the action. This command object can then be executed at any point in time. You can think of it like giving an order (command) to be carried out when the time is right, which allows for more flexible and reusable code.

‍

Now that we know what the Command Design Pattern is and why it’s named the way it is, let’s dive into a real-world scenario to understand how we can apply this pattern.

‍

## Solving the Problem the Traditional Way 🛠️

Imagine you’re building a remote control system for a device like a TV. Your TV remote needs to be able to perform a set of actions, like turning the TV on and off, changing channels, and adjusting the volume. Let’s start by solving this problem the traditional way without using the Command pattern.

‍

Here’s how you might approach it:

```java
public
class TV {
public
void turnOn() { System.out.println("TV is ON"); }
public
void turnOff() { System.out.println("TV is OFF"); }
public
void changeChannel(int channel) {
System.out.println("Channel changed to " + channel);
}
public
void adjustVolume(int volume) {
System.out.println("Volume set to " + volume);
}
} public class RemoteControl {
private
TV tv;
public
RemoteControl(TV tv) { this.tv = tv; }
public
void pressOnButton() { tv.turnOn(); }
public
void pressOffButton() { tv.turnOff(); }
public
void pressChannelButton(int channel) { tv.changeChannel(channel); }
public
void pressVolumeButton(int volume) { tv.adjustVolume(volume); }
}
```

‍

## What’s the Issue? ❗

As you can see, we are directly calling the methods on the TV object inside the RemoteControl class. So, if we wanted to add new functionality or extend the remote with new features, we’d have to keep modifying the RemoteControl class, leading to code duplication and a lack of flexibility.

The Interviewer’s Questions 🤔

‍

Now imagine an interviewer asking:

• What if we want to add more functionalities to the remote?

• What if we want to store a sequence of operations (like turning the TV on, changing the channel, and adjusting the volume) and execute them later?

• How would you handle a situation where multiple remotes are controlling different devices in the future?

‍

These are great questions that push us to rethink the design. The current approach requires modification each time we add a new feature, and the scalability isn’t great.

‍

## The Ugly Code 🤦‍♂️

Let’s take it a step further and see how things get ugly when we add more functionalities. If we decide to add more complex operations (like multiple actions in a sequence), the code starts to get messy and hard to maintain.

‍

```java
public class RemoteControl {
private TV tv;
public RemoteControl(TV tv) {
this.tv = tv;
}
public void pressOnButton() {
tv.turnOn();
}
public void pressOffButton() {
tv.turnOff();
}
public void pressChannelButton(int channel) {
tv.changeChannel(channel);
}
public void pressVolumeButton(int volume) {
tv.adjustVolume(volume);
}
// New methods are added each time we need more actions
public void pressOnChangeVolumeAndChannelButton(int volume, int channel) {
tv.turnOn();
tv.changeChannel(channel);
tv.adjustVolume(volume);
}
}
```

‍

## What’s the Problem Here?

• Code Duplication:

As we add more actions (like turning the TV on, changing the channel, and adjusting the volume), we need to keep modifying the RemoteControl class. This results in increased code duplication and the potential for bugs.

‍

• Hard to Extend:

If we want to add more devices (say a smart speaker or AC unit), we’d have to keep modifying the remote. The system is not flexible enough to easily scale.

‍

## Our Savior: The Command Design Pattern ✨

Now, let's introduce our savior: the Command Design Pattern. With this pattern, instead of directly invoking actions in the RemoteControl, we create command objects that encapsulate each action. This will allow us to add more features without modifying the existing code. We also gain the ability to store and execute commands at a later time.

‍

## How Does the Command Pattern Work? 🧑‍🏫

We’ll start by defining a Command interface that every command will implement. Each specific command (like turning the TV on or changing the channel) will be represented by a class that implements this interface. The RemoteControl class will only hold references to these command objects, and when a button is pressed, it will execute the corresponding command.

‍

### Step 1: Define the Command Interface 📝

```java
public interface Command {
void execute(); // Executes the command
}
```

‍

### Step 2: Implement the Concrete Command Classes 🖋️

```java
public class TurnOnCommand implements Command {
private TV tv;
public TurnOnCommand(TV tv) {
this.tv = tv;
}
@Override
public void execute() {
tv.turnOn();
}
}
public class TurnOffCommand implements Command {
private TV tv;
public TurnOffCommand(TV tv) {
this.tv = tv;
}
@Override
public void execute() {
tv.turnOff();
}
}
public class ChangeChannelCommand implements Command {
private TV tv;
private int channel;
public ChangeChannelCommand(TV tv, int channel) {
this.tv = tv;
this.channel = channel;
}
@Override
public void execute() {
tv.changeChannel(channel);
}
}
public class AdjustVolumeCommand implements Command {
private TV tv;
private int volume;
public AdjustVolumeCommand(TV tv, int volume) {
this.tv = tv;
this.volume = volume;
}
@Override
public void execute() {
tv.adjustVolume(volume);
}
}
```

‍

### Step 3: The Invoker Class (RemoteControl) 🎮

```java
public class RemoteControl {
private Command onCommand;
private Command offCommand;
public void setOnCommand(Command onCommand) {
this.onCommand = onCommand;
}
public void setOffCommand(Command offCommand) {
this.offCommand = offCommand;
}
public void pressOnButton() {
onCommand.execute();
}
public void pressOffButton() {
offCommand.execute();
}
}
```

‍

### Step 4: The TV class 📺

```java
// The TV class with methods for the different operations
public class TV {
public void turnOn() {
System.out.println("TV is ON");
}
public void turnOff() {
System.out.println("TV is OFF");
}
public void changeChannel(int channel) {
System.out.println("Channel changed to " + channel);
}
public void adjustVolume(int volume) {
System.out.println("Volume set to " + volume);
}
}
```

‍

### Step 5: Putting Everything Together 🏗️

```java
public class Main {
public static void main(String[] args) {
TV tv = new TV();
// Create commands
Command turnOn = new TurnOnCommand(tv);
Command turnOff = new TurnOffCommand(tv);
Command changeChannel = new ChangeChannelCommand(tv, 5);
Command adjustVolume = new AdjustVolumeCommand(tv, 20);
// Create remote control
RemoteControl remote = new RemoteControl();
remote.setOnCommand(turnOn);
remote.setOffCommand(turnOff);
remote.pressOnButton(); // Turn on the TV
remote.pressOffButton(); // Turn off the TV
// Execute other commands
changeChannel.execute(); // Change the channel
adjustVolume.execute(); // Adjust the volume
}
}
```

‍

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1742352517671-Frame-250.png)

‍

‍This diagram represents the Command Design Pattern and shows how various components interact:

1\. Command Interface:

This defines the method execute(), which all concrete command classes must implement.

‍

2\. Concrete Command Classes:

These include TurnOnCommand, TurnOffCommand, ChangeChannelCommand, and AdjustVolumeCommand. Each class encapsulates a specific action and implements the execute() method to call the appropriate method on the TV class (the receiver).

‍

3\. RemoteControl (Invoker):

The RemoteControl class holds references to the commands and invokes them when needed (like when a user presses a button). It doesn't know the specifics of what the commands do, it just executes them.

‍

4\. TV (Receiver):

The TV class is the receiver that performs the actual actions (turning on/off, changing channels, adjusting volume).

‍

## Advantages of the Command Design Pattern 🚀

• No Modification of Existing Code:

We don’t need to modify the RemoteControl class every time we add a new feature. We simply create new command classes. 🛠️

‍

• Separation of Concerns:

The logic for each command is encapsulated in its own class, making the code cleaner and easier to maintain. 🧹

‍

• Flexibility:

The RemoteControl doesn’t need to know the specifics of what the commands do. It just invokes them. This makes it easy to add new commands or remove old ones without impacting the system. 🔄

## ‍

## Everyday Use Cases of the Command Pattern 🌎

• Undo/Redo Operations:

In applications like text editors, each action (e.g., typing, deleting) can be wrapped in a command object, allowing for undo/redo functionality.

‍

• GUI Buttons:

Each button on a user interface can be linked to a specific command, making it easy to change the behavior of buttons without altering the UI code.

‍

• Task Scheduling:

Command pattern can be used in job scheduling systems where tasks are represented as commands and can be executed at later times.

‍

## Conclusion 🎉

The Command Design Pattern helps you decouple the request (action) from the object that performs it. This pattern allows for extensible, maintainable, and scalable solutions by encapsulating requests into objects and executing them on demand. By applying this pattern, you can write more clean, flexible, and robust code.

‍

Next time you face a scenario where you need to manage actions or commands (like a remote control or task scheduling), consider using the Command Pattern to make your code more organized and future-proof. Happy coding! 👨‍💻🎉

---
