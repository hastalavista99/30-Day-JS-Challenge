// Removing duplicates from an array in various ways

// Using Set ( most consice )

function removeDuplicates(arr) {
    return [...new Set(arr)];
}

// using filter
// This function leverages an important characteristic of indexOf(): it always returns the index of the first occurrence of an element in an array.
function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}


// using reduce
function removeDuplicates(arr) {
    return arr.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item], []);
}

// using forEach and object to track unique values, very efficient for large arrays
function removeDuplicates(arr) {
    const unique = {};
    const result = [];

    arr.forEach(item => {
        if (!unique[item]) {
            unique[item] = true;
            result.push(item);
        }
    });

    return result;
}


// using map
function removeDuplicates(arr) {
    const map = new Map();
    const result = [];

    for (const item of arr) {
        if (!map.has(item)) {
            map.set(item, true);
            result.push(item);
        }
    }

    return result;
}

// Using a for loop ; indexOf() return -1 if the element is not found

function removeDuplicates(arr) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) === -1) {
            result.push(arr[i]);
        }
    }

    return result;
}