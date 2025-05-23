

# My 30-Day JavaScript Challenge Progress


## Overview
- Start Date: 01/05/2025
- Target Completion Date: 30/05/2025
- Days Completed: 22/30
- Current Streak: 22 days

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

        CRUD operations for tasks with validation

        Flexible filtering system by multiple criteria

        Sorting capabilities with type awareness

        Local storage persistence with retry mechanism

        Comprehensive statistics calculation


- Key Learnings:
        Combining multiple patterns creates powerful, maintainable code

        Proper API design improves usability and reduces errors

        Defensive programming (validation, cloning, error handling) prevents subtle bugs

        Performance optimization techniques matter even in smaller projects

        Throttling saves resources for frequent operations like auto-save


- Insights:
        State management concepts from Day 6 provided structure for task workflows

        Memoization pattern from Day 4 optimized statistics calculations

        Deep cloning from Day 2 prevented reference bugs when returning tasks

        Array methods from Day 1 simplified filtering and statistics

        Consistent method naming and parameter design improves developer experience


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

### Day 9: 09/05/2025 - Fetch API & Data Handling

- Completed the following utilities:

        Fetch wrapper with built-in timeout and error handling using AbortController

        Lightweight caching layer using Map with TTL control

        API transformer utility to reshape response data before use

        Two-way sync function between API and localStorage


- Key Learnings

        AbortController is essential for fetch timeout control — especially for production apps

        Caching can dramatically improve performance and reduce API load, even with a simple TTL

        Transforming data before returning it helps reduce coupling between backend and frontend

        Using localStorage as a synchronization layer helps in offline-first strategies and improves UX


- Insights

        Learned to isolate concerns: fetching, transforming, caching, and persisting were all cleanly separated

        Recognized how many real-world apps quietly rely on transformation layers between raw API responses and UI consumption

        Map is a great structure for lightweight, in-memory caching; you don’t always need Redux or IndexedDB

        Timing and TTL are subtle tools that can greatly improve perceived performance

        Mixing what I learned on Day 8 (timeouts, retry logic) added resilience to today's utilities


Code: days/day-09
🧠 Confidence Level: Growing! Fetch and data shaping now feel easier to reason about and implement.

### Day 10: 10/05/2025 - Local Data Storage

- Completed implementation of:

        A localStorage wrapper that handles expiration and auto-removal

        A simple client-side database using IndexedDB with async/await support

        A sessionStorage utility that auto-cleans expired data

        A form syncing tool that saves user input to localStorage and restores it on load


- Key Learnings

        localStorage and sessionStorage are synchronous but powerful for lightweight persistence

        Expiry logic can be layered on top of browser storage to simulate TTL-based caching

        IndexedDB provides robust structured storage, suitable for larger or indexed datasets

        sessionStorage is ideal for temporary, session-limited state (e.g. forms, auth flow)

        Syncing UI with storage helps prevent user frustration from accidental data loss


- Insights

        Wrapping native browser storage in small utility modules makes code reusable and readable

        Combining form syncing with storage expiration can simulate autosave features like in Notion or Google Docs

        Using JSON.stringify() for storage is simple, but care must be taken to validate structure on retrieval

        IndexedDB has quirks, but async/await helps manage it without callback hell

        Learning to persist UI state improves the perceived reliability of your app

    
Code: days/day-10
🧠 Confidence Level: Higher! More fluent in client-side storage strategies and async browser APIs.


### Day 11: 11/05/2025 - Event Handling

- Completed:
        A clean and reusable pub/sub system for decoupled communication

        Event delegation pattern for handling dynamically added elements

        Debounce and throttle utilities to improve performance of frequent events

        Centralized event listener manager for easier cleanup and memory safety


- Key Learnings
        Custom event systems are powerful for decoupled architecture

        Event delegation simplifies dynamic UIs by reducing the number of listeners

        Debounce avoids unnecessary triggers (e.g., live search), while throttle controls pace (e.g., scroll)

        Managing and cleaning up listeners is essential in SPAs to avoid memory leaks


- Insights

        The pub/sub model could scale into a more robust state or signal system later

        Clean event handling code makes your app feel more performant and reliable

        DOM performance improves significantly when using delegation for large/complex trees

        I now better appreciate how modularizing utility logic like debounce, throttle, or event manager keeps the UI layer lightweight


Code: days/day-11
🧠 Confidence Level: Improving! Handling real UI events now feels more intuitive and controlled.


### Day 12: 12/05/2025 - Form Validation & Handling
- Completed:
        Custom validation engine with reusable rules

        Functions for form data serialization and restoration

        Auto-save and resume form state via localStorage

        File upload handling with real-time preview for images


- Key Learnings
        Creating my own validation logic gave me full control over UI and error handling

        Serializing forms simplifies autosave, previews, and draft saving workflows

        Handling partial progress and restoring state improves UX significantly

        File input behavior is nuanced — previewing image files brings a smoother experience


