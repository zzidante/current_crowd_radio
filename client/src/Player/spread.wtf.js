arr1 = [12,56,87595,4,134,9,43,45]
arr2 = [65,77,3,65,6,24,878,12,9]

result = new Set(arr1.filter(x => arr2.includes(x)))

console.log(result);