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
    alert(`Car Added Succesfully`)
    window.location.href = `../index.html`
    
})
.catch(err => console.log(err))
})