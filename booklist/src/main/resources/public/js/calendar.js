let months = ['January','February','March','April',
  'May','June','July','August','September','October',
  'November','December'];
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
     return a.day == b.day && a.month == b.month && a.year == b.year;

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
  const currentDate = getCurrentDate();
  const progressList = getProgressList();
  let monthCurrent = document.querySelector('#month-name');
  monthCurrent.innerHTML=`${months[currentDate.month]+" "+currentDate.year}`;
  list.innerHTML = "";
  for(let i=1;i<=getDaysInMonth(currentDate.month,currentDate.year);i++){
    const node = document.createElement('li');
    let nodeDate = toDateObj(i, currentDate.month, currentDate.year);
    node.setAttribute('id', 'calendar-item');
    let pages = 0;
    let id = 0;
    if(progressList.find(obj => {pages = obj.totalPages;id = obj.id; return dateEquals(obj.date,nodeDate)})){
      node.setAttribute('class','box');
      node.style.backgroundColor = getColor(pages);
      node.setAttribute('data-key', id);
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

function addProgress(totalPages,bookId,date){// FIXME: highly complicated function; make it more readable
//if the progress is added for a book whose status is future, it should be changed to present
  let pages = Number(totalPages);
  addPages(bookId,pages);
  let booksRecord = [{bookId,pages:totalPages}];
  getProgressList().forEach(obj =>
    {
      if(dateEquals(obj.date,date)){
        pages += Number(obj.totalPages);
        if(obj.bookList.every(x => {if(x.bookId == bookId) {
          x.pages = Number(x.pages)+Number(totalPages);
          return false;
        }
        return true;})){
          booksRecord.push(...obj.bookList);
          removeProgress(obj.id);
        }else{
          booksRecord = [...obj.bookList];
          removeProgress(obj.id);
        }
      }
    });
  const progress = {
    id : Date.now(),
    totalPages:pages,
    bookList:booksRecord,
    date
  }
  progressList.push(progress);
  localStorage.setItem('progressRef', JSON.stringify(progressList));
  renderCalendar();
}

const progressForm = document.querySelector('#progress-form');
progressForm.addEventListener('submit',event => {
  event.preventDefault();
  const inputPages = document.querySelector('#nr-pages-input');
  const inputDate = document.querySelector('#date-input');
  const inputBook = document.querySelector('#select-book');
  const bookId = inputBook.value;
  const pages = inputPages.value.trim();
  if(pages !== '' && inputDate !== ''){
    addProgress(pages,bookId,toDateObj(inputDate));
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

function dateObjToString(obj){
  return String(obj.day).padStart(2,'0')+String(obj.month).padStart(2,'0')+obj.year;
}

function populateSelect(){
  const select = document.querySelector('#select-book');
  select.innerHTML='';
  const bookList = getBookList();
  for (let book of bookList){
    if (book.status == 'PRESENT' || book.status == 'FUTURE'){
      let opt = document.createElement('option');
      opt.value = book.id;
      opt.innerHTML = book.title;
      select.appendChild(opt);
    }
  }
}

const calendar = document.querySelector('#days-list');
calendar.addEventListener('click', event => {
  if(event.target.id == 'calendar-item'){
    const id = event.target.dataset.key
    if(id){
      const item = progressList.find(obj => obj.id == id);
      const bookList = getBookList();
      const bookMap = item.bookList.map(x => bookList.find(book => book.id === x.bookId).id);
      document.querySelector('#progress-item-details').innerHTML = `
      <div class="date-divider">
        <p class="item-date">${item.date.day}-${item.date.month+1}-${item.date.year}</p>
        <div class="divider"></div>
      </div>
      <div class="details-text">
        <p>Pages read this day: ${item.totalPages}</p>
        <p>From: ${bookMap.join(", ")}</p>
      </div>
      <div class="divider"></div>
      `;
    }else{
      document.querySelector('#progress-item-details').innerHTML = `
        <div class="divider"></div>
        <div class="details-empty">
        <p>You had no activity during this day</p>
        </div>
        <div class="divider"></div>
      `;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const refProgress = localStorage.getItem('progressRef');
  if(refProgress){
    progressList = JSON.parse(refProgress);
    renderCalendar();
    updateStats();
  }
});

function apiGetProgress(email){
  let xhr = new XMLHttpRequest();
  let url = 'http://localhost:8080/api/v1/progress/get?email=' + email;
  xhr.open("GET", url, false);
  xhr.send('');
  let response = JSON.parse(xhr.responseText);
  for(let e of response){
    let date = e.date.substring(0,10).split('-');
    e.date = {year:date[0], month:Number(date[1])-1, day:date[2]}
  }
  return response;
}

function apiPostProgress(progress){
  let xhr = new XMLHttpRequest();
  let url = 'http://localhost:8080/api/v1/progress/add';
  xhr.open("POST", url, false);
  let progressJson = JSON.stringify(progress);
  xhr.send(progressJson);
}
