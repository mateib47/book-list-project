let request = "https://www.googleapis.com/books/v1/volumes?q=";
let callback = "&callback=handleResponse";
let suggestions = [];

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
      for (let i = 0; i < 5; i++) {
        let b = document.createElement("div");
        b.innerHTML = "<p>" + suggestions[i].volumeInfo.title + "</p>";
        a.appendChild(b);
      }
    }, 5000);

  });
}
function clearPrevious() {
  document.querySelector('#autocomplete-div').innerHTML = '';
}
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}



autocomplete(document.querySelector('#title-input'));
