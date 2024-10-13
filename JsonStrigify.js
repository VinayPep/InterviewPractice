/*-----Polyfill for JSON stringify function of JavaScript-----*/

// -----Explanation-----
// The JSON.stringify() method in JavaScript is used to convert a JavaScript value into a JSON string. This method can be used with three parameters: value, replacer, and space.

// value: The value to convert to a JSON string.

// replacer (Optional): A function that alters the behavior of the stringification process, or an array of strings and numbers that specifies properties of value to be included in the output.

// space (Optional): A string or number that’s used to insert white space into the output JSON string for readability purposes.

// -----Real Implementation-----
console.log(JSON.stringify({ x: "Hero", y: "Not Hero", z: ["x", "y"] }));

//-----Polyfill-----
if (!window.JSON) {
  window.JSON = {};
}
if (!window.JSON.myStringify) {
  window.JSON.myStringify = function stringify(obj) {
    if (typeof obj === "number" || typeof obj === "boolean") {
      return obj.toString();
    }
    if (typeof obj === "string") {
      return '"' + obj + '"';
    }
    if (Array.isArray(obj)) {
      var arrayElements = obj.map(function (element) {
        return stringify(element);
      });
      return "[" + arrayElements.join(",") + "]";
    }
    if (typeof obj === "object" && obj !== null) {
      var objectElements = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          objectElements.push('"' + key + '":' + stringify(obj[key]));
        }
      }
      return "{" + objectElements.join(",") + "}";
    }
  };
}

//-----Polyfill Implementation-----
console.log(myStringify({ x: "Hero", y: "Not Hero", z: ["x", "y"] }));
