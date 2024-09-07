/**
 * -Schedules a function ie callback function to be called when promise is settled
 *
 */

Promise.prototype.myFinally = function(callback) {
  console.log(this, "this");
  if (typeof callback !== "function") {
    //think of like promise chaining
    return this.then(callback, callback);
  }

  const p = this.constructor || Promise;
  return this.then(
    // if you write finally before then it should pass on the value to then or catch below finally
    (value) => p.resolve(callback()).then(() => value), // returns value downward
    (err) =>
      p.resolve(callback()).then(() => {
        throw err;
      })
  );
};

const generateRandomPromises = (count) => {
  const promises = [];

  for (let i = 0; i < count; i++) {
    const promise = new Promise((resolve, reject) => {
      const isResolve = Math.random() > 0.5;
      const delay = Math.floor(Math.random() * 1000);

      setTimeout(() => {
        if (isResolve) {
          resolve(`Promise ${i + 1} resolved`);
        } else {
          reject(`Promise ${i + 1} rejected`);
        }
      }, delay);
    });

    promises.push(promise);
  }

  return promises;
};

const randomPromises = generateRandomPromises(10);

Promise.all(randomPromises)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  })
  .myFinally(() => {
    console.log("completed");
  });
