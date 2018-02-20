import {url} from "./index.js"

let xhr = new XMLHttpRequest()
xhr.open("GET", url + "/api/event/getCategories", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function () {
    main.innerText = 'loading...'
    if (xhr.readyState === 4) {
        let json = JSON.parse(xhr.responseText)
        let main = document.getElementById('main')
        main.innerText = json.message
        if (xhr.status === 200) {
            let events = json.data
            let keyArr = Object.keys(json.data)
            for (var x in keyArr) {
                main.insertAdjacentHTML('beforeend', '<h1>'+keyArr[x]+'</h1>')
                let speCat = events[keyArr[x]]
                for (var y in speCat) {
                    var purp = document.location.search.split('?')[1]
                    if (purp == 'c'){
                        main.insertAdjacentHTML('beforeend', '<a href="csvPage.html?'+speCat[y].id+'">'+speCat[y].name+'</a>, ')
                    } else if (purp == 'g') {
                        main.insertAdjacentHTML('beforeend', '<a href="change.html?'+speCat[y].id+'?'+speCat[y].name+'">'+speCat[y].name+'</a>, ')
                    }
                }
            }
        }
    }
}
xhr.send()