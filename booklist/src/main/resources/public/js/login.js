function noLogin(){
    document.getElementById("username").value = 'user';
    document.getElementById("password").value = 'user';
    document.getElementById("login-form").submit();
    localStorage.removeItem('emailRef');
}

const loginForm = document.getElementById("login-form");
function saveEmail(){
    const email = document.getElementById("username").value;
    const jsonObj = {email};
   localStorage.setItem('emailRef', JSON.stringify(jsonObj));

}
