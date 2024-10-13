/*-----Polyfill for bind function of JavaScript-----*/

// -----Explanation-----
//bind function of Function instances creates a new function.It returns a new function that works just like the original one, but you can set what this should be and also add some arguments that will always be used when the new function is called.

// -----Real Implementation-----
const foodObject = {
  name: "Gol-Gappa",
  price: 12,
  getName: function () {
    console.log(this, "Here this points to the object");
    return this.name;
  },
};
console.log(foodObject.getName());
function getNames(quote, quote2) {
  console.log(quote, quote2);
  return this.getName();
}
const getNameOfDish = getNames.bind(foodObject, ["This is so Tasty!!"]);
console.log(getNameOfDish("This is Gol-Gappa"));

//Similar issues faced by bind method in case of arrow functions see call method

//-----Polyfill-----
if (!Function.prototype.myBind) {
  Function.prototype.myBind = function (context, args) {
    // The reason for combining arguments in the myBind function is to allow the function to accept and use arguments that are passed in at two different times:

    // When the function is bound: These are the arguments that are passed in when you call myBind. They are captured and stored in the args variable.
    // When the bound function is called: These are the additional arguments that are passed in when you call the new function that was returned by myBind. They are captured and stored in the arguments object inside the new function.
    var allArgumnets = args;
    context.fn = this;
    return function (...argsOfFunctionCalled) {
      allArgumnets = [...allArgumnets, ...argsOfFunctionCalled];
      return context.fn(...allArgumnets);
    };
  };
}

//-----Polyfill Implementation-----
const foodObject2 = {
  name: "Gulab Jamun",
  price: 25,
  getName: function () {
    console.log(this);
    return this.name;
  },
};
console.log(foodObject2.getName());
function getNames2(quote, quote2) {
  console.log(quote, quote2);
  return this.getName();
}
const getNameOfDishNew = getNames2.myBind(foodObject2, [
  "This is sooooo Tasty!!",
]);
console.log(getNameOfDishNew("This is Gulab Jamun"));
