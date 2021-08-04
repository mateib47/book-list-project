/* TODO:
-add an option to change trhe name
-add more options to the form(rate the book, save your favourite quote,etc)
*/

let bookList = [];
let user;

function renderBook(book) {
  localStorage.setItem('bookItemsRef', JSON.stringify(bookList));
  const list = document.querySelector('.book-list-js');
  const item = document.querySelector(`[data-key='${book.id}']`);
  const isFinished = book.finished ? "finished" : "";
  const node = document.createElement('li');
  if(book.deleted) {
    item.remove();
    return;
  }
  node.setAttribute('class', `book-item ${isFinished}`);
  node.setAttribute('data-key', book.id);
  node.innerHTML = `
  <label for="${book.id}" class="thick-js thick"></label>
  <input id="${book.id}" type="checkbox" class="check-box-js check-box"/>
  <p class="book-title">${book.text}</p>
  <button class="delete-button delete-js">Delete</button>
  `;
  if(item){
    list.replaceChild(node,item);
  }else{
    list.append(node);
  }
}

function renderName(user){
  localStorage.setItem('userRef', JSON.stringify(user));
  const div = document.querySelector('.add-book');
  const title = document.querySelector('#title');
  const item = document.querySelector(`[data-key='${user.id}']`);
  title.innerHTML = `${user.name}'s Book List`;
  if(item){
    div.replaceChild(title,item);
  }
  displayBookForm();
}

function displayBookForm(){
  document.getElementById('add-book').style.display = 'block';
  document.getElementById('add-name').style.display = 'none';
}

function addBook(text){
  const book = {
    id : Date.now(),
    text,
    finished : false
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

function toggleFinished(key){
  const index = bookList.findIndex(book => book.id === Number(key));
  bookList[index].finished = !bookList[index].finished;
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
  const input = document.querySelector('#book-input');
  const text = input.value.trim();
  if(text !== ''){
    addBook(text);
    input.value = '';
    input.focus();
  }
});
// FIXME: make the form stuff in one method
const nameForm = document.querySelector('#name-form');
nameForm.addEventListener('submit',event => {
  event.preventDefault();
  const input = document.querySelector('#name-input');
  const text = input.value.trim();
  if(text !== ''){
    addName(text);
    input.value = '';
  }
});

const list = document.querySelector('.book-list-js');
list.addEventListener('click', event => {
  if (event.target.classList.contains('check-box-js')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleFinished(itemKey);
  }
  if (event.target.classList.contains('delete-js')){
    const itemKey = event.target.parentElement.dataset.key;
    deleteBook(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const refBook = localStorage.getItem('bookItemsRef');
  const refUser = localStorage.getItem('userRef');
  if (refBook) {
    bookList = JSON.parse(refBook);
    bookList.forEach(t => {
      renderBook(t);
    });
  }
  if (refUser) {
    user = JSON.parse(refUser);
    renderName(user);
  }
});
