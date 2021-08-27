let bookList = [];
let user;
let modals = document.getElementsByClassName("modal");

function getBookList(){
  return bookList;
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
  localStorage.setItem('bookItemsRef', JSON.stringify(bookList));
  const list = document.querySelector('.book-list-js');
  const item = document.querySelector(`[data-key='${book.id}']`);
  const node = document.createElement('li');
  if(book.deleted) {
    item.remove();
    updateStats();
    return;
  }
  node.setAttribute('class', `book-item ${book.status}`);
  node.setAttribute('data-key', book.id);
  node.innerHTML = `
  <form class="change-status-js">
    <label for="${book.id}" class=""></label>
    <select class="status-book-item dropdown-js" name="status" id="${book.id}" onchange='changeStatus("${book.id}")'>
      <option value="">Change Status</option>
      <option value="present">In Progress</option>
      <option value="past">Finished</option>
      <option value="future">Not started</option>
    </select>
  </form>
  <div class="title-author" onclick="showModal(document.getElementById('details-${book.id}'))">
    <p class="book-title">${book.title}</p>
  </div>
  <button class="delete-button delete-js">Delete</button>`;
  let modal=`
    <div class="modal" id="details-${book.id}" class="details">
      <div class="modal-content">
      <span class="close" onclick="hideModal(document.getElementById('details-${book.id}'))">&times;</span>
      <p class="book-title">Title: ${book.title}</p>`;
    if(book.author){
      modal += `<p class="book-author">by ${book.author}</p>`;
    }
    if(book.rating){
      modal += `<p class="book-rating">Rating: ${book.rating} / 5</p>`;
    }
    if(book.pages){
      modal += `<p class="book-pages">Pages: ${book.pages}</p>`;
    }
    if(book.quote){
      modal += `<p class="book-quote">'${book.quote}'</p>`;
    }
    modal += `
      <button class="submit" onclick="changeBook(${book.id})">Change</button>
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

function changeBook(key){
  let book = getBookList().find(x => x.id == key);
  hideModal(document.getElementById("details-"+key));
  showModal(document.getElementById("add-book"));
  for(prop in book){
    if(prop !== 'id' && prop !== 'rating'){
      document.querySelector('#'+prop+'-input').value = book[prop];
    }else if(prop == 'rating' && book[prop] !== undefined){
      document.querySelector('#star'+book[prop]).checked = true;
    }
  }
  deleteBook(key);
}

function renderName(user){
  localStorage.setItem('userRef', JSON.stringify(user));
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

function addBook(title,author,rating,status,pages,quote){
  const book = {
    id : Date.now(),
    title,
    author,
    rating,
    status,
    pages,
    quote
  }
  bookList.push(book);
  renderBook(book);
}

function addName(text){
  const user = {
    id : Date.now(),
    name:text
  }
  this.user = user;
  renderName(user);
}

//adjust
function changeStatus(key){
  const status = document.getElementById(`${key}`).value;
  const index = bookList.findIndex(book => book.id === Number(key));
  bookList[index].status = status;
  renderBook(bookList[index]);
}

function deleteBook(key){
  const index = bookList.findIndex(book => book.id === Number(key));
  const book = {
    deleted: true,
    ...bookList[index]
  };
  bookList = bookList.filter(book => book.id !== Number(key));
  renderBook(book);
}

const bookForm = document.querySelector('#book-form');
bookForm.addEventListener('submit',event => {
  event.preventDefault();
  const bookInput = document.querySelector('#title-input');
  const authorInput = document.querySelector('#author-input');
  const quoteInput = document.querySelector('#quote-input');
  const bookName = bookInput.value.trim();
  const authorName = authorInput.value.trim();
  const quote = quoteInput.value.trim();
  const radioButtons = document.getElementsByName('star');
  const status = document.querySelector('#status-input').value;
  const pagesInput = document.querySelector('#pages-input');
  const pages = pagesInput.value.trim();
  let rating;
  radioButtons.forEach(x => {
    if(x.checked) {
      rating = x.value;
    }
  });
  if(bookName !== '' && status !== ''){
    addBook(bookName,authorName,rating,status,pages,quote);
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

document.addEventListener('DOMContentLoaded', () => {
  const refBook = localStorage.getItem('bookItemsRef');
  const refUser = localStorage.getItem('userRef');
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
});
