/*-----Polyfill for Promise.all function of JavaScript-----*/

// -----Explanation-----
// The Promise.all() method in JavaScript is a static method that takes an iterable (like an array) of promises as input and returns a single Promise.
/*
The returned promise from Promise.all() fulfills when all of the input promises fulfill.

The fulfillment value is an array of fulfillment values of the input promises, in the same order as the promises passed, regardless of completion order.

If any of the input promises rejects, Promise.all() rejects with the reason of the first promise that rejected.

If the iterable passed is empty, Promise.all() returns a promise that is already fulfilled

*/

// -----Real Implementation-----
const promise1 = Promise.resolve(3);
const promise2 = Promise.resolve(42);
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
const promise4 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "bar");
});

Promise.all([promise1, promise2, promise3, promise4])
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log(err);
  });

//-----Polyfill-----
const myPromiseAll = function (promises) {
  const result = [];
  let promisesCompleted = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((data) => {
          result[index] = data;
          promisesCompleted += 1;
          if (promisesCompleted === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

//-----Polyfill Implementation-----
myPromiseAll([promise1, promise2, promise3])
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log(err);
  });
