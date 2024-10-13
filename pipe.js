/*-----Polyfill for pipe function of JavaScript-----*/

// -----Explanation-----
// The pipe function in JavaScript is a higher-order function that takes two or more functions as arguments and returns a new function that applies these functions in a left-to-right order

// -----Real Implementation-----
const pipe =
  (...fns) =>
  (initialVal) =>
    fns.reduce((val, fn) => fn(val), initialVal);

const function1 = (value) => {
  return (value * (value + 1)) / 2;
};

const function2 = (value) => {
  return 2 * value;
};
const pipeResult = pipe(function1, function2);
console.log(pipeResult(10));

//-----Polyfill-----
if (!Function.prototype.myPipe) {
  Function.prototype.myPipe = function (...args) {
    return function (initialVal) {
      var acc = initialVal;
      for (var i = 0; i < args.length; i++) {
        acc = args[i](acc);
      }
      return acc;
    };
  };
}

//-----Polyfill Implementation-----
const function01 = (value) => {
  return (value * (value + 1)) / 2;
};

const function02 = (value) => {
  return 2 * value;
};
const addSumTwice01 = myPipe(function1, function2);
console.log(addSumTwice01(10));
