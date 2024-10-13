/*-----Polyfill for some function of JavaScript-----*/

// -----Explanation-----
// The some method of Array instances tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.

// -----Real Implementation-----
const array = Array.from({ length: 100 }, (_, i) => i + 2);
const isEven = (ele) => ele % 2 === 0;
console.log(array.some(isEven));

//-----Polyfill-----
if (!Array.prototype.mySome) {
  Array.prototype.mySome = function (fn) {
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    for (var i = 0; i < length; i++) {
      var args = [list[i], i, list];
      for (var j = 2; j < arguments.length; j++) {
        args.push(arguments[j]);
      }
      if (fn.apply(thisArg, args)) {
        return true;
      }
    }
    return false;
  };
}

//-----Polyfill Implementation-----
const array2 = Array.from({ length: 100 }, (_, i) => i + 2);
const isOdd = (ele) => ele % 2 === 1;
console.log(array2.mySome(isOdd));
