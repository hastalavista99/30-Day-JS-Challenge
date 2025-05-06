// Exercise: Build a parallel execution utility with a concurrency limit

/**
 * Parallel - Executes async tasks in parallel with a concurrency limit
 * 
 * After struggling with Promise.all() when dealing with large arrays of tasks
 * (hitting API rate limits and memory issues), I created this utility to process
 * tasks in batches while still maintaining some parallelism.
 * 
 * @param {Array<Function>} tasks - Array of async functions to execute
 * @param {Object} options - Configuration options
 * @param {number} [options.concurrency=3] - Maximum number of tasks to run simultaneously
 * @param {boolean} [options.stopOnError=false] - Whether to stop all tasks if one fails
 * @param {Function} [options.onTaskComplete] - Callback for when a task completes
 * @param {Function} [options.onTaskError] - Callback for when a task fails
 * @returns {Promise<Array>} - Results of all tasks in the same order as input
 */
async function parallel(tasks, options = {}) {
    // Set default options
    const {
        concurrency = 3,
        stopOnError = false,
        onTaskComplete = null,
        onTaskError = null
    } = options;

    // Validate inputs
    if (!Array.isArray(tasks)) {
        throw new TypeError('First argument must be an array of task functions');
    }

    if (typeof concurrency !== 'number' || concurrency < 1) {
        throw new TypeError('Concurrency must be a positive number');
    }

    // If no tasks, return empty array
    if (tasks.length === 0) {
        return [];
    }

    // First attempt: I thought about using a simple batching approach like this:
    // 
    // for (let i = 0; i < tasks.length; i += concurrency) {
    //   const batch = tasks.slice(i, i + concurrency);
    //   const batchResults = await Promise.all(batch.map(task => task()));
    //   results.push(...batchResults);
    // }
    //
    // But this isn't optimal because we'd wait for an entire batch to finish
    // before starting new tasks. Instead, we want to start a new task as soon
    // as any running task completes.

    // Create an array to store results in the correct order
    const results = new Array(tasks.length);
    // Keep track of tasks that have been started
    const inProgress = new Set();
    // Tasks that haven't been started yet
    const pendingTasks = [...tasks.entries()];
    // Track any errors that occur
    let firstError = null;

    return new Promise((resolve, reject) => {
        // Function to start processing tasks
        function startNextTasks() {
            // Start tasks until we reach concurrency limit or run out of tasks
            while (inProgress.size < concurrency && pendingTasks.length > 0) {
                if (stopOnError && firstError) {
                    break; // Don't start new tasks if we're stopping on errors
                }

                const [index, task] = pendingTasks.shift();

                // Start the task and track it
                const taskPromise = Promise.resolve().then(() => task())
                    .then(result => {
                        // Store result in the correct position
                        results[index] = result;
                        inProgress.delete(taskPromise);

                        // Notify about task completion if callback provided
                        if (onTaskComplete) {
                            onTaskComplete(result, index);
                        }

                        // Start next task if any remaining
                        if (pendingTasks.length > 0) {
                            startNextTasks();
                        } else if (inProgress.size === 0) {
                            // All tasks completed
                            resolve(results);
                        }
                    })
                    .catch(error => {
                        // Handle task error
                        inProgress.delete(taskPromise);

                        if (firstError === null) {
                            firstError = error;
                        }

                        // Notify about task error if callback provided
                        if (onTaskError) {
                            onTaskError(error, index);
                        }

                        if (stopOnError) {
                            // Reject the whole operation with the first error
                            reject(firstError);
                        } else {
                            // Continue with other tasks
                            if (pendingTasks.length > 0) {
                                startNextTasks();
                            } else if (inProgress.size === 0) {
                                // All tasks attempted, but some failed
                                if (firstError) {
                                    reject(firstError);
                                } else {
                                    resolve(results);
                                }
                            }
                        }
                    });

                inProgress.add(taskPromise);
            }
        }

        // Start initial batch of tasks
        startNextTasks();
    });
}

