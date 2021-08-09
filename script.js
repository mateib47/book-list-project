let bookList = [];
let user;
let modals = document.getElementsByClassName("modal");

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
  <div class="title-author" onclick="showModal(document.getElementById('details-${book.id}'))">
    <p class="book-title">${book.title}</p>
    <div class="modal" id="details-${book.id}" class="details">
      <div class="modal-content">
        <span class="close" id='close-span' onclick="hideModal(document.getElementById('details-${book.id}'))">&times;</span>
        <p class="book-author">by ${book.author}</p>
        <p class="book-rating">Rating: ${book.rating} / 5</p>
        <p class="book-quote">'${book.quote}'</p>
      </div>
    </div>
  </div>
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

function displayNameForm(){
  document.getElementById('add-book').style.display = 'none';
  document.getElementById('add-name').style.display = 'block';
}//probably delete these

function addBook(title,author,rating,quote){
  const book = {
    id : Date.now(),
    title,
    author,
    rating,
    quote,
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
  const bookInput = document.querySelector('#book-input');
  const authorInput = document.querySelector('#author-input');
  const quoteInput = document.querySelector('#quote-input');
  const bookName = bookInput.value.trim();
  const authorName = authorInput.value.trim();
  const quote = quoteInput.value.trim();
  const radioButtons = document.getElementsByName('star');
  var rating;
  radioButtons.forEach(x => {
    if(x.checked) {
      rating = x.value;
    }
  });
  console.log(rating);
  if(bookName !== '' && authorName !== '' && authorName !== ''){
    addBook(bookName,authorName,rating,quote);
    bookInput.value = '';
    authorInput.value = '';
    quoteInput.value='';
    bookInput.focus();
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
    showModal(document.getElementById('book-form'));
  }
});
