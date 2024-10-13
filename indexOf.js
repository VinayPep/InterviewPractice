/*-----Polyfill for indexOf function of JavaScript-----*/

// -----Explanation-----
// The indexOf method of Array instances returns the first index at which a given element can be found in the array, or -1 if it is not present.

// -----Real Implementation-----
const array = Array.from({ length: 10 }, (_, i) => i + 1);
const elementToFind = 7;
const index = array.indexOf(elementToFind);
const elementToFind2 = 11;
const index2 = array.indexOf(elementToFind2);
console.log(index, index2);

//-----Polyfill-----
if (!Array.prototype.myIndexOf) {
  Array.prototype.myIndexOf = function (searchElement, fromIndex = 0) {
    var index = -1;
    for (var idx = fromIndex; idx < this.length; idx++) {
      if (this[idx] === searchElement) {
        //get the first index when searchElement is found
        index = idx;
        break;
      }
    }
    return index;
  };
}

//-----Polyfill Implementation-----
const arrayDouble = Array.from({ length: 10 }, (_, i) => i + 2);
const findNewIndex = arrayDouble.myIndexOf(4);
console.log(findNewIndex);
