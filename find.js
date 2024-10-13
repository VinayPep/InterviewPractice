/*-----Polyfill for find function of JavaScript-----*/

// -----Explanation-----
// The find method of Array instances returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

// -----Real Implementation-----
const array = Array.from({ length: 10 }, (_, i) => i);
const isPresent = array.find((element) => element > 10);
const isPresent2 = array.find((element) => element > 5);
console.log(isPresent, isPresent2);

//-----Polyfill-----
if (!Array.prototype.myFind) {
  Array.prototype.myFind = function (fn) {
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    for (var i = 0; i < length; i++) {
      var args = [list[i], i, list];
      // Add additional arguments to args
      for (var j = 2; j < arguments.length; j++) {
        args.push(arguments[j]);
      }
      //binding thisArg with the function
      if (fn.apply(thisArg, args)) {
        return list[i];
      }
    }
    return undefined;
  };
}

//-----Polyfill Implementation-----
const array2 = Array.from({ length: 2 }, (_, i) => i + 2);
const isEven = array2.myFind((element) => element % 2 == 0);
console.log(isEven);
