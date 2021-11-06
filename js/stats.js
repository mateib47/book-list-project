let totalPages = 0;
let totalBooks = 0;
let genresCount = [];

function genresPie(){
  var xValues = ["Scientific","Self-help", "Biography", "Historical", "Fiction", "Philosophy","Fantasy", "Scifi","Romance", "Other"];
  var yValues = genresCount.map(x -> x.count);
  var barColors = [
    "#f2d90e",
    "#d47b4a",
    "#c68767",
    "#684132",
    "#9d6e5e",
    "#c8b5aa",
    "#d8853f",
    "#d4e2b3",
    "#f9e3b7",
    "#3a2e27"
  ];

  new Chart("genrePieChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Your most read genres"
      }
    }
  });

}

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
  genresPie();
}

window.onload = updateStats();
