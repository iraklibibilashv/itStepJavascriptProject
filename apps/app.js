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
let pageSize = 16;
let token = localStorage.getItem("token");
let register = document.querySelector(`#register`);
let logIn = document.querySelector(`#logIn`);
let addCar = document.querySelector(`#addCar`);
let myCars = document.querySelector(`#myCars`);
let logout = document.querySelector(`#logOut`);
let myAccount = document.querySelector(`#myAccount`)
let pageInfo = document.querySelector(`#pageInfo`);
let prevBtn = document.querySelector(`#prevBtn`);
let nextBtn = document.querySelector(`#nextBtn`);
let loader = document.querySelector("#loader");


// 598777777 
// 1234

if(logout) {
  logout.addEventListener("click", () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    window.location.reload()
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
  myAccount.style.display = "none"
}


// ფავორიტებში დამატება
function addFavListener(card,obj) {
  let btn = card.querySelector(`.fav-btn`)
  if(!btn) return
  let isFav = false

  btn.addEventListener("click", (e) => {
    e.stopPropagation()
    e.preventDefault()
    let phoneNumber = localStorage.getItem("phoneNumber")
    if(!isFav) {
      fetch(`https://rentcar.stepprojects.ge/api/Users/${phoneNumber}/favorites/${obj.id}`,{
      method:"POST"
      })
      .then(() => {
        isFav = true
        btn.innerText = "❤️"
        btn.style.color = "#e63946"
        showAlert(`Added to Favourites`)
      })
    }
    else {
      isFav = false
      btn.innerText = "🤍"
      e.target.style.background = `rgba(0,0,0,0.5)`
      showAlert(`Removed from Favourites`, `error`)
    }
  })
}

// ყველა მანქანა index.html ზე
function pageCars() {
  fetch(
    `https://rentcar.stepprojects.ge/api/Car/paginated?pageIndex=${pageIndex}&pageSize=${pageSize}`)
    .then(resp => resp.json())
    .then(data => {
      main.innerHTML = ``
      data.data.forEach((product) => {
        if(!product.imageUrl3) return
        let card = document.createElement(`div`)
        card.innerHTML = createCard(product)
        main.appendChild(card)
        addFavListener(card, product)
        card.addEventListener("click", () => {
          window.location.href = `./templates/details.html?id=${product.id}`;
        })
      })
      pageInfo.innerText = `Page ${data.currentPage} / ${data.totalPages}`
      prevBtn.disabled = pageIndex == 1
      nextBtn.disabled = pageIndex == data.totalPages
    })
  
}
prevBtn.addEventListener("click",() => {
  pageIndex--
  pageCars()
  window.scrollTo({
    top: 0,
    behavior : "smooth"
  })
})
nextBtn.addEventListener("click", () => {
  pageIndex++
  pageCars()
  window.scrollTo({
    top: 0,
    behavior : "smooth"
  })
})
pageCars()

// ფილტრის CarID

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
    addFavListener(card,data)
    card.addEventListener("click", () => {
      window.location.href =`./templates/details.html?id=${data.id}`
    })
  })
  return
  }
// მთლიანი ფილტრი
  fetch( `https://rentcar.stepprojects.ge/api/Car/filter?capacity=${capacity.value}&startYear=${startYear.value}&endYear=${endYear.value}&city=${city.value}&pageIndex=1&pageSize=10`,)
    .then((resp) => resp.json())
    .then((data) => {
      main.innerHTML = ``;
      data.data.forEach((product) => {
         if(!product.imageUrl3) return
        let card = document.createElement(`div`);
        card.innerHTML = createCard(product);
        main.appendChild(card);
        addFavListener(card,product)

        card.addEventListener("click", () => {
          window.location.href = `./templates/details.html?id=${product.id}`;
        });
      });
    });
});
// პოპულარული მანქანები
loader.style.display = "flex"
fetch(`https://rentcar.stepprojects.ge/api/Car/popular`)
  .then((resp) => resp.json())
  .then((data) => {
    loader.style.display = "none"
    data.forEach((product) => {
        if(!product.imageUrl3) return
      let car = document.createElement(`div`);
      car.innerHTML = createCard(product);
      popularGrid.appendChild(car);
      addFavListener(car, product)
      car.addEventListener(`click`, () => {
        window.location.href = `./templates/details.html?id=${product.id}`;
      });
    });
  });

// ქალაქების dropdown
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


// car რენდერი
function createCard(obj) {
  let phoneNumber = JSON.parse(localStorage.getItem(`phoneNumber`))
  let token = localStorage.getItem("token")
  return `<div class="car-card">
    <div class="car-image-wrap">
      <img src="${obj.imageUrl3 || "placeholder.jpg"}" alt="${obj.brand || ""}" />
      <span class="car-badge">${obj.city || "უცნობი"}</span>
       ${token ? `<button class="fav-btn" data-id="${obj.id}">🤍</button>` : ``}
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
      </div>
    </div>
  </div>`;
}




function showAlert(message, type = `success`) {
  let alert = document.createElement(`div`)
  alert.className = `custom-alert ${type}`
  alert.innerHTML = `
    <span>${type === `success` ? `✅` : `❌`}</span>
    <p>${message}</p>
    <button class="alert-close">✕</button>
  `
  document.body.appendChild(alert)

  alert.querySelector(`.alert-close`).addEventListener(`click`, () => {
    alert.remove()
  })

  setTimeout(() => {
    alert.remove()
  }, 2000)
}