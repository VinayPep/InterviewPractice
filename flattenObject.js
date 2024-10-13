//Flatten array is to make a deeply nested object in a regular object with single level of keys
//Draw recursive tree for clear understanding

const obj = {
  a: 1,
  b: 2,
  c: {
    d: {
      e: 3,
      f: {
        g: {
          h: 4,
          i: 5,
          j: {
            k: {
              m: 6,
            },
          },
        },
      },
    },
  },
  n: 7,
  o: 8,
  p: {
    q: {
      r: 9,
    },
    s: {
      t: 10,
      u: 11,
      v: 12,
    },
    w: 13,
    x: 14,
  },
  y: 15,
  z: [16, 17, 18],
};

function flattenObject(obj, parent = "") {
  const finalObject = {};
  function generateFlatObject(obj, parent) {
    for (let key in obj) {
      const newParent = parent + key;
      const value = obj[key];
      if (typeof value === "object") {
        generateFlatObject(value, newParent + ".");
      } else {
        finalObject[newParent] = value;
      }
    }
  }
  generateFlatObject(obj, parent);
  return finalObject;
}
console.log(flattenObject(obj, ""));

//Simple one
function flattenObject2(obj, prefix = "", res = {}) {
  for (let key in obj) {
    let value = obj[key];
    let newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenObject2(value, newKey, res);
    } else {
      res[newKey] = value;
    }
  }
  return res;
}

let obj2 = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};

console.log(flattenObject2(obj2));
