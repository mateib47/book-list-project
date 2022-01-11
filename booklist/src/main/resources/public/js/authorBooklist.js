function getBooks(callback){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:8080/api/v1/books/get?email=mateibucur47@gmail.com';
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.open("GET", url, true);
    xhr.send('');
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
    getBooks(renderBooks);
}
