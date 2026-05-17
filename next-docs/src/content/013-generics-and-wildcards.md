---
title: "Generics and Wildcards"
type: lld
order: 13
---

# Generics and Wildcards

🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

‍

Generics and wildcards are essential features in Java's type system, introduced to enable type safety and reusability in code. These features allow developers to write generic classes and methods that operate on different types while maintaining compile-time type safety.

## 📦What Are Generics?

> Generics provide a way to parameterize types in Java. They enable classes, interfaces, and methods to operate on various data types without the need to specify the exact type at compile time. By using generics, developers can ensure type safety, reduce code duplication, and improve readability.

‍

## Types of Java Generics : 

### 1\. Generic Method:

Generic Java method takes a parameter and returns some value after performing a task. It is exactly like a normal function, however, a generic method has type parameters that are cited by actual type. This allows the generic method to be used in a more general way. The compiler takes care of the type of safety which enables programmers to code easily since they do not have to perform long, individual type castings.

‍

**Example :** 

```java
class Test {
// A Generic method example
static <T> void genericDisplay(T element) {
System.out.println(element.getClass().getName() + " = " + element);
}

// Driver method
public static void main(String[] args) {
// Calling generic method with Integer argument
genericDisplay(11);

// Calling generic method with String argument
genericDisplay("CodeWithAryan");

// Calling generic method with double argument
genericDisplay(1.0);
}
}
```

‍

📤 **Output :** 

```
java.lang.Integer = 11
java.lang.String = CodeWithAryan
	java.lang.Double = 1.0‍
```

‍

🧩 **Explanation :** 

In the provided code snippet, the genericDisplay() method is a generic method, which means it can operate on objects of various types while maintaining type safety. The <T> syntax indicates that T is a type parameter, allowing the method to accept any type of argument. This flexibility is what makes the method generic. The method prints the class name and value of the passed argument, demonstrating how it can handle different data types (Integer, String, and Double) without requiring multiple method overloads.

‍

The genericDisplay() method is declared as static to allow it to be called without creating an instance of the Test class. This is useful for utility methods that don't rely on instance variables. By making the method static, it can be directly invoked using the class name, as shown in the main method.

‍

### 2\. Generic Classes:

A generic class is implemented exactly like a non-generic class. The only difference is that it contains a type parameter section. There can be more than one type of parameter, separated by a comma. The classes, which accept one or more parameters, are known as parameterized classes or parameterized types.

‍

**Example :** 

```java
// We use < > to specify Parameter type
class Test<T> {
// An object of type T is declared
T obj;
Test(T obj) {
this.obj = obj;
} // constructor
public T getObject() {
return this.obj;
}
}

// Driver class to test above
class Main {
public static void main(String[] args) {
// instance of Integer type
Test<Integer> iObj = new Test<Integer>(15);
System.out.println(iObj.getObject());
// instance of String type
Test<String> sObj = new Test<String>("CodeWithAryan");
System.out.println(sObj.getObject());
}
}
```

‍

📤 **Output :** 

```

CodeWithAryan
```

🧩 **Explanation :** 

the Test<T> class is a generic class that can handle any type specified by the user. The <T> syntax indicates that T is a type parameter, allowing the class to operate on objects of various types while maintaining type safety. This means that the class can be used with different data types without requiring multiple class definitions. The constructor Test(T obj) initializes the object of type T, and the getObject() method returns this object. This flexibility makes the code more reusable and easier to maintain.

‍

In the Main class, instances of Test are created with Integer and String types, demonstrating the versatility of generics. The iObj instance is created with an Integer type, and the sObj instance is created with a String type. The getObject() method is called on both instances, and the output shows the values 15 and CodeWithAryan, respectively. This confirms that the generic class can handle different data types seamlessly, providing a powerful tool for developers to write more flexible and type-safe code.

‍

> NOTE : We can also pass multiple Type parameters in Generic classes.

‍

Example : 

