import {url} from "./index.js"

var token = document.location.search.split("?")[1]

let xhr = new XMLHttpRequest();
xhr.open("GET", url+"/api/user/verify_registration/"+token, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// document.getElementById('veri').hidden = true
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4){
        document.getElementById('veri').hidden = false
        document.getElementById('veri').innerHTML = JSON.parse(xhr.responseText).message    
        if (xhr.status === 200) {
            document.getElementById('veri').innerHTML = JSON.parse(xhr.responseText).message    
        }
    }
}
xhr.send()
