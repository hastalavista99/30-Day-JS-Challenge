
function isEqual(obj1, obj2) {

    // Object.keys(): Returns the names of the enumerable string properties and methods of an object.
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);


    // check if the length is equal
    if (keys1.length !== keys2.length) return false;

    // Check if all keys in obj1 exist in obj2 with the same values
    for (const key of keys1) {
        if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}

