console.log("script check");

async function getStuff() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const json = await response.json();
  return json;
}
getStuff();

async function displayLists() {
  const data = await getStuff();
  const ul = document.getElementById("todoList");
  const h1 = document.querySelector("h1");
  for (let i = 0; i < data.length; i++) {
    const li = document.createElement("li");
    li.textContent = data[i].title;
    li.addEventListener("click", () => li.classList.toggle("done"));
    li.addEventListener(
      "mouseover",
      () => (h1.textContent = `${data[i].title}`)
    );
    li.addEventListener(
      "mouseout",
      () => (h1.textContent = `Awesome To Do list`)
    );
    if (data[i].completed === true) {
      li.classList.add("done");
    }
    li.classList.add(`u${data[i].userId}`);
    ul.appendChild(li);
  }
}
const checkboxes = document.querySelectorAll("input");
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", cBoxFunction);
}
let array = [];
function cBoxFunction() {
  for (let i = 0; i < checkboxes.length; i++) {
    array = document.getElementsByClassName(`u${i + 1}`);
    if (checkboxes[i].checked === true) {
      for (let x = 0; x < array.length; x++) {
        array[x].style.display = "list-item";
      }
    } else if (checkboxes[i].checked === false) {
      for (let x = 0; x < array.length; x++) {
        array[x].style.display = "none";
      }
    }
  }
}

const declineButton = document.getElementById("decline");
const acceptButton = document.getElementById("accept");
const cookieNotice = document.getElementById("cookie-notice");
declineButton.addEventListener("click", () => {
  console.log("Declined!");
  cookieNotice.style.display = "none";
  document.cookie = "cookiesAccepted=false";
  console.log(document.cookie);
});

acceptButton.addEventListener("click", () => {
  console.log("allowed");
  document.cookie = "cookiesAccepted=true";
  cookieNotice.style.display = "none";
  console.log(document.cookie);
});

const cookiesAccepted = document.cookie.includes("cookiesAccepted=true");
if (!cookiesAccepted) {
  cookieNotice.style.display = "block";
}
if (cookiesAccepted) {
  cookieNotice.style.display = "none";
}

const LDBtn = document.getElementById("toggleThemeButton");
const ldTXT = document.getElementById("l-d-txt");
const r = document.querySelector(":root");
function setColors() {
  let LDstatus = document.cookie
    .split(";")
    .some((item) => item.includes("lightMode=false"));
  switch (LDstatus) {
    case true:
      r.style.setProperty("--colour1", "#d8e2dc");
      r.style.setProperty("--colour2", "#ffe5d9");
      r.style.setProperty("--colour3", "#ffcad4");
      r.style.setProperty("--colour4", "#d8e2dc");
      r.style.setProperty("--colour5", "#f4acb7");
      r.style.setProperty("--text-colour", "#000000");
      break;
    case false:
      r.style.setProperty("--colour1", "#040506");
      r.style.setProperty("--colour2", "#0a0d10");
      r.style.setProperty("--colour3", "#23455b");
      r.style.setProperty("--colour4", "#162129");
      r.style.setProperty("--colour5", "#223440");
      r.style.setProperty("--text-colour", "#ffffff");
      break;
  }
}

LDBtn.addEventListener("click", () => {
  let LDstatus = document.cookie
    .split(";")
    .some((item) => item.includes("lightMode=false"));
  if (LDstatus) {
    document.cookie = "lightMode = true";
    ldTXT.textContent = "Light Mode";
  } else if (!LDstatus) {
    document.cookie = "lightMode = false";
    ldTXT.textContent = "Dark Mode";
  }
  setColors();
});

displayLists();
setColors();
