"use strict";

// Variables
let jsonData;
const bottomSection = document.querySelector(".bottom-section");
const bottomSectionChildrens = [...bottomSection.children];

const work = document.querySelector(".work");
const play = document.querySelector(".play");
const study = document.querySelector(".study");
const exercise = document.querySelector(".exercise");
const social = document.querySelector(".social");
const selfCare = document.querySelector(".self-care");

const activities = [work, play, study, exercise, social, selfCare];
let currentHours = document.querySelectorAll(".time-dedication");
let previousText = document.querySelectorAll(".previous__text");

// Fetching JSON data

fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((jsonResult) => (jsonData = jsonResult))
  .catch((err) => new Error(console.log(err)));

setTimeout(() => {
  console.log(jsonData);
  // Extracting daily, weekly and monthly hours from .json
  let daily = [];
  let weekly = [];
  let monthly = [];
  jsonData.forEach((el) => {
    daily.push(el.timeframes.daily);
    weekly.push(el.timeframes.weekly);
    monthly.push(el.timeframes.monthly);
  });

  // Getting current hours data
  let currentHoursContent = Array.from(currentHours).map(
    (el) => el.textContent
  );

  //               CONSOLE LOG
  console.log("currentHoursContent:", currentHoursContent);

  // Update Activity Card Content
  function updateActivity(activity) {
    if (activity === "Weekly") {
      for (let i = 0; i < currentHoursContent.length; i++) {
        currentHours[i].textContent = weekly[i].current;
        previousText[i].textContent = weekly[i].previous;
      }
    } else if (activity === "Daily") {
      for (let i = 0; i < currentHoursContent.length; i++) {
        currentHours[i].textContent = daily[i].current;
        previousText[i].textContent = daily[i].previous;
      }
    } else {
      for (let i = 0; i < currentHoursContent.length; i++) {
        currentHours[i].textContent = monthly[i].current;
        previousText[i].textContent = monthly[i].previous;
      }
    }
  }

  // Events:

  // Switching active states of the bottom-section periods
  bottomSectionChildrens.forEach((el) => {
    el.addEventListener("click", () => {
      // Remove active state from previous element
      bottomSectionChildrens.forEach((el) => {
        el.classList.remove("update-text-color");
      });
      // And then add active state to the clicked element
      el.classList.add("update-text-color");
      // Update Acitivity Cards Content
      updateActivity(el.textContent);
    });
  });
}, 1000);
