console.log("JS Loaded");

const colourForm = document.getElementById("favColour");
const notBG = document.querySelector(".page-footer");

let travel = {};
function changeBG(colourParam) {
  notBG.style.background = colourParam;
}

function favColourSubmit(event) {
  console.log("submit");
  event.preventDefault();
  const colourFormData = new FormData(colourForm);
  const selectedColour = colourFormData.get("colour");
  localStorage.setItem("selectedFavColour", selectedColour);
  console.log(selectedColour);
  changeBG(selectedColour);
}
colourForm.addEventListener("submit", favColourSubmit);
function loadFavColour() {
  const localColour = localStorage.getItem("selectedFavColour");
  changeBG(localColour);
}
loadFavColour();

const prefForm = document.getElementById("prefForm");
const prefTxt = document.getElementById("prefTxt");
function travPrefSubmit(event) {
  event.preventDefault();
  const prefFormData = new FormData(prefForm);
  travel.age = prefFormData.get("age");
  travel.bike = prefFormData.get("pref1");
  travel.car = prefFormData.get("pref2");
  travel.bus = prefFormData.get("pref3");
  travel.levi = prefFormData.get("pref4");
  localStorage.setItem("travelPref", JSON.stringify(travel));
  console.log(travel);
}

function loadPreferences() {
  const preferences = JSON.parse(localStorage.getItem("travelPref"));
  console.log(preferences);
  console.log(preferences.age);

  prefTxt.textContent = `Age: ${preferences.age}, Cyclist: ${preferences.bike}, Motorist: ${preferences.car}, Pedestrian: ${preferences.bus}, Godlike: ${preferences.levi}`;
  agebox.setAttribute("value", preferences.age);
  bikebox.setAttribute("checked", preferences.bike);
  carbox.setAttribute("checked", preferences.car);
  busbox.setAttribute("checked", preferences.bus);
  levibox.setAttribute("checked", preferences.levi);
}
prefForm.addEventListener("submit", travPrefSubmit);
loadPreferences();

const controlForm = document.getElementById("controls");
function controlSubmit(event) {
  event.preventDefault();
  const controlData = new FormData(controlForm);
  const controlsVal = Object.fromEntries(controlData);
  localStorage.setItem("controlData", JSON.stringify(controlsVal));
}
function loadControls() {
  const controls = JSON.parse(localStorage.getItem("controlData"));
  if (controls.hide == "on") {
    colourForm.hidden = true;
    prefForm.hidden = true;
  } else if (controls.hide == "off" || controls.hide == null) {
    colourForm.hidden = false;
    prefForm.hidden = false;
  }
  if (controls.lock == "on") {
    body.querySelectorAll()
  } else if (controls.lock == "off" || controls.lock == null) {
    colourForm.readonly = false;
    prefForm.readonly = false;
  }
}
loadControls();
controlForm.addEventListener("submit", controlSubmit);
