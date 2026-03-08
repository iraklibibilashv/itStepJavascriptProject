let favGrid = document.querySelector(`#favGrid`)
let clearBtn = document.querySelector(`#clearBtn`)
let phoneNumber = JSON.parse(localStorage.getItem(`phoneNumber`))

if(!phoneNumber) {
    alert(`Please Log In`)
    window.location.href = `./login.html`
    
}
clearBtn.addEventListener("click", () => {
    favGrid.innerHTML = ``
})

fetch(`https://rentcar.stepprojects.ge/api/Users/${phoneNumber}/favorite-cars`)
.then(resp => resp.json())
.then (data => {
    console.log(data);
    if(data.length == 0) {
        favGrid.innerHTML = `         <div class="empty-state">
                <span>💔</span>
                <p>No Favourite Cars</p>
            </div>`
    }
    data.forEach(obj => {
        let car = document.createElement(`div`)
        car.innerHTML = createCard(obj)
        favGrid.appendChild(car)
        clearBtn.addEventListener("")
    });
})
 function createCard(obj) {
  return `<div class="car-card" id="car-${obj.id}">
    <div class="car-image-wrap">
      <img src="${obj.imageUrl1 || obj.imageUrl2 || obj.imageUrl3 || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${obj.brand || ''}" />
      <span class="car-badge">${obj.city || 'უცნობი'}</span>
      <button class="remove-btn" data-id="${obj.id}">✕</button>
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
        <div class="car-price">
          $${obj.price || 0} <small>/ day</small>
        </div>
        <button class="rent-btn">Rent Now</button>
      </div>
    </div>
  </div>`
  }

