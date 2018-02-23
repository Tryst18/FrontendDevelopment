import {url, linkExtract, updateUser} from "./index.js"





updateUser(false)



let useReg = (sessionStorage.getItem("authUser"))?JSON.parse(sessionStorage.getItem("useReg")):{}
let email = (sessionStorage.getItem("authUser"))?JSON.parse(sessionStorage.getItem("authUser")).email:{}
// console.log(useReg)

function buttonCtrl(e, str) {
    let tar = e.target.id
    tar = tar.slice(4)
    if (str == "v") {
        tar = e.target.value
    }
    e.target.innerText = 'Loading'
    let xh = new XMLHttpRequest()
    if ((sessionStorage.getItem("authUser"))) {
        if (tar in useReg) {
            // console.log(useReg[tar], "here")
            xh.open("POST", url+"/api/register/delete/"+useReg[tar], true)
            xh.setRequestHeader("Content-type", "application/json");
            xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
            xh.onreadystatechange = function () {
                // console.log('load')
                if (xh.readyState === 4) {
                    // console.log(xh.responseText)
                    if (xh.status === 200) {
                        let jad = JSON.parse(xh.responseText)
                        if (jad.error == false) {
                            delete useReg[tar]
                            sessionStorage.setItem("useReg", JSON.stringify(useReg))
                            e.target.innerText = 'Register'
                            if (str=='v') {document.getElementById('info'+tar).innerText = 'Register'; document.getElementById('info'+tar).classList.toggle('reg')}
                            e.target.classList.toggle('reg')
                        } else {
                            e.target.innerText = 'Closed'
                            if (str=='v') {document.getElementById('info'+tar).innerText = 'Closed'; document.getElementById('info'+tar).classList.toggle('reg')}
                        }
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
                        let jas = JSON.parse(xh.responseText)
                        if (jas.error == false) { 
                            useReg[tar] = data.reg_id
                            sessionStorage.setItem("useReg", JSON.stringify(useReg))
                            e.target.innerText = 'Delete'
                            if (str=='v') {document.getElementById('info'+tar).innerText = 'Delete'; document.getElementById('info'+tar).classList.toggle('reg')}
                            e.target.classList.toggle('reg')
                        } else {
                            e.target.innerText = 'Closed'
                            if (str=='v') {document.getElementById('info'+tar).innerText = 'Closed'; document.getElementById('info'+tar).classList.toggle('reg')}
                        }
                    }
                }
            }
            // console.log(tar)
            var send = (Object.assign({}, {"event_id": tar, "members": [{"email":email}], "team_name": "", "source": "", "remark":""}))
            // console.log(send)
            xh.send(JSON.stringify(send))
        }
    } else {
        document.location.href = "../login.html"      
    }
}

let xhr = new XMLHttpRequest()
xhr.open("GET", url + "/api/event/getCategories", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// console.log(sessionStorage.getItem('useReg'))
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            let json = JSON.parse(xhr.responseText)
            let guestLecs = json.data.pronite
            // console.log(guestLecs)
            $('#guests').append(            
                '<div class="row">'
            )
            let guestDict = {}
            for (var y in guestLecs) {
                guestDict[guestLecs[y].id] = guestLecs[y]
            }
            console.log(guestDict)
            for (var x in guestLecs) {
                let pronite = guestLecs[x]
                let cont = ''
                if (pronite.dtv.length >0) {
                    for (var y in pronite.dtv) {
                        let keyCont = Object.keys(pronite.dtv[y])
                        for (var ite in keyCont) {
                            cont += keyCont[ite] + ': '+pronite.dtv[y][keyCont[ite]]
                            cont += '<br>'
                        }
                    }
                }
                $('#guests').append(          
                    '<div class="col-md-6 col-sm-6 guestElement">'+
                    '<div class="fixed"><img src="'+linkExtract(guestLecs[x].photos[0])+'" class="event-img"></div>'+
                    '<p id="'+guestLecs[x].id+'" class="nameBut">' + guestLecs[x].name + '</p>' + 
                    // '<p class="desc">' + guestLecs[x].description + '</p>' +
                    '<div class="col-md-6">'+
                    '<button id="info'+guestLecs[x].id+'" class="regisGuest '+((guestLecs[x].id in useReg)?'reg':'')+'">'+ ((guestLecs[x].id in useReg)?'Delete':'Register') + '</button>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                    '<p>'+cont+'</p>'+
                    // '<button id="'+guestLecs[x].id+'" value="'+guestLecs[x].id+'" class="fa fa-info-circle no_margin"></button>'+
                    '</div>'+
                    '</div>'
                )
                if (x%2==1) {
                    $('#guests').append(
                        '</div>'+
                        '<div class="row">'
                    )
                }

                document.getElementById(guestLecs[x].id).addEventListener('click', function(e) {
                    let xr = new XMLHttpRequest();
                    xr.open("GET", url+"/api/event/view/"+e.target.id, true);
                    xr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xr.onreadystatechange = function () {
                        if (xr.readyState === 4){
                            if (xr.status === 200) { 
                                document.getElementById('popup').hidden = false
                                // document.getElementById('guests').classList.toggle('noscroll')
                                let tarLec = JSON.parse(xr.responseText).data
                                
                                $('#fill').html(
                                    '<div class="col-md-8 col-sm-12 col-xs-12">'+
                                    '<p>'+tarLec.description+'</p>'+
                                        '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                            '<button id="lea'+tarLec.id+'" value="'+tarLec.id+'" class="regisGuest '+((tarLec.id in useReg)?'reg':'')+'">'+ ((tarLec.id in useReg)?'Delete':'Register') + '</button>'+
                                        '</div>'+
                                        '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                            '<p>'+cont+'</p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-md-4 col-sm-12 col-xs-12 lec-img">' +
                                    '<div class="fixed"><img src="'+linkExtract(tarLec.photos[0])+'" id="pho'+tarLec.id+'" class="event-img"></div>'+
                                    '</div>'
                                )
                                
                                document.getElementById('lea'+tarLec.id).addEventListener('click', function(e) {
                                    buttonCtrl(e, "v")
                                })
            
                                document.getElementById('pho'+tarLec.id).onload = function () {
                                    // console.log(this.parentNode)
                                    this.parentNode.style.backgroundImage = "none"
                                }
                            }
                        }
                    }
                    xr.send()
                })

                document.getElementById('info'+guestLecs[x].id).addEventListener('click', function(e) {
                    buttonCtrl(e, "i")
                })
            }
            $('#guests').append(            
                '<div>'
            )
            document.getElementById('cloBut').addEventListener('click', function(){
                document.getElementById('popup').hidden = true
                // document.getElementById('guests').classList.toggle('noscroll')
            })
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