/*-----Polyfill for at function of JavaScript-----*/

// -----Explanation-----
// The at method of Array instances takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.

// -----Real Implementation-----
const array = Array.from({ length: 100 }, (_, i) => i * 2);
const isPresent = array.at(21);
const isPresent2 = array.at(-1);
console.log(isPresent, isPresent2);

//-----Polyfill-----
if (!Array.prototype.myAt) {
  Array.prototype.myAt = function (index) {
    var list = Object(this);
    var length = list.length >>> 0;
    if (index < 0) {
      index = length + index;
    } else if (index >= length) {
      return undefined;
    }
    return list[index];
  };
}

//-----Polyfill Implementation-----
const array2 = Array.from({ length: 1000 }, (_, i) => i * 90);
const isThere = array2.myAt(763);
const isThere2 = array2.myAt(-456);
const isThere3 = array2.myAt(-4596);
console.log(isThere, isThere2, isThere3);
