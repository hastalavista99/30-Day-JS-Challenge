const numArray: number[] = [45, 56, 2, 34, 4, 231];

function max(arr: number[]): number {
    return Math.max(...arr);
}

function min(arr: number[]): number {
    return Math.min(...arr);
}

function median(arr: number[]): number {
    // sorting the array in ascending order
    const sortedArr: number[] = [...arr].sort((a, b) => a - b);
    const middle: number = Math.floor(sortedArr.length / 2);

    // if the array length is even find the median by finding the average of the two middle numbers
    if (sortedArr.length % 2 === 0) {
        return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
    } else {
        return sortedArr[middle];
    }
}

function mean(arr: number[]): number {
    const sum: number = arr.reduce((total, value) => total + value, 0);
    return sum / arr.length;
}

function statistics(arr: number[]): void {
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