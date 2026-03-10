let id = window.location.search.split("=")[1]
let user = { phoneNumber: localStorage.getItem("phoneNumber") }
let carPrice = 0
let carInfo = document.querySelector(`#carInfo`)
let multiplier = document.querySelector(`#multiplier`)
let purchaseBtn = document.querySelector(`#purchaseBtn`)


if(!user.phoneNumber) {
    showAlert(`Please Log In`,`error`)
    setTimeout(() => {
        window.location.href = `./login.html`
    }, 1000);
    
}

fetch(`https://rentcar.stepprojects.ge/api/Car/${id}`)
.then(resp => resp.json())
.then(data => {
    carPrice = data.price
    carInfo.innerHTML = cardInfo(data)
updateTotal()
})

multiplier.addEventListener("input", () => {
    updateTotal()
})

function updateTotal() {
    let days = document.querySelector(`#multiplier`).value || 1
    document.querySelector(`#totalPrice`).innerText = `Total: $${carPrice * days}`
    
}


purchaseBtn.addEventListener("click", () => {
    let days = multiplier.value

    if(!days || days < 1) {
        showAlert(`Please enter number of days!`,`error`)
        return
    }

    fetch(`https://rentcar.stepprojects.ge/Purchase/purchase?phoneNumber=${user.phoneNumber}&carId=${id}&multiplier=${days}`, {
        method: "POST"
    })
    .then(resp => resp.json())
    .then (data => {
       showAlert(`Car Rented Succsesfully! Total : $${carPrice * days}`)
       setTimeout(() => {
         window.location.href = `../index.html`
        
       }, 1000);
       
    })
    .catch(err => {
        showAlert(`Something went wrong!`,`error`)
    })
})


function cardInfo(obj) {
   return `
      <div class="purchase-car-info">
        <img src="${obj.imageUrl1 || obj.imageUrl2 || obj.imageUrl3 || 'placeholder.jpg'}" />
        <div class="car-name">${obj.brand || ''} ${obj.model || ''}</div>
        <div class="car-title">${obj.year || ''}</div>
        <div class="car-price">$${obj.price} <small>/ day</small></div>
      </div>
    `
}
