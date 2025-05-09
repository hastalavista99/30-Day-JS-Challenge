

# My 30-Day JavaScript Challenge Progress


## Overview
- Start Date: 01/05/2025
- Target Completion Date: 30/05/2025
- Days Completed: 0/30
- Current Streak: 0 days

## Daily Log
### Day 1: 01/05/2025 - Working with Arrays
-Completed all exercises: 
                Create a function that takes an array of numbers and returns statistics (min, max, mean, median)
                Implement a function that chunks an array into groups of a specified size
                Write a function that removes duplicates from an array using multiple approaches
                Create a utility that finds the intersection of two arrays
                
-Key learnings: filter and reduce are powerful array methods
                indexOf() returns a -1 when the element passed to it is not found, hence why it has been used in the for loop to remove duplicates in an array
                indexOf() always returns the first occurrence of the element in an array, hence being very useful in removing duplicates
                Another method to remove duplicates is using Set() which takes in an array and returns one without duplicates
                The slice() method creates a new array.
                The slice() method does not remove any elements from the source array.
                The slice() method can take two arguments like slice(1, 3).
                The method then selects elements from the start argument, and up to (but not including) the end argument.

-Insights: had forgotten Math.max and Math.min exist and tried to work with normal js 🥲. It did work but ultimately took longer to write and added more lines to the code
-Code: days/day-01


### Day 2: 02/05/2025 - Object Manipulation
-Completed all exercises: 
                Write a function that merges two objects deeply (nested properties)
                Create a function that extracts specific properties from an object
                Implement a function that compares two objects for equality
                Build a function that creates an object from an array of key-value pairs

-Key Learnings: Objects use key value pairs ({key: value})
                Objects are mutable: They are addressed by reference, not by value.

-Insights: Objects are a major component of JavaScript and I intend to do more with them in this challenge

Code: days/day-02

### Day 3: 03/05/2025 - Practical String Operations
-Completed all exercises: 
                Create a string template engine that replaces {{variables}} with values
                Implement a function that validates different formats (email, phone, URL)
                Build a utility that transforms text between camelCase, snake_case, and kebab-case
                Write a function that extracts all links from a HTML string

-Key Learnings: JS has alot of string methods to allow string manipulation
                RegEx is a necessary skill for the manipulation of some string e.g. extraction from HTML string

-Insights: Should learn more RegEx

Code: days/day-03

### Day 4: 04/05/2025 - Functions & Scope
-Completed all exercises: 

Create a function that returns a memoized version of any function
Implement a function that limits how many times another function can be called
Write a function that executes a callback after a specified delay
Build a function that creates a throttled version of another function

-Key Learnings: 

Throttling is especially valuable for optimizing performance-sensitive event handlers.
The delayed function and callback gives you precise control over delayed operations with an elegant API.

-Insights: 

Today's challenge was all about maximizing performance

Code: days/day-04


### Day 5: 05/05/2025 - ES6 Features in Practice
-Completed all exercises: 

Refactor a complex function to use destructuring and default parameters
Convert a function to use rest/spread operators for flexibility
Implement a simple class hierarchy with inheritance
Create a set of utility functions using arrow functions and template literals

-Key Learnings: 

Arrow Functions make code more concise and maintain lexical this binding, which eliminates common scoping issues in callbacks and event handlers
Pure functions (like most utilities in the last exercise) produce consistent outputs for given inputs, improving predictability and testability
Function composition techniques (pipe and compose) allow building complex operations from simple ones, enhancing reusability

-Insights:  

Debounce and throttle are essential for handling high-frequency events like scrolling, resizing, or typing
Browser APIs like Intl provide robust internationalization without external libraries
Regular expressions are powerful but should be used judiciously and commented when complex (as in validation functions)
Utility functions should be small, focused, and composable rather than trying to do too much

Code: days/day-05

### Day 6: 06/05/2025 - Advanced JavaScript Patterns

-Completed all exercises:

Implemented retry mechanism for handling transient failures
Created waterfall function for sequential async operations
Built parallel execution utility with concurrency limits
Developed simple state machine implementation


-Key Learnings:

Retry patterns are essential for resilient network operations and API calls
Sequential execution (waterfall) provides control when each step depends on previous results
Concurrency management prevents overwhelming services while maintaining performance
State machines formalize complex workflows and prevent impossible state transitions


-Insights:

Error handling strategy differs significantly between sequential and parallel operations
Promise-based utilities can dramatically simplify complex asynchronous flows
Context objects provide cleaner data passing than long parameter lists
Well-designed patterns reduce cognitive load when reading/maintaining code



Code: days/day-06

### Day 7: 07/05/2025 - Project: Task Manager Library

- Completed Task Manager implementation with:
  - CRUD operations for tasks with validation
  - Flexible filtering system by multiple criteria
  - Sorting capabilities with type awareness
  - Local storage persistence with retry mechanism
  - Comprehensive statistics calculation

- Key Learnings:
  - Combining multiple patterns creates powerful, maintainable code
  - Proper API design improves usability and reduces errors
  - Defensive programming (validation, cloning, error handling) prevents subtle bugs
  - Performance optimization techniques matter even in smaller projects
  - Throttling saves resources for frequent operations like auto-save

- Insights:
  - State management concepts from Day 6 provided structure for task workflows
  - Memoization pattern from Day 4 optimized statistics calculations
  - Deep cloning from Day 2 prevented reference bugs when returning tasks
  - Array methods from Day 1 simplified filtering and statistics
  - Consistent method naming and parameter design improves developer experience

Code: days/day-07

### Day 8: 08/05/2025 - Promise Patterns
- Completed Implementations:

promisify: Converted callback-based functions to return Promises
retryWithBackoff: Implemented retry logic with exponential backoff
promiseTimeout: Added timeout control for long-running Promises
runWithConcurrency: Managed concurrent Promise execution with a defined limit

- Key Learnings:

Promises are flexible abstractions for async control but require careful orchestration
Retrying and timeouts are essential for resilience in network-bound systems
Concurrency limiting improves performance without overwhelming resources
Wrapping legacy code with Promises improves maintainability and integration

-Insights:

Retry logic must balance between giving up too early and retrying forever — exponential backoff is a good compromise
Timeout utilities prevent UI and system hangs in unpredictable networks
Promise.race is a powerful pattern to combine competing async operations (e.g., timeout vs. result)
Splitting async workflows into small composable utilities improves readability and testability
Handling concurrency is a recurring pattern in APIs, file processing, and UI interactions

Code: days/day-08



