let firstName = document.querySelector(`#firstName`);
let lastName = document.querySelector(`#lastName`);
let email = document.querySelector(`#email`);
let phoneNumber = document.querySelector(`#phoneNumber`);
let password = document.querySelector(`#password`);
let registerBtn = document.querySelector(`#registerBtn`);



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
        console.log(data);
        alert(`Registration Succesful`)
        window.location.href = "./login.html"
        
    })
    .catch(err => {
        console.log(err);
        
    })
})