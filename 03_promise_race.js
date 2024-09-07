/**
 * Promise.race accepts the array of promises
 * - it returns a promise which fullfills or rejects with the value of reason from that promise
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

const randomPromises = generateRandomPromises(10);

// Promise.race(randomPromises)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const myPromiseRace = (randomPromises) => {
  return new Promise((resolve, reject) => {
    randomPromises.forEach((promise, index) => {
      promise
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

myPromiseRace(randomPromises)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
