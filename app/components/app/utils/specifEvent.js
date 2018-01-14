(function() {
    "use strict";
    var url = "https://api.tryst-iitd.com";

    var app$utils$specifEvent$$category = document.location.search.split("?")[1];
    // console.log(category)

    $(document).ready(function() {let xhr = new XMLHttpRequest();
    xhr.open("GET", url+"/api/event/view/"+app$utils$specifEvent$$category, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4){
            if (xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                // console.log(json)
                var data = json.data
                document.getElementById('description').innerText = data.description
                document.getElementById('probState').innerHTML = '<a href='+data.url+'>Click here for Problem Statement</a>'
                document.getElementById('prizes').innerText = data.prizes
                document.getElementById('image').innerHTML = '<img id="event-logos" src=../images/'+data.name+'.png>'
                let stri = data.id+'='+data.name+((data.reg_type == "team")? '=1':'')
                let user = sessionStorage.getItem("authUser")
                if (user) {
                    var pres = false
                    for (var l in user.registration) {
                        if (data.id == user.registration[l]) {
                            document.getElementById('register').innerHTML = '<button><a href="../viewReg.html?'+user.registration[l].reg_id+'">'+'View registration</a></button>'
                            pres = true
                        }
                    }
                    if (!pres) {
                        document.getElementById('register').innerHTML = '<button><a href="../register.html?'+stri+'">'+'Register</a></button>'
                    }
                } else {
                    document.getElementById('register').innerHTML = '<button><a href="../login.html?'+stri+'">'+'Register</a></button>'
                }
                // document.getElementById('register').innerHTML = (sessionStorage.getItem("authUser"))? ('<button><a href="../register.html?'+stri+'">'+'Register</a></button>'):('<button><a href="../login.html?'+stri+'">'+'Register</a></button>')
                // document.getElementById('register').innerHTML = '<button><a href ="http://iitd.info/EnvironmenD">Register</a></button>'
                var cont = 'For queries, contact at '
                for (var x in data.poc) {
                    cont += data.poc[x] + ((x<data.poc.length-1)? ', ':'')
                }
                document.getElementById('poc').innerText = cont

                document.getElementById('title').innerText = data.name
            }
        }
    }
    xhr.send()});
}).call(this);