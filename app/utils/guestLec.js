import {url, linkExtract, updateUser} from "./index.js"

updateUser(false)
let useReg = (sessionStorage.getItem("authUser"))?JSON.parse(sessionStorage.getItem("useReg")):{}
let email = (sessionStorage.getItem("authUser"))?JSON.parse(sessionStorage.getItem("authUser")).email:{}
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
            $('#guests').append(            
                '<div class="row">'
            )
            for (var x in guestLecs) {
                $('#guests').append(          
                    '<div class="col-md-4 col-sm-4 col-sm-4 guestElement">'+
                    '<div class="fixed"><img src="'+linkExtract(guestLecs[x].photos[0])+'" class="event-img"></div>'+
                    '<p>' + guestLecs[x].name + '</p>' + 
                    '<p class="desc">' + guestLecs[x].description + '</p>' +
                    '<button id="'+guestLecs[x].id+'" class="regisGuest">'+ ((guestLecs[x].id in useReg)?'Delete Registration':'Register') + '</button>'+
                    '</div>'
                )
                if (x%3==2) {
                    $('#guests').append(
                        '</div>'+
                        '<div class="row">'
                    )
                }

                document.getElementById(guestLecs[x].id).addEventListener('click', function(e) {
                    let xh = new XMLHttpRequest()
                    console.log(useReg, e.target.id)
                    if ((sessionStorage.getItem("authUser"))) {
                    if (e.target.id in useReg) {
                        
                        // console.log(useReg[e.target.id], "here")
                        xh.open("POST", url+"/api/register/delete/"+useReg[e.target.id], true)
                        xh.setRequestHeader("Content-type", "application/json");
                        xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                        xh.onreadystatechange = function () {
                            if (xh.readyState === 4) {
                                // console.log(xh.responseText)
                                if (xh.status === 200) {
                                    delete useReg[e.target.id]
                                    sessionStorage.setItem("useReg", JSON.stringify(useReg))
                                    e.target.innerText = 'Register'
                                }
                            }
                        }
                        xh.send()
                    } else {
                        xh.open("POST", url+"/api/register/register", true)
                        xh.setRequestHeader("Content-type", "application/json");
                        xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                        xh.onreadystatechange = function () {
                            if (xh.readyState === 4) {
                                // console.log(xh.responseText)
                                let data = JSON.parse(xh.responseText).data
                                if (xh.status === 200) {
                                    useReg[e.target.id] = data.reg_id
                                    sessionStorage.setItem("useReg", JSON.stringify(useReg))
                                    e.target.innerText = 'Delete Registration'
                                }
                            }
                        }
                        // console.log(e.target.id)
                        var send = (Object.assign({}, {"event_id": e.target.id, "members": [{"email":email}], "team_name": "", "source": "", "remark":""}))
                        // console.log(send)
                        xh.send(JSON.stringify(send))
                    }
                    } else {
                        document.location.href = "../login.html"      
                    }
                })
            }
            $('#guests').append(            
                '<div>'
            )
            var images = Array.prototype.slice.call(document.getElementsByClassName('event-img'), 0)
            for (var x in images) {
              images[x].onload = function () {
                this.parentNode.style.backgroundImage = "none"
              }
            }
        }
    }
}
xhr.send()