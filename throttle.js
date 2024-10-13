const expensive = () => {
  console.log("Expensive function");
};

const throttle = function (fn, delay) {
  let flag = true;
  return function () {
    if (flag) {
      let context = this,
        args = arguments;
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
};

const betterFunction = throttle(expensive, 5000);
