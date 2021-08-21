let months = ['January','February','March','April',
  'May','June','July','August','September','October',
  'November','Deceber'];
let currentDate = initCurrentDate();
let progressList = [];

function initCurrentDate(){
  const dateObj = new Date();
  return toDateObj(dateObj.getDate(),dateObj.getMonth(),dateObj.getFullYear());
}

function getCurrentDate(){
  return currentDate;
}
function getProgressList(){
  return [...progressList];
}
function setProgressList(list){
  progressList = list;
}

function dateEquals(a, b)
 {
     if (a.day==b.day && a.month==b.month && a.year==b.year)
      return true;
      return false;
  }

function getColor(pages){
  if (pages <= 5) {return 'hsl(132,25%,25%)';} else
  if (pages <= 10) {return 'hsl(132,30%,30%)';} else
  if (pages <= 20) {return 'hsl(132,35%,35%)';} else
  if (pages <= 50) {return 'hsl(132,40%,40%)';} else
  if (pages <= 100) {return 'hsl(132,45%,45%)';} else
  if (pages <= 200) {return 'hsl(132,50%,50%)';} else
  {return 'hsl(132,55%,55%)';}
}

function renderCalendar() {
  const list = document.querySelector('#days-list');
  const currentDate = getCurrentDate();getDaysInMonth(currentDate.month,currentDate.year)
  const progressList = getProgressList();
  let monthCurrent = document.querySelector('#month-name');
  monthCurrent.innerHTML=`${months[currentDate.month]+" "+currentDate.year}`;
  list.innerHTML = "";
  for(let i=1;i<=getDaysInMonth(currentDate.month,currentDate.year);i++){
    const node = document.createElement('li');
    let nodeDate = toDateObj(i, currentDate.month, currentDate.year);
    node.setAttribute('data-key', nodeDate);
    let pages = 0;
    if(progressList.find(obj => {pages = obj.nrPages; return dateEquals(obj.date,nodeDate)})){
      node.setAttribute('class','box');
      node.style.backgroundColor = getColor(pages);
    }else{
      node.setAttribute('class','box grey');
    }
    list.append(node);
  }
  if(typeof updateStats === "function")
    updateStats();
}
window.onload = renderCalendar();


function calendarNext(){
  if(currentDate.month < 11){
    currentDate.month++;
  }else{
    currentDate.month = 0;
    currentDate.year++;
  }
  renderCalendar();
}

function calendarPrev(){
  if(currentDate.month > 0){
    currentDate.month--;
  }else{
    currentDate.month = 11;
    currentDate.year--;
  }
  renderCalendar();
}

function getDaysInMonth(month,year){
  return new Date(year,month + 1,0).getDate();
}

function removeProgress(key) {
  const index = getProgressList().findIndex(x => x.id === Number(key));
  setProgressList(progressList.filter(x => x.id !== Number(key)));
}

function addProgress(nrPages,book,date){// FIXME: highly complicated function; make it more readable
  let pages = Number(nrPages);
  let booksRecord = [{book,pages:nrPages}];
  getProgressList().forEach(obj =>
    {
      if(dateEquals(obj.date,date)){
        pages += Number(obj.nrPages);
        if(obj.books.every(x => {if(x.book == book) {
          x.pages = Number(x.pages)+Number(nrPages);
          return false;
        }
        return true;})){
          booksRecord.push(...obj.books);
          removeProgress(obj.id);
        }else{
          booksRecord = [...obj.books];
          removeProgress(obj.id);
        }
      }
    });
  const progress = {
    id : Date.now(),
    nrPages:pages,
    books:booksRecord,
    date
  }
  progressList.push(progress);
  localStorage.setItem('progressRef', JSON.stringify(progressList));
  renderCalendar();
}

const progressForm = document.querySelector('#progress-form');
progressForm.addEventListener('submit',event => {
  event.preventDefault();
  const inputPages = document.querySelector('#pages-input');
  const inputDate = document.querySelector('#date-input');
  const inputBook = document.querySelector('#select-book');
  const book = inputBook.value;
  const pages = inputPages.value.trim();
  if(pages !== '' && inputDate !== ''){
    addProgress(pages,book,toDateObj(inputDate));
    inputPages.value = '';
    inputDate.value = '';
    inputBook.value = '';
  }
});

function toDateObj(day,month,year){
  if(arguments.length == 3){
    return { day, month, year };
  }else if(arguments.length == 1){
    const dateArr = arguments[0].value.split("-");
    return { day:dateArr[2], month:dateArr[1] - 1, year:dateArr[0]};
  }
}//transform to zero based value for the month

function populateSelect(){
  const select = document.querySelector('#select-book');
  select.innerHTML='';
  const bookList = getBookList();
  for (let book of bookList){
    let opt = document.createElement('option');
    opt.value = book.title;
    opt.innerHTML = book.title;
    select.appendChild(opt);
  }
}
// FIXME: the dropdown behaviour is not ok

document.addEventListener('DOMContentLoaded', () => {
  const refProgress = localStorage.getItem('progressRef');
  if(refProgress){
    progressList = JSON.parse(refProgress);
    renderCalendar();
    updateStats();
  }
});
