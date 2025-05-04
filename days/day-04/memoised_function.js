// Exercise: Create a function that returns a memoized version of any function

/**
 * Creates a memoized version of any function.
 * The memoized function caches results based on the arguments provided,
 * avoiding redundant calculations when called multiple times with the same arguments.
 *
 * @param {Function} fn - The function to memoize
 * @param {Function} [hashFn] - Optional custom hash function for the arguments
 * @returns {Function} A memoized version of the provided function
 */
function memoize(fn, hashFn) {
    // Cache to store function results
    const cache = new Map();

    // Default hash function stringifies the arguments
    const defaultHashFn = (...args) => {
        try {
            return JSON.stringify(args);
        } catch (error) {
            // If arguments can't be stringified, concatenate their string representations
            return args.map(arg => String(arg)).join('|');
        }
    };

    // Use the provided hash function or the default one
    const getHash = hashFn || defaultHashFn;

    // Return the memoized function
    return function (...args) {
        const key = getHash(...args);

        // If result is in cache, return it directly
        if (cache.has(key)) {
            return cache.get(key);
        }

        // Otherwise, calculate the result and store it in cache
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Example usage:

// Example 1: Memoized fibonacci function
const fibonacci = memoize(n => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Fast calculation due to memoization

// Example 2: Using a custom hash function
const add = memoize((a, b) => {
    console.log('Calculating...');
    return a + b;
}, (a, b) => `${a}+${b}`);

console.log(add(2, 3)); // Logs: "Calculating..." and returns 5
console.log(add(2, 3)); // Returns 5 without recalculating

// Example 3: Memoizing an expensive API call function
const fetchData = memoize(async (id) => {
    const response = await fetch(`https://api.example.com/data/${id}`);
    return response.json();
});