// Let's test our parallel execution utility
async function test() {
    // Helper function to create a task that takes a random amount of time
    const createTask = (id, shouldFail = false) => {
        return async () => {
            const delay = Math.floor(Math.random() * 1000) + 500; // 500-1500ms
            console.log(`Task ${id} started (will take ${delay}ms)`);

            await new Promise(resolve => setTimeout(resolve, delay));

            if (shouldFail) {
                console.log(`Task ${id} failed`);
                throw new Error(`Task ${id} failed deliberately`);
            }

            console.log(`Task ${id} completed`);
            return `Result of task ${id}`;
        };
    };

    // Create an array of 10 tasks
    const tasks = [];
    for (let i = 1; i <= 10; i++) {
        // Make task #7 fail for testing error handling
        tasks.push(createTask(i, i === 7));
    }

    try {
        console.log('Running tasks with concurrency limit of 3...');

        const results = await parallel(tasks, {
            concurrency: 3,
            stopOnError: false,
            onTaskComplete: (result, index) => {
                console.log(`Task at index ${index} completed with result: ${result}`);
            },
            onTaskError: (error, index) => {
                console.log(`Task at index ${index} failed with error: ${error.message}`);
            }
        });

        console.log('All tasks completed successfully');
        console.log('Results:', results);
    } catch (error) {
        console.error('Operation failed:', error.message);
    }
}

// Test with stopOnError = true
async function testStopOnError() {
    const tasks = [];
    for (let i = 1; i <= 10; i++) {
        // Make task #3 fail early
        tasks.push(createTask(i, i === 3));
    }

    try {
        console.log('\nRunning tasks with stopOnError = true...');

        const results = await parallel(tasks, {
            concurrency: 3,
            stopOnError: true
        });

        console.log('This should not execute if an error occurred');
    } catch (error) {
        console.error('Operation stopped on first error:', error.message);
    }
}

// Uncomment to run tests
// async function runTests() {
//   await test();
//   await testStopOnError();
// }
// runTests();

// A real-world example: processing a list of URLs
async function realWorldExample() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
        'https://jsonplaceholder.typicode.com/posts/4',
        'https://jsonplaceholder.typicode.com/posts/5',
        'https://jsonplaceholder.typicode.com/posts/6',
        'https://jsonplaceholder.typicode.com/posts/7',
        'https://jsonplaceholder.typicode.com/posts/8',
        'https://jsonplaceholder.typicode.com/posts/9',
        'https://jsonplaceholder.typicode.com/posts/10',
    ];

    // Create fetch tasks for each URL
    const fetchTasks = urls.map(url => {
        return async () => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.status}`);
            }
            return response.json();
        };
    });

    try {
        console.log('Fetching data with concurrency limit of 3...');
        const startTime = Date.now();

        const posts = await parallel(fetchTasks, {
            concurrency: 3,
            onTaskComplete: (_, index) => {
                console.log(`Fetched data from ${urls[index]}`);
            }
        });

        const duration = Date.now() - startTime;
        console.log(`All data fetched in ${duration}ms`);
        console.log(`Retrieved ${posts.length} posts`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Uncomment to run the real-world example (in a browser environment)
// realWorldExample();

module.exports = { parallel };

/*
 * Learning notes:
 * 
 * 1. This was tricky! I first tried a simple batching approach but realized it wasn't
 *    optimal. The key insight was to decouple "task completion" from "starting new tasks."
 * 
 * 2. Using a Set to track in-progress tasks makes it easy to remove tasks when they complete.
 * 
 * 3. Maintaining order of results was important - I used the initial index positions to
 *    ensure results maintain the same order as the input tasks, even though execution order varies.
 * 
 * 4. Error handling is complex with parallel operations. I implemented two strategies:
 *    - stopOnError: true - stops everything on first error
 *    - stopOnError: false - continues with other tasks, reports the first error at the end
 * 
 * 5. The progress callbacks (onTaskComplete/onTaskError) are useful for reporting progress
 *    to the user when dealing with many tasks.
 * 
 * 6. I initially tried to use Promise.race() to detect when any task completes, but the approach
 *    with tracking task promises individually ended up being cleaner.
 *
 * 7. Compared to libraries like p-limit or async.js, this implementation is more transparent
 *    but probably less optimized. It's been a good learning experience though!
 */