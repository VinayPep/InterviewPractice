/**
 * - Promise.allSettled takes array of promises and return an promise object with result of each fullfilled or
 * rejected promise in an array
 *
 * 
 * By attaching a .then() and .catch() to each promise inside myAllSettled(), you are ensuring that:

    1.Each promise always resolves — it doesn’t throw an error anymore because you've caught any rejection.
    2.Even if the original promise rejects, the .catch() will handle it and transform it into a resolved object with { status: "rejected", reason: err }.
    => IMP : Thus, Promise.all() never encounters a rejected promise, because each promise now resolves to a { status: ... } object, whether it succeeded or failed.
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

// Promise.allSettled(randomPromises).then((data) => {
//   console.log(data);
// });

const myAllSettled = (randomPromises) => {
  const mapOfPromises = randomPromises.map((promise) =>
    promise
      .then((data) => ({ status: "fulfilled", value: data }))
      .catch((err) => ({ status: "rejected", reason: err }))
  );
  console.log(mapOfPromises, "ddd");
  return Promise.all(mapOfPromises);
};
myAllSettled(randomPromises).then((data) => console.log(data));