```java
// We use < > to specify Parameter type
class Test<T, U> {
T obj1; // An object of type T
U obj2; // An object of type U

// constructor
Test(T obj1, U obj2) {
this.obj1 = obj1;
this.obj2 = obj2;
}

// To print objects of T and U
public void print() {
System.out.println(obj1);
System.out.println(obj2);
}
}

// Driver class to test above
class Main {
public static void main(String[] args) {
Test<String, Integer> obj = new Test<String, Integer>(15, CodeWithAryan);
obj.print();
}
}
```

📤 Output : 

```

CodeWithAryan
```

🧩 Explanation : 

the Test<T, U> class demonstrates the use of multiple type parameters. The class can handle two different types specified by the user, indicated by <T, U>. This allows the class to operate on objects of two different types while maintaining type safety. The constructor Test(T obj1, U obj2) initializes objects of types T and U, and the print() method displays these objects. This example highlights the versatility of generics in handling multiple types, making the code more reusable and type-safe.

‍

In the Main class, an instance of Test is created with String and Integer types. The obj instance is created with String and Integer types, and the print() method is called on this instance. The output shows the values 15 and CodeWithAryan, confirming that the generic class can handle multiple data types simultaneously. This demonstrates the power of generics in Java, allowing developers to write more flexible and reusable code that can handle different data types without requiring multiple class definitions.

‍

> NOTE : Generics Work Only with Reference Types:

‍

When we declare an instance of a generic type, the type argument passed to the type parameter must be a reference type. We cannot use primitive data types like int, char, boolean etc.

```
Test<int> obj = new Test<int>(20);
```

The above line results in a compile-time error that can be resolved using type wrappers to encapsulate a primitive type. For example, we can use the Integer wrapper class instead of int:

```
Test<Integer> obj = new Test<Integer>(20);
```

But primitive type arrays can be passed to the type parameter because arrays are reference types.

```
ArrayList<int[]> a = new ArrayList<>();
```

‍

## 💥Benefits of Generics : 

### 1\. Type Safety:

○ Generics prevent runtime type errors by catching them at compile time.

‍

 Example :

```java
// We use < > to specify Parameter type
class Test<T> {
// An object of type T is declared
T obj;
Test(T obj) {
this.obj = obj;
} // constructor
public T getObject() {
return this.obj;
}
}

// Driver class to test above
class Main {
public static void main(String[] args) {
// instance of Integer type
Test<Integer> iObj = new Test<Integer>(15);
System.out.println(iObj.getObject());

// instance of String type
Test<String> sObj = new Test<String>("GeeksForGeeks");
System.out.println(sObj.getObject());
iObj = sObj; // This results an error
}
}
```

‍

Even though iObj and sObj are of type Test, they are the references to different types because their type parameters differ. Generics add type safety through this and prevent errors.

‍

### 2\. Code Reusability:

○ Generic classes and methods can work with any data type, reducing code duplication.

‍

Example : 

```java
public class GenericReusability {
// A generic method to print elements of any type
public static <T> void printArray(T[] array) {
for (T element : array) {
System.out.print(element + " ");
}
System.out.println();
}

public static void main(String[] args) {
Integer[] intArray = {1, 2, 3, 4};
String[] stringArray = {"Apple", "Banana", "Cherry"};
printArray(intArray); // Works with Integer
printArray(stringArray); // Works with String
}
}
```

‍

### 3\. Readability and Maintainability:

○ Explicit type declarations make the code easier to understand and maintain.

‍

Example : 

```java
// Custom Generic ArrayList
class MyArrayList<T> {
private Object[] elements;
private int size = 0;
public MyArrayList() {
elements = new Object[10]; // Default capacity
}

public void add(T element) {
if (size == elements.length) {
resize();
}
elements[size++] = element;
}

public T get(int index) {
if (index >= size || index < 0) {
throw new IndexOutOfBoundsException("Index out of bounds");
}
return (T) elements[index];
}

private void resize() {
Object[] newElements = new Object[elements.length * 2];
System.arraycopy(elements, 0, newElements, 0, elements.length);
elements = newElements;
}
}

// Without explicit type declaration
MyArrayList list1 = new MyArrayList();
list1.add("Hello");
list1.add("World");
list1.add(1);
list1.add('a');

// With explicit type declaration
MyArrayList<String> list2 = new MyArrayList<>();
list2.add("Hello");
list2.add("World");
```

