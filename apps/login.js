let loginBtn = document.querySelector(`#loginBtn`)
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
        console.log(data);
        localStorage.setItem("token",data.token)
        localStorage.setItem("userRole",data.role)
        localStorage.setItem(`userEmail`,data.email)
        alert(`Login Success`)
        window.location.href = "../index.html"
        
    })
    .catch(err => {
        console.log(err);
        
    })
})