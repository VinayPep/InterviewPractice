/*-----Polyfill for Promise.allSettled function of JavaScript-----*/

// -----Explanation-----
// Promise.allSettled is a method in JavaScript that returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

// Promise.allSettled(iterable): This method takes an iterable of promises as an argument.

// It returns a new promise that fulfills with an array of objects once all the input promises are settled. Each object in the array corresponds to the result of each promise in the input iterable.

//Each object has two properties:
// status: A string that is either 'fulfilled' or 'rejected' indicating whether the promise was fulfilled or rejected.

// value or reason: If the status is 'fulfilled', there will be a value property on the object that contains the fulfillment value of the promise. If the status is 'rejected', there will be a reason property on the object that contains the rejection reason of the promise.

// -----Real Implementation-----

let promise1 = Promise.resolve(3);
let promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, "foo"));
let promises = [promise1, promise2];

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result.status))
);

//-----Polyfill-----

const myPromiseallSettled = function (promises) {
  return new Promise(function (resolve) {
    let results = [];
    let counter = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = { status: "fulfilled", value: value };
          counter++;
          if (counter === promises.length) {
            resolve(results);
          }
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason: reason };
          counter++;
          if (counter === promises.length) {
            resolve(results);
          }
        });
    });
  });
};

//-----Polyfill Implementation-----
let testPromises = [
  Promise.resolve("Promise 1 resolved"),
  Promise.resolve("Promise 2 resolved"),
  Promise.resolve("Promise 3 resolved"),
  Promise.reject("Promise 4 rejected"),
  Promise.reject("Promise 5 rejected"),
  Promise.reject("Promise 6 rejected"),
];

myPromiseallSettled(testPromises).then((results) => {
  results.forEach((result) => console.log(result));
});
