let bookList = [];
let user;
let modals = document.getElementsByClassName("modal");
const refEmail = localStorage.getItem('emailRef');
let email;
if(refEmail){
   email = JSON.parse(refEmail).email;
}

function getBookList(){
  if(refEmail){
    return apiGetBooks(email);
  }else{
    return bookList;
  }
}

function showModal(modal) {
  modal.style.display = 'block';
}

function hideModal(modal) {
  modal.style.display = 'none';
}

window.onclick = function(event){
  for(let i=0;i<modals.length;i++){
    if(event.target == modals[i]){
      hideModal(modals[i]);
    }
  }
}

function renderBook(book) {
  console.log("rendering")
  const refEmail = localStorage.getItem('emailRef');
  if(refEmail) {
  }else{
    localStorage.setItem('bookItemsRef', JSON.stringify(bookList));
  }
  const list = document.querySelector('.book-list-js');
  const item = document.querySelector(`[data-key='${book.id}']`);
  const node = document.createElement('li');
  const buyLink = 'https://www.amazon.com/s?k=' + book.title.split(" ").join('+');
  if(book.deleted && !refEmail) {
    item.remove();
    updateStats();
    return;
  }else if(book.deleted=='true' && refEmail){
    return;
  }
  node.setAttribute('class', `book-item ${book.status}`);
  node.setAttribute('data-key', book.id);
  node.setAttribute('onclick', `showModal(document.getElementById('details-${book.id}'))`);
  node.innerHTML = `
  <form class="change-status-js">
    <label for="${book.id}" class=""></label>
    <select onclick="event.stopPropagation();" class="status-book-item dropdown-js" name="status" id="${book.id}" onchange='changeStatus("${book.id}")'>
      <option value="">Change Status</option>
      <option value="PRESENT">In Progress</option>
      <option value="PAST">Finished</option>
      <option value="FUTURE">Not started</option>
    </select>
  </form>
  <div class="title-author" onclick="showModal(document.getElementById('details-${book.id}'))">
    <p class="book-title">${book.title}</p>
  </div>
  <button class="delete-button delete-js">Delete</button>
`;
  let modal=`
    <div class="modal" id="details-${book.id}" class="details">
      <div class="modal-content">
      <span class="close" onclick="hideModal(document.getElementById('details-${book.id}'))">&times;</span>
      <div class='side-by-side' style="margin-bottom: 40px;">
        <div class="text">
          <h2 class="book-title">${book.title}</h2>`;
          if(book.apiBookObj && book.apiBookObj.volumeInfo.subtitle){
            modal += `<p class="">${book.apiBookObj.volumeInfo.subtitle}</p>`;
          }
          if(book.author){
            modal += `<p class="book-author">by ${book.author}</p>`;
          }
          if(book.genre){
            modal += `<p class="book-genre">Genre: ${book.genre}</p>`;
          }
          if(book.rating){
            modal += `<p class="book-rating">Rating: ${book.rating} / 5</p>`;
          }
          if(book.pages){
            modal += `<p class="book-pages">Pages: ${book.pages}</p>`;
          }
          if(book.quote){
            modal += `<p class="book-quote">Favourite quote: '${book.quote}'</p>`;
          }
          if(book.bookmark && book.pages){
            let percent = calculatePercent(book.bookmark, Number(book.pages));
            modal += `<p class="book-bookmark">Progress: ${percent}%</p>
                        <div style="background-color:#DCDCDC;">
                          <div style="height:24px;width:${percent}%; background-color:var(--lightgreen); margin-bottom: 20px;"></div>
                        </div>`;
          }
          modal += '</div>'
    if(book.apiBookObj && book.apiBookObj.volumeInfo.imageLinks){
      modal+=`<div class="">
                <img class='book-img' src=${book.apiBookObj.volumeInfo.imageLinks.thumbnail}>
                <div class="side-by-side">
                    <button class="submit green-bck" onclick="window.open('${book.apiBookObj.volumeInfo.previewLink}', '_blank')">Preview</button>
                    <button class="submit green-bck" onclick="window.open('${buyLink}', '_blank')">Buy Now</button>
                 </div>   
              </div>`;
    }
    modal += '</div>';
  if(book.apiBookObj && book.apiBookObj.searchInfo){
    modal += `<p class="text">${book.apiBookObj.searchInfo.textSnippet}</p>`;
  }
    modal += `
      <button class="submit red-bck" onclick="changeBook(${book.id})">Change</button>
      </div>
    </div>
    `;
    node.innerHTML += modal;
  if(item){
    list.replaceChild(node,item);
  }else{
    list.append(node);
  }
  updateStats();
}

