/**
 * Promise.any accepts the array of promises
 * - it return a promise that resolves as soon as any of the promises in iterable fullfills with a value of
 *   fullfilled promise
 * - if No promises in iterabe fullfills then the returned promise is rejected with an aggregated error
 * - it ignores any rejections that occur before the first resolution.
 * - Parallel operation
 * - reverse of promise.all
 *
 */

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

const createNPromisesRejected = (total) => {
  //Array.from creates a new shallow copied array from iterable or array type objects.
  return Array.from({ length: total }, (_, i) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(`Promise ${i + 1} rejected`);
      }, Math.random() * 10000);
    });
  });
};

const randomPromises = generateRandomPromises(10);
const rejectedPromises = createNPromisesRejected(5);

// Promise.any(randomPromises)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//   Promise.any(rejectedPromises)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// IMPLEMENTATION

const myPromiseAny = (arrayOfPromises) => {
  const arrayOfPromisesRejected = [];
  let totalPromisesCompleted = 0;
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach((promise, index) => {
      promise
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          arrayOfPromisesRejected[index] = err;
          totalPromisesCompleted += 1;
          if (totalPromisesCompleted === arrayOfPromises.length) {
            reject(arrayOfPromisesRejected);
          }
        });
    });
  });
};
myPromiseAny(rejectedPromises)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
