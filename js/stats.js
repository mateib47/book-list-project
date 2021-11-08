let totalPages = 0;
let totalBooks = 0;
let genresCount = [];
let progressMonth = [];


function displayGenresPie(){

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
      legend: {display: false},
      title: {
        display: true,
        text: "Your most read genres"
      }
    }
  });

}

function displayProgressGraph(){// TODO: display values only in the current year and maybe use shorthand notation(oct, nov, dec)
  const xValues = progressMonth.map(x => months[x.month]).reverse();
  const yValues = progressMonth.map(x => x.count);
  const max = yValues.reduce(function(a, b) {
    return Math.max(a, b);
  }, 0);
  const min = yValues.reduce(function(a, b) {
    return Math.min(a, b);
  }, 0);

  new Chart("progressGraph", {
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
  for(let x of progressList){
    let index = monthsProgress.map(e => e.month).indexOf(x.date['month']);
    if (index >= 0) {
      monthsProgress[index].count += x.nrPages;
    }else{
      monthsProgress.push({month:x.date['month'], count:x.nrPages});
    }
    totalPages += Number(x.nrPages);
  }
  for(let x of booksList){
    if (x.status === "past"){
      totalBooks++;
    }
    let index = genres.map(e => e.name).indexOf(x.genre);
    if (index >= 0) {
      genres[index].count++;
    }else{
      genres.push({name:x.genre, count:1});
    }
  }
  progressMonth = monthsProgress;
  setGenreCount(genres);
  setTotalPages(totalPages);
  setTotalBooks(totalBooks);
  renderStats();
}
function renderStats(){
  document.getElementById('total-pages').innerHTML
    = `Total pages read: ${getTotalPages()}`;
  document.getElementById('total-books').innerHTML
      = `Total books read: ${getTotalBooks()}`;
  displayGenresPie();
  displayProgressGraph();
}

window.onload = updateStats();
