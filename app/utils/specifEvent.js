import {url, updateUser} from "./index.js"

var event = document.location.search.split("?")[1]
let user = JSON.parse(sessionStorage.getItem("authUser"))
// console.log(category)
function delReg(id) {
    console.log('worked')
    let xt = new XMLHttpRequest()
    xt.open("POST", url+"/api/register/delete/"+id, true)
    xt.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xt.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
    xt.onreadystatechange = function () {
        if (xt.readyState == 4) {
            var json = JSON.parse(xt.responseText)
            console.log(json)
            if (xt.status == 200) {
                console.log('done')
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
            document.getElementById('probState').innerHTML = '<button><a href='+data.url+'>Click here for Problem Statement</a></button>'
            document.getElementById('prizes').innerText = data.prizes
            document.getElementById('image').innerHTML = '<img id="event-logos" src=../images/'+data.name+'.png>'
            let stri = data.id+'='+data.name+((data.reg_type == "team")? '=1':'')
            
            let regButton = document.getElementById('register')
            if (user) {
                var pres = false
                for (var l in user.registration) {
                    if (data.id == user.registration[l].event_id) {
                        if (data.reg_type == "team") { 
                            // console.log('user')
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
                            break
                        } 
                    }
                }
                if (!pres) {
                    if (data.reg_type == "team") {
                        regButton.innerHTML = '<button><a href="../register.html?'+stri+'">'+'Register</a></button>'
                    } else {
                        regButton.innerHTML = '<button>Register</button>'
                        regButton.click(function(){
                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", url+"/api/register/register", true);
                            xhr.setRequestHeader("Content-type", "application/json");
                            xhr.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                            document.getElementById('loading').style.display = "inline";
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4){
                                    var json = JSON.parse(xhr.responseText);
                                    var data = json.data;
                                    console.log(JSON.parse(xhr.response))
                                    document.getElementById('loading').innerText = json.message;
                                    if (xhr.status === 200) {
                                        
                                        // console.log(xhr.responseText)
                                        if (json.error == false) {

                                            updateUser(true)
                                        }
                                    }
                                }
                            }
                        })
                    }
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