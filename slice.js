/*-----Polyfill for slice function of JavaScript-----*/

// -----Explanation-----
// The slice method of Array instances returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.

// -----Real Implementation-----
const array = Array.from({ length: 20 }, (_, i) => i + 1);
console.log(array.slice(4, 9));

//-----Polyfill-----
if (!Array.prototype.mySlice) {
  Array.prototype.mySlice = function (start = 0, end = this.length) {
    start = start < 0 ? this.length + start : start;
    end = end < 0 ? this.length + end : end;
    if (start > end) {
      return [];
    }
    let copiedArray = [];
    for (let i = start; i < end && i < this.length; i++) {
      copiedArray.push(this[i]);
    }
    return copiedArray;
  };
}

//-----Polyfill Implementation-----
const array2 = Array.from({ length: 20 }, (_, i) => i + 2);
console.log(array2.mySlice(-3));
