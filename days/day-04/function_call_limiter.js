// Exercise: Implement a function that limits how many times another function can be called


/**
 * Creates a wrapper function that limits how many times the original function can be called.
 * Once the limit is reached, subsequent calls will either:
 * - Return the result of the fallback function (if provided)
 * - Return undefined (if no fallback is provided)
 * - Throw an error (if throwError is true)
 *
 * @param {Function} fn - The function to limit
 * @param {Number} maxCalls - Maximum number of allowed calls
 * @param {Object} options - Configuration options
 * @param {Function} [options.fallback] - Function to call when limit is reached
 * @param {Boolean} [options.throwError=false] - Whether to throw an error when limit is reached
 * @param {String} [options.errorMessage='Maximum call limit reached'] - Custom error message
 * @returns {Function} The limited function
 */
function limitCalls(fn, maxCalls, options = {}) {
    // Parse options with defaults
    const {
        fallback,
        throwError = false,
        errorMessage = 'Maximum call limit reached'
    } = options;

    // Counter for the number of calls
    let callCount = 0;

    // Return the limited function
    return function (...args) {
        // If we haven't reached the limit yet
        if (callCount < maxCalls) {
            callCount++;
            return fn.apply(this, args);
        }

        // If we've reached the limit
        if (throwError) {
            throw new Error(errorMessage);
        }

        // If a fallback function is provided, call it
        if (typeof fallback === 'function') {
            return fallback.apply(this, args);
        }

        // Otherwise, return undefined
        return undefined;
    };
}

// Example usage:

// Example 1: Basic usage with 3 calls limit
const greet = name => `Hello, ${name}!`;
const limitedGreet = limitCalls(greet, 3);

console.log(limitedGreet('Alice')); // "Hello, Alice!"
console.log(limitedGreet('Bob'));   // "Hello, Bob!"
console.log(limitedGreet('Charlie')); // "Hello, Charlie!"
console.log(limitedGreet('Dave'));  // undefined (limit reached)

// Example 2: With custom fallback function
const api = {
    fetchData: limitCalls(
        () => 'Data fetched successfully',
        2,
        {
            fallback: () => 'Rate limit exceeded, please try again later'
        }
    )
};

console.log(api.fetchData()); // "Data fetched successfully"
console.log(api.fetchData()); // "Data fetched successfully"
console.log(api.fetchData()); // "Rate limit exceeded, please try again later"

// Example 3: With error thrown when limit is reached
const criticalOperation = limitCalls(
    () => 'Operation completed',
    1,
    {
        throwError: true,
        errorMessage: 'Critical operation can only be performed once'
    }
);

console.log(criticalOperation()); // "Operation completed"
try {
    criticalOperation(); // Throws error
} catch (error) {
    console.error(error.message); // "Critical operation can only be performed once"
}
