let phoneNumber = localStorage.getItem("phoneNumber")
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





if (!phoneNumber) {
    showAlert(`Please Log In`,`error`)
    window.location.href = `./login.html`
}

// პროფილი
fetch(`https://rentcar.stepprojects.ge/api/Users/${phoneNumber}`)
    .then(resp => resp.json())
    .then(data => {
        document.querySelector(`#userInfo`).innerHTML = `
            <div class="user-info">
                <div class="user-row"><span>👤 Name:</span> ${data.firstName || ''} ${data.lastName || ''}</div>
                <div class="user-row"><span>📧 Email:</span> ${data.email || ''}</div>
                <div class="user-row"><span>📞 Phone:</span> ${data.phoneNumber || ''}</div>
            </div>
        `
    })

// Messages dropdown toggle
document.querySelector(`#messagesToggle`).addEventListener(`click`, () => {
    document.querySelector(`#messagesDropdown`).classList.toggle(`hidden`)
})

// Inbox
document.querySelector(`#inboxBtn`).addEventListener(`click`, () => {
    document.querySelector(`#inboxSection`).classList.toggle(`hidden`)
    document.querySelector(`#newMessageSection`).classList.add(`hidden`)

    fetch(`https://rentcar.stepprojects.ge/Message/Messages?phoneNumber=${phoneNumber}`)
        .then(resp => resp.json())
        .then(data => {
            let list = document.querySelector(`#messagesList`)
            if (data.length === 0) {
                list.innerHTML = `<p style="color:#888">No Messages</p>`
                return
            }
            list.innerHTML = ``
            data.forEach(msg => {
                let div = document.createElement(`div`)
                div.className = `message-item`
                div.textContent = msg
                list.appendChild(div)
            })
        })
})

// New Message
document.querySelector(`#newMessageBtn`).addEventListener(`click`, () => {
    document.querySelector(`#newMessageSection`).classList.toggle(`hidden`)
    document.querySelector(`#inboxSection`).classList.add(`hidden`)
})

document.querySelector(`#sendMessageBtn`).addEventListener(`click`, () => {
    let carId = document.querySelector(`#msgCarId`).value

    if (!carId) {
        showAlert(`Please enter Car ID!`,`error`)
        return
    }

    fetch(`https://rentcar.stepprojects.ge/Message/Message?phoneNumber=${phoneNumber}&CarId=${carId}`, {
        method: `POST`
    })
    .then(resp => resp.json())
    .then(data => {
        showAlert(`Message Sent!`)
        document.querySelector(`#msgCarId`).value = ``
        document.querySelector(`#newMessageSection`).classList.add(`hidden`)
    })
})


fetch(`https://rentcar.stepprojects.ge/Purchase/${phoneNumber}`)
  .then(resp => resp.json())
  .then(data => {
    let rentals = document.querySelector(`#rentalsList`)
    if (data.length === 0) {
      rentals.innerHTML = `<p style="color:#888">No Rentals Yet</p>`
      return
    }
    data.forEach(obj => {
      let div = document.createElement(`div`)
      div.className = `rental-item`
      div.innerHTML = `
        <div class="rental-info">
          <div class="rental-name">🚗 ${obj.carBrand} ${obj.carModel}</div>
          <div class="rental-detail"><span>📍</span> ${obj.city}</div>
          <div class="rental-detail"><span>📅</span> ${obj.multiplier} Days</div>
          <div class="rental-detail"><span>💵</span> $${obj.pricePaid} Total</div>
        </div>
      `
      rentals.appendChild(div)
    })
  })




 document.querySelector(`#sendMessageBtn`).addEventListener(`click`, () => {
    let carId = document.querySelector(`#msgCarId`).value
    let msgPhone = document.querySelector(`#msgPhoneNumber`).value

    if (!carId || !msgPhone) {
        showAlert(`Please fill all fields!`, `error`)
        return
    }

    fetch(`https://rentcar.stepprojects.ge/Message/Message?phoneNumber=${msgPhone}&CarId=${carId}`, {
        method: `POST`
    })
    .then(resp => resp.json())
    .then(data => {
        showAlert(`Message Sent!`)
        document.querySelector(`#msgCarId`).value = ``
        document.querySelector(`#msgPhoneNumber`).value = ``
        document.querySelector(`#newMessageSection`).classList.add(`hidden`)
    })
})



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