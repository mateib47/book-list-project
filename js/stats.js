let totalPages = 0;
let totalBooks = 0;

function setTotalPages(num){
  totalPages = num;
}

function setTotalBooks(num){
  totalBooks = num;
}

function getTotalPages(){
  return totalPages;
}

function getTotalBooks(){
  return totalBooks;
}

function updateStats(){
  let progressList = getProgressList();
  let booksList = getBookList();
  let totalPages = 0;
  let totalBooks = 0;
  for(let x of progressList){
    totalPages += Number(x.nrPages);
  }
  for(let x of booksList){
    if (x.status === "past"){
      totalBooks++;
    }
  }
  setTotalPages(totalPages);
  setTotalBooks(totalBooks);
  renderStats();
}
//more abstraction needed
function renderStats(){
  document.getElementById('total-pages').innerHTML
    = `Total pages read: ${getTotalPages()}`;
  document.getElementById('total-books').innerHTML
      = `Total books read: ${getTotalBooks()}`;
}

window.onload = updateStats();
