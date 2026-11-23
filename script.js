
const themeBtn = document.getElementById("themeBtn");
function applyTheme(mode) {
  document.body.classList.toggle("dark", mode === "dark");
  themeBtn.textContent = mode === "dark" ? "Light mode" : "Dark mode";
}
applyTheme(localStorage.getItem("theme") || "light");
themeBtn.addEventListener("click", function () {
  const newMode = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", newMode);   // save
  applyTheme(newMode);
});


const destinations = [
  { name: "Maletsunyane Falls", cat: "Destination", img: "maletsunyane-falls.jpg", text: "A very tall waterfall near Semonkong, dropping into a deep gorge." },
  { name: "Katse Dam", cat: "Destination", img: "katse-dam.jpg", text: "A huge dam in the highlands with sweeping views over the water." },
  { name: "Kome Caves", cat: "Destination", img: "adventure.jpg", text: "Cave homes built into the rock, showing how families once lived." },
  { name: "Afriski", cat: "Activity", img: "afriski.jpg", text: "A mountain resort where you can ski and snowboard in winter." },
  { name: "Pony riding", cat: "Activity", img: "pony-riding.jpg", text: "Guided rides on Basotho ponies through mountain villages." },
  { name: "Semonkong Lodge", cat: "Accommodation", img: "semonkong-lodge.jpg", text: "A friendly lodge close to Maletsunyane Falls." },
  { name: "Sehlabathebe National Park", cat: "Destination", img: "sehlabathebe-park.jpg", text: "A remote park with quiet trails and interesting rock formations." },
  { name: "Thaba-Bosiu Cultural Village", cat: "Destination", img: "thaba-bosiu.jpg", text: "A cultural village near the historic mountain of King Moshoeshoe I." },
  { name: "Mokhotlong", cat: "Destination", img: "mokhotlong.jpg", text: "A highland town in the north-east, a gateway to high mountain scenery." },
  { name: "Morija Museum", cat: "Destination", img: "morija-museum.jpg", text: "A museum telling the story of the Basotho people and their history." },
  { name: "Mohale Dam", cat: "Destination", img: "mohale-dam.jpg", text: "A large dam surrounded by open mountain landscape." },
  { name: "Liphofung", cat: "Destination", img: "liphofung.jpg", text: "A cave cultural site with history, rock shelters and a visitor centre." }
];
const destList = document.getElementById("destList");
if (destList) {
  const searchBox = document.getElementById("searchBox");
  const catSelect = document.getElementById("catSelect");
  const noResults = document.getElementById("noResults");
  function showDestinations() {
    const word = searchBox.value.toLowerCase();
    const cat = catSelect.value;
    destList.innerHTML = "";                        
    const matches = destinations.filter(function (d) {
      const textMatch = (d.name + " " + d.text).toLowerCase().includes(word);
      return textMatch && (cat === "All" || d.cat === cat);
    });
    matches.forEach(function (d) {                 
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4";
      col.innerHTML = '<article class="card h-100 tour-card"><img src="images/' + d.img + '" class="card-img-top" alt="' + d.name + '">' +
        '<div class="card-body"><span class="badge text-bg-success mb-2">' + d.cat + '</span>' +
        '<h3 class="h5 card-title">' + d.name + '</h3><p class="card-text mb-0">' + d.text + '</p></div></article>';
      destList.appendChild(col);
    });
    noResults.classList.toggle("d-none", matches.length > 0);
  }
  searchBox.addEventListener("input", showDestinations);
  catSelect.addEventListener("change", showDestinations);
  showDestinations();
}
const calcForm = document.getElementById("calcForm");
if (calcForm) {
  calcForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const price = Number(document.getElementById("calcTour").value);
    const people = Number(document.getElementById("calcPeople").value);
    const days = Number(document.getElementById("calcDays").value);
    const result = document.getElementById("calcResult");
    if (!price || people < 1 || days < 1) { result.textContent = "Choose a tour first"; return; }
    result.textContent = "M" + (price * people * days).toLocaleString();
  });
}


const grid = document.getElementById("galleryGrid");
if (grid) {
  const items = Array.from(document.querySelectorAll(".gallery-item"));  
  const lightImg = document.getElementById("lightImg");
  const lightTitle = document.getElementById("lightTitle");
  const modal = new bootstrap.Modal(document.getElementById("lightbox"));
  let current = 0;                                   

  function showPhoto(pos) {
    current = (pos + items.length) % items.length;   
    const img = items[current].querySelector("img");
    lightImg.src = img.src; lightImg.alt = img.alt; lightTitle.textContent = img.alt;
  }
  items.forEach(function (item, index) {
    const img = item.querySelector("img");
    function open() { showPhoto(index); modal.show(); }
    img.addEventListener("click", open);
    img.addEventListener("keydown", function (e) { if (e.key === "Enter") open(); });
  });
  document.getElementById("nextImg").addEventListener("click", function () { showPhoto(current + 1); });
  document.getElementById("prevImg").addEventListener("click", function () { showPhoto(current - 1); });
}


function validateForm(form, extraChecks) {
  let ok = true;
  form.querySelectorAll("input, select, textarea").forEach(function (field) {
    let valid = field.checkValidity();               // HTML5 validation (required, type, min...)
    if (extraChecks && extraChecks[field.id]) valid = valid && extraChecks[field.id](field.value);
    field.classList.toggle("is-invalid", !valid);    // shows the red error message
    field.classList.toggle("is-valid", valid);
    if (!valid) ok = false;
  });
  return ok;
}
document.querySelectorAll("form.demo-form, #bookForm").forEach(function (form) {
  const checks = {
    cName: function (v) { return v.trim().length >= 2; },
    bName: function (v) { return v.trim().length >= 2; },
    cPhone: function (v) { return /^\+?[0-9 ]{8,15}$/.test(v.trim()); },
    bDate: function (v) { return v !== "" && new Date(v) > new Date(); }
  };
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const success = form.querySelector(".form-success");
    if (validateForm(form, checks)) {
      success.classList.remove("d-none");
     
      const nameField = form.querySelector("#cName, #bName");
      localStorage.setItem("username", nameField.value.trim());
      form.reset();
      form.querySelectorAll(".is-valid").forEach(function (f) { f.classList.remove("is-valid"); });
    } else {
      success.classList.add("d-none");
    }
  });
});


const welcomeBox = document.getElementById("welcomeBox");
if (welcomeBox) {
  const saved = localStorage.getItem("username"); 
  if (saved) {
    welcomeBox.innerHTML = '<div class="alert alert-success alert-dismissible" role="alert">Welcome back, ' +
      saved.replace(/</g, "&lt;") + '! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  }
}
