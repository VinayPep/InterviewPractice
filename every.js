/*-----Polyfill for every function of JavaScript-----*/

// -----Explanation-----
// The every method of Array instances tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.

// -----Real Implementation-----
const array = Array.from({ length: 100 }, (_, i) => i + 1);
array[34] = -1;
const testPositive = (ele) => ele > 0;
const isPostive = array.every(testPositive);
console.log(isPostive);

//-----Polyfill-----
if (!Array.prototype.myEvery) {
  Array.prototype.myEvery = function (fn) {
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    for (var i = 0; i < length; i++) {
      var args = [list[i], i, list];
      for (var j = 2; j < arguments.length; j++) {
        args.push(arguments[j]);
      }
      if (!fn.apply(thisArg, args)) {
        return false;
      }
    }
    return true;
  };
}

//-----Polyfill Implementation-----
const array2 = Array.from({ length: 100 }, (_, i) => i - 2 * i);
const testNegative = (ele) => ele <= 0;
const isNegative = array2.myEvery(testNegative);
console.log(isNegative);
