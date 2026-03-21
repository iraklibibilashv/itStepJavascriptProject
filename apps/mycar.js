let phoneNumber = localStorage.getItem(`phoneNumber`)
let myCarGrid = document.querySelector(`#myCarGrid`)
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


if (!phoneNumber) {
    showAlert(`Please Log In!`)
    window.location.href = `./login.html`
}
loader.style.display = "flex"
fetch(`https://rentcar.stepprojects.ge/api/Car`)
    .then(resp => resp.json())
    .then(data => {
        loader.style.display = "none"
        if (data.length === 0) {
            myCarGrid.innerHTML = `
                <div class="empty-state">
                    <span>🚗</span>
                    <p>No Cars!</p>
                </div>`
            return
        }
        data.forEach(obj => {
              if(!obj.imageUrl3) return
            let car = document.createElement(`div`)
            car.innerHTML = createCard(obj)
            myCarGrid.appendChild(car)
            car.addEventListener(`click`, () => {
                window.location.href = `./details.html?id=${obj.id}`
            })
        })
    })

function createCard(obj) {
    return `<div class="car-card">
        <div class="car-image-wrap">
            <img src="${obj.imageUrl1 || obj.imageUrl2 || obj.imageUrl3 || 'placeholder.jpg'}" alt="${obj.brand || ''}" />
            <span class="car-badge">${obj.city || 'უცნობი'}</span>
        </div>
        <div class="car-info">
            <div class="car-name">${obj.brand || 'უცნობი'} ${obj.model || ''}</div>
            <div class="car-title">${obj.year || ''}</div>
            <div class="car-specs">
                <div class="spec"><span>⛽</span> ${obj.fuelCapacity || 0}L</div>
                <div class="spec"><span>⚙️</span> ${obj.transmission || 'უცნობი'}</div>
                <div class="spec"><span>👥</span> ${obj.capacity || 0} Seats</div>
            </div>
            <div class="car-footer">
                <div class="car-price">$${obj.price || 0} <small>/ day</small></div>
                <button class="rent-btn">View</button>
            </div>
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