
const someArray = [
    ["name", "John"],
    ["age", 30],
    ["city", "New York"],
    ["hobbies", ["reading", "hiking", "coding"]]
]

function arrayToObject(arr) {

    if (!Array.isArray(arr)) {
        throw new TypeError('Input must be an array');
    }

    const result = {};

    // iterate throughout the array elements
    for (const pair of arr) {
        if (Array.isArray(pair) && pair.length === 2) {
            const [key, value] = pair;
            result[key] = value;
        } else {
            throw new Error('Each element must be a key-value pair array with length 2');
        }
    }

    return result;
}

const outro = arrayToObject(someArray)

console.log(outro)