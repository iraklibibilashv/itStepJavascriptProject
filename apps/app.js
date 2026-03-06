let header = document.querySelector(`#header`);
let navbar = document.querySelector(`#navbar`);
let logo = document.querySelector(`#logo`);
let navLinks = document.querySelector(`#navLinks`);
let filters = document.querySelector(`#filters`);
let capacity = document.querySelector(`#capacity`);
let startYear = document.querySelector(`#startYear`);
let endYear = document.querySelector(`#endYear`);
let city = document.querySelector(`#city`);
let phone = document.querySelector(`#phone`);
let filterBtn = document.querySelector(`#filterBtn`);
let popularSection = document.querySelector(`#popularSection`);
let sectionTitle = document.querySelector(`#sectionTitle`);
let popularGrid = document.querySelector(`#popularGrid`);
let main = document.querySelector(`#main`);

fetch(`https://rentcar.stepprojects.ge/api/Car`)
.then(resp => resp.json())
.then(data => {
    data.forEach(product => {
        let card = document.createElement(`div`)
        card.innerHTML = createCard(product)
        main.appendChild(card)
        card.addEventListener("click", () => {
            window.location.href = `./templates/details.html`
        })
        
    });

})


function createCard(obj) {
    return `<div class="car-card">
    <div class="car-image-wrap">
      <img src="${obj.imageUrl3 || "placeholder.jpg"}" alt="${obj.brand || ""}" />
      <span class="car-badge">${obj.city || "უცნობი"}</span>
    </div>
    <div class="car-info">
      <div class="car-name">${obj.brand || "უცნობი"} ${obj.model || ""}</div>
      <div class="car-title">${obj.year || ""}</div>
      <div class="car-specs">
        <div class="spec"><span>⛽</span> ${obj.fuelCapacity || 0}L</div>
        <div class="spec"><span>⚙️</span> ${obj.transmission || "უცნობი"}</div>
        <div class="spec"><span>👥</span> ${obj.capacity || 0} Seats</div>
      </div>
      <div class="car-footer">
        <div class="car-price">
          $${obj.price || 0} <small>/ day</small>
        </div>
        <button class="rent-btn">Rent Now</button>
      </div>
    </div>
  </div>`;
}