‍

In the first example, the type of list is not immediately clear, which can make the code harder to understand and maintain. In the second example, the explicit type declaration ArrayList<String> makes it clear that list is an ArrayList of String objects, improving readability and maintainability.

‍

### 4\. Elimination of Type Casting:

○ Generics make errors to appear compile time than at run time (It’s always better to know problems in your code at compile time rather than making your code fail at run time).

Suppose you want to create an ArrayList that store name of students, and if by mistake the programmer adds an integer object instead of a string, the compiler allows it. But, when we retrieve this data from ArrayList, it causes problems at runtime.

‍

❓Problem : 

```java
import java.util.*;

class Test {
public static void main(String[] args) {
// Creating an ArrayList without any type specified
MyArrayList list = new MyArrayList();
list.add("Sachin");
list.add("Rahul");
list.add(10); // Compiler allows this
String s1 = (String) list.get(0);
String s2 = (String) list.get(1);
// Causes Runtime Exception
String s3 = (String) list.get(2);
}
}
```

‍

📤 Output :

```
Exception in thread "main" java.lang.ClassCastException: 
 java.lang.Integer cannot be cast to java.lang.String
```

🧩 Solution : 

When defining ArrayList, we can specify that this list can take only String objects.

‍

```java
import java.util.*;

class Test {
public static void main(String[] args) {
// Creating a an ArrayList with String specified
MyArrayList<String> list = new MyArrayList<String>();
list.add("Sachin");
list.add("Rahul");
list.add(10);

// Typecasting is not needed
String s1 = list.get(0);
String s2 = list.get(1);
String s3 = list.get(2);
}
}
```

‍

📤 Output: 

```
: error: no suitable method found for add(int)
    al.add(10);
```

‍

## 🌪️ What Are Wildcards in Generics?

> Wildcards are special symbols used in generics to represent an unknown type. They provide flexibility when working with generic types and allow developers to define relationships between different types.

‍

Example : 

```java
import java.util.List;

public class WildcardExample {
public static void printList(List<?> list) {
for (Object item : list) {
System.out.println(item);
}
}

public static void main(String[] args) {
List<String> stringList = List.of("Apple", "Banana", "Cherry");
printList(stringList);
List<Integer> intList = List.of(1, 2, 3);
printList(intList);
}
}
```

## Types of Wildcards : 

### 1\. Unbounded Wildcard (?) : 

• Represents an unknown type.

• Useful when the type is not relevant to the logic.

‍

Example:

```java
import java.util.List;

public class UnboundedWildcardExample {
public static void printList(List<?> list) {
for (Object item : list) {
System.out.println(item);
}
}

public static void main(String[] args) {
List<String> stringList = List.of("Apple", "Banana", "Cherry");
printList(stringList);
List<Integer> intList = List.of(1, 2, 3);
printList(intList);
}
}
```

‍

### 2\. Upper-Bounded Wildcard (? extends Type) : 

• Restricts the type to Type or its subclasses.

• Useful for read-only operations where the specific type is not required.

‍

Example:

```java
import java.util.List;

public class UpperBoundedWildcardExample {
public static void printNumbers(List<? extends Number> list) {
for (Number number : list) {
System.out.println(number);
}
}

public static void main(String[] args) {
List<Integer> intList = List.of(1, 2, 3);
printNumbers(intList);
List<Double> doubleList = List.of(1.1, 2.2, 3.3);
printNumbers(doubleList);
List<String> stringList = List.of("a", "b", "c");
printNumbers(stringList);
// Error: incompatible types: List<String> cannot be converted to List<?
// extends Number>
}
}
```

‍

### 3. Lower-Bounded Wildcard (? super Type)

