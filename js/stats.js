let totalPages = 0;

function setTotalPages(num){
  totalPages = num;
}

function getTotalPages(){
  return totalPages;
}

function updateStats(){
  let progressList = getProgressList();
  let totalPages = 0;
  for(let x of progressList){
    totalPages += Number(x.nrPages);
  }
  setTotalPages(totalPages);
  renderStats();
}

function renderStats(){
  document.getElementById('total-pages').innerHTML
    = `Total pages read: ${getTotalPages()}`
}

window.onload = updateStats();
