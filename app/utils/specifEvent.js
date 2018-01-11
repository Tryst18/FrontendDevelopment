import "./index.js"

var category = document.location.search.split("?")[1]
console.log(category)

$(document).ready(function() {let xhr = new XMLHttpRequest();
xhr.open("GET", url+"/api/event/view/"+category, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4){
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json)
            document.getElementById()
        }
    }
}
xhr.send()});