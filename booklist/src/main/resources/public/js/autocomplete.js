let request = "https://www.googleapis.com/books/v1/volumes?q=";
let callback = "&callback=handleResponse&langRestrict=en";
let bookChoice;

function autocomplete(inp) {
  inp.addEventListener("input", function(e) {
    let a = document.createElement("div");
    a.setAttribute("id", this.id + "-autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    document.querySelector('#autocomplete-div').appendChild(a);
    let val = this.value;
    if (!val){return false;}
    let words = val.split(' ').join('+');
    words += '&langRestrict=en';
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + words).then(
        function (response) {
          return response.json();
        }).then(function (data) {
      data = data["items"];
      for (let i = 0; i < 5 && data[i]; i++) {
        let b = document.createElement("div");
        b.innerHTML = "<p>" + data[i].volumeInfo.title + " by "+data[i].volumeInfo.authors[0] + "</p>";
        b.innerHTML += "<input type='hidden' value='" +i + "'>";
        b.addEventListener('click', function(e) {
          let index = this.getElementsByTagName("input")[0].value;
          fillForm(index, data);
          clearPrevious();
        });
        a.appendChild(b);
      }
      return true;
    }).catch(function (err) {
      console.warn('Something went wrong.', err);
      return false;
    });
  });
}

function fillForm(i, suggestions) {
  document.getElementById('title-input').value = suggestions[i].volumeInfo.title;
  document.getElementById('author-input').value = suggestions[i].volumeInfo.authors[0];
  document.getElementById('genre-input').value = suggestions[i].volumeInfo.categories[0];
  document.getElementById('pages-input').value = suggestions[i].volumeInfo.pageCount;
  document.getElementById('apiId-input').value = suggestions[i].id;
  bookChoice = suggestions[i];
}

function clearPrevious() {
  document.querySelector('#autocomplete-div').innerHTML = '';
}
function getApiBookById(id){
  let xhr = new XMLHttpRequest();
  let url = 'https://www.googleapis.com/books/v1/volumes?q=' + id;
  xhr.open("GET", url, false);
  xhr.send('');
  return xhr.responseText;
}
function getApiBook(array){
  let xhr = new XMLHttpRequest();
  let url = 'https://www.googleapis.com/books/v1/volumes?q=' + array + '&langRestrict=en';
  xhr.open("GET", url, false);
  xhr.send('');
  return JSON.parse(xhr.responseText).items;
}

autocomplete(document.querySelector('#title-input'));
