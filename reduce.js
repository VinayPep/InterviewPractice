/*-----Polyfill for reduce function of JavaScript-----*/

// -----Explanation-----
// Reducer function in JavaScript executes a user supplied function on each instance of array, passing the result of the calculation from preceding element.The final result is a single value

// -----Real Implementation-----
const arr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const getSum = (lastSum, num) => {
  return lastSum + num;
};
const sumArrow = arr.reduce((accumulator, current, currIndex, arr) =>
  getSum(accumulator, current)
);
const sum = arr.reduce(function (accumulator, current, currIndex, arr) {
  return accumulator + current;
});
console.log(sumArrow, "Arrow Function");
console.log(sum, "Regular Function");

const sumReturn = arr.reduce((accumulator, current, currIndex, arr) => {
  return accumulator + current;
});
console.log(sumReturn, "Return Check");

//-----Polyfill-----
if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function (callbackFunction, initialValue) {
    var arr = this;
    var accumulator = initialValue;
    for (var i = 0; i < arr.length; i++) {
      if (accumulator) {
        accumulator = callbackFunction(accumulator, arr[i], i, arr);
      } else {
        accumulator = arr[i];
      }
    }
    return accumulator;
  };
}

//-----Polyfill Implementation-----
const arrTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function sumOfNums(acc, sum) {
  return acc + sum;
}
const sumOfArray = arrTest.myReduce(sumOfNums, 0);
console.log(sumOfArray);
