/*-----Polyfill for apply function of JavaScript-----*/

// -----Explanation-----
//apply function in JavaScript is a method of Function instances , calls this function with a given this value and arguments provided in an array

// -----Real Implementation-----
console.log("-----Function Instances-----");
function Product(name, price) {
  console.log(this, "Value of this");
  //when we call a function without apply method the this of this function points to the Global object ie ie Window object.
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  console.log(this, "Value of this inside Food Function");
  // here this will point to the object of Food constructor
  // a function inside of function will point to 'this' of Parent function -> Lexical Scoping
  Product.apply(this, [name, price]);
  this.category = "food";
}
console.log(new Food("Samosa", 12));

//Similar issues faced by apply methods in case of arrow functions see call method

//-----Polyfill-----
if (!Function.prototype.myApply) {
  Function.prototype.myApply = function (context, args) {
    context = context || window;
    context.fn = this;

    var result;
    if (!args) {
      result = context.fn();
    } else {
      /* The context parameter is used to specify the this value when calling context.fn. In other words, inside context.fn, this will refer to context.

            The reason we’re passing context as a parameter to the IIFE is so that we can use it inside the function. When we call context.fn(...arr), we’re calling the function that was temporarily attached to context (in the apply polyfill), with context as the this value and the elements of arr as the arguments.

            This allows us to use the apply method in environments where it’s not natively supported, by replicating its functionality: calling a function with a specified this value and arguments provided as an array. The IIFE is used to encapsulate this logic and immediately execute it, storing the result in the result variable.*/

      result = (function (context) {
        return context.fn(...args);
      })(context);
    }
    delete context.fn;
    return result;
  };
}

//-----Polyfill Implementation-----
const foodObject = { name: "Gol-Gappa", price: 20, type: "North Indian" };

function FoodName(quote, quote2) {
  console.log(this.name, quote + quote2);
}
FoodName.myApply(foodObject, ["Yummmm!!!", "This is so Tasty!"]);
