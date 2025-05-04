

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

-Key Learnings: Throttling is especially valuable for optimizing performance-sensitive event handlers.
                The delayed function and callback gives you precise control over delayed operations with an elegant API.

-Insights: Today's challenge was all about maximizing performance

Code: days/day-04

