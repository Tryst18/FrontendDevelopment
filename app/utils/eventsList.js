import "./index.js"
let xhr = new XMLHttpRequest();
xhr.open("POST", url+"/api/events/viewcategory", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
document.getElementById('loading').style.display = "inline";
document.getElementById('loading').style.display = "inline";
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4){
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    }

}

function onClick(e) {
    console.log(e.target);
    console.log(e);
}

var eventsButton = document.getElementsByClassName('container');
var x = 0;
while (x < eventsButton.length) {
    console.log(eventsButton[x]);
    eventsButton[x].addEventListener('click', onClick);
    x++;
}

function createEventCat() {
    
}