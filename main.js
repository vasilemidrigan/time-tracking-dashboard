"use strict";
let jsonData;
// Fetching data from .json file
fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((jsonResult) => (jsonData = jsonResult))
  .catch((err) => new Error(console.log(err)));

setTimeout(() => {
  console.log(jsonData);
}, 1000);
