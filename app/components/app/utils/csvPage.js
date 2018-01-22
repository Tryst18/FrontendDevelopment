(function() {
    "use strict";
    const $$index$$url = "https://api.tryst-iitd.com";

    function $$index$$updateUser(rel) {
        // console.log("this")
        var xh = new XMLHttpRequest();
        xh.open("GET", $$index$$url+"/api/user/view", true);
        xh.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
        xh.onreadystatechange = function () {
            if (xh.readyState === 4){
                if (xh.status === 200) {
                    var jon = JSON.parse(xh.responseText);
                    var dta = jon.data;
                    // console.log(xhr.responseText)
                    if (jon.error == false) {
                        // console.log(dta)
                        // console.log("this hap")
                        sessionStorage.setItem("authUser", JSON.stringify(dta))
                        if (rel) {
                            document.location.reload(true)
                        }
                    }
                }
            }
        }
        xh.send()
    }

    function $$index$$linkExtract(str) {
        let arr = str.split('=')
        // console.log(arr[1])
        return 'https://drive.google.com/uc?id='+arr[1]+'&export=view'
    }

    if (sessionStorage.getItem('token')) {
        let app$utils$csvPage$$id = document.location.search.split("?")[1]
        var app$utils$csvPage$$xhr = new XMLHttpRequest();
        app$utils$csvPage$$xhr.open("GET", $$index$$url+"/api/event/registrations/"+app$utils$csvPage$$id, true);
        app$utils$csvPage$$xhr.setRequestHeader("Content-type", "application/json");
        app$utils$csvPage$$xhr.setRequestHeader("x-auth-token", sessionStorage.getItem('token'))
        document.getElementById('extra').innerText = 'Loading'
        app$utils$csvPage$$xhr.onreadystatechange = function () {
            if (app$utils$csvPage$$xhr.readyState === 4) {
                let json = JSON.parse(app$utils$csvPage$$xhr.responseText)
                document.getElementById('extra').innerText = json.message
                if (app$utils$csvPage$$xhr.status === 200) {
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
        app$utils$csvPage$$xhr.send()
    } else {
        document.getElementById('extra').innerHTML = '<a href="adminPortal.html">Login here</a>'
    }
}).call(this);