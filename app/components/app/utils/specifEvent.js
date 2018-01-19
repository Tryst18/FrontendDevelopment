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

    var app$utils$specifEvent$$event = document.location.search.split("?")[1];
    let app$utils$specifEvent$$user = JSON.parse(sessionStorage.getItem("authUser"));
    // console.log(category)
    function app$utils$specifEvent$$delReg(id) {
        // console.log('worked')
        let xt = new XMLHttpRequest()
        xt.open("POST", $$index$$url+"/api/register/delete/"+id, true)
        xt.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xt.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
        xt.onreadystatechange = function () {
            if (xt.readyState == 4) {
                var json = JSON.parse(xt.responseText)
                // console.log(json)
                if (xt.status == 200) {
                    // console.log('done')
                    $$index$$updateUser(true)
                    // document.location.reload(true)
                }
            }       
        }
        xt.send()
    }

    $(document).ready(function() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", $$index$$url+"/api/event/view/"+app$utils$specifEvent$$event, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4){
            if (xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                // console.log(json)
                var data = json.data
                document.getElementById('description').innerText = data.description
                document.getElementById('probState').innerHTML = '<button><a href='+data.url+'>Click here for Problem Statement</a></button>'
                document.getElementById('prizes').innerText = data.prizes
                let phot = (data.photos && data.photos.length)? data.photos[0]:''
                document.getElementById('image').innerHTML = '<img id="event-logos" src='+$$index$$linkExtract(phot)+'>'
                let stri = data.id+'='+data.name
                
                let regButton = document.getElementById('register')
                if (data.name=="EnvironmenD") {
                    document.getElementById('register').innerHTML = '<button><a href ="http://iitd.info/EnvironmenD">Register</a></button>'
                } else if (data.reg_mode == "website"){
                    console.log(data.reg_mode)
                    if (app$utils$specifEvent$$user) {
                        var pres = false
                        for (var l in app$utils$specifEvent$$user.registration) {  
                            if (data.id == app$utils$specifEvent$$user.registration[l].event_id) {
                                // console.log(data.id, "here")
                                pres = true
                                if (data.reg_type == "team") { 
                                    // console.log('user')
                                    regButton.innerHTML = '<button>View registration</button>'
                                    regButton.addEventListener('click', function() {
                                        let xh = new XMLHttpRequest()
                                        xh.open("GET", $$index$$url+"/api/register/view/"+app$utils$specifEvent$$user.registration[l].reg_id, true)
                                        xh.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                                        xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                                        xh.onreadystatechange = function () {
                                            if (xh.readyState == 4) {
                                                var json = JSON.parse(xh.responseText)
                                                if (xh.status == 200) {
                                                    // console.log(xh.responseText)
                                                    if (json.error == false) {
                                                        var data = json.data
                                                        let mems = ''
                                                        for (var t in data.members) {
                                                            // if (data.members[t].email != user.email) {
                                                                mems += data.members[t].email+' '
                                                            // }
                                                        }
                                                        $('#viewReg').append(
                                                            'Team Name: '+data.team_name+'<br>'+'Member(s): '+mems
                                                            +'<button id="delReg">Delete Registration</button>'
                                                        )
                                                        $('#delReg').click(function() {
                                                            app$utils$specifEvent$$delReg(app$utils$specifEvent$$user.registration[l].reg_id)
                                                        })

                                                        $('#viewReg').show() 
                                                    }
                                                    
                                                }
                                            }
                                        }
                                        xh.send()
                                    })
                                } else {
                                    regButton.innerHTML = '<button id="regsin">Delete Registration</button>'
                                    document.getElementById('regsin').addEventListener('click', function() {
                                        app$utils$specifEvent$$delReg(app$utils$specifEvent$$user.registration[l].reg_id)
                                    })
                                }
                                break; 
                            }
                        }
                        if (!pres) {
                            if (data.reg_type == "team") {
                                regButton.innerHTML = '<button><a href="../register.html?'+stri+'">'+'Register</a></button>'
                            } else {
                                // console.log('thi')
                                regButton.innerHTML = '<input id="source" placeholder="Mention source (Name, if campus ambassador)"><button id="regsin">Register</button>'
                                document.getElementById('regsin').addEventListener('click', function(){
                                    // console.log('this happened')
                                    var xr = new XMLHttpRequest();
                                    xr.open("POST", $$index$$url+"/api/register/register", true);
                                    xr.setRequestHeader("Content-type", "application/json");
                                    xr.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                                    // document.getElementById('loading').style.display = "inline";
                                    xr.onreadystatechange = function () {
                                        if (xr.readyState === 4){
                                            var son = JSON.parse(xr.responseText);
                                            var ata = son.ata;
                                            // console.log(JSON.parse(xr.response))
                                            // document.getElementById('loading').innerText = json.message;
                                            if (xr.status === 200) {
                                                
                                                // console.log(xr.responseText)
                                                if (son.error == false) {
                                                    // console.log('this happened too')
                                                    $$index$$updateUser(true)

                                                }
                                            }
                                        }
                                    }
                                    // console.log(event)
                                    var send = Object.assign({}, {"event_id": app$utils$specifEvent$$event, "members": [{"email":app$utils$specifEvent$$user.email}], team_name: "null", "source": document.getElementById('source')})
                                    xr.send(JSON.stringify(send))
                                })
                            } 
                        }
                    } else {
                        regButton.innerHTML = '<button><a href="../login.html?'+stri+'">'+'Register</a></button>'
                    }
                } else if (data.reg_mode == "external"){
                    document.getElementById('register').innerHTML = '<button><a href ="'+data.reg_link+'">Register</a></button>'
                } else {
                    document.getElementById('register').innerHTML = '<button><a href ="mailto:'+data.reg_email+'">Register</a></button>'
                }
                    // document.getElementById('register').innerHTML = (sessionStorage.getItem("authUser"))? ('<button><a href="../register.html?'+stri+'">'+'Register</a></button>'):('<button><a href="../login.html?'+stri+'">'+'Register</a></button>')
                var cont = 'For queries, contact at ' + '<br>'
                
                for (var y in data.poc) {
                    let keyCont = Object.keys(data.poc[y])
                    for (var x in keyCont) {
                        cont += keyCont[x] + ': '+ data.poc[y][keyCont[x]] + ((x<keyCont.length-1)? ', ':'')
                    }
                    cont += '<br>'
                }
                document.getElementById('poc').innerHTML = cont

                document.getElementById('title').innerText = data.name
                
            }
        }
    }


    xhr.send()});
}).call(this);