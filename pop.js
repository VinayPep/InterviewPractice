/*-----Polyfill for pop function of JavaScript-----*/

// -----Explanation-----
// The pop method of Array instances removes the last element from an array and returns that element. This method changes the length of the array.

// -----Real Implementation-----
const array = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(array.pop());

//-----Polyfill-----
if (!Array.prototype.myPop) {
  Array.prototype.myPop = function () {
    var list = Object(this);
    if (list.length === 0) {
      return undefined;
    }
    const lastElement = list[list.length - 1];
    list.length = list.length - 1;
    return lastElement;
  };
}

//-----Polyfill Implementation-----
const array2 = Array.from({ length: 10 }, (_, i) => i * 3);
console.log(array2.myPop());
