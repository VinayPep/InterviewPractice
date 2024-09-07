/**
 * Custom Promise Implementation
 *
 */
const myPromise = new Promise((resolve, reject) => {
  resolve("1");
}); // class  with constructor taking a call back function having argument as resolve function and reject function

// resolve(xyz) => whatever be xyz is get inside then inside a callback while same for reject

myPromise
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

const states = {
  PENDING: 0,
  FULLFILLED: 1,
  REJECTED: 2,
};

// Purpose: Defines the possible states of the promise.
// Comparison: In native promises, the states are not explicitly defined, but they are internally managed as pending, fulfilled, and rejected.

class MyPromise {
  constructor(callbackFunction) {
    this.state = states.PENDING; // this states handles the state of promise
    this.value = undefined; // handles the value returned from promise
    this.handlers = []; // stores all handlers

    //When the callbackFunction (executor function) is passed into a promise, it gets called immediately with
    // resolve and reject functions as arguments. If an error is thrown while executing this function, we need to
    //catch that error and reject the promise.

    try {
      callbackFunction(this._resolve, this._reject); // PVT function  // call the callback function ie
      /**
       * new Promise((resolve, reject)=>{
       * -> callbackfn
       *  resolve() or reject()
       * -> but its immediately called
       * })
       *
       *
       * */
    } catch (error) {
      // if there is an error in execution of callback function reject the promise
      this._reject(error); // PVT function
    }
  }
  _resolve = (value) => {
    /**
     * new Promise((resolve, reject)=> {
     * resolve(value); => after this it goes to then
     * })
     * */

    this._handleUpdate(states.FULLFILLED, value); // handler handles the setting of value and states
  };
  _reject = (value) => {
    /**
     * new Promise((resolve, reject)=> {
     * reject(value); => after this it goes to then and catch
     * })
     * */

    this._handleUpdate(states.REJECTED, value);
  };
  _handleUpdate = (state, value) => {
    if (state === states.PENDING) {
      return;
    }
    //Set Timeout: Ensures the state change and handler execution are asynchronous (mimics the behavior of the microtask queue in native promises).
    //Comparison: Native promises do not use setTimeout but use microtasks to handle state transitions and callback execution.
    setTimeout(() => {
      /**
       * Handling Nested Promises:
            If value is a promise (in this case, MyPromise), it means the promise might still be pending or it might need to resolve to another value (e.g., a value or another promise).
            To handle this, the then method is called on that promise to ensure that the resolution or rejection of this inner promise is passed along to the current (outer) promise.
       *
        // Example promise code to understand

            const promise1 = new Promise((resolve, reject) => {
                setTimeout(() => resolve(10), 1000); // if this rejects then (err)=> console.log(err) is called in then
            });

            const promise2 = new Promise((resolve) => {
                setTimeout(() => resolve(promise1), 500); // Resolves with promise1
            });

            promise2.then((value) => console.log(value), (err)=> console.log(err)); // Logs: 10
            

            Nested Promise (promise1):

            promise2 resolves with another promise (promise1).
            The native Promise implementation detects that the value passed to resolve is itself a promise (promise1).
            Automatic Chaining:

            Instead of immediately resolving promise2, JavaScript waits for promise1 to resolve.
            Once promise1 resolves, promise2 takes on the resolved value of promise1 (which is 10 in this case).

            You ensure:
                If value resolves, the current promise will resolve with the same value.
                If value rejects, the current promise will reject with the same error.

      */
      if (value instanceof MyPromise) {
        value.then(this._resolve, this._reject);
      }
      this.state = state;
      this.value = value;
      this._executeHandlers();
    }, 0);
  };
  _executeHandlers = () => {
    if (this.state === states.PENDING) {
      return;
    }
    this.handlers.forEach((handler) => {
      if (this.state === states.FULLFILLED) {
        // if current promise is fullfilled call the callback function inside then  otherwise call the 2nd argument of then
        return handler.onSuccess(this.value);
      }
      return handler.onFailure(this.value);
    });
    this.handlers = [];
  };

  _addHandler = (handler) => {
    // adds handlers of then and catch in array and executes the based on this value
    this.handlers.push(handler);
    this._executeHandlers();
  };

  then = (onSuccess, onFailure) => {
    // then always return a promise
    // onSuccess and onFailure are callback functions
    // Promise chaining as then returns a promise
    //The new promise will either resolve or reject based on how the current promise (this) behaves.
    return new MyPromise((resolve, reject) => {
      // add to handler array for processing
      this._addHandler({
        onSuccess: (value) => {
          if (!onSuccess) {
            //If no onSuccess callback is provided, it will simply pass the value along and resolve the new promise with that value
            return resolve(value);
          }
          try {
            //If an onSuccess callback is provided, it calls the callback with the resolved value of the current promise
            return resolve(onSuccess(value));
          } catch (err) {
            //If an error occurs inside the onSuccess callback, the new promise is rejected
            return reject(err);
          }
        },
        onFailure: (value) => {
          if (!onFailure) {
            return reject(value);
          }
          try {
            return reject(onFailure(value));
          } catch (err) {
            return reject(err);
          }
        },
      });
    });
  };

