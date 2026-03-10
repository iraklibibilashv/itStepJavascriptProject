let loginBtn = document.querySelector(`#loginBtn`)
loader.style.display = "flex"
loginBtn.addEventListener("click", () => {
    fetch(`https://rentcar.stepprojects.ge/api/Users/login`,{
        method : "POST",
        headers : {
            "Content-Type":"application/json"
        },
        body : JSON.stringify({
            phoneNumber : phoneNumber.value,
            password : password.value
        })
    })
    .then(resp => resp.json())
    .then(data => {
            loader.style.display = "none"
        
        localStorage.setItem("token",data.token)
        localStorage.setItem("userRole",data.role)
        localStorage.setItem(`userEmail`,data.email)
        localStorage.setItem(`phoneNumber`,data.phoneNumber)
        showAlert(`Logged In`)
        setTimeout(() => {
            window.location.href = "../index.html"
        }, 1000);
        
        
    })
    .catch(err => {
        console.log(err);
        showAlert(`Phone Number or Password is Incorrect`,`error`)
        
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