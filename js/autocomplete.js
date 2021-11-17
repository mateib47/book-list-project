let request = "https://www.googleapis.com/books/v1/volumes?q=";
let callback = "&callback=handleResponse";
let suggestions = [];
let bookChoice;

function addWordToRequest(){
  for(let i=0; i < arguments.length; i++){
    request += arguments[i];
    if(i != 0 && i != arguments.length-1){
      request += '+';
    }
  }
}

function resetRequest(){
  request = "https://www.googleapis.com/books/v1/volumes?q=";
  suggestions = [];
}

function sendRequest(){
  let script = document.createElement("script");
  script.src = request+callback;
  document.body.appendChild(script);
}

function handleResponse(response){
  for (let i = 0; i < response.items.length; i++) {
    suggestions.push(response.items[i]);
  }
}

async function autocomplete(inp) {
  inp.addEventListener("input", function(e) {
    clearPrevious();
    let val = this.value;
    if (!val){return false;}
    resetRequest();
    addWordToRequest(val.split(' ').join('+'));
    sendRequest();
    let arr = suggestions.map(e => e.volumeInfo.title);
    setTimeout(function(){
      let a = document.createElement("div");
      a.setAttribute("id", this.id + "-autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      document.querySelector('#autocomplete-div').appendChild(a);
      for (let i = 0; i < 5 && suggestions[i]; i++) {
        let b = document.createElement("div");
        b.innerHTML = "<p>" + suggestions[i].volumeInfo.title + " by "+suggestions[i].volumeInfo.authors[0] + "</p>";
        b.innerHTML += "<input type='hidden' value='" +i + "'>";
        b.addEventListener('click', function(e) {
          let index = this.getElementsByTagName("input")[0].value;
          fillForm(index);
          clearPrevious();
        });
        a.appendChild(b);
      }
    }, 500);
  });
}

function fillForm(i) {
  document.getElementById('title-input').value = suggestions[i].volumeInfo.title;
  document.getElementById('author-input').value = suggestions[i].volumeInfo.authors[0];
  document.getElementById('genre-input').value = suggestions[i].volumeInfo.categories[0];
  document.getElementById('pages-input').value = suggestions[i].volumeInfo.pageCount;
  document.getElementById('api-id').value = suggestions[i].id;
  bookChoice = suggestions[i];
}

function clearPrevious() {
  document.querySelector('#autocomplete-div').innerHTML = '';
}

autocomplete(document.querySelector('#title-input'));