  catch = (onFailure) => {
    return this.then(null, onFailure);
  };
  //finally is designed to execute a callback regardless of whether a promise is resolved or rejected.
  finally = (callback) => {
    //In the implementation of finally, returning a new promise is necessary because finally is part of the
    //promise chain and needs to ensure that after the finally block runs, the promise chain can either continue or
    //propagate the result (whether it was fulfilled or rejected)
    return new MyPromise((resolve, reject) => {
      let wasResolved; // Will store if the previous promise was resolved or rejected
      let value; // Will store the value or error from the previous promise
      // Execute the then method for success and catch for failure
      this.then((val) => {
        value = val;
        wasResolved = true;
        return callback();
      }).catch((err) => {
        value = err;
        wasResolved = false;
        return callback();
      });
      // After then or catch, we determine whether to resolve or reject the new promise
      if (wasResolved) {
        resolve(value); // Resolve the new promise with the original resolved value
      } else {
        reject(value); // Reject the new promise with the original rejection reason
      }
    });
  };
}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is resolved");
  }, 1000);
});

promise
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(data);
  });

/**
 * 
 * The variables wasResolved and value are used to store the outcome of the previous promise (this.then(...)
 *  and this.catch(...)) before the finally callback completes, ensuring that the correct result 
 * (either resolved value or rejected error) is available after the finally block has executed.

    Here’s why they are necessary:

        Purpose of wasResolved and value:
        Preserve the Original Outcome:

            1.We need to remember whether the original promise was resolved or rejected before running the finally block, because finally does not change the outcome.
            2.The callback inside finally runs regardless of the result, but we need to return the original outcome afterward, whether it was a resolution (success) or rejection (error).
            3.Without storing the state (wasResolved) and the result (value), we would lose track of whether to call resolve or reject on the new promise being returned from finally.
            
        Separate Execution of the finally Callback:

            1.The finally callback executes after either the then or catch block. Since the result of the original promise (whether it was resolved or rejected) is important for continuing the promise chain, we store that information beforehand.
            2.The finally block executes independently of the original result, but once it completes, we need to know how to continue the chain: by resolving or rejecting the new promise based on what happened before finally.
        
        Detailed Breakdown of wasResolved and value:
            let wasResolved; // To store whether the promise was resolved or rejected
            let value;       // To store the resolved value or rejected error
            this.then((val) => {
                value = val;           // Store the resolved value
                wasResolved = true;    // Mark that the promise was resolved
                return callback();     // Execute the callback in `finally`
            })
            .catch((err) => {
                value = err;           // Store the rejection reason
                wasResolved = false;   // Mark that the promise was rejected
                return callback();     // Execute the callback in `finally`
            });

        Storing the result (value):
            In the then block, value holds the resolved value of the promise.
            In the catch block, value holds the rejection reason.
        
        Storing the state (wasResolved):
            In the then block, wasResolved is set to true, indicating that the promise was successfully resolved.
            In the catch block, wasResolved is set to false, indicating that the promise was rejected.

        Why Do We Need This?
            After the finally callback runs, we need to ensure that we either resolve or reject the new promise based on the original outcome.


        if (wasResolved) {
            resolve(value);  // Resolve the new promise with the original value
        } else {
            reject(value);   // Reject the new promise with the original error
        }

        If wasResolved is true: This means the promise resolved successfully, so we resolve the new promise with the stored value (the resolved value).
        If wasResolved is false: This means the promise was rejected, so we reject the new promise with the stored value (the rejection reason).

        Example Without Storing State:
            If we didn’t store wasResolved and value, it would look like this:

            finally = (callback) => {
            return new MyPromise((resolve, reject) => {
                this.then((val) => {
                    return callback();
                }).catch((err) => {
                    return callback();
                });
                // Now what? We don't know if it was resolved or rejected!
            });
            };

            After running the finally block, we wouldn’t know if the original promise was resolved or rejected because we didn’t store the result anywhere.
            Therefore, we couldn’t decide whether to call resolve() or reject() on the new promise.
            
            Summary:
                wasResolved and value are necessary to preserve the original result of the promise (whether it was resolved or rejected) before running the finally callback.
                This ensures that after finally finishes, the promise chain continues correctly, either with the original resolved value or the rejection error.
 * 
 * 
*/
