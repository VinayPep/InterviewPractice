/*-----Polyfill for map function of JavaScript-----*/

// -----Explanation-----
// Map function in js is a method of Array instances, which returns an array of values, which are passed to a function which runs on every element of the original array

// -----Real Implementation-----
const arr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const doubleTheNumberAddIndex = (num, index) => {
  return 2 * num + index;
};

/*
        this Context:
            Arrow functions inherit the this value from their surrounding scope (lexical scoping). (ref: mappedArray)
            Regular function expressions create their own this context based on how they are called. (ref: oldFunctionExpressionMap )
    */

const mappedArray = arr.map((item, index) =>
  doubleTheNumberAddIndex(item, index)
);

const oldFunctionExpressionMap = arr.map(function doubleTheNumber(num, index) {
  return 2 * num;
});

console.log(mappedArray, "Arrow Function");
console.log(oldFunctionExpressionMap, "Regular Function");

//you need to return a value from map function
const returnedArry = arr.map((item, index) => {
  return item * 3 * index;
});
console.log(returnedArry, "Return check");

//-----Polyfill-----
if (!Array.prototype.myMap) {
  //check if Array.prototype contains map myMap function or not
  Array.prototype.myMap = function (callbackFunction) {
    // Note
    /*
            Context of Execution:
                When you call the map function on an array (let’s say testArr), the context of execution is important.
                The map function is invoked on an array object (testArr in this case), and it operates on that specific array.

            How this Works Inside the map Function:
                The this value inside the map function is determined by the context in which the map function is called.
                When you call testArr.map(callback), the this value inside the callback function will be set to the testArr array.
                Essentially, this refers to the array on which the map function was called.
            
        */

    // so this will point to the array on which myMap is being called
    var arr = this;
    var resultantArr = [];
    for (var i = 0; i < arr.length; i++) {
      resultantArr.push(callbackFunction(arr[i], i));
    }
    return resultantArr;
  };
}

//-----Polyfill Implementation-----
const arrTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function evenNumber(num) {
  if (num % 2 !== 0) {
    return -1;
  }
  return num;
}
const finalArr = arrTest.myMap(evenNumber);
console.log(finalArr);