• Restricts the type to Type or its superclasses.

• Useful for write operations.

‍

Example:

```java
import java.util.ArrayList;
import java.util.List;

public class LowerBoundedWildcardExample {
public static void addNumbers(List<? super Integer> list) {
list.add(42);
}
public static void main(String[] args) {
List<Number> numberList = new ArrayList<>();
addNumbers(numberList);
System.out.println(numberList);
}
}
```

## 💭 Generics vs Wildcards : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1741749952038-image.png)

‍

## 🤔 When to Use what ? 

The decision to use generics or wildcards in Java largely depends on the context of your code and how you plan to interact with the objects.

‍

Let’s break this down into specific method use cases and scenarios where one is more suitable than the other.

### 🏷️Why Use a Generic Instead of a Wildcard? 

1\. **When You Need Type Consistency Across the Method :** 

If a method must ensure that all arguments or returned values are of the same specific type, use generics. Generics explicitly define the type and provide compile-time type safety.

‍

```java
import java.util.ArrayList;
import java.util.List;

// Utility class for list operations
public class ListUtils {
// Generic method to add two elements of the same type to a list
public static <T> void addElementsToList(
List<T> list, T firstElement, T secondElement) {
list.add(firstElement);
list.add(secondElement);
System.out.println(
"Elements added: " + firstElement + ", " + secondElement);
}
}

// A simple Person class for custom object example
class Person {
private String name;
public Person(String name) {
this.name = name;
}
@Override
public String toString() {
return name;
}
}

public class Main {
public static void main(String[] args) {
// Example with a list of Strings
List<String> stringList = new ArrayList<>();
ListUtils.addElementsToList(stringList, "Apple", "Banana");
System.out.println("Updated String List: " + stringList);

// Example with a list of Integers
List<Integer> intList = new ArrayList<>();
ListUtils.addElementsToList(intList, 10, 20);
System.out.println("Updated Integer List: " + intList);

// Example with a list of Doubles
List<Double> doubleList = new ArrayList<>();
ListUtils.addElementsToList(doubleList, 1.5, 2.5);
System.out.println("Updated Double List: " + doubleList);

// Example with a list of custom objects
List<Person> personList = new ArrayList<>();
ListUtils.addElementsToList(
personList, new Person("Alice"), new Person("Bob"));
System.out.println("Updated Person List: " + personList);
}
}
```

‍

2\. **When You’re Creating or Adding to a Collection**

Generics are required when you’re adding elements to a collection. Wildcards (?) don’t allow additions because the compiler cannot guarantee the type safety for the unknown type.In the above example, we have three lists: intList, doubleList, and personList.

For each list, we are adding an element of the same data type, which is made possible through the use of Generics. 

‍

```java
public static void main(String[] args) {
// Example with a list of Strings
List<String> stringList = new ArrayList<>();
ListUtils.addElementsToList(stringList, "Apple", "Banana");
System.out.println("Updated String List: " + stringList);

// Example with a list of Integers
List<Integer> intList = new ArrayList<>();
ListUtils.addElementsToList(intList, 10, 20);
System.out.println("Updated Integer List: " + intList);

// Example with a list of Doubles
List<Double> doubleList = new ArrayList<>();
ListUtils.addElementsToList(doubleList, 1.5, 2.5);
System.out.println("Updated Double List: " + doubleList);

// Example with a list of custom objects
List<Person> personList = new ArrayList<>();
ListUtils.addElementsToList(
personList, new Person("Alice"), new Person("Bob"));
System.out.println("Updated Person List: " + personList);
}
```

‍

