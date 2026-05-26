---
title: "Web Crawler Multithreaded"
type: lld
order: 69
---

# Web Crawler Multithreaded

Topic Tags:

system designlld

### 🐈‍⬛ Github Codes Link: [https://github.com/aryan-0077/CWA-LowLevelDesignCode](https://github.com/aryan-0077/CWA-LowLevelDesignCode)

## ‍

## 🧐Question :

Given a URL startUrl and an interface HtmlParser, implement a Multi-threaded web crawler to crawl all links that are under the same hostname as startUrl.

Return all URLs obtained by your web crawler in any order.

Your crawler should:

• Start from the page: startUrl

• Call HtmlParser.getUrls(url) to get all URLs from a webpage of a given URL.

• Do not crawl the same link twice.

Explore only the links that are under the same hostname as startUrl.

‍![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746231768692-image.png)

As shown in the example URL above, the hostname is example.org. For simplicity's sake, you may assume all URLs use HTTP protocol without any port specified.

‍

For example, the URLs [http://leetcode.com/problems](http://leetcode.com/problems) and [http://leetcode.com/contest](http://leetcode.com/contest) are under the same hostname, while URLs [http://example.org/tes](http://example.org/tes)t and [http://example.com/abc](http://example.com/abc) are not under the same hostname.

‍

The HtmlParser interface is defined as such:

```
interface HtmlParser {
  // Return a list of all urls from a webpage of given url.
  // This is a blocking call, that means it will do HTTP request and return when this request is finished.
  public List<String> getUrls(String url);
}
```

Note that getUrls(String url) simulates performing an HTTP request. You can treat it as a blocking function call that waits for an HTTP request to finish. It is guaranteed that getUrls(String url) will return the URLs within 15ms. Single-threaded solutions will exceed the time limit so, can your multi-threaded web crawler do better?

‍

Below are two examples explaining the functionality of the problem. For custom testing purposes, you'll have three variables urls, edges and startUrl. Notice that you will only have access to startUrl in your code, while urls and edges are not directly accessible to you in code.

```
🚧 Constraints: 
▫️ 1 <= urls.length <= 1000
▫️ 1 <= urls[i].length <= 300
▫️startUrl is one of the urls.
▫️Hostname label must be from 1 to 63 characters long, including the dots, may contain only the ASCII letters from 'a' to 'z', digits from '0' to '9' and the hyphen-minus character ('-').
▫️The hostname may not start or end with the hyphen-minus character ('-'). 
You may assume there're no duplicates in the URL library.
```

‍‍

## Examples : 

Example 1:

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746231704165-Frame-237-\(6\).png)

```
Input:
urls = [
 "http://news.yahoo.com",
 "http://news.yahoo.com/news",
 "http://news.yahoo.com/news/topics/",
 "http://news.google.com",
 "http://news.yahoo.com/us"
]
	
edges = [[2,0],[2,1],[3,2],[3,1],[0,4]]
startUrl = "http://news.yahoo.com/news/topics/"

Output: [
 "http://news.yahoo.com",
 "http://news.yahoo.com/news",
 "http://news.yahoo.com/news/topics/",
 "http://news.yahoo.com/us"
]
```

‍

Example 2 : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746231524116-Frame-237-\(5\).png)

```
Input: 
urls = [
 "http://news.yahoo.com",
 "http://news.yahoo.com/news",
 "http://news.yahoo.com/news/topics/",
 "http://news.google.com"
]

edges = [[0,2],[2,1],[3,2],[3,1],[3,0]]
startUrl = "http://news.google.com"

Output: [http://news.google.com]
```

‍

