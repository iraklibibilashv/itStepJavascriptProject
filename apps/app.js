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
let carId = document.querySelector(`#carId`)
let pageIndex = 1;
let pageSize = 10;
let token = localStorage.getItem("token");
let register = document.querySelector(`#register`);
let logIn = document.querySelector(`#logIn`);
let addCar = document.querySelector(`#addCar`);
let myCars = document.querySelector(`#myCars`);
let logout = document.querySelector(`#logOut`);


// 598777777 
// 1234

if(logout) {
  logout.addEventListener("click", () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    window.location.reload
  })
}

if(token) {
  register.style.display = "none"
  logIn.style.display = "none"
} else {
  addCar.style.display = "none"
  myCars.style.display = "none"
  favourites.style.display = "none"
  logout.style.display = "none"
}



fetch(`https://rentcar.stepprojects.ge/api/Car`)
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((product) => {
      let card = document.createElement(`div`);
      card.innerHTML = createCard(product);
      main.appendChild(card);
      card.addEventListener("click", () => {
        window.location.href = `./templates/details.html?id=${product.id}`;
      });
    });
  });

filterBtn.addEventListener("click", () => {
  if(carId.value.trim()) {
  fetch(`https://rentcar.stepprojects.ge/api/Car/${carId.value}`)
  .then(resp => resp.json())
  .then(data => {
    main.innerHTML = ``
    popularGrid.innerHTML = ``
    let card = document.createElement(`div`)
    card.innerHTML = createCard(data)
    main.appendChild(card)
    card.addEventListener("click", () => {
      window.location.href =`./templates/details.html?id=${data.id}`
    })
  })
  return
  }

  fetch( `https://rentcar.stepprojects.ge/api/Car/filter?capacity=${capacity.value}&startYear=${startYear.value}&endYear=${endYear.value}&city=${city.value}&pageIndex=1&pageSize=10`,)
    .then((resp) => resp.json())
    .then((data) => {
      main.innerHTML = ``;
      data.data.forEach((product) => {
        let card = document.createElement(`div`);
        card.innerHTML = createCard(product);
        main.appendChild(card);

        card.addEventListener("click", () => {
          window.location.href = `./templates/details.html?id=${product.id}`;
        });
      });
    });
});


fetch(`https://rentcar.stepprojects.ge/api/Car/popular`)
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((product) => {
      let car = document.createElement(`div`);
      car.innerHTML = createCard(product);
      popularGrid.appendChild(car);
      car.addEventListener(`click`, () => {
        window.location.href = `./templates/details.html?id=${product.id}`;
      });
    });
  });


fetch(`https://rentcar.stepprojects.ge/api/Car/cities`)
.then(resp => resp.json())
.then (data => {
  let select = document.querySelector(`#city`)
  data.forEach(cities => {
    let option = document.createElement(`option`)
    option.value = cities
    option.innerText = cities
    select.appendChild(option)
  })
})



function createCard(obj) {
  let phoneNumber = JSON.parse(localStorage.getItem(`phoneNumber`))
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
