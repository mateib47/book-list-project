/* TODO:
-add a popup that asks for your name and
then updates the page accordingly(Matei's Book List)
-add more options to the form(rate the book, save your favourite quote,etc)
*/

let bookList = [];

function renderBook(book) {
  const list = document.querySelector('.book-list-js');
  const isFinished = book.finished ? "finished" : "";
  const node = document.createElement('li');
  node.setAttribute('class', `book-item ${isFinished}`);
  node.setAttribute('data-key', book.id);
  node.innerHTML = `
  <label for="${book.id}" class="thick-js thick"></label>
  <input id="${book.id}" type="checkbox" class="check-box"/>
  <p class="book-title">${book.text}</p>
  <button class="delete-button">Delete</button>
  `;
  list.append(node);
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
