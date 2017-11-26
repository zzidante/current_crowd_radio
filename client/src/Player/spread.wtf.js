arr1 = [12,56,87595,4,134,9,43,45]
arr2 = [65,77,3,65,6,24,878,12,9]

result = new Set(arr1.filter(x => arr2.includes(x)))

console.log(result);


tracks = [1234,4321,12,123,321,21]
index = 3

tracks.splice(index, 1)

console.log(tracks);


    Array.prototype.spliced = function (){
    Array.prototype.splice.apply(this, arguments)
    return(this)
  }


console.log(tracks.spliced(index, 1))