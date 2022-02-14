function getBooks(email, callback){
    let xhr = new XMLHttpRequest();
    let url = '/api/v1/books/get?email='+email;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.open("GET", url, true);
    xhr.send('');
}
function getFirstName(email){
    let xhr = new XMLHttpRequest();
    let url = '/api/v1/appUser/firstName?email=' + email;
    xhr.open("GET", url, false);
    xhr.send('');
    return xhr.responseText;
}

function renderBooks(array){
    array = JSON.parse(array);
    array.forEach(t => {
        renderBook(t);
    });
}

function renderBook(book) {
    const list = document.querySelector('.book-list-js');
    const node = document.createElement('li');
    node.setAttribute('class', `book-item ${book.status}`);
    node.setAttribute('data-key', book.id);
    node.setAttribute('onclick', `showModal(document.getElementById('details-${book.id}'))`);
    node.innerHTML = book.title;
    list.append(node);
}

window.onload = function(event){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('user');
    document.getElementById('title').innerHTML = getFirstName(email) + "'s Book List";
    getBooks(email, renderBooks);
}
