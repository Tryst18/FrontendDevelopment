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

    var app$utils$change$$send = {}


    // var mode = document.getElementById('reg_mode')
    // mode.addEventListener('click', function() {
    //     for (var x in mode.children) {
    //         if (x<mode.children.length) {
    //             if (mode.children[x].checked) {

    //             }
    //         }
    //     }
    // })

    document.getElementById('t8').placeholder = decodeURI(document.location.search.split('?')[2]);

    document.getElementById('cat').addEventListener('change', function() {
        if (document.getElementById('c2').checked || document.getElementById('c1').checked) {
            document.getElementById('depName').hidden = false
        } else {
            document.getElementById('depName').hidden = true
        }
    });


    document.getElementById('wm1').addEventListener('click', function() {
        if (document.getElementById('wm1').checked) {
            document.getElementById('sub').hidden = false
        } else {
            document.getElementById('sub').hidden = true
        }
    });

    document.getElementById('rem1').addEventListener('click', function() {
        if (document.getElementById('rem1').checked) {
            document.getElementById('place').hidden = false
        } else {
            document.getElementById('place').hidden = true
        }
    });

    document.getElementById('reg_mode').addEventListener('change', function() {
        if (document.getElementById('ty2').checked) {
            document.getElementById('t3').hidden = false
            document.getElementById('t4').hidden = true
        } else if (document.getElementById('ty3').checked){
            document.getElementById('t3').hidden = true
            document.getElementById('t4').hidden = false
        } else {
            document.getElementById('t3').hidden = true
            document.getElementById('t4').hidden = true
        }
    });
    // document.getElementById('dead').addEventListener('change')

    document.getElementById('launch').addEventListener('click', function() {
        let radios = document.getElementsByClassName('radioset')
        radios = (Array.prototype.slice.call( radios, 0 ))
        radios.map(t => {
                for (var x in t.children) {
                    if (x<t.children.length) {
                        if (t.children[x].checked) {
                            app$utils$change$$send = Object.assign(app$utils$change$$send, {[t.children[x].name]:t.children[x].value})
                            if ([t.children[x].name] == "category"){
                                if (t.children[x].value == "department" || t.children[x].value == "club") {
                                    app$utils$change$$send = Object.assign(app$utils$change$$send, {"category_name":document.getElementById('depName').value})
                                } else {
                                    app$utils$change$$send = Object.assign(app$utils$change$$send, {"category_name":t.children[x].value})
                                }
                            }
                        }
                    }
                }
        })
        for (var x=1; x<=8; x++) {
            var targ = document.getElementById('t'+x)
            if (targ.value!="") {
                app$utils$change$$send = Object.assign(app$utils$change$$send, {[targ.name]:targ.value})
            }
        }

        var pocInfo = Array.prototype.slice.call(document.getElementById('poc').children, 0)
        var poc = {}
        var pocE = true
        for (var n in pocInfo) {
            if (pocInfo[n].name) {
                if (pocInfo[n].value!="") {pocE = false}
                poc = Object.assign(poc, {[pocInfo[n].name]:pocInfo[n].value})
                // console.log(pocInfo[n])
            }
        }
        var dtvE = true
        var dtvInfo = Array.prototype.slice.call(document.getElementById('dtv').children, 0)
        var dtv = {}
        for (var n in dtvInfo) {
            if (dtvInfo[n].name) {
                if (dtvInfo[n].value!="") {dtvE = false}
                dtv = Object.assign(dtv, {[dtvInfo[n].name]:dtvInfo[n].value})
                // console.log(dtvInfo[n])
            }
        }
        if (!pocE) {app$utils$change$$send = Object.assign(app$utils$change$$send, {"poc":[poc]})}
        if (!dtvE) {app$utils$change$$send = Object.assign(app$utils$change$$send, {"dtv":[dtv]})}
        if (document.getElementById('phot').value!="") {app$utils$change$$send = Object.assign(app$utils$change$$send, {"photos":[document.getElementById('phot').value]})}
        // send = Object.assign(send, {"reg_deadline":(new Date(Date.parse(document.getElementById('dead').value)).toISOString())})
        if (document.getElementById('sub').value) {app$utils$change$$send = Object.assign(app$utils$change$$send, {"subheading":document.getElementById('sub').value})}
        if (document.getElementById('place').value) {app$utils$change$$send = Object.assign(app$utils$change$$send, {"rules":document.getElementById('place').value})}
        console.log(app$utils$change$$send)
        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", url+"/api/user/login", true);
        // xhr.setRequestHeader("Content-type", "application/json");
        // document.getElementById('message').innerHTML = ('loading...')
        // xhr.onreadystatechange = function () {
        //     var json = JSON.parse(xhr.responseText);
        // 	document.getElementById('message').innerHTML = xhr.responseText
        // 	// console.log(xhr.responseText + " " + xhr.status, "response");
        //     if (xhr.readyState === 4){
        // 		if (xhr.status === 200) {
        // 			document.getElementById('message').innerHTML = ('email and password checked')		
        // 			var data = json.data;
                    // console.log(json.error == false)
                    // if (json.error == false) {
                        // sessionStorage.setItem("token", data.token);
                        // console.log("login")
                        var xt = new XMLHttpRequest();
                        xt.open("POST", $$index$$url+"/api/event/modify/"+document.location.search.split('?')[1], true)
                        xt.setRequestHeader("Content-type", "application/json")
                        xt.setRequestHeader("x-auth-token", sessionStorage.getItem('token'))
                        xt.onreadystatechange = function() {
                            if (xt.readyState === 4) {
                                let res = JSON.parse(xt.responseText)
                                if (xt.status === 200) {
                                    document.getElementById('message').innerHTML = ('Cool' + res.message + 'id: ' + res.data.id + 'Name: ' + res.data.name)
                                } else {
                                    document.getElementById('message').innerHTML = (res.message)
                                }
                            }
                        }
                        // console.log(send)
                        if (Object.keys(app$utils$change$$send).length>0) {
                            console.log({"event":app$utils$change$$send})
                            xt.send(JSON.stringify({"event":app$utils$change$$send}))
                        } else {
                            document.getElementById('message').innerHTML = 'Are you running some test or something?'
                        }
        //         }
        //     }
        // }
        // console.log(JSON.stringify({"email":document.getElementById('em').value, "password":document.getElementById('pa').value}))
        // xhr.send(JSON.stringify({"email":document.getElementById('em').value, "password":document.getElementById('pa').value}))

    });
}).call(this);