- Insights
        Validation logic can be modular, functional, and flexible — no need for large libraries

        HTML5’s FormData is a hidden gem for both traditional form submission and state capture

        Saving form progress with input events mimics real-world autosave systems

        File previews add professionalism to forms, especially for images, profiles, and uploads


Code: days/day-12
🧠 Confidence Level: High! Forms used to feel complex — now they feel like manageable mini apps.

### Day 13: 13/05/2025 - Date & Time Manipulation
- Completed:
        Lightweight date formatting utility with multiple presets

        Date difference calculator with support for different units

        Smart scheduling tool that accounts for business hours/days

        Countdown timer with pause/resume/reset capability

- Key Learnings
        Date objects are mutable — it's easy to make off-by-one or timezone errors if careless

        Working with units (days, hours, etc.) is clearer when abstracted into utility functions

        Business logic (like only operating Mon–Fri, 9–5) is critical for scheduling apps

        Countdown logic mimics real-world UI behaviors (e.g., quizzes, timers, productivity tools)

- Insights
        Localized formatting via toLocaleString() gives flexibility without needing libraries

        Scheduling tools need to be strict with edge cases (weekends, off-hours)

        Countdown timers are a solid async challenge, especially with pause/reset logic

        Date/time utilities are useful in any app involving reminders, timers, or logs

Code: days/day-13
🧠 Confidence Level: Strengthening! Date logic used to be intimidating, but breaking it into utilities makes it much easier to reason about.


### Day 14: 14/05/2025 – Project: Weather Dashboard

- Completed Features
        Real-time weather search using public API

        Forecast preview for next few hours

        Favorite city selection & persistence via localStorage

        Responsive UI using TailwindCSS

        Error & state handling

- Key Learnings
        Learned to manage async operations with multiple fetches and error boundaries

        Practice with real-world data formats and parsing APIs

        DOM updates based on dynamic user input and local state

        API token security and query optimization for performance

        Clear separation of responsibilities: UI rendering, API handling, state storage

- Insights
        Wrapping API interactions in utilities helps with reuse and testing

        Modular design makes adding features (like 5-day forecast or dark mode) easier

        Project brought together skills from previous days: form handling, fetch, localStorage, and event delegation

        Better appreciation of user experience flow in real apps

Code: days/day-14
🧠 Confidence Level: Growing! Real API integration felt like a milestone — managing both data and UX made things click

### Day 15: 15/05/2025 -- DOM Manipulation

- Completed Features
        Built dynamic HTML elements purely with JavaScript

        Created a mini template engine (useful for future templating)

        Practiced efficient DOM updates using fragments

        Handled animations smoothly with requestAnimationFrame

- Key Learnings

        DOM creation from structured data gives flexibility for UI rendering

        Template strings can be powerful when customized

        Performance matters: minimizing reflows with fragments boosts speed

        Manual animations help understand timing and repaint cycles

- Insights

        These patterns resemble how frameworks (React, Vue) manage the DOM behind the scenes

        Gained appreciation for separation of data and presentation

        Writing animations from scratch made the event loop and rendering pipeline clearer

Code: days/day-15


### Day 16: 16/05/2025 Custom Components
- Completed

        Created clean, reusable components from scratch

        Reinforced DOM manipulation and event-driven logic

        Added animations for better UX

        Integrated validation patterns into form workflows

- Key Learnings

        Separation of concerns makes code modular and reusable

        Custom components build foundational skills for frameworks

        Managing state and visibility (e.g., for modals) teaches control flow

        Working with forms deepens understanding of user interaction

- Insights

        Small abstractions like createDropdown() scale well across projects

        CSS transitions can drastically improve UX with minimal effort

        Input validation needs to cover format and presence

        Tabbed interfaces and modals helped practice dynamic class toggling and DOM querying

Code: days/day-16


### Day 17: 17/05/2025 Browser Storage
- Completed

        Built a modular storage abstraction that unifies local/session/memory storage

        Stored and retrieved deeply nested objects

        Created storage monitoring for usage and cleanup triggers

        Enabled real-time cross-tab communication via storage events

- Key Learnings

        JSON serialization is critical for reliable object persistence

        Storage limits can be silently hit, requiring quota checks

        Event-based communication across tabs is powerful for real-time state sync

        Abstracting storage operations reduces code repetition and improves portability

- Insights

        Cross-tab sync makes multi-tab apps feel seamless (e.g. synced settings, presence)

        Even simple cleanup policies can prevent data bloat in long-lived apps

        This unified approach is reusable across projects and scalable to IndexedDB

        Keeping storage structure consistent (namespacing, versioning) matters in real apps

Code: days/day-17


### Day 18: Useful Browser APIs
- Completed
        Built a smooth drag-and-drop zone using dragstart, dragover, and drop

        Accessed location with fallback messaging for unsupported/denied cases

        Used modern Clipboard API for seamless copy-paste experiences

        Triggered user-friendly browser notifications responsibly

