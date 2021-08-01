/* TODO:
-add a popup that asks for your name and
then updates the page accordingly(Matei's Book List)
-add more options to the form(rate the book, save your favourite quote,etc)
*/

let bookList = [];

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

function addBook(text){
  const book = {
    id : Date.now(),
    text,
    finished : false
  }
  bookList.push(book);
  renderBook(book);
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

const form = document.querySelector('.js-form');
form.addEventListener('submit',event => {
  event.preventDefault();
  const input = document.querySelector('.book-input');
  const text = input.value.trim();
  if(text !== ''){
    addBook(text);
    input.value = '';
    input.focus();
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
  const ref = localStorage.getItem('bookItemsRef');
  if (ref) {
    bookList = JSON.parse(ref);
    bookList.forEach(t => {
      renderBook(t);
    });
  }
});
