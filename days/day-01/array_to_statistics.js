const numArray = [45, 56, 2, 34, 4, 231];

function max(arr) {
    return Math.max(...arr);
}

function min(arr) {
    return Math.min(...arr);
}

function median(arr) {
    // sort the array in ascending order
    const sortedArr = [...arr].sort((a, b) => a - b);
    const middle = Math.floor(sortedArr.length / 2);

    // if the array length is even find the median by finding the average of the two middle numbers
    if (sortedArr.length % 2 === 0) {
        return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
    } else {
        return sortedArr[middle];
    }
}

function mean(arr) {
    const sum = arr.reduce((total, value) => total + value, 0);
    return sum / arr.length;
}

function statistics(arr) {
    // check if array is empty
    if (!Array.isArray(arr) || arr.length === 0) {
        console.log("Error: Input must be a non-empty array");
        return;
    }

    console.log("Min is:", min(arr));
    console.log("Max is:", max(arr));
    console.log("Median is:", median(arr));
    console.log("Mean is:", mean(arr));

}

statistics(numArray);