- Key Learnings
        Drag and drop is mostly about handling the right DOM events

        Geolocation depends on user permissions and must be handled gracefully

        Clipboard and Notification APIs are asynchronous and permission-based

        Fallback strategies are essential to avoid silent failures

- Insights
        Browser APIs extend core JS functionality without third-party tools

        Notifications can dramatically improve engagement when used sparingly

        Clipboard API enhances UX in tools like password managers, editors, or sharing tools

        Geo-features open up location-aware logic, such as weather, local content, or check-ins

Code: days/day-18

### Day 19: 19/05/2025 Canvas Basics

- Completed
        Created dynamic data visualizations using bar charts

        Implemented a fully interactive signature pad

        Built a lightweight image editor with grayscale filter

        Developed a utility to export canvas drawings as PNG

- Key Learnings
        Canvas provides low-level pixel manipulation and drawing APIs

        Mouse position handling is key for drawing and interaction

        Working with ImageData allows powerful image transformations

        Canvas exports enable building drawing and design tools

- Insights
        Even basic Canvas features open doors to graphics, gaming, and visual dashboards

        Real-time user input handling (like a signature pad) improves UX

        Image editing helped solidify knowledge of RGBA pixel data

        Combining file input + canvas + download unlocks rich browser-based workflows

Code: days/day-19


### Day 20: 20/05/2025 Application Performance
🎯 Completed

        Built tools to measure function execution time

        Used DocumentFragment for optimal rendering of large lists

        Implemented lazy loading for images using IntersectionObserver

        Applied memoization to optimize recursive calculations

📚 Key Learnings

        Performance bottlenecks often lie in DOM updates and unoptimized loops

        Memoization drastically speeds up expensive, repeated calculations

        Lazy loading boosts page load speed and user-perceived performance

        Monitoring runtime performance helps pinpoint hot spots

💡 Insights

        performance.now() is more precise than Date.now() for measuring micro-benchmarks

        Rendering optimizations prevent browser reflows and repaints

        Lazy loading should become a default pattern for media-rich applications

        Memoization is a simple yet powerful pattern to reduce repeated work

Code: days/day-20

### Day 21: 21/05/2025 Interactive Quiz Application
✅ Completed
        Built an extendable quiz engine supporting 3 question types

        Integrated score and result tracking with clear UX

        Designed a persistent system using localStorage

        Implemented an auto-expiring timer with retry capability

        Responsive UI styled with Tailwind CSS

📚 Key Learnings
        Abstracting logic for question types leads to cleaner, scalable code

        Handling localStorage persistence manually improves understanding of state management

        Time-bound applications require attention to edge cases (expired but unsaved answers)

        Flexbox/grid and utility-first CSS streamline responsive designs

💡 Insights
        Simulating real-world interactions like progress save/resume builds stronger app-thinking

        Managing timers with cleanup is essential for SPA performance

        Custom validation logic on text answers brings flexibility

        User feedback and UI responsiveness greatly affect perceived quality

📁 Code: days/day-21


### Day 22: 22/05/2025 State Management Project  
✅ Completed  
        Built a lightweight state management library with `getState`, `setState`, and `subscribe`  

        Logged state transitions using a subscription-based tracking system  

        Connected state keys to DOM elements for live updates  

        Persisted state using localStorage with auto-loading on page load  

📚 Key Learnings  
        Core concepts of reactivity and state isolation are replicable in vanilla JavaScript  

        Subscribing to state changes provides flexibility for dynamic UIs  

        Managing updates immutably helps avoid subtle bugs and race conditions  

        Manual persistence builds intuition for sync/async challenges in apps  

💡 Insights  
        Even minimal state libraries can serve real-world use cases when well-designed  

        DOM binding via key observers simplifies interaction layers  

        Understanding how to serialize/deserialize state unlocks powerful features  

        Clean, consistent API design (like `subscribe`/`setState`) improves developer ergonomics  

📁 Code: days/day-22  


### Day 23: 24/05/2025 API Integration  
✅ Completed  
        Developed a reusable REST API client supporting all CRUD methods

        Added session management with persistent login using localStorage 

        Handled multiple response formats robustly (JSON, text)

        Built an offline queue and sync system for POST/PUT requests 


📚 Key Learnings  
        Standardizing request logic prevents code duplication across endpoints 
        
        Separating auth from API logic makes services easier to test and scale 

        Offline-first techniques build resilience into apps 

        Being defensive with parsing avoids runtime crashes  


💡 Insights  
        State persistence across reloads using tokens improves UX  

        Having a structured offline retry queue prevents data loss in flaky networks 

        Keeping the API flexible with request overrides (headers/body) is powerful 

        Combining multiple utilities like `AuthService` and `OfflineSync` boosts maintainability  


📁 Code: days/day-23  

