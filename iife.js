const x = 2;
//named IIFE
(function dataBaseConnection() {
  console.log("DataBase connected");
})();

//unnamed IIFE
((name) => {
  console.log(name);
})("Vinay");

// import to end IIFE by ; very important

// resolves global scope poluution due to variables and function and thats why we use IIFE otherwise we can noramlly define a function and call it.

// An Immediately Invoked Function Expression (IIFE) is a way to execute a function immediately after it is created. Let’s explore the purpose and benefits of using IIFEs compared to regular function declarations:

// Encapsulation and Scope Isolation:
// IIFE: When you wrap a function in parentheses and invoke it immediately, you create a private scope for that function. Any variables or functions defined inside the IIFE are not accessible from outside, preventing global scope pollution.
// Regular Function: If you declare a function normally, it becomes part of the global scope. This can lead to accidental name collisions or overwriting existing functions or variables.
// Avoiding Name Collisions:
// IIFE: Consider a large codebase with multiple functions. Placing every function at the top level might lead to accidentally writing a function name twice, causing bugs due to name collisions.

// Code around validating user registration
function validate(username) {
  return /someValidationRegex/.test(username);
}

// Elsewhere in the code:
// Validate an input for sending to the server
function validate(input) {
  return /someOtherValidationRegex/.test(input);
}

//In this case, the last validate function overwrites the first one, causing unexpected behavior.
//IIFE Solution:

(() => {
  // Code around validating user registration
  function validate(username) {
    return /someValidationRegex/.test(username);
  }
  // Do stuff with validate
})();

(() => {
  // Code around validating an input for sending to the server
  function validate(input) {
    return /someOtherValidationRegex/.test(input);
  }
  // Do stuff with validate
})();

// Avoiding Window Property Collisions:
// IIFE: Sometimes, accidentally duplicating a window property can cause issues. For example:

// Accidentally overwriting window.name
var name = 5;
console.log(typeof name); // Prints "string" due to window.name

// IIFE Solution:

(() => {
  // Avoid window.name collision
  var name = 5;
  console.log(typeof name); // Prints "number"
})();

// IIFE: While IIFEs are useful, for larger codebases, consider using a module system (e.g., with Webpack). Modules encapsulate code, prevent leakage, and ensure better maintainability.
// In summary, IIFEs provide a way to create self-contained, isolated scopes for your functions, making your code more robust and organized. 😊
