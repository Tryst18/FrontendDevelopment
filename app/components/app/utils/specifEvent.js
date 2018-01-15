(function() {
    "use strict";
    var url = "https://api.tryst-iitd.com";

    var app$utils$specifEvent$$category = document.location.search.split("?")[1];
    // console.log(category)

    $(document).ready(function() {
    let xhr = new XMLHttpRequest();
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
                let user = JSON.parse(sessionStorage.getItem("authUser"))
                let regButton = document.getElementById('register')
                if (user) {
                    var pres = false
                    for (var l in user.registration) {
                        
                        if (data.id == user.registration[l].event_id) {
                            console.log('user')
                            regButton.innerHTML = '<button>View registration</button>'
                            pres = true
                            regButton.addEventListener('click', function() {
                                let xh = new XMLHttpRequest()
                                xh.open("GET", url+"/api/register/view/"+user.registration[l].reg_id, true)
                                xh.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                                xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                                xh.onreadystatechange = function () {
                                    if (xh.readyState == 4) {
                                        var json = JSON.parse(xh.responseText)
                                        if (xh.status == 200) {
                                            console.log(xh.responseText)
                                            if (json.error == false) {
                                                var data = json.data
                                                let mems = ''
                                                for (var t in data.members) {
                                                    if (data.members[t].email != data.email) {
                                                        mems += data.members[t].email+' '
                                                    }
                                                }
                                                $('#viewReg').append(
                                                    'Team Name: '+data.team_name+'<br>'+'Member(s): '+mems
                                                    +'<button id="delReg">Delete Registration</button>'
                                                )
                                                $('#delReg').click(function() {
                                                    console.log('worked')
                                                    let xt = new XMLHttpRequest()
                                                    xt.open("POST", url+"/api/register/delete/"+user.registration[l].reg_id, true)
                                                    xt.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                                                    xt.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                                                    xt.onreadystatechange = function () {
                                                        if (xh.readyState == 4) {
                                                            var json = JSON.parse(xh.responseText)
                                                            console.log(json)
                                                            if (xh.status == 200) {
                                                                console.log('done')
                                                                document.location.href = "../index.html"
                                                            }
                                                        }       
                                                    }
                                                    xt.send()
                                                })
                                                $('#viewReg').show() 
                                            }
                                            
                                        }
                                    }
                                }
                                xh.send()
                            })
                        }
                    }
                    if (!pres) {
                        regButton.innerHTML = '<button><a href="../register.html?'+stri+'">'+'Register</a></button>'
                    }
                } else {
                    regButton.innerHTML = '<button><a href="../login.html?'+stri+'">'+'Register</a></button>'
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