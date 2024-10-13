/*-----Polyfill for compose function of JavaScript-----*/

// -----Explanation-----
// The compose function in JavaScript is a higher-order function that takes two or more functions as arguments and returns a new function that applies these functions in a right-to-left order.

// -----Real Implementation-----
const function1 = (value) => {
  return (value * (value + 1)) / 2;
};

const function2 = (value) => {
  return 2 * value;
};

//In JavaScript, the reduceRight method takes a callback function as its first argument, which is used to apply a given operation to each element in the array, and reduce the array to a single value. The callback function takes two arguments: the accumulator (which starts as the last element in the array) and the current value (which starts as the second-to-last element in the array).

const compose =
  (...fns) =>
  (initialVal) =>
    fns.reduceRight((val, fn) => fn(val), initialVal);

const addSumTwice = compose(function2, function1);
console.log(addSumTwice(10));

//-----Polyfill-----
if (!Function.prototype.myCompose) {
  Function.prototype.myCompose = function (...args) {
    return function (initialVal) {
      return args.reduceRight(
        (accumulator, currentValue) => currentValue(accumulator),
        initialVal
      );
    };
  };
}

// or

if (!Function.prototype.myCompose) {
  Function.prototype.myCompose = function (...args) {
    return function (initialVal) {
      var acc = initialVal;
      for (var i = args.length; i >= 0; i--) {
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

const addSumTwice01 = myCompose(function2, function1);
console.log(addSumTwice01(10));
