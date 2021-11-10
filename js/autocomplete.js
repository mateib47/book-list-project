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

}

addWordToRequest("crime", "and", "p");
sendRequest();
console.log(suggestions);
