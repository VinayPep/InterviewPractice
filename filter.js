/*-----Polyfill for filter function of JavaScript-----*/

// -----Explanation-----
//Filter function creates a shallow copy for the array provided, it filters out elements which pass the test implemented by the provided function

// -----Real Implementation-----
const arr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const checkIsEven = (num) => {
  return num % 2 === 0;
};
const filteredArray = arr.filter((num) => checkIsEven(num));
const filteredArrayArr = arr.filter(function (num) {
  return num % 2 !== 0;
});

console.log(filteredArray, "Arrow Function");
console.log(filteredArrayArr, "Regular Function");

const returnedArr = arr.filter((num) => {
  return num % 5 === 0;
});
console.log(returnedArr, "Return Check");

//-----Polyfill-----
if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function (callbackFunction) {
    var arr = this;
    var resultantArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (callbackFunction(arr[i], i)) {
        resultantArr.push(arr[i]);
      }
    }
    return resultantArr;
  };
}

//-----Polyfill Implementation-----
const arrTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function evenNumber(num, index) {
  return (num + index) % 3 === 0;
}
const finalArr = arrTest.myFilter(evenNumber);
console.log(finalArr);
