/*-----Polyfill for splice function of JavaScript-----*/

// -----Explanation-----
// The splice method of Array instances changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.The first argument is the start index, the second argument is the delete count, and the rest are the items to be added.If delete count is 0, no items are removed, and the items are just added at the start index.If items to add are not provided, the function just removes the items from the array.

// -----Real Implementation-----
const fruits = ["apple", "banana", "mango", "grape"];
fruits.splice(2, 0, "kiwi");
console.log(fruits);

const Allfruits = ["apple", "banana", "mango", "grape"];
Allfruits.splice(1, 2, "kiwi");
console.log(Allfruits);

const array = Array.from({ length: 10 }, (_, i) => i + 1);
array.splice(2, 4, 55, 66);
console.log(array);

//-----Polyfill-----
if (!Array.prototype.mySplice) {
  Array.prototype.mySplice = function (start, deleteCount, ...items) {
    // [1,2,3,4,5,6,7,8,9,10] , start = 2, delete = 5, 55,66 -> items
    start = parseInt(start);
    if (isNaN(start)) {
      start = 0;
    } else if (start < 0) {
      //   start is negative then start from last indexes
      // start = -2 it will start from second element from last
      start = Math.max(0, this.length + start);
    }
    deleteCount = parseInt(deleteCount);

    if (isNaN(deleteCount) || deleteCount < 0) {
      deleteCount = 0;
    } else if (deleteCount > this.length - start) {
      //if length is 10 start is 6 deleteCount is 8 so deleteTill end of Array
      deleteCount = this.length - start;
    }
    // get deletedItems = [3,4,5,6,7]
    let deletedItems = this.slice(start, start + deleteCount);

    // Remove the deleted items from the original array
    //length = 10 - 5 = 5
    for (let i = start; i < this.length - deleteCount; i++) {
      // [1,2,8,9,10,6,7,8,9,10]
      this[i] = this[i + deleteCount];
    }
    // Decrease the length of the original array ! important this = [1,2,8,9,10]
    this.length -= deleteCount;

    // items = [55,66] , length = 2
    for (let i = items.length - 1; i >= 0; i--) {
      for (let j = this.length - 1; j >= start; j--) {
        this[j + 1] = this[j];
      }
      //   [ 1, 2, 8, 8, 9, 10 ]  this has become this array now
      this[start] = items[i];
      //   [ 1, 2, 66, 8, 9, 10 ] first iteration
    }
    return deletedItems;
  };
}

//-----Polyfill Implementation-----
const array2 = Array.from({ length: 10 }, (_, i) => i + 1);
array2.mySplice(2, 5, 55, 66);
console.log(array2);
