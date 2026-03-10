let firstName = document.querySelector(`#firstName`);
let lastName = document.querySelector(`#lastName`);
let email = document.querySelector(`#email`);
let phoneNumber = document.querySelector(`#phoneNumber`);
let password = document.querySelector(`#password`);
let registerBtn = document.querySelector(`#registerBtn`);


loader.style.display = "flex"
registerBtn.addEventListener("click", () => {
  let userInfo  = {
    firstName : firstName.value,
    lastName : lastName.value,
    email : email.value,
    phoneNumber : phoneNumber.value,
    password : password.value,
    role : "User"
    
}

    fetch(`https://rentcar.stepprojects.ge/api/Users/register`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(userInfo)
    })
    .then(resp => resp.json())
    .then(data => {
      loader.style.display = "none"
        showAlert(`Registration Succesful`)
        setTimeout(() => {
             window.location.href = "./login.html"
        }, 1000);
       
        
    })
    .catch(err => {
        console.log(err);
        showAlert(`Something went wrong!`,`error`)
        
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