import {url} from "./index.js"

var send = {}


var mode = document.getElementById('reg_mode')
mode.addEventListener('click', function() {
    for (var x in mode.children) {
        if (x<mode.children.length) {
            if (mode.children[x].checked) {
                                
            }
        }
    }
})

document.getElementById('reg_mode').addEventListener('change', function() {
    if (document.getElementById('mo2').checked) {
        document.getElementById('team').hidden = false
    } else {
        document.getElementById('team').hidden = true
    }
})

document.getElementById('reg_type').addEventListener('change', function() {
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
})
// document.getElementById('dead').addEventListener('change')

document.getElementById('launch').addEventListener('click', function() {
    let radios = document.getElementsByClassName('radioset')
    radios = (Array.prototype.slice.call( radios, 0 ))
    radios.map(t => {
            for (var x in t.children) {
                if (x<t.children.length) {
                    if (t.children[x].checked) {
                        send = Object.assign(send, {[t.children[x].name]:t.children[x].value})
                        if ([t.children[x].name] == "category"){
                            send = Object.assign(send, {"category_name":t.children[x].value})
                        }
                    }
                }
            }
    })
    for (var x=1; x<=6; x++) {
        var targ = document.getElementById('t'+x)
        send = Object.assign(send, {[targ.name]:targ.value})
    }

    var pocInfo = Array.prototype.slice.call(document.getElementById('poc').children, 0)
    var poc = {}
    for (var n in pocInfo) {
        if (pocInfo[n].name) {
            poc = Object.assign(poc, {[pocInfo[n].name]:pocInfo[n].value})
            // console.log(pocInfo[n])
        }
    }
    send = Object.assign(send, {"poc":[poc]})

    send = Object.assign(send, {"photos":[document.getElementById('phot').value]})
    send = Object.assign(send, {"reg_deadline":(new Date(Date.parse(document.getElementById('dead').value)).toISOString())})
    send = Object.assign(send, {"registration": true, "reg_status": true, "subheading":"", "dtv":[]})
    console.log(send)
    var xhr = new XMLHttpRequest();
	xhr.open("POST", url+"/api/user/login", true);
    xhr.setRequestHeader("Content-type", "application/json");
    document.write('loading...')
	xhr.onreadystatechange = function () {
        var json = JSON.parse(xhr.responseText);
		
		// console.log(xhr.responseText + " " + xhr.status, "response");
	    if (xhr.readyState === 4){
			if (xhr.status === 200) {				
				var data = json.data;
				// console.log(json.error == false)
				if (json.error == false) {
					// sessionStorage.setItem("token", data.token);
                    // console.log("login")
                    var xt = new XMLHttpRequest();
                    xt.open("POST", url+"/api/event/create", true)
                    xt.setRequestHeader("Content-type", "application/json")
                    xt.setRequestHeader("x-auth-token", data.token)
                    xt.onreadystatechange = function() {
                        if (xt.readyState === 4) {
                            if (xt.status === 200) {
                                document.write('ignore the loading message' + JSON.parse(xt.responseText).message)
                            } else {
                                document.write('don\'t wait for loading to go, some problem has occured')
                            }
                        }
                    }
                    xt.send(JSON.stringify(send))
				}
            }
        }
    }
    xhr.send(JSON.stringify({"email":document.getElementById('em'), "password":document.getElementById('pa')}))

})