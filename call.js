/*-----Polyfill for call function of JavaScript-----*/

// -----Explanation-----
//call function in JavaScript is a method of Function instances , calls this function with a given this value and arguments provided individually

// -----Real Implementation-----

// "-----Function Instances-----"

/* In JavaScript, you can use the new keyword to create an instance of a constructor function. When you call a function with new, it performs the following steps:

    Creates a New Object:
        A new empty object is created.
        This object becomes the context (this) for the function.
    Invokes the Function:
        The function is called with the newly created object as its context (this).
        Any parameters passed to the function are used to initialize properties of the object.
    Returns the Object:
        If the function does not explicitly return an object, the newly created object is returned.
        If the function returns an object, that object is returned instead.
*/
console.log("-----Function Instances-----");
function Product(name, price) {
  console.log(this, "Value of this");
  //when we call a function without call method the this of this function points to the Global object ie ie Window object.
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  console.log(this, "Value of this inside Food Function");
  // here this will point to the object of Food constructor
  // a function inside of function will point to 'this' of Parent function -> Lexical Scoping
  Product.call(this, name, price);
  this.category = "food";
}
console.log(new Food("Samosa", 12));

// -----Problem with arrow functions-----
// Problem : Arrow functions are powerful for maintaining the lexical context but do not allow explicit rebinding of this

console.log("-----Arrow Function Instances-----");
const ProductArrow = (name, price) => {
  this.name = name;
  this.price = price;
  // arrow functions inherit this from their parent scope (which is the global scope in this case).
  // this is pointing to the global / empty object always irrespective of call function binding
  console.log(this, "Value of this inside Product Arrow Function");
};

const FoodArrow = (name, price) => {
  // this is pointing to the global / empty object always irrespective of call function binding
  console.log(this, "Value of this inside Food Arrow Function");
  // ProductArrow is also an arrow function, it inherits the global this context.
  ProductArrow.call(this, name, price);
  this.category = "food";
};

const foodObj = { type: "Indian" };
// we cannot create a constructor for an arrow function

FoodArrow("Samosa", 12);
//Tried binding foodObj to FoodArrow but didnt got the o/p similar to Function instances
FoodArrow.call(foodObj, "Samosa", 12);

// The reason is that arrow functions do not allow you to change their this context using methods like call, apply, or bind.
// The call method has no effect on arrow functions; they always use the lexical this.

console.log(
  this.name,
  this.category,
  this.type,
  foodObj,
  "This -> type is empty ie its not binded when i used call on foodObj, but always binding to global object hence getting name and price"
);

//-----Polyfill-----
if (!Function.prototype.myCall) {
  Function.prototype.myCall = function (context, ...args) {
    //context can be empty too so if not provided point it to window object
    context = context || window;
    // Temporarily attach the function to the context object
    context.fn = this;
    var result = context.fn(...args);
    // Remove the function from the context object
    delete context.fn;
    return result;
  };
}

//-----Polyfill Implementation-----
const foodObject = { name: "Gol-Gappa", price: 20, type: "North Indian" };

function FoodName(quote) {
  console.log(this.name, quote);
}
FoodName.myCall(foodObject, "Yummmm!!!");
