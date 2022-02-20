"use strict";

// Fetching JSON data

fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((jsonResult) => (jsonData = jsonResult))
  .catch((err) => new Error(console.log(err)));

// Variables
let jsonData;
const bottomSection = document.querySelector(".bottom-section");
const bottomSectionChildrens = [...bottomSection.children];

// Functions

// Events
// Switching active states of the bottom-section

bottomSectionChildrens.forEach((el) => {
  el.addEventListener("click", () => {
    bottomSectionChildrens.forEach((el) => {
      el.classList.remove("update-text-color");
    });

    el.classList.toggle("update-text-color");

    console.log(el);
  });
});

// for (let i = 0; i < bottomSectionChildrens.length; i++) {
//   bottomSectionChildrens[i].addEventListener("click", (el) => {
//     bottomSectionChildrens.forEach((el) => {
//       el.target
//     });
//     el.target.classList.toggle("update-text-color");
//   });
// }
