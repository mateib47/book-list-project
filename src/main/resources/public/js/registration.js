const form = document.getElementById('register-form')
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let firstName = event.target[0].value;
    let lastName = event.target[1].value;
    let email = event.target[2].value;
    let password = event.target[3].value;
    let xhr = new XMLHttpRequest();
    let jsonInputString = {firstName, lastName, email, password};
    let method = 'POST';
    let endpoint = "/api/v1/registration";
    xhr.open(method, endpoint, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(jsonInputString));
    console.log(xhr.responseText);
    if(xhr.responseText === "EMAIL_TAKEN"){
        window.alert("There already exist an user with this email")
    }else{
        window.location.href="/login";
        window.alert("Registration email sent. Open this email to finish signup. Please check in spam also.")
    }

});

function snackbarVerifyEmail(email){
        let e = document.getElementById("snackbar-ver-email");
            e.innerHTML =
                '<h1>Registration email sent to '+ email + '. Open this email to finish signup.</h1>' +
                '<p>If you don’t see this email in your inbox within 15 minutes, look for it in your junk mail folder. ' +
                'If you find it there, please mark the email as “Not Junk”.</p>';
            console.log(e);
            snackbar("snackbar-ver-email")
}

function snackbar(id) {
    let e = document.getElementById(id);
    e.className = "show";
    setTimeout(function (){ e.className.replace("show", "")}, 3000);
}
