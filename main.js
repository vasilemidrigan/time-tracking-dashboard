"use strict";
// Variables
const bottomSection = document.querySelector(".bottom-section");
const bottomSectionChildrens = [...bottomSection.children];
// Activities
const work = document.querySelector(".work");
const play = document.querySelector(".play");
const study = document.querySelector(".study");
const exercise = document.querySelector(".exercise");
const social = document.querySelector(".social");
const selfCare = document.querySelector(".self-care");
const activities = [work, play, study, exercise, social, selfCare];
// Current and Previous Hours
let currentHours = document.querySelectorAll(".time-dedication");
let previousText = document.querySelectorAll(".previous__text");
// for JSON extracting data
let jsonData;
let daily = [];
let weekly = [];
let monthly = [];

// Fetching JSON object
fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((jsonResult) => (jsonData = jsonResult))
  .catch((err) => new Error(console.log(err)));

// In order to work with .json object, we're running this code below
//   after 1,5s, at this time it will be already fetched.
setTimeout(() => {
  // Extracting daily, weekly and monthly hours from .json
  jsonData.forEach((el) => {
    daily.push(el.timeframes.daily);
    weekly.push(el.timeframes.weekly);
    monthly.push(el.timeframes.monthly);
  });

  // Update Activity Cards Content
  function updateActivity(activity) {
    // Daily Hours
    if (activity === "Daily") {
      for (let i = 0; i < currentHours.length; i++) {
        // Updating current hours data - daily
        currentHours[i].textContent = daily[i].current;
        if (currentHours[i].textContent == 1) {
          currentHours[i].textContent += " hr";
        } else {
          currentHours[i].textContent += " hrs";
        }
        // Update previous hours data - daily
        previousText[i].textContent = daily[i].previous;
        if (previousText[i].textContent == 1) {
          previousText[i].textContent = `Yesterday - ${daily[i].previous}hr`;
        } else {
          previousText[i].textContent = `Yesterday - ${daily[i].previous}hrs`;
        }
      }
      // Weekly Hours
    } else if (activity === "Weekly") {
      for (let i = 0; i < currentHours.length; i++) {
        // Update current hours data - weekly
        currentHours[i].textContent = weekly[i].current;
        if (currentHours[i].textContent == 1) {
          currentHours[i].textContent += " hr";
        } else {
          currentHours[i].textContent += " hrs";
        }
        // Update previous hours data - weekly
        previousText[i].textContent = weekly[i].previous;
        previousText[i].textContent = daily[i].previous;
        if (previousText[i].textContent == 1) {
          previousText[i].textContent = `Last Week - ${weekly[i].previous}hr`;
        } else {
          previousText[i].textContent = `Last Week - ${weekly[i].previous}hrs`;
        }
      }
      // Monthly hours
    } else {
      for (let i = 0; i < currentHours.length; i++) {
        // Update current hours data - monthly
        currentHours[i].textContent = monthly[i].current;
        if (currentHours[i].textContent == 1) {
          currentHours[i].textContent += " hr";
        } else {
          currentHours[i].textContent += " hrs";
        }
        // Update previous hours data - monthly
        previousText[i].textContent = monthly[i].previous;
        if (previousText[i].textContent == 1) {
          previousText[i].textContent = `Last Month - ${monthly[i].previous}hr`;
        } else {
          previousText[
            i
          ].textContent = `Last Month - ${monthly[i].previous}hrs`;
        }
      }
    }
  }
  // Switch data event
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
}, 1100);
