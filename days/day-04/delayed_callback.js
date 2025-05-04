// Exercise: Write a function that executes a callback after a specified delay

/**
 * Executes a callback function after a specified delay.
 * Returns a promise that resolves with the callback's return value,
 * and provides methods to cancel or modify the delayed execution.
 *
 * @param {Function} callback - The function to execute after the delay
 * @param {Number} delay - Time to wait in milliseconds before executing the callback
 * @param {...any} args - Arguments to pass to the callback function
 * @returns {Object} An object with control methods and a promise
 */
function delayedExecute(callback, delay, ...args) {
    // Validate inputs
    if (typeof callback !== 'function') {
        throw new TypeError('Callback must be a function');
    }

    if (typeof delay !== 'number' || delay < 0) {
        throw new TypeError('Delay must be a non-negative number');
    }

    let timeoutId = null;
    let isExecuted = false;
    let isCancelled = false;

    // Create a promise that will resolve with the callback's return value
    const promise = new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
            if (!isCancelled) {
                try {
                    isExecuted = true;
                    const result = callback(...args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }
        }, delay);
    });

    // Return an object with the promise and control methods
    return {
        // Promise that resolves when the callback executes
        promise,

        /**
         * Cancels the delayed execution if it hasn't happened yet
         * @returns {Boolean} Whether the cancellation was successful
         */
        cancel() {
            if (isExecuted || isCancelled) {
                return false;
            }

            clearTimeout(timeoutId);
            isCancelled = true;
            return true;
        },

        /**
         * Checks if the callback has already executed
         * @returns {Boolean} Whether the callback has executed
         */
        isExecuted() {
            return isExecuted;
        },

        /**
         * Checks if the delayed execution was cancelled
         * @returns {Boolean} Whether the execution was cancelled
         */
        isCancelled() {
            return isCancelled;
        },

        /**
         * Updates the delay time (only works if execution hasn't happened yet)
         * @param {Number} newDelay - The new delay time in milliseconds
         * @returns {Boolean} Whether the update was successful
         */
        updateDelay(newDelay) {
            if (isExecuted || isCancelled || typeof newDelay !== 'number' || newDelay < 0) {
                return false;
            }

            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                if (!isCancelled) {
                    try {
                        isExecuted = true;
                        const result = callback(...args);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                }
            }, newDelay);

            return true;
        }
    };
}

// Example usage:

// Basic usage
const delayed = delayedExecute(() => {
    console.log('Executed after delay!');
    return 'Done';
}, 2000);

delayed.promise.then(result => {
    console.log('Result:', result); // Result: Done
});

// With cancellation
const countdown = delayedExecute(() => console.log('Blast off!'), 5000);
// Later, if needed:
countdown.cancel(); // Prevents execution

// With arguments
const greet = delayedExecute(
    (name, message) => console.log(`Hello, ${name}! ${message}`),
    1000,
    'Alice',
    'How are you today?'
);

// Handling errors
const risky = delayedExecute(() => {
    throw new Error('Something went wrong!');
}, 1000);

risky.promise.catch(error => {
    console.error('Caught error:', error.message);
});

// Using async/await
async function example() {
    try {
        const delayed = delayedExecute(() => 'Success!', 2000);
        const result = await delayed.promise;
        console.log(result); // Success!
    } catch (error) {
        console.error(error);
    }
}
