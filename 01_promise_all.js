/***
 * Promise.all accepts the array of promises
 *-it returns a promise that resolves ie Promise.resolve send kerega when ALL the promise are fullfilled
 *-if a promise in Promise.all rejects, the entire Promise.all operation will immediately reject with that
   error, and the rest of the promises will not be awaited or resolved.

   -the promises are executed in Parallel so if apis are being called all apis are called in parallel
   -result of promises is on same order as the promises are in the array
 */
const createNPromises = (total) => {
  //Array.from creates a new shallow copied array from iterable or array type objects.
  return Array.from({ length: total }, (_, i) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Promise ${i + 1} resolved`);
      }, Math.random() * 10000);
    });
  });
};

const arrayOfPromises = createNPromises(5);

//returns a promise

// Promise.all(arrayOfPromises)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// IMPLEMENTATION

const giveMeArrayOfPromises = createNPromises(10);

const myPromiseAll = (arrayOfPromises) => {
  const arrayOfResolvedPromises = [];
  let completedPromises = 0;
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach((promise, index) => {
      promise
        .then((data) => {
          arrayOfResolvedPromises[index] = data;
          completedPromises += 1;
          if (completedPromises === arrayOfPromises.length) {
            resolve(arrayOfResolvedPromises);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

myPromiseAll(giveMeArrayOfPromises)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
