let numArr: number[] = [45, 56, 2, 34, 4, 231, 47, 94];

function chunkArr(size: number): void{
    const smallerArray = [...numArr].slice(0, size) // start from the first index to the specified size

    console.log("New array: ", smallerArray)
}

chunkArray(3)