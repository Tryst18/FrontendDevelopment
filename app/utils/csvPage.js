import {url} from "./index.js"

if (sessionStorage.getItem('token')) {
    let id = document.location.search.split("?")[1]
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url+"/api/event/registrations/"+id, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("x-auth-token", sessionStorage.getItem('token'))
    document.getElementById('extra').innerText = 'Loading'
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let json = JSON.parse(xhr.responseText)
            document.getElementById('extra').innerText = json.message
            if (xhr.status === 200) {
                if (json.error == false) {
                    let tableSpace = document.getElementById('table')
                    let str = '<table>'
                    let rows = json.data.split("\n")
                    for (var x in rows) {
                        rows[x] = rows[x].substr(1).slice(0, -1)
                        str += '<tr><td>'+x+'</td>'
                        let row = rows[x].split("\",\"")
                        console.log(row)
                        for (var y in row) {
                            str += '<td>'+row[y]+'</td>'
                        }
                        str += '</tr>'
                    }
                    str += '</table>'
                    tableSpace.insertAdjacentHTML('beforeend', str)
                    ocument.getElementById('extra').insertAdjacentHTML('beforeend', 'Copy this table to a sheet')
                }
            }
        }
    }
    xhr.send()
} else {
    document.getElementById('extra').innerHTML = '<a href="adminPortal.html">Login here</a>'
}