> 🔗 Problem link :  [https://leetcode.com/problems/web-crawler-multithreaded/description/](https://leetcode.com/problems/web-crawler-multithreaded/description/)

‍

```
Level : Medium
Topics : Concurrency , BFS , DFS
Companies :  Anthropic , Databricks  Rubrik ,OpenAI , Meta , Microsoft, MongoDB, Dropbox
```

‍‍

## 💡Solution :

### Understanding the Challenge :

The problem requires us to create a multi-threaded web crawler that explores all URLs under the same hostname as a given starting URL. Key challenges include:

• Ensuring URLs aren't crawled multiple times

• Limiting crawling to URLs with the same hostname

• Implementing an efficient multi-threaded solution to meet time constraints

Coordinating multiple threads and managing thread synchronization

‍

### 🧩 Approach: Using Thread Pool and Concurrent Data Structures : 

_🧠_ Intuition :

> We'll use a thread pool to parallelize the crawling process, with each URL being processed by a worker thread. To avoid duplicates and handle concurrency, we'll use thread-safe data structures and atomic operations.

‍‍

## Algorithm:

1\. Extract the hostname from the startUrl

‍

2\. Initialize a thread pool with a fixed number of worker threads

‍

3\. Use a ConcurrentHashMap to track visited URLs

‍

4\. Create a Task class that: 

• Parses a URL

• Extracts links from the page

• Filters links by hostname

• Submits new tasks for unvisited URLs

‍

5\. Use an AtomicInteger to track the number of URLs being processed

‍

6\. Wait until all URLs have been processed before terminating

Return the set of discovered URLs

‍

## 📝 Implementation : 

```java

class Solution {
// Store the hostname from startUrl to filter URLs
private String hostName;

// Thread-safe map to store visited URLs and avoid duplicates
private ConcurrentHashMap<String, Boolean> urlHashMap = new ConcurrentHashMap<>();

// Thread pool to process URLs concurrently
private ExecutorService executor = Executors.newFixedThreadPool(5);

// Counter to track URLs to be processed
private AtomicInteger numOfUrlsToParse = new AtomicInteger(0);

// Reference to the HtmlParser
private HtmlParser htmlParser;

// Worker Task that processes URLs in separate threads
class Task implements Runnable {
private String url;

Task(String url) {
this.url = url;
}

public void run() {
// Get all URLs from the current page
for (String extractedUrl : htmlParser.getUrls(url)) {
// Extract hostname from URL
String curHostName = extractedUrl.split("/")[2];
// Check if URL has same hostname and hasn't been visited
if (curHostName.equals(hostName) && urlHashMap.putIfAbsent(extractedUrl, true) == null) {
// Increment counter for active tasks
numOfUrlsToParse.addAndGet(1);
// Submit new task to process this URL
executor.submit(new Task(extractedUrl));
}
}
// Decrement counter when task is complete
numOfUrlsToParse.addAndGet(-1);
}
}

// startUrl = "http://news.yahoo.com/news/topics/"
public List crawl(String startUrl, HtmlParser htmlParser) {
// Extract hostname from startUrl
// startUrl Split Array = ["http:", "", "news.yahoo.com", "news", "topics", ""]
// hostname = "news.yahoo.com"
hostName = startUrl.split("/")[2];
this.htmlParser = htmlParser;

// Mark startUrl as visited
urlHashMap.put(startUrl, true);

// Initialize counter and submit first task
numOfUrlsToParse.addAndGet(1);
executor.submit(new Task(startUrl));

// Wait until all URLs have been processed
while (numOfUrlsToParse.get() > 0) {
try {
// Sleep to avoid busy waiting
Thread.sleep(80);
} catch (Exception e) {
// Handle exceptions
}
}

// Shutdown the thread pool
executor.shutdown();

// Return all discovered URLs
return new ArrayList<>(urlHashMap.keySet());
}
}
```

‍

## 🤹🏼Dry Run with Visualization

Let's perform a dry run using Example 1:

### Step 1: Initialization : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746230865631-Frame-237-\(1\).png)

• startUrl = "http://news.yahoo.com/news/topics/"

• hostName = "news.yahoo.com"

• Create thread pool with 5 threads

• Add startUrl to urlHashMap

• Set numOfUrlsToParse to 1

• Submit Task for startUrl

‍

### Step 2: First URL Processing : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746230924249-Frame-237-\(2\).png)

• Task processes "http://news.yahoo.com/news/topics/"

• HtmlParser.getUrls returns \["http://news.yahoo.com", "http://news.yahoo.com/news"\]

• Both URLs match hostName "news.yahoo.com"

• Add both to urlHashMap

• Increment numOfUrlsToParse & it becomes 3

• Submit two new Tasks

‍

### Step 3: Parallel URL Processing : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746231075236-Frame-237-\(3\).png)

• Tasks for "http://news.yahoo.com" and "http://news.yahoo.com/news" run in parallel

• Task for "http://news.yahoo.com" discovers "http://news.yahoo.com/us"

• Task for "http://news.yahoo.com/news" doesn't find new URLs

• Add "http://news.yahoo.com/us" to urlHashMap

‍

### Step 4: Final URL Processing : 

![Article image](https://cwa-prod.s3.ap-south-1.amazonaws.com/1746231118544-Frame-237-\(4\).png)

• Task for "http://news.yahoo.com/us" runs

• No new URLs are discovered

• Decrement numOfUrlsToParse to 0

Main thread detects numOfUrlsToParse = 0 and returns results

‍

## ‍📈 Complexity Analysis :

```
>⏳ Time Complexity : 
O(V + E) where V is the number of URLs (vertices) and E is the number of links (edges)
The multi-threaded approach significantly reduces actual execution time by parallelizing requestsenqueue(): O(1) (Adding to the front of the queue is constant time)
dequeue(): O(1) (Removing from the rear is constant time)

>🗃️ Space Complexity : 
O(V) where V is the number of URLs
Space is primarily used by the ConcurrentHashMap to store discovered URLs
```

‍

## 🗝️Key Insights : 

**Concurrency Control:**

The solution uses three key Java concurrency components:

1\. ExecutorService: Manages the thread pool and task submission

2\. ConcurrentHashMap: Provides thread-safe access to the visited URLs collection

3\. AtomicInteger: Safely tracks the number of active tasks across threads

‍

**Duplicate Prevention:**

• The putIfAbsent method of ConcurrentHashMap atomically adds a URL if it doesn't exist and returns null if added successfully

• This ensures each URL is processed exactly once even with multiple concurrent threads

‍

**Termination Condition:**

• The AtomicInteger counter tracks how many tasks are currently being processed.

• The main thread waits until this counter reaches zero, indicating all URLs have been processed.

‍

**Performance Considerations:** 

• Using a fixed-sized thread pool of 5 threads balances parallelism with overhead

• The sleep(80) in the waiting loop avoids busy waiting and reduces CPU usage

• The 80ms sleep duration is chosen as it's longer than the guaranteed 15ms for getUrls() to complete

---
