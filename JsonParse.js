/*-----Polyfill for JSON parse function of JavaScript-----*/

// -----Explanation-----
// The JSON.parse() method in JavaScript is used to convert a JSON string into a JavaScript object or value. This method can be used with two parameters: text and reviver.
// text: The string to parse as JSON.
// reviver (Optional): A function that alters the behavior of the parsing process. If a function, this prescribes how each value originally produced by parsing is transformed before being returned.

// -----Real Implementation-----
const jsonString =
  '{"name":"John", "birth":"1985-12-05T10:15:30Z", "city":"New York"}';

const reviver = (key, value) => {
  if (key == "birth") {
    return new Date(value);
  } else {
    return value;
  }
};

const obj = JSON.parse(jsonString, reviver);

console.log(obj.name);
console.log(obj.birth);
console.log(obj.city);

//-----Polyfill-----
if (!window.JSON) {
  window.JSON = {};
}

if (!window.JSON.myParse) {
  window.JSON.myParse = function parse(jsonString) {
    return new Function("return " + jsonString)();
  };
}

/*
When you create a new function with the new Function constructor, the argument you pass is a string that forms the body of the function. In this case, the string is 'return ' + jsonString, which forms a JavaScript statement that returns the JSON string.

Now, here’s the key part: When this function is invoked, the JavaScript engine interprets the JSON string as JavaScript code and executes it. Because the JSON string is in the format of a JavaScript object literal (e.g., '{"name":"John"}'), the JavaScript engine interprets it as an object and returns that object.

So, in essence, the JSON string is being converted to a JavaScript object through the process of JavaScript interpretation. This is similar to how eval works, but it’s limited to a single JavaScript statement and doesn’t have access to local scope, which makes it a bit safer.

Here’s a step-by-step breakdown of what happens when you call JSON.parse(jsonString) with the polyfill:

1.The JSON string is inserted into a JavaScript return statement.
2.A new function is created with this return statement as its body.
3.This new function is immediately invoked.
4.The JavaScript engine interprets the return statement, which includes the JSON string.
5.Because the JSON string is in the format of an object literal, it’s interpreted as an object.
6.This object is returned by the function.
*/

//-----Polyfill Implementation-----
console.log(myParse(jsonString));