function calculatePercent(bookmark, pages){
  let percent = Math.round(bookmark/pages*100);
  if(percent > 100){
    return 100;
  }else{
    return percent;
  }
}

function addPages(bookId,pages){
  const book = getBookList().find(x => x.id == bookId);
  book.bookmark += pages;
  renderBook(book);
}

function changeBook(key){
  let book;
  if(refEmail){
    book = getBook(key);
  }else{
    book = getBookList().find(x => x.id == key);
  }
  hideModal(document.getElementById("details-"+key));
  showModal(document.getElementById("add-book"));
  for(let prop in book){
    if(prop == 'rating' && book[prop] !== undefined && book[prop] !== 0){
      document.querySelector('#star'+book[prop]).checked = true;

    } else if (prop == 'apiBookObj' && book[prop] !== undefined) {
      bookChoice = book[prop];
    }else if (prop !== 'id' && prop !== 'rating' && prop !== 'bookmark' && prop !== 'appUser' && prop !== 'book' && prop !== 'deleted') {
      document.querySelector('#'+prop+'-input').value = book[prop];
    }
  }
  if(refEmail){
    document.getElementById('change-flag').value = 'true';
    document.getElementById('id').value = key;
  }else{
    deleteBook(key);
  }
}

function renderName(user){
  const div = document.querySelector('.main-page');
  const title = document.querySelector('#title');
  const item = document.querySelector(`[data-key='${user.id}']`);
  title.innerHTML = `${user.name}'s Book List`;
  if(item){
    div.replaceChild(title,item);
  }
  displayBookForm();
}

function displayBookForm(){
  document.getElementById('main-page').style.display = 'block';
  document.getElementById('add-name').style.display = 'none';
}

function addBook(title,author,genre,rating,status,pages,quote, apiId, id, changeFlag){
  const refEmail = localStorage.getItem('emailRef');
  const book = {
    title,
    author,
    genre,
    rating,
    status,
    pages,
    quote,
    apiId,
    bookmark:0
  }
  if(refEmail){
    let emailObj = JSON.parse(refEmail);
    book.email = emailObj.email;
    if(changeFlag === 'true'){
      document.getElementById('change-flag').value = 'false';
      postChangeBook(id, book);
    }else{
      postBook(book);
    }
    fetchBooks();
  }else{
    book.id = Date.now();
    if (bookChoice){
      book.apiBookObj = bookChoice;
      bookChoice = null;
    }
    bookList.push(book);
    renderBook(book);
  }
}

function addName(text){
  const user = {
    id : Date.now(),
    name:text
  }
  this.user = user;
  localStorage.setItem('userRef', JSON.stringify(user));
  renderName(user);
}

//adjust
function changeStatus(key, status){
  const refEmail = localStorage.getItem('emailRef');
  if (refEmail){
    let book = getBook(key);
    const status = document.getElementById(`${key}`).value;
    book.status = status;
    book.email = JSON.parse(refEmail).email;
    postChangeBook(key, book);
  }else{
    const index = bookList.findIndex(book => book.id === Number(key));
    if(arguments.length == 1){
      const status = document.getElementById(`${key}`).value;
      bookList[index].status = status;
    }else{
      bookList[index].status = status;
    }
    renderBook(bookList[index]);
  }
}

function deleteBook(key){
  let book;
  if(refEmail){
    putDeleteBook(key)
  }else{
    const index = bookList.findIndex(book => book.id === Number(key));
    book = {
      deleted: true,
      ...bookList[index]
    };
    bookList = bookList.filter(book => book.id !== Number(key));
    renderBook(book);
  }
}

