/*-----Polyfill for Promise.finally function of JavaScript-----*/

// -----Explanation-----
// The finally() method is a part of the Promise object in JavaScript. It is used to schedule a function to be called when the promise is settled, regardless of whether it is fulfilled or rejected.

// The finally() method takes a single parameter: a function that will be called when the Promise is settled. This function does not receive any arguments.

// The finally() method returns a Promise whose finally handler is set to the specified function. If the handler throws an error or returns a rejected promise, the promise returned by finally() will be rejected with that value instead.

// -----Real Implementation-----
let task = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise has been rejected!");
  }, 2000);
});

task
  .then(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.log("Error:", error);
    }
  )
  .finally(() => {
    console.log(
      "This is finally() block that is executed after Promise is settled"
    );
  });

//-----Polyfill-----
function promiseFinally(promise, callback) {
  // This line gets the constructor of the promise object. This is used to create a new Promise using the same constructor as the original Promise.
  var P = promise.constructor;
  // return promise.then(: This line starts a then call on the promise. The then method returns a Promise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.
  // value  => P.resolve(callback()).then(() => value),: This is the fulfillment case. If the promise is fulfilled, the callback function is called, and its return value is passed to P.resolve to create a new Promise. Once that Promise is settled, a new Promise is returned that is fulfilled with the original fulfillment value (value).
  // reason => P.resolve(callback()).then(() => { throw reason }): This is the rejection case. If the promise is rejected, the callback function is called, and its return value is passed to P.resolve to create a new Promise. Once that Promise is settled, a new Promise is returned that is rejected with the original rejection reason (reason).
  return promise.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
}

//-----Polyfill Implementation-----

var promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("Promise fulfilled");
  }, 1000);
});

promiseFinally(promise, function () {
  console.log("This is called when the promise is settled");
})
  .then(function (value) {
    console.log("Fulfillment value: " + value);
  })
  .catch(function (reason) {
    console.log("Rejection reason: " + reason);
  });

//   The callback function is indeed called first. Here’s the sequence of events:
// The promise is settled (either fulfilled with a value or rejected with a reason).
// The callback function is called.
// If the promise was fulfilled, the value is passed through: P.resolve(callback()).then(() => value).
// If the promise was rejected, the reason is passed through: P.resolve(callback()).then(() => { throw reason }).
// The callback function is called in both the fulfillment and rejection cases before the value or reason is passed through. This is because the callback function is meant to be a cleanup function that is always called, regardless of whether the promise was fulfilled or rejected.
