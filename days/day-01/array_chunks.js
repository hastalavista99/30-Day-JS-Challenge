// Implement a function that chunks an array into groups of a specified size

let numArray = [45, 56, 2, 34, 4, 231, 47, 94];

function chunkArray(size){
    const smallerArray = [...numArray].slice(0, size) // start from the first index to the specified size

    console.log("New array: ", smallerArray)
}

chunkArray(3)