let bookList = [];
let modals = document.getElementsByClassName("modal");
const refEmail = localStorage.getItem('emailRef');
let email;
const settingsForm = document.getElementById('settings-form');
if(refEmail){
   email = JSON.parse(refEmail).email;
   let node = document.createElement('div');
   node.classList.add('center');
   node.innerHTML = '<label for="share-profile" id="share-profile-label" class="bold">Share your book list</label>\n' +
       '            <button type="submit" id="share-profile" class="submit" style="margin:20px" onclick="copyToClipboard()">Copy share link</button>'
   settingsForm.appendChild(node);
}else{
  let node = document.createElement('div');
  node.classList.add('center');

  node.innerHTML = '<label for="share-profile" id="share-profile-label" class="bold">Share your book list</label>\n' +
      '<p>You have to create an account in order to share your booklist</p>' +
      `            <button type="submit" id="share-profile" class="submit" style="margin:20px" onclick="window.location.href='/logout'">Sign up</button>`;
  settingsForm.appendChild(node);
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

function hideModal(id) {
  let modal = document.getElementById(id);
  modal.style.display = 'none';
}

window.onclick = function(event){
  for(let i=0;i<modals.length;i++){
    if(event.target == modals[i]){
      hideModal(modals[i].id);
    }
  }
}

function renderBook(book) {
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
  <div class="title-author" onclick="showModal(document.getElementById('details-${book.id}'))">
    <p class="book-title">${book.title}</p>
    <p class="book-subtitle" style="font-style: italic">by ${book.author}</p>
  </div>
    <div style="display: inline">
        <button class="delete-button delete-js" style="margin-bottom: 50px">&#10005;</button>
        <form class="change-status-js">
          <label for="${book.id}" class=""></label>
          <select onclick="event.stopPropagation();" class="status-book-item dropdown-js" name="status" id="${book.id}" onchange='changeStatus("${book.id}")'>
            <option value="">Change Status</option>
            <option value="PRESENT">In Progress</option>
            <option value="PAST">Finished</option>
            <option value="FUTURE">Not started</option>
          </select>
        </form>
    </div>
`;
  let modal=`
    <div class="modal" id="details-${book.id}" class="details">
      <div class="modal-content">
      <span class="close" onclick="hideModal('details-${book.id}')">&times;</span>
      <div class='side-by-side' style="margin-bottom: 40px;">
        <div class="text">
          <h2 class="book-title">${book.title}</h2>`;
          if(book.apiBookObj && book.apiBookObj.volumeInfo.subtitle){
            modal += `<p class="">${book.apiBookObj.volumeInfo.subtitle}</p>`;
          }
          if(book.author){
            modal += `<p class="book-author">by ${book.author}</p>`;
          }
          if(book.referral){
            modal += `<p class="">Book recommended by ${book.referral}</p>`;
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
    item.replaceWith(node);
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
  if(refEmail){
    apiAddBookmark(pages, bookId);
    if(book.apiId){
      book.apiBookObj = getApiBook(book.apiId);
    }
   // document.querySelector(`[data-key='${book.id}']`).remove();
  }
  renderBook(book);
}

function changeBook(key){
  let book;
  if(refEmail){
    book = getBook(key);
  }else{
    book = getBookList().find(x => x.id == key);
  }
  hideModal("details-"+key);
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
    removeBook(key);
  }
}

function renderName(name){
 // const div = document.querySelector('.main-page');
  const title = document.querySelector('#title');
 // const item = document.querySelector(`[data-key='${user.id}']`);
  title.innerHTML = `${name}'s Book List`;
 // if(item){
 //   div.replaceChild(title,item);
 // }
  displayBookForm();
}

function displayBookForm(){
  document.getElementById('main-page').style.display = 'block';
  document.getElementById('add-name').style.display = 'none';
}

function addBook(title,author,genre,rating,status,pages,quote, apiId, id, changeFlag, referral){
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
    bookmark:0,
    referral
  }
  if(refEmail){
    let emailObj = JSON.parse(refEmail);
    book.email = emailObj.email;
    if(changeFlag === 'true'){
      document.getElementById('change-flag').value = 'false';
      document.getElementById('id').value = null;
      postChangeBook(id, book);
    }else{
      postBook(book);
    }
  }else{
    book.deleted = false;
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
  if (refEmail){
    putChangeName(text);
    renderName(text);
  }else{
    let user = {
      id : Date.now(),
      name:text
    }
    localStorage.setItem('userRef', JSON.stringify(user));
    renderName(user.name);
  }
  hideModal("settings");
}

//adjust
function changeStatus(key){
  const refEmail = localStorage.getItem('emailRef');
  if (refEmail){
    let book = getBook(key);
    const status = document.getElementById(`${key}`).value;
    book.status = status;
    book.email = JSON.parse(refEmail).email;
    postChangeBook(key, book);
    document.querySelector(`[data-key='${book.id}']`).className = `book-item ${status}`;
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
    removeBook(key);
    bookList.push(book);
    renderBook(book);
  }
}

function removeBook(key){
  bookList = bookList.filter(book => book.id !== Number(key));
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
  const referral = document.querySelector("#referral-input").value;
  let rating;
  radioButtons.forEach(x => {
    if(x.checked) {
      rating = x.value;
    }
  });
  if(bookName !== '' && status !== ''){
    addBook(bookName,authorName,genre,rating,status,pages,quote,apiId, id, changeFlag, referral);
    bookForm.reset();
    bookInput.focus();
    clearPrevious();
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
if(!refEmail){
  addNameForm.addEventListener('submit',event => nameForm('#add-name-input'));
}

const list = document.querySelector('.book-list-js');
list.addEventListener('click', event => {
  if (event.target.classList.contains('delete-js')){
    const itemKey = event.target.parentElement.parentElement.dataset.key;
    deleteBook(itemKey);
  }
});


function getFirstName(email){
  let xhr = new XMLHttpRequest();
  let url = '/api/v1/appUser/firstName?email=' + email;
  xhr.open("GET", url, false);
  xhr.send('');
  return xhr.responseText;
}
function apiGetBooks(email, callback){
  let xhr = new XMLHttpRequest();
  let url = '/api/v1/books/get?email=' + email;
    xhr.open("GET", url, false);
    xhr.send('');
    return JSON.parse(xhr.responseText);
}
function getBook(id){
  let xhr = new XMLHttpRequest();
  let url = '/api/v1/books/get-book?id=' + id;
  xhr.open("GET", url, false);
  xhr.send('');
  return JSON.parse(xhr.responseText);
}

function postBook(book){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", '/api/v1/books/add', false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  let bookJson = JSON.stringify(book);
  xhr.send(bookJson);
  book.id = xhr.responseText;
  if(book.apiId) {
    book.apiBookObj = getApiBook(book.apiId);
  }
  renderBook(book);
}
function putDeleteBook(id){
  let xhr = new XMLHttpRequest();
  let url = '/api/v1/books/delete-book?id=' + id;
  xhr.open("PUT", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send('');
  document.querySelector(`[data-key='${id}']`).remove();
}

function apiAddBookmark(pages, id){
  let xhr = new XMLHttpRequest();
  let url = '/api/v1/books/add-bookmark?id=' + id + '&pages=' + pages;
  xhr.open("PUT", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send('');
}

function postChangeBook(id, book){
  let xhr = new XMLHttpRequest();
  let url = '/api/v1/books/change?id=' + id;
  xhr.open("PUT", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  let bookJson = JSON.stringify(book);
  xhr.send(bookJson);
//  document.querySelector(`[data-key='${id}']`).remove();
  if(book.apiId) {
    book.apiBookObj = getApiBook(book.apiId);
  }
  book.id = id;
  renderBook(book);
}
function getApiBook(id){
  let xhr = new XMLHttpRequest();
  let url = 'https://www.googleapis.com/books/v1/volumes?q=' + id;
  xhr.open("GET", url, false);
  xhr.send('');
  return JSON.parse(xhr.responseText)["items"][0];
}

function putChangeName(name){
  let xhr = new XMLHttpRequest();
  let url = 'api/v1/appUser/change-name';
  xhr.open("PUT", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  let userJSON = JSON.stringify({name, email});
  xhr.send(userJSON);
}

function restoreDeleted(){
  if(refEmail){
    let xhr = new XMLHttpRequest();
    let url = '/api/v1/books/restore?email='+email;
    xhr.open("PUT", url, false);
    xhr.send('');
    document.getElementById('booklist-main').innerHTML = '';
    fetchBooks();
  }else{
    bookList.filter(b => b.deleted = false);
    bookList.forEach(t => {
      renderBook(t);
    });
  }

}
function apiDeleteAccount(){
  let xhr = new XMLHttpRequest();
  let url = '/api/v1/appUser/delete'; // make it more secure(anyone could delete your account)
  xhr.open("PUT", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  let userJSON = JSON.stringify({name:"user", email});
  xhr.send(userJSON);
  window.location.href='/logout';
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
    renderName(getFirstName(emailObj.email));
    fetchBooks();
  }else{
    if (refUser) {
      renderName(JSON.parse(refUser).name);
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
  console.log(array);
  let sortedArray = array.sort(function(a, b){
    if(a.title < b.title) { return -1; }
    if(a.title > b.title) { return 1; }
    return 0;
  });
  sortedArray.forEach(t => {
    if (t.apiId){
      fetch('https://www.googleapis.com/books/v1/volumes?q=' + t.apiId).then(
          function (response) {
            return response.json();
          }).then(function (data) {
        t.apiBookObj = data["items"][0];
        renderBook(t);
        return true;
      }).catch(function (err) {
        console.warn('Something went wrong.', err);
        return false;
      });
    }else{
      renderBook(t);
    }
  });
}

function fetchBooks(){
  fetch('/api/v1/books/get?email=' + email).then(
      function (response) {
        return response.json();
      }).then(function (data) {
        //todo have option to sort books in a certain order; add the time the book was added so you can sort by newest first
    renderBooks(data);
    return true;
  }).catch(function (err) {
    console.warn('Something went wrong.', err);
    return false;
  });
}

function copyToClipboard() {
  let copyText = 'https://mybooklist-webapp.herokuapp.com/api/v1/view?user=' + email;
  navigator.clipboard.writeText(copyText);
}

document.addEventListener('DOMContentLoaded', domListener);
