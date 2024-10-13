let count = 0;

const getData = () => {
  //calls api and get data on keyup
  var value = document.getElementById("input");
  console.log("Fetching Data ...", count++, "  =>", value.value);
};

const debounce = function (fn, delay) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, arguments);
    }, delay);
  };
};

//only call getData when two keypress events time is > 300 ms
const betterFunction = debounce(getData, 300);
