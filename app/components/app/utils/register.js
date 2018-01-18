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

    var app$utils$register$$str = document.location.search;
    var app$utils$register$$bas = app$utils$register$$str.split("?");
    var app$utils$register$$ba = app$utils$register$$bas[1].split("=");
    var app$utils$register$$eveId = app$utils$register$$ba[0];
    var app$utils$register$$name = app$utils$register$$ba[1];
    var app$utils$register$$user = JSON.parse(sessionStorage.getItem("authUser"));
    document.getElementById('title').innerText = decodeURIComponent(app$utils$register$$name);
    document.getElementById('loading').style.display = "none";


    var app$utils$register$$i = 10;
    var app$utils$register$$j = 2;
    $(document).ready(function(){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", $$index$$url+"/api/event/view/"+app$utils$register$$eveId, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        document.getElementById('form').hidden = true
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4){
                if (xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    // console.log(json)
                    var data = json.data
                    app$utils$register$$j = data.reg_min_team_size
                    app$utils$register$$i = data.reg_max_team_size - 1
                    console.log(app$utils$register$$i+" "+app$utils$register$$j)
                    console.log(app$utils$register$$i+" "+app$utils$register$$j)
                    let memsA = 1;
                    var id = 0
                    for (var t = 0; t<app$utils$register$$j-1; t++) {
                        var form = '<input name="email" type="text" id="mem'+id+'" placeholder="Member\'s registered email">';
                        document.getElementById('teamInfo').insertAdjacentHTML('beforeend', form);
                        memsA++;
                        app$utils$register$$i--;
                        id++;
                    }

                    document.getElementById('fir').value = app$utils$register$$user.email
                    let del = document.getElementById('del')
                    let add = document.getElementById('add')

                    add.onclick= function () {
                        if (app$utils$register$$i>0) {
                            var form = '<input name="email" type="text" id="mem'+id+'" placeholder="Member\'s registered email">';
                            document.getElementById('teamInfo').insertAdjacentHTML('beforeend', form);
                            // console.log(id)
                            memsA++;
                            id++;
                            app$utils$register$$i--;
                            del.hidden = false
                        }
                        if (app$utils$register$$i==0) {
                            add.hidden = true
                        }
                        // console.log(i)
                    }
                    // if ()
                    document.getElementById('teamName').innerHTML = '<input id="tname" type="text" placeholder="Team Name">'
                    del.onclick=function () {
                        // console.log(id)
                        var rem = document.getElementById('mem'+(id-1))
                        rem.parentNode.removeChild(rem)
                        id--;
                        memsA--;
                        app$utils$register$$i++;
                        add.hidden = false
                        if (memsA==app$utils$register$$j) {
                            del.hidden = true
                        }
                    }

                    document.getElementById('form').hidden = false


                    // var t = [1,2,3]
                    // t.push(4)
                    // console.log(t)

                    function onReg() {
                        var team = document.getElementById('teamInfo').children
                        var teamArr = []
                        if (sessionStorage.getItem("authUser")) {
                            var user = JSON.parse(sessionStorage.getItem("authUser"))
                            // console.log(user)
                            var email = user.email 
                            var teamArr = [{"email": email}]
                        }
                        for (var x in team) {
                            if (x<team.length && (team[x].value != "")) {
                                // console.log(user)
                                teamArr.push({[team[x].name]: team[x].value})
                            }
                        }
                        var teamName = document.getElementById('tname').value
                        // console.log(teamName)
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", $$index$$url+"/api/register/register", true);
                        xhr.setRequestHeader("Content-type", "application/json");
                        xhr.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                        document.getElementById('loading').style.display = "inline";
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4){
                                var json = JSON.parse(xhr.responseText);
                                var data = json.data;
                                // console.log(JSON.parse(xhr.response))
                                document.getElementById('loading').innerText = json.message;
                                if (xhr.status === 200) {
                                    
                                    // console.log(xhr.responseText)
                                    if (json.error == false) {
                                        document.getElementById('teamInfo').hidden = true
                                        document.getElementById('add').hidden = true
                                        document.getElementById('teamName').hidden = true
                                        document.getElementById('submit').hidden = true
                                        del.hidden = true
                                        document.getElementById('loading').innerText = json.message;
                                        $$index$$updateUser(false)
                                    }
                                }
                            }
                        }
                        // console.log(eveId, "here")
                        var send = (Object.assign({}, {"event_id": app$utils$register$$eveId, "members": teamArr, "team_name": teamName}))
                        // console.log(send)
                        xhr.send(JSON.stringify(send))
                    }

                    document.getElementById('submit').addEventListener('click', onReg)
                }
            }
        }
        xhr.send()
        // console.log(i+" "+j)
        // let min = i;
        // var id = 0
        // for (var t = 0; t<j-1; t++) {
        // 	var form = '<input name="email" type="text" id="mem'+id+'" placeholder="Member\'s registered email">';
        // 	document.getElementById('teamInfo').insertAdjacentHTML('beforeend', form);
        // 	i--;
        // 	id++;
        // }

        // document.getElementById('fir').value = user.email
        // let del = document.getElementById('del')

        // document.getElementById('add').onclick= function () {
        // 	if (i>0) {
        // 		var form = '<input name="email" type="text" id="mem'+id+'" placeholder="Member\'s registered email">';
        // 		document.getElementById('teamInfo').insertAdjacentHTML('beforeend', form);
        // 		// console.log(id)
        // 		i--;
        // 		id++;
        // 	}
        // 	if (i<min) {
        // 		del.hidden = false
                
        // 	}
        // 	// console.log(i)
        // }
        // // if ()
        // document.getElementById('teamName').innerHTML = '<input id="tname" type="text" placeholder="Team Name">'
        // del.onclick=function () {
        // 	// console.log(id)
        // 	var rem = document.getElementById('mem'+(id-1))
        // 	rem.parentNode.removeChild(rem)
        // 	id--;
        // 	if (i==min) {
        // 		del.hidden = true
        // 	}
        // }




        // // var t = [1,2,3]
        // // t.push(4)
        // // console.log(t)

        // function onReg() {
        // 	var team = document.getElementById('teamInfo').children
        // 	var teamArr = []
        // 	if (sessionStorage.getItem("authUser")) {
        // 		var user = JSON.parse(sessionStorage.getItem("authUser"))
        // 		// console.log(user)
        // 		var email = user.email 
        // 		var teamArr = [{"email": email}]
        // 	}
        // 	for (var x in team) {
        // 		if (x<team.length && (team[x].value != "")) {
        // 			// console.log(user)
        // 			teamArr.push({[team[x].name]: team[x].value})
        // 		}
        // 	}
        // 	var teamName = document.getElementById('tname').value
        // 	// console.log(teamName)
        // 	var xhr = new XMLHttpRequest();
        // 	xhr.open("POST", url+"/api/register/register", true);
        // 	xhr.setRequestHeader("Content-type", "application/json");
        // 	xhr.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
        // 	document.getElementById('loading').style.display = "inline";
        // 	xhr.onreadystatechange = function () {
        // 		if (xhr.readyState === 4){
        // 			var json = JSON.parse(xhr.responseText);
        // 			var data = json.data;
        // 			// console.log(JSON.parse(xhr.response))
        // 			document.getElementById('loading').innerText = json.message;
        // 			if (xhr.status === 200) {
                        
        // 				// console.log(xhr.responseText)
        // 				if (json.error == false) {
        // 					document.getElementById('teamInfo').hidden = true
        // 					document.getElementById('add').hidden = true
        // 					document.getElementById('teamName').hidden = true
        // 					document.getElementById('submit').hidden = true
        // 					del.hidden = true
        // 					document.getElementById('loading').innerText = json.message;
        // 					updateUser(false)
        // 				}
        // 			}
        // 		}
        // 	}
        // 	// console.log(eveId, "here")
        // 	var send = (Object.assign({}, {"event_id": eveId, "members": teamArr, "team_name": teamName}))
        // 	// console.log(send)
        // 	xhr.send(JSON.stringify(send))
        // }

        // document.getElementById('submit').addEventListener('click', onReg)
    });
}).call(this);