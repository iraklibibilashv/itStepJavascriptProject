let id = window.location.search.split("=")[1]
let main = document.querySelector(`main`)
let user = { phoneNumber: localStorage.getItem("phoneNumber") }
let carPrice = 0
let carInfo = document.querySelector(`#carInfo`)
let multiplier = document.querySelector(`#multiplier`)
let purchaseBtn = document.querySelector(`#purchaseBtn`)
let token = localStorage.getItem("token");
let register = document.querySelector(`#register`);
let logIn = document.querySelector(`#logIn`);
let addCar = document.querySelector(`#addCar`);
let myCars = document.querySelector(`#myCars`);
let logout = document.querySelector(`#logOut`);
let myAccount = document.querySelector(`#myAccount`)
if(logout) {
  logout.addEventListener("click", () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    window.location.href = "../index.html"
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





if(!user.phoneNumber) {
    showAlert(`Please Log In`,`error`)
    setTimeout(() => {
        window.location.href = `./login.html`
    }, 1000);
    
}
loader.style.display = "flex"
fetch(`https://rentcar.stepprojects.ge/api/Car/${id}`)
  .then(resp => resp.json())
  .then(data => {
    loader.style.display = "none"
    carPrice = data.price
    main.innerHTML = createCard(data)
    updateTotal()

    document.querySelector(`#multiplier`).addEventListener(`input`, () => {
      updateTotal()
    })

    document.querySelector(`#purchaseBtn`).addEventListener(`click`, () => {
      let days = document.querySelector(`#multiplier`).value

      if (!days || days < 1) {
        showAlert(`Please enter number of days!`, `error`)
        return
      }

      fetch(`https://rentcar.stepprojects.ge/Purchase/purchase?phoneNumber=${user.phoneNumber}&carId=${id}&multiplier=${days}`, {
        method: `POST`
      })
      .then(resp => resp.json())
      .then(data => {
        showAlert(`Car Rented Successfully! Total: $${carPrice * days}`)
        setTimeout(() => {
          window.location.href = `../index.html`
        }, 1000)
      })
      .catch(err => {
        showAlert(`Something went wrong!`, `error`)
      })
    })
  })

function updateTotal() {
  let days = document.querySelector(`#multiplier`).value || 1
  document.querySelector(`#totalPrice`).innerText = `Total: $${carPrice * days}`
}


function createCard(obj) {
  return `<div class="car-card">
    <div class="car-image-wrap">
      <img src="${obj.imageUrl1 || obj.imageUrl2 || obj.imageUrl3 || 'placeholder.jpg'}" alt="${obj.brand || ''}" />
      <span class="car-badge">${obj.city || 'უცნობი'}</span>
    </div>
    <div class="car-info">
      <div class="car-name">${obj.brand || ''} ${obj.model || ''}</div>
      <div class="car-title">${obj.year || ''}</div>
      <div class="car-specs">
        <div class="spec"><span>⛽</span> ${obj.fuelCapacity || 0}L</div>
        <div class="spec"><span>⚙️</span> ${obj.transmission || 'უცნობი'}</div>
        <div class="spec"><span>👥</span> ${obj.capacity || 0} Seats</div>
      </div>
      <div class="car-footer">
        <div class="car-price">$${obj.price} <small>/ day</small></div>
      </div>
      <input id="multiplier" type="number" min="1" value="1" placeholder="Days" />
      <div id="totalPrice" class="total-price"></div>
      <button id="purchaseBtn" class="rent-btn" style="width:100%; margin-top:10px">Confirm Rent</button>
    </div>
  </div>`
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