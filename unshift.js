/*-----Polyfill for unshift function of JavaScript-----*/

// -----Explanation-----
// The unshift method of Array instances adds the specified elements to the beginning of an array and returns the new length of the array.

// -----Real Implementation-----
const array = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(array.unshift(-1, 0), array);

//-----Polyfill-----
if (!Array.prototype.myUnshift) {
  Array.prototype.myUnshift = function () {
    var list = Object(this);
    var length = list.length >>> 0;
    var args = arguments;

    // Move all elements to the end of the array
    var i = 0;
    for (i = length; i > 0; i--) {
      list[i + arguments.length - 1] = list[i - 1];
    }
    // Add the new elements at the start of the array
    for (i = 0; i < arguments.length; i++) {
      list[i] = arguments[i];
    }
    return list.length;
  };
}

//-----Polyfill Implementation-----
const array2 = Array.from({ length: 10 }, (_, i) => i + 2);
console.log(array2.myUnshift(0, 1), array2);
