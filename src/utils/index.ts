const arr: string[] = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
const indexesToRemove: number[] = [1, 5, 4];

export function removeElementsByMultipleIndexes(arr: string[], indexes: number[]): string[] {
    // Sort indexes in descending order to avoid issues with splicing
    indexes.sort((a, b) => b - a);

    // Remove elements at specified indexes
    for (const index of indexes) {
        arr.splice(index, 1);
    }

    return arr;
}

const newArr: string[] = removeElementsByMultipleIndexes(arr, indexesToRemove);
console.log(newArr);

