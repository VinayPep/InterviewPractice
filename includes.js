/*-----Polyfill for includes function of JavaScript-----*/

// -----Explanation-----
// The includes method is like a game of hide and seek. It looks through an array to find a specific value. If it finds the value, it says “true” (I found it!). If it doesn’t find the value, it says “false” (It’s not here!)

// -----Real Implementation-----
const array = Array.from({ length: 20 }, (_, i) => i * 3 + 2);
console.log(array.includes(20));

//-----Polyfill-----
if (!Array.prototype.myIncludes) {
  Array.prototype.myIncludes = function (searchElement, findFromIndex = 0) {
    var index = false;
    for (var idx = findFromIndex; idx < this.length; idx++) {
      if (this[idx] === searchElement) {
        index = true;
        break;
      }
    }
    return index;
  };
}

//-----Polyfill Implementation-----
const array2 = Array.from({ length: 20 }, (_, i) => i * 2 + 2);
console.log(array2.myIncludes(4));
