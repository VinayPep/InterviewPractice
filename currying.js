let multiply = function (x, y) {
  console.log(x * y);
};

//here we create a copy of multiply function with x = 2
let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(5);

let multiplyClosure = function (x) {
  return function (y) {
    console.log(x * y);
  };
};

let multiplyFive = multiplyClosure(5);
multiplyFive(20);
