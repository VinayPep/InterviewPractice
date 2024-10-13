let obj = {
  name: "Peter",
};

//when we assign like this reference (for Objects) is copied not data so user will point to obj address
let user = obj; // object is copied by reference

//here Javascript doesnt pass it by reference but by value in case of primitive variables
let variableX = "Justin";
let variableY = variableX;
variableY = "Martin";
console.log(variableX, variableY);
user.name = "Bruce";
console.log(obj);

//Creating a copy of the object (Shallow Copy)
const user2 = Object.assign({}, obj);
user2.name = "Harley";
console.log(obj, user, user2);
//Shallow copy
const user3 = { ...obj };
console.log(user3);

let objAll = {
  name: "Kevin",
  address: {
    city: "Paris",
    state: "Paris State",
  },
  getData: function () {
    return this.name;
  },
};

const user4 = { ...objAll };
user4.address.city = "New York";
// here address is changed for objAll too
console.log(objAll, user4);
console.log(objAll.getData());

//shallow copy cpies on 1st level of object

//deepcopy -> keys with values function and dates are removed here use _cloneDeep in lodash for better deep copy
const user5 = JSON.parse(JSON.stringify(objAll));
user5.address.city = "Belgium City";
console.log(user5);

//polyfill for custom cloneDeep

function customCloneDeep(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj; // Base case: return primitive values or null
  }

  if (Array.isArray(obj)) {
    // Handle arrays
    const newArray = [];
    for (const item of obj) {
      newArray.push(customCloneDeep(item));
    }
    return newArray;
  }

  // Handle objects
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "function") {
        // If the value is a function, keep it as is
        newObj[key] = obj[key];
      } else {
        newObj[key] = customCloneDeep(obj[key]);
      }
    }
  }
  return newObj;
}

//polyfill implemtation
const originalObject = {
  x: 23,
  nested: {
    y: 42,
  },
  greet: function () {
    console.log("Hello from the original function!");
  },
};

const deepCopy = customCloneDeep(originalObject);

console.log("Comparing original with deep copy:");
console.log("Original:", originalObject);
console.log("Deep Copy:", deepCopy);
console.log("Are they equal?", originalObject === deepCopy);
deepCopy.greet();
