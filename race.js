/*-----Polyfill for Promise.race  function of JavaScript-----*/

// -----Explanation-----
// The Promise.race() method in JavaScript is a static method that takes an iterable (like an array) of promises as input and returns a single Promise.

// The returned promise from Promise.race() settles as soon as one of the input promises settles.

// The state (fulfilled or rejected) and the value or reason of the returned promise are the same as the first promise that settles.

// If the iterable passed is empty, Promise.race() returns a promise that is already pending.

// If the iterable passed is non-empty but contains no pending promises, the returned promise is still asynchronously (instead of synchronously) settled

// -----Real Implementation-----
const promise0 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "bar");
});
const promise01 = 34;
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 200, "foo");
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
});

//-----Polyfill-----
const myPromiseRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      /*
        Promise.resolve() is a method that returns a Promise object that is resolved with a given value. If the value is a promise, that promise is returned; if the value is a thenable (i.e., has a “then” method), the returned promise will “follow” that thenable, adopting its eventual state; otherwise, the returned promise will be fulfilled with the value.

        In the context of  myPromiseRace function, Promise.resolve(promise) is used to ensure that each element of the promises array is a promise. Here’s why:

        1.If promise is already a Promise, it is returned unchanged.
        2.If promise is a thenable (an object with a then method), Promise.resolve() returns a new Promise that follows the thenable.
        3.If promise is a non-promise value, it is converted to a Promise that is immediately resolved with the value.
        4.This is important because the .then() and .catch() methods can only be used on Promises. By calling Promise.resolve(promise), you ensure that you’re working with a Promise and can safely call .then() and .catch() on it.
        */
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

//-----Polyfill Implementation-----
myPromiseRace([promise0, promise2])
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
