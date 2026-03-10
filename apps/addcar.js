let addCarBtn = document.querySelector(`#addCarBtn`);
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




addCarBtn.addEventListener("click", function () {
let brand = document.querySelector(`#brand`).value;
let model = document.querySelector(`#model`).value;
let year = document.querySelector(`#year`).value;
let price = document.querySelector(`#price`).value;
let capacity = document.querySelector(`#capacity`).value;
let transmission = document.querySelector(`#transmission`).value;
let createdBy = document.querySelector(`#createdBy`).value;
let city = document.querySelector(`#city`).value;
let createdByEmail = document.querySelector(`#createdByEmail`).value;
let fuelCapacity = document.querySelector(`#fuelCapacity`).value;
let latitude = document.querySelector(`#latitude`).value;
let longitude = document.querySelector(`#longitude`).value;



fetch(`https://rentcar.stepprojects.ge/api/Car`, {
    method: "POST",
    headers : {
        "Content-Type": "application/json"
    },
    body : JSON.stringify({
    brand : brand,
    model : model,
    year : year,
    price : price,
    capacity : capacity,
    transmission : transmission,
    createdBy : createdBy,
    city : city,
    createdByEmail : createdByEmail,
    fuelCapacity : fuelCapacity,
    latitude : latitude,
    longitude : longitude

})


})
.then(resp => resp.json())
.then(data => {
    showAlert(`Car Added`)
    setTimeout (() => {
    window.location.href = `../index.html`
},1000)
    
})
.catch(err => console.log(err))
showAlert(`Something went wrong!`,`error`)
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