let main = document.querySelector(`#main`);
let id = window.location.search.split("=")[1]
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

loader.style.display = "flex"
fetch(`https://rentcar.stepprojects.ge/api/Car/${id}`)
.then(resp => resp.json())
.then(data => {
   loader.style.display = "none"
    let card = document.createElement(`div`)
    card.innerHTML = createCard(data)
    main.appendChild(card)
    let rentBtn = card.querySelector(`.rent-btn`)
    rentBtn.addEventListener("click", () => {
  window.location.href = `./purchase.html?id=${data.id}`
})


})





function createCard(obj) {
  return `<div class="car-card">
    <div class="car-image-wrap">
      <img src="${obj.imageUrl3 || 'placeholder.jpg'}" alt="${obj.brand || ''}" />
      <span class="car-badge">${obj.city || 'უცნობი'}</span>
    </div>
    <div class="car-info">
      <div class="car-name">${obj.brand || 'უცნობი'} ${obj.model || ''}</div>
      <div class="car-title">${obj.year || ''}</div>
      <div class="car-title">${obj.latitude || ''}</div>
      <div class="car-title">${obj.longitude || ''}</div>
      <div class="car-title">${obj.createdBy || ''}</div>
      <div class="car-specs">
        <div class="spec"><span>⛽</span> ${obj.fuelCapacity || 0}L</div>
        <div class="spec"><span>⚙️</span> ${obj.transmission || 'უცნობი'}</div>
        <div class="spec"><span>👥</span> ${obj.capacity || 0} Seats</div>
      </div>
      <div class="car-footer">
        <div class="car-price">
          $${obj.price || 0} <small>/ day</small>
        </div>
        <button class="rent-btn">Rent Now</button>
      </div>
    </div>
  </div>`

}