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
    let endpoint = "http://localhost:8080/api/v1/registration";
    xhr.open(method, endpoint, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
        }
    };
    xhr.send(JSON.stringify(jsonInputString));
    window.location.href="http://localhost:8080/login";
    //snackbarVerifyEmail();
});

function snackbarVerifyEmail(){
        let e = document.getElementById("snackbar-ver-email");
            e.innerHTML =
                `<h1>Registration email sent to ${email}. Open this email to finish signup.</h1>' +
                '<p>If you don’t see this email in your inbox within 15 minutes, look for it in your junk mail folder.
                 If you find it there, please mark the email as “Not Junk”.</p>`;
            console.log(e);
            snackbar("snackbar-ver-email")
}

function snackbar(id) {
    let e = document.getElementById(id);
    e.className = "show";
    setTimeout(function (){ e.className.replace("show", "")}, 3000);
}