const bookForm = document.querySelector('#book-form');
bookForm.addEventListener('submit',event => {
  event.preventDefault();
  const bookInput = document.querySelector('#title-input');
  const bookName = bookInput.value.trim();
  const authorName = document.querySelector('#author-input').value.trim();
  const genre = document.querySelector('#genre-input').value;
  const quote = document.querySelector('#quote-input').value.trim();
  const radioButtons = document.getElementsByName('star');
  const status = document.querySelector('#status-input').value;
  const pages = document.querySelector('#pages-input').value.trim();
  const apiId = document.querySelector('#apiId-input').value;
  const id = document.querySelector('#id').value;
  const changeFlag = document.querySelector('#change-flag').value;
  let rating;
  radioButtons.forEach(x => {
    if(x.checked) {
      rating = x.value;
    }
  });
  if(bookName !== '' && status !== ''){
    addBook(bookName,authorName,genre,rating,status,pages,quote,apiId, id, changeFlag);
    bookForm.reset();
    bookInput.focus();
  }
});

function nameForm(inputId){
  event.preventDefault();
  const input = document.querySelector(inputId);
  const text = input.value.trim();
  if(text !== ''){
    addName(text);
    input.value = '';
  }
}

const changeNameForm = document.querySelector("#settings-form");
changeNameForm.addEventListener('submit',event => nameForm('#settings-name-input'));

const addNameForm = document.querySelector("#add-name-form");
addNameForm.addEventListener('submit',event => nameForm('#add-name-input'));

const list = document.querySelector('.book-list-js');
list.addEventListener('click', event => {
  if (event.target.classList.contains('delete-js')){
    const itemKey = event.target.parentElement.dataset.key;
    deleteBook(itemKey);
  }
});


function getFirstName(email, callback){
  let xhr = new XMLHttpRequest();
  let url = 'http://localhost:8080/api/v1/appUser/firstName?email=' + email;
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.open("GET", url, true);
  xhr.send('');
}
function apiGetBooks(email, callback){
  let xhr = new XMLHttpRequest();
  let url = 'http://localhost:8080/api/v1/books/get?email=' + email;
    xhr.open("GET", url, false);
    xhr.send('');
    return JSON.parse(xhr.responseText);
}
function getBook(id){
  let xhr = new XMLHttpRequest();
  let url = 'http://localhost:8080/api/v1/books/get-book?id=' + id;
  xhr.open("GET", url, false);
  xhr.send('');
  return JSON.parse(xhr.responseText);
}

function postBook(book){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:8080/api/v1/books/add', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  let bookJson = JSON.stringify(book);
  xhr.send(bookJson);
  fetchBooks();
}
function putDeleteBook(id){
  let xhr = new XMLHttpRequest();
  let url = 'http://localhost:8080/api/v1/books/delete-book?id=' + id;
  xhr.open("PUT", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send('');
  fetchBooks();
}

function postChangeBook(id, book){
  let xhr = new XMLHttpRequest();
  let url = 'http://localhost:8080/api/v1/books/change?id=' + id;
  xhr.open("PUT", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  let bookJson = JSON.stringify(book);
  xhr.send(bookJson);
  fetchBooks();
}

function setName(name){
  renderName({name})
}
/*
  if user not logged in, is asked for name
  and it s stored in localstorage, otherwise
  is got from database
 */

function domListener() {
  const refBook = localStorage.getItem('bookItemsRef');
  const refUser = localStorage.getItem('userRef');
  const refEmail = localStorage.getItem('emailRef');
  if(refEmail) {
    const emailObj = JSON.parse(refEmail);
    getFirstName(emailObj.email, setName);
    fetchBooks();
  }else{
    if (refUser) {
      user = JSON.parse(refUser);
      renderName(user);
    }else{
      showModal(document.getElementById('add-name'));
    }
    if (refBook) {
      bookList = JSON.parse(refBook);
      bookList.forEach(t => {
        renderBook(t);
      });
    }else{
      showModal(document.getElementById('navbar'));
    }
  }
}
function renderBooks(array){
  array.forEach(t => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + t.apiId).then(
        function (response) {
          return response.json();
        }).then(function (data) {
      console.log(data)
      t.apiBookObj = data["items"][0];
      renderBook(t);
      return true;
    }).catch(function (err) {
      console.warn('Something went wrong.', err);
      return false;
    });
  });
}

function fetchBooks(){
  console.log("start")
  fetch('/api/v1/books/get?email=' + email).then(
      function (response) {
        return response.json();
      }).then(function (data) {
    console.log("data")

    console.log(data)
    renderBooks(data);
    return true;
  }).catch(function (err) {
    console.warn('Something went wrong.', err);
    return false;
  });
}
document.addEventListener('DOMContentLoaded', domListener);