**Example with Wildcards (Doesn't Work for Adding):**

```java
public void addToWildcardList(List<?> list, Object element) {
list.add(element);  // Compile-time error: Cannot add to a List<?>
}
```

‍

Here, generics are essential if you need to add elements, as they provide a known type, while wildcards (?) are read-only for safety.

‍

3\. **When You Need a Specific Type in Return :** 

If a method needs to return an object of a specific type, use generics. Wildcards (?) make the type unknown, which is not useful for returned values.Extending our Previous example, if we were to create a method to get the first element of the list, we would use generics for the same, as the compiler will be able to determine the return type of the function which would not be possible in case of wildcards

‍

```java
public <T> T getFirstElement(List<T> list) {
return list.size() == 0 ? null : list.get(0); // Compiler knows the type of T
}

public static void main(String[] args) {
// Example with a list of Strings
List<String> stringList = new ArrayList<>();
ListUtils.addElementsToList(stringList, "Apple", "Banana");
System.out.println("Updated String List: " + stringList);
String firstString = getFirstString(stringList);

// Example with a list of Integers
List<Integer> intList = new ArrayList<>();
ListUtils.addElementsToList(intList, 10, 20);
System.out.println("Updated Integer List: " + intList);
Integer firstInteger = getFirstElement(intList);
}
```

‍

Using a wildcard would not allow the compiler to determine the type of the returned object, making it less flexible.

‍

This approach requires returning an Object every time from the function using wildcards, which is not ideal. Although wrapper classes inherit from the Object class in Java, the return type should be the actual wrapper class and not the Object type. This ensures type safety and clarity in the code, allowing for more precise and maintainable implementations.

‍

```java
// Wildcard method that gets the first element
public Object getFirstElementWithWildcard(List<?> list) {
return list.get(0); // Returns as Object because the type is unknown
}

public static void main(String[] args) {
List<Integer> numbers = List.of(1, 2, 3);
Object firstElement =
getFirstElementWithWildcard(numbers); // Returns as Object
System.out.println("First Element (Object): " + firstElement);

// Must cast manually to Integer
int firstNumber = (Integer) firstElement;
System.out.println("First Number (int): " + firstNumber);
}
```

‍

In order to get the actual type while using wildcards, we will have to manually perform type casting, which is not an efficient practice. This approach can lead to potential runtime errors and reduces the clarity and maintainability of the code. 

‍

### 🌪️ Why Use a Wildcard Instead of a Generic ? 

1\. **When You’re Only Reading from a Collection**

If a method only needs to read from a collection and doesn’t care about the exact type, use wildcards. Wildcards provide flexibility and are less restrictive than generics.

‍

```java
public class Main {
// Generic method that requires a specific type
public <T> void printList1(List<T> list) {
for (T item : list) {
System.out.println(item); // Can read items of type T
}
}
// Wildcard method that doesn't require a specific type
public void printList2(List<?> list) {
for (Object item : list) {
System.out.println(item); // Can read all items
}
}

public static void main(String[] args) {
List<String> strings = List.of("A", "B", "C");
List<Integer> integers = List.of(1, 2, 3);
List newList =
List.of(1, 2, 3, 'a', 'b', 'c', "Code", "With", "Aryan", 1.23, 2.5);
// Works because the generic type matches the list type
printList1(strings); // T is inferred as String
printList1(integers); // T is inferred as Integer
printList1(newList); // doesn't work because the type is not specified in
// the newList
printList2(
strings); // works because wildcards do not care about exact types
printList2(
integers); // works because wildcards do not care about exact types
printList2(
newList); //  works because wildcards do not care about exact types
}
}
```

‍

If you were to use generics instead of wildcards in the printList method, the method would require a specific type when called. This makes the method less flexible, as it can no longer handle lists of different types without specifying the type explicitly.

‍

## 🌟 Best Practices : 

1\. Use generics for strongly typed classes and methods.

2\. Use wildcards when flexibility in type is needed, especially in method parameters.

3\. Use upper-bounded wildcards for read-only operations and lower-bounded wildcards for write operations.

4\. Avoid overusing wildcards to keep the code readable and maintainable.

‍

## 🎉 Conclusion : 

Generics and wildcards are powerful tools that enhance type safety and flexibility in OOP. By understanding their differences and use cases, developers can write more reusable, maintainable, and efficient code. Mastery of generics and wildcards is essential for handling collections, frameworks, and APIs effectively.

---
