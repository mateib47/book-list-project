let totalPages = 0;

function setTotalPages(num){
  totalPages = num;
}

function getTotalPages(){
  return totalPages;
}

function updateStats(){
  let progressList = getProgressList();
  console.log(progressList);
  let totalPages = 0;
  for(let x of progressList){
    totalPages += Number(x.nrPages);
    console.log(totalPages);

  }
  setTotalPages(totalPages);
  renderStats();
}

function renderStats(){
  document.getElementById('total-pages').innerHTML
    = `Total pages read: ${getTotalPages()}`
}

window.onload = updateStats();
