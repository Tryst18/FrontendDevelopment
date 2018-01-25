import {url} from "./index.js"


let xhr = new XMLHttpRequest();
xhr.open("GET", url + "/api/event/getCategories", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
console.log(sessionStorage.getItem('useReg'))
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            let json = JSON.parse(xhr.responseText)
            let guestLecs = json.data.guest
            console.log(guestLecs)
        }
    }
}
xhr.send()