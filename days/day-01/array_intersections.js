// Utilit to find the intersection of two arrays

function findIntersection(arr1, arr2) {
    // Input validation
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new TypeError('Both inputs must be arrays');
    }

    // Method 1: Using filter and includes (simple but less efficient for large arrays)
    return arr1.filter(item => arr2.includes(item));

    // Method 2: Using Set for better performance
    const set2 = new Set(arr2);
    return arr1.filter(item => set2.has(item));
}

// Usage examples
const example1 = findIntersection([1, 2, 3, 4], [3, 4, 5, 6]);
console.log('Example 1:', example1); // [3, 4]

const example2 = findIntersection(['apple', 'banana', 'orange'], ['banana', 'kiwi', 'orange', 'pear']);
console.log('Example 2:', example2); // ['banana', 'orange']

const example3 = findIntersection([1, 2, 2, 3], [2, 2, 3, 4]);
console.log('Example 3:', example3); // [2, 2, 3]

// Example with empty array result
const example4 = findIntersection([1, 2, 3], [4, 5, 6]);
console.log('Example 4:', example4); // []



// Enhanced version with additional features
/**
 * Advanced intersection utility with options for handling duplicates and special values.
 * @param {Array} arr1 - The first array
 * @param {Array} arr2 - The second array
 * @param {Object} options - Configuration options
 * @param {boolean} options.removeDuplicates - Whether to remove duplicates from the result
 * @returns {Array} - The intersection array based on specified options
 */
function advancedIntersection(arr1, arr2, options = {}) {
    const { removeDuplicates = false } = options;

    // Input validation
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new TypeError('Both inputs must be arrays');
    }

    // Find basic intersection
    const set2 = new Set(arr2);
    let result = arr1.filter(item => set2.has(item));

    // Remove duplicates if specified
    if (removeDuplicates) {
        result = [...new Set(result)];
    }

    return result;
}

// Advanced usage example
const advExample = advancedIntersection([1, 2, 2, 3, 3], [2, 2, 3, 4], { removeDuplicates: true });
console.log('Advanced example:', advExample); // [2, 3]