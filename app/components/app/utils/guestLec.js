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
                        let userReg = dta.registration
                        // console.log(dta)
                        let uDict = {}
                        for (var x in userReg) {
                            uDict[userReg[x].event_id] = userReg[x].reg_id
                        }
                        // console.log(uDict)
                        sessionStorage.setItem("useReg", JSON.stringify(uDict))
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

    $$index$$updateUser(false);
    let app$utils$guestLec$$useReg = (sessionStorage.getItem("authUser"))?JSON.parse(sessionStorage.getItem("useReg")):{}
    let app$utils$guestLec$$email = (sessionStorage.getItem("authUser"))?JSON.parse(sessionStorage.getItem("authUser")).email:{}
    let app$utils$guestLec$$xhr = new XMLHttpRequest();
    app$utils$guestLec$$xhr.open("GET", $$index$$url + "/api/event/getCategories", true);
    app$utils$guestLec$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log(sessionStorage.getItem('useReg'));
    app$utils$guestLec$$xhr.onreadystatechange = function () {
        if (app$utils$guestLec$$xhr.readyState === 4) {
            if (app$utils$guestLec$$xhr.status === 200) {
                let json = JSON.parse(app$utils$guestLec$$xhr.responseText)
                let guestLecs = json.data.guest
                console.log(guestLecs)
                $('#guests').append(            
                    '<div class="row">'
                )
                for (var x in guestLecs) {
                    $('#guests').append(          
                        '<div class="col-md-4 col-sm-4 col-sm-4 guestElement">'+
                        '<div class="fixed"><img src="'+$$index$$linkExtract(guestLecs[x].photos[0])+'" class="event-img"></div>'+
                        '<p>' + guestLecs[x].name + '</p>' + 
                        '<p class="desc">' + guestLecs[x].description + '</p>' +
                        '<button id="'+guestLecs[x].id+'" class="regisGuest">'+ ((guestLecs[x].id in app$utils$guestLec$$useReg)?'Delete Registration':'Register') + '</button>'+
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
                        console.log(app$utils$guestLec$$useReg, e.target.id)
                        if ((sessionStorage.getItem("authUser"))) {
                        if (e.target.id in app$utils$guestLec$$useReg) {
                            
                            // console.log(useReg[e.target.id], "here")
                            xh.open("POST", $$index$$url+"/api/register/delete/"+app$utils$guestLec$$useReg[e.target.id], true)
                            xh.setRequestHeader("Content-type", "application/json");
                            xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                            xh.onreadystatechange = function () {
                                if (xh.readyState === 4) {
                                    // console.log(xh.responseText)
                                    if (xh.status === 200) {
                                        delete app$utils$guestLec$$useReg[e.target.id]
                                        sessionStorage.setItem("useReg", JSON.stringify(app$utils$guestLec$$useReg))
                                        e.target.innerText = 'Register'
                                    }
                                }
                            }
                            xh.send()
                        } else {
                            xh.open("POST", $$index$$url+"/api/register/register", true)
                            xh.setRequestHeader("Content-type", "application/json");
                            xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                            xh.onreadystatechange = function () {
                                if (xh.readyState === 4) {
                                    // console.log(xh.responseText)
                                    let data = JSON.parse(xh.responseText).data
                                    if (xh.status === 200) {
                                        app$utils$guestLec$$useReg[e.target.id] = data.reg_id
                                        sessionStorage.setItem("useReg", JSON.stringify(app$utils$guestLec$$useReg))
                                        e.target.innerText = 'Delete Registration'
                                    }
                                }
                            }
                            // console.log(e.target.id)
                            var send = (Object.assign({}, {"event_id": e.target.id, "members": [{"email":app$utils$guestLec$$email}], "team_name": "", "source": "", "remark":""}))
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
    app$utils$guestLec$$xhr.send();
}).call(this);