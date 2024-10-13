//Flatten array is to make a deeply nested array in a regular array
// [1,[2,3[,4,[5,6,7,[8,9],[10,11],[12,13]][13,14][15,16][16,17]]][18,19,20]]
// [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
//Draw recursive tree for clear understanding

function flattenArray(arr) {
  return arr.reduce((prevVal, currentVal) => {
    if (Array.isArray(currentVal)) {
      prevVal = prevVal.concat(flattenArray(currentVal));
    } else {
      prevVal.push(currentVal);
    }
    return prevVal;
  }, []);
}

console.log(
  flattenArray([
    1,
    [
      2,
      3,
      [4, [5, 6, 7, [8, 9], [10, 11], [12, 13]], [14], [15, 16], [16, 17]],
    ],
    [18, 19, 20],
  ])
);

// More simple approach
function flattenArraySimple(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
let nestedArray = [1, 2, [3, 4, [5, 6]]];
console.log(flattenArraySimple(nestedArray));
