const arr = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
const indexesToRemove = [1, 5, 4];

function removeMultipleElementsByIndexes(arr, indexes) {
    // Sort indexes in descending order to avoid issues with splicing
    indexes.sort((a, b) => b - a);

    // Remove elements at specified indexes
    for (const index of indexes) {
        arr.splice(index, 1);
    }

    return arr;
}

const newArr = removeMultipleElementsByIndexes(arr, indexesToRemove);
console.log(newArr);
