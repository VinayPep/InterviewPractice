/*-----Polyfill for Promise.any function of JavaScript-----*/

// -----Explanation-----
// The Promise.any() method in JavaScript is a static method that takes an iterable (like an array) of promises as input and returns a single Promise.

// The returned promise from Promise.any() fulfills when any of the input’s promises fulfills, with this first fulfillment value.

// It rejects when all of the input’s promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.

// -----Real Implementation-----
const pErr = new Promise((resolve, reject) => {
  reject("Always fails");
});
const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "Done eventually");
});
const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "Done quick");
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
  console.log(value);
});

//-----Polyfill-----

const myPromiseAny = function (promises) {
  return new Promise((resolve, reject) => {
    let count = promises.length;
    const result = [];
    if (count === 0) {
      reject(new AggregateError("All promises were rejected"));
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => resolve(value))
        .catch((err) => {
          result[index] = err;
          count--;
          if (count === 0) {
            reject(new AggregateError(result));
          }
        });
    });
  });
};

//-----Polyfill Implementation-----
myPromiseAny([pErr])
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.log(err);
  });
