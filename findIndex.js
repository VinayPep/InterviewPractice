/*-----Polyfill for findIndex function of JavaScript-----*/

// -----Explanation-----
// The findIndex method of Array instances returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.

// -----Real Implementation-----
const array = Array.from({ length: 10 }, (_, i) => i + 10);
console.log(array);
const isMultipleOfTen = (ele, idx, arr, args) => {
  console.log(ele, idx, arr, args);
  return ele % 10 === 0;
};
const testFindIndex = array.findIndex((ele, index, arr) =>
  isMultipleOfTen(ele, index, arr, "This is Argument")
);
console.log(testFindIndex);

//-----Polyfill-----
if (!Array.prototype.myFindIndex) {
  Array.prototype.myFindIndex = function (fn) {
    // The Object(this) line is there to ensure that the method works correctly even if it’s called in an unusual way.
    // In JavaScript, methods are just functions, and functions can be called independently of any object. If a function is called without an object, this will be undefined (in strict mode) or the global object (in non-strict mode). By converting this to an object with Object(this), we ensure that the method can operate on this as an object, even if it was called as a standalone function.
    var list = Object(this);
    // This line is getting the length of the array and ensuring it’s a non-negative integer. The >>> operator is the unsigned right shift operator. When used with 0, it effectively converts its operand to a non-negative integer. If list.length is already a non-negative integer, this operation has no effect. But if list.length is something else (like undefined or a negative number), list.length >>> 0 will be 0
    var length = list.length >>> 0;
    //now when you call findIndex(function, args) arguments are passed as array in js , now argumnets[0] is our callback function while argumnets[1] is extra args passed ie args
    //  The arguments object is an array-like object that contains all the arguments passed to a function. In JavaScript, array indices start at 0, so arguments[0] is the first argument, arguments[1] is the second argument, and so on.

    // In the context of the findIndex polyfill, arguments[0] is the predicate function (the function that tests each element), and arguments[1] is the thisArg parameter, which is used as the this context for the predicate function.

    // If thisArg is provided when calling findIndex, this inside the predicate function will be thisArg. If thisArg is not provided, this will be undefined inside the predicate function. This is why arguments[1] is used to get the thisArg parameter.

    var thisArg = arguments[1];
    for (var i = 0; i < length; i++) {
      var args = [list[i], i, list];
      // Add additional arguments to args
      for (var j = 2; j < arguments.length; j++) {
        args.push(arguments[j]);
      }
      //binding thisArg with the function
      if (fn.apply(thisArg, args)) {
        return i;
      }
    }
    return -1;
  };
}

//-----Polyfill Implementation-----
const array2 = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(array2);
const isMultipleOfTwo = (ele, idx, arr, args) => {
  console.log(this);
  console.log(ele, idx, arr, args);
  return ele % 10 === 0;
};
const testFindIndex2 = array2.myFindIndex((ele, index, arr) =>
  isMultipleOfTwo(ele, index, arr, "This is Argument 2")
);
const testFindIndex3 = array2.myFindIndex(
  isMultipleOfTwo,
  "This is argument 1"
);
console.log(testFindIndex2);
console.log(testFindIndex3);

// In this example, we have an array of numbers and an object obj with a property value set to 10.

// The function isGreater checks if an element of the array is greater than this.value. Here, this refers to the object that is passed as the second argument to the findIndex method.

// When we call numbers.findIndex(isGreater, obj), the findIndex method executes the isGreater function for each element in the numbers array. Inside the isGreater function, this is obj, so this.value is obj.value, which is 10.

// The purpose of this in this context is to provide a way to compare each element of the array with a dynamic value (obj.value in this case). By changing the obj.value, you can easily change the behavior of the isGreater function without modifying the function itself.

// The findIndex method returns the index of the first element in the array that satisfies the provided testing function (i.e., the element is greater than obj.value). In this case, it returns 1, because 12 is the first number in the array that’s greater than 10.

let numbers = [5, 12, 8, 130, 44];
let obj = {
  value: 10,
};
function isGreater(element) {
  return element > this.value;
}
let index = numbers.myFindIndex(isGreater, obj);
console.log(index);
