import {url, updateUser, linkExtract} from "./index.js"

var event = document.location.search.split("?")[1]
let user = JSON.parse(sessionStorage.getItem("authUser"))
// console.log(category)
function delReg(id) {
    // console.log('worked')
    let xt = new XMLHttpRequest()
    xt.open("POST", url+"/api/register/delete/"+id, true)
    xt.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xt.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
    xt.onreadystatechange = function () {
        if (xt.readyState == 4) {
            var json = JSON.parse(xt.responseText)
            // console.log(json)
            if (xt.status == 200) {
                // console.log('done')
                updateUser(true)
                // document.location.reload(true)
            }
        }       
    }
    xt.send()
}

$(document).ready(function() {
let xhr = new XMLHttpRequest();
xhr.open("GET", url+"/api/event/view/"+event, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4){
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            // console.log(json)
            var data = json.data
            document.getElementById('description').innerText = data.description
            document.getElementById('probState').innerHTML = '<a href='+data.url+'><button>Click here for Problem Statement</button></a>'
            document.getElementById('prizes').innerText = data.prizes
            let phot = (data.photos && data.photos.length)? data.photos[0]:''
            document.getElementById('image').innerHTML = '<img id="event-logos" src='+linkExtract(phot)+'>'
            let stri = data.id+'='+data.name
            
            let regButton = document.getElementById('register')
            if (data.name=="EnvironmenD") {
                document.getElementById('register').innerHTML = '<a href ="http://iitd.info/EnvironmenD"><button>Register</button></a>'
            } else if (data.reg_mode == "website"){
                console.log(data.reg_mode)
                if (user) {
                    var pres = false
                    for (var l in user.registration) {  
                        if (data.id == user.registration[l].event_id) {
                            // console.log(data.id, "here")
                            pres = true
                            if (data.reg_type == "team") { 
                                // console.log('user')
                                regButton.innerHTML = '<button>View registration</button>'
                                regButton.addEventListener('click', function() {
                                    let xh = new XMLHttpRequest()
                                    xh.open("GET", url+"/api/register/view/"+user.registration[l].reg_id, true)
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
                                                        delReg(user.registration[l].reg_id)
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
                                    delReg(user.registration[l].reg_id)
                                })
                            }
                            break; 
                        }
                    }
                    if (!pres) {
                        if (data.reg_type == "team") {
                            regButton.innerHTML = '<a href="../register.html?'+stri+'"><button>'+'Register</button></a>'
                        } else {
                            // console.log('thi')
                            // document.getElementById('srcp').innerHTML = '<input id="src" placeholder="Mention source (Name, if campus ambassador)">'
                            regButton.innerHTML = '<input id="src" name="source" type="text" placeholder="Source (Name, if campus ambassador)"><button id="regsin">Register</button>'
                            document.getElementById('regsin').addEventListener('click', function(){
                                // console.log('this happened')
                                var xr = new XMLHttpRequest();
                                xr.open("POST", url+"/api/register/register", true);
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
                                                updateUser(true)

                                            }
                                        }
                                    }
                                }
                                // console.log(event)
                                var send = Object.assign({}, {"event_id": event, "members": [{"email":user.email}], team_name: "null", "source": document.getElementById('src').value})
                                xr.send(JSON.stringify(send))
                            })
                        } 
                    }
                } else {
                    if (data.reg_type=="team") {
                        regButton.innerHTML = '<a href="../login.html?'+stri+'"><button>'+'Register</button></a>'
                    } else {
                        regButton.innerHTML = '<a href="../login.html?'+'"><button>'+'Register</button></a>'
                    }
                }
            } else if (data.reg_mode == "external"){
                document.getElementById('register').innerHTML = '<a href ="'+data.reg_link+'"><button>Register</button></a>'
            } else {
                document.getElementById('register').innerHTML = '<a href ="mailto:'+data.reg_email+'"><button>Register</button></a>'
            }
                // document.getElementById('register').innerHTML = (sessionStorage.getItem("authUser"))? ('<button><a href="../register.html?'+stri+'">'+'Register</a></button>'):('<button><a href="../login.html?'+stri+'">'+'Register</a></button>')
            var cont = 'For queries, contact at ' + '<br>'
            
            for (var y in data.poc) {
                let keyCont = Object.keys(data.poc[y])
                for (var x in keyCont) {
                    cont += keyCont[x] + ': '+ ((data.poc[y][keyCont[x]]=="Email")?'mailto:':'')+data.poc[y][keyCont[x]]
                    cont += '<br>'
                }
                
            }
            document.getElementById('poc').innerHTML = cont

            document.getElementById('title').innerText = data.name
            
        }
    }
}


xhr.send()});