const form = document.getElementById('register-form')
form.addEventListener('submit', (event) => {
    let xhr = new XMLHttpRequest();
    event.preventDefault(); //stop reload
   let jsonInputString = `{"firstName": "${event.target[0].value}",
    "lastName": "${event.target[1].value}", "email":"${event.target[2].value}",
    "password":"${event.target[3].value}"}`;
   console.log(jsonInputString);
    let method = 'POST';
    let endpoint = "http://localhost:8080/api/v1/registration";
    xhr.open(method, endpoint, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
        }
    };
    let data = JSON.stringify(jsonInputString);
    xhr.send(data);
});
