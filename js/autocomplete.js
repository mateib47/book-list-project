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
    suggestions.push(response.items[i].volumeInfo.title);
  }
}

function autocomplete(inp, arr) {
  inp.addEventListener("input", function(e) {
    let val = this.value;
    addWordToRequest(val);
    sendRequest();
    console.log(val);
    if (!val){return false;}
    let a = document.createElement("div");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    console.log(a);
    for (let i = 0; i < 5; i++) {
      let b = document.createElement("div");
      b.innerHTML = "<p>" + arr[i] + "</p>";
      a.appendChild(b);
    }
  });
}


autocomplete(document.querySelector('#title-input'), suggestions);
console.log(suggestions);
