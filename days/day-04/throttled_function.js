// Exercise: Build a function that creates a throttled version of another function

/**
 * Creates a throttled version of a function that only executes at most once
 * within the specified time period, regardless of how many times it's called.
 *
 * @param {Function} fn - The function to throttle
 * @param {Number} interval - The minimum time in milliseconds between function executions
 * @param {Object} options - Configuration options
 * @param {Boolean} [options.leading=true] - Whether to execute on the leading edge of the interval
 * @param {Boolean} [options.trailing=true] - Whether to execute on the trailing edge of the interval
 * @param {Function} [options.resultCallback] - Optional callback to handle return values
 * @returns {Function} The throttled function
 */
function throttle(fn, interval, options = {}) {
    // Parse options with defaults
    const {
        leading = true,
        trailing = true,
        resultCallback = null
    } = options;

    // Validate input
    if (typeof fn !== 'function') {
        throw new TypeError('Expected a function');
    }

    if (typeof interval !== 'number' || interval < 0) {
        throw new TypeError('Interval must be a non-negative number');
    }

    // Timer and state variables
    let lastExecutionTime = 0;
    let trailingTimeout = null;
    let lastResult = undefined;
    let lastArgs = [];
    let lastThis = null;
    let isExecuting = false;

    // Function to clean up the trailing timeout
    const cancelTrailing = () => {
        if (trailingTimeout) {
            clearTimeout(trailingTimeout);
            trailingTimeout = null;
        }
    };

    // Function to execute the original function and update state
    const execute = function (thisArg, args) {
        isExecuting = true;
        lastExecutionTime = Date.now();
        try {
            lastResult = fn.apply(thisArg, args);
            if (resultCallback && typeof resultCallback === 'function') {
                resultCallback(lastResult);
            }
        } finally {
            isExecuting = false;
        }
        return lastResult;
    };

    // The throttled function to return
    const throttled = function (...args) {
        const now = Date.now();
        const elapsed = now - lastExecutionTime;

        // Store the latest arguments and context for potential trailing calls
        lastArgs = args;
        lastThis = this;

        // If it's the first call or enough time has passed since the last execution
        if (!lastExecutionTime && !leading) {
            // If leading execution is disabled, update time but don't execute
            lastExecutionTime = now;
        } else if (!lastExecutionTime || elapsed >= interval) {
            // Time to actually execute the function
            cancelTrailing();
            return execute(this, args);
        }

        // Set up trailing execution if not already pending
        if (trailing && !trailingTimeout && elapsed < interval) {
            trailingTimeout = setTimeout(() => {
                const shouldExecute = Date.now() - lastExecutionTime >= interval;
                if (shouldExecute) {
                    const result = execute(lastThis, lastArgs);
                    lastArgs = [];
                    lastThis = null;
                    return result;
                }
                trailingTimeout = null;
            }, interval - elapsed);
        }

        // Return the last result
        return lastResult;
    };

    // Method to cancel any pending trailing execution
    throttled.cancel = function () {
        cancelTrailing();
        lastExecutionTime = 0;
        trailingTimeout = null;
        lastArgs = [];
        lastThis = null;
    };

    // Method to flush any pending execution
    throttled.flush = function () {
        if (trailingTimeout && lastArgs.length) {
            cancelTrailing();
            return execute(lastThis, lastArgs);
        }
        return lastResult;
    };

    // Method to check if a throttled function is currently executing
    throttled.isExecuting = function () {
        return isExecuting;
    };

    return throttled;
}

// Example usage:

// Basic throttling for window scroll event
const throttledScroll = throttle(function () {
    console.log('Scroll position:', window.scrollY);
}, 200);

window.addEventListener('scroll', throttledScroll);

// Throttle with only leading edge execution
const leadingOnly = throttle(
    () => console.log('Leading execution only'),
    300,
    { trailing: false }
);

// Throttle with only trailing edge execution
const trailingOnly = throttle(
    () => console.log('Trailing execution only'),
    300,
    { leading: false }
);

// Throttle with result callback
const calculateValue = throttle(
    (x, y) => x + y,
    500,
    {
        resultCallback: (result) => {
            console.log('The calculated value is:', result);
        }
    }
);

calculateValue(5, 10);  // The calculated value is: 15

// Using cancel and flush
const expensive = throttle(heavyComputation, 1000);

// Later, if needed:
expensive.cancel();  // Cancel any pending execution
expensive.flush();   // Force immediate execution if there's a pending call