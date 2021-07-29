/* TODO:
-add a popup that asks for your name and
then updates the page accordingly(Matei's Book List)
-add more options to the form(rate the book, save your favourite quote,etc)
*/

let bookList = [];

function addBook(text){
  const book = {
    id : Date.now(),
    text,
    finished : false
  }
  bookList.push(book);
  console.log(bookList);
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
