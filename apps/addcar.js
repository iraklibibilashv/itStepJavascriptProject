let addCarBtn = document.querySelector(`#addCarBtn`);

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
    console.log(data);
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