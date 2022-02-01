let totalPages = 0;
let totalBooks = 0;
let genresCount = [];
let progressMonth = [];
let topBooks = [];
let topAuthors = [{name:'none', count:-1}];
let averagePages = 0;
let genrePieChart, progressGraph;


function displayGenresPie(){
 if(genrePieChart) genrePieChart.destroy();
  const xValues =  genresCount.map(x => x.name);
  const yValues =  genresCount.map(x => x.count);
  const barColors = [
    "#f2d90e",
    "#d47b4a",
    "#c68767",
    "#684132",
    "#9d6e5e",
    "#c8b5aa",
    "#d8853f",
    "#d4e2b3",
    "#f9e3b7",
    "#3a2e27",
    "#d47b4a"
  ];
  genrePieChart = new Chart("genrePieChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Your most read genres"
      }
    }
  });

}

function displayProgressGraph(){// TODO: display values only in the current year and maybe use shorthand notation(oct, nov, dec)
  if(progressGraph) progressGraph.destroy();
  const xValues = progressMonth.sort((a,b) => a.month-b.month).map(x => months[x.month])
  const yValues = progressMonth.map(x => x.count);
  const max = yValues.reduce(function(a, b) {
    return Math.max(a, b);
  }, 0);
  const min = yValues.reduce(function(a, b) {
    return Math.min(a, b);
  }, 0);

  progressGraph = new Chart("progressGraph", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      scales: {
        yAxes: [{ticks: {min: 0, max:Math.ceil(max / 10) * 10}}],
      },
      title: {
        display: true,
        text: "Your reading progress"
      }
    }
  });
}

// TODO: remove getters and setters, they are useless
function setGenreCount(array) {
  genresCount = array;
}
function getGenresCount(){
  return genresCount;
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
  let genres =[];
  let monthsProgress = [];
  let authors =[];
  let days =0;
  if(!refEmail){
    for(let x of progressList){
      x.nrPages = 0;
      for(let b of x.bookList){
        x.nrPages += b.pages;
      }
    }
  }
  for(let x of progressList){
    let index = monthsProgress.map(e => e.month).indexOf(x.date['month']);
    if (index >= 0) {
      monthsProgress[index].count += x.nrPages;
    }else{
      monthsProgress.push({month:x.date['month'], count:x.nrPages});
    }
    totalPages += Number(x.nrPages);
    days++;
  }
  for(let x of booksList){
    if (x.status === "PAST"){
      totalBooks++;
    }
    updateArray(x.genre, genres);
    updateArray(x.author, authors);
  }
  topBooks = booksList.sort((a,b) => b.rating - a.rating).slice(0,booksList.length > 5 ? 5 : booksList.length);
  averagePages = totalPages / days;
  topAuthors = authors.sort((a,b) => b.count-a.count);
  progressMonth = monthsProgress;
  setGenreCount(genres);
  setTotalPages(totalPages);
  setTotalBooks(totalBooks);
  renderStats();
}

function updateArray(name, array) {
  if(name !== ''){
    let index = array.map(e => e.name).indexOf(name);
    if (index >= 0) {
      array[index].count++;
    }else{
      array.push({name:name, count:1});
    }
  }
}

function renderStats(){
  document.getElementById('total-pages').innerHTML
    = `Total pages read: ${getTotalPages()}`;
  document.getElementById('total-books').innerHTML
      = `Total books read: ${getTotalBooks()}`;
  document.getElementById('fav-author').innerHTML
      = `The most read author: ${topAuthors[0].name}`;
  document.getElementById('average-pages').innerHTML
      = `Average pages read per day: ${Math.round(averagePages)}`;
   let topBooksHTML = '';
  topBooksHTML+= `<p>Your favourite books: </p><ol>`;
 for(let i=0;i<topBooks.length;i++){
   topBooksHTML += `<li>${topBooks[i].title}</li>`;
 }
  topBooksHTML += '</ol>';
  document.getElementById('top-books').innerHTML = topBooksHTML;
  displayGenresPie();
  displayProgressGraph();
}

window.onload = updateStats();
