import "./index.js"

var str = document.location.search;
var bas = str.split("?")
var ba = bas[1].split("=")
var eveId = ba[0]
var name = ba[1]

document.getElementById('title').innerText = name
document.getElementById('loading').style.display = "none";


var i = 10;
var id = 0;
if (ba.length == 3) {
	let del = document.getElementById('del')
	document.getElementById('add').onclick= function () {
		if (i>0){
			var form = '<input name="email" type="text" id="mem'+id+'" placeholder="Member\'s registered email">';
			document.getElementById('teamInfo').insertAdjacentHTML('beforeend', form);
			i--;
			id++;
		}
		if (i<10) {
			del.hidden = false
		}
		// console.log(i)
	}
	document.getElementById('teamName').innerHTML = '<input id="tname" type="text" placeholder="Team Name">'
	del.onclick=function () {
		var rem = document.getElementById('mem'+(id-1))
		rem.parentNode.removeChild(rem)
		id--;
		if (i=10) {
			del.hidden = true
		}
	}
}



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
					document.getElementById('teamInfo').hidden = true
					document.getElementById('add').hidden = true
					document.getElementById('teamName').hidden = true
					document.getElementById('submit').hidden = true
					document.getElementById('loading').innerText = json.message;
					var xh = new XMLHttpRequest();
					xh.open("GET", url+"/api/user/view", true);
					xh.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
					xh.onreadystatechange = function () {
						if (xhr.readyState === 4){
							if (xhr.status === 200) {
								var jon = JSON.parse(xhr.responseText);
								var dta = jon.data;
								// console.log(xhr.responseText)
								if (jon.error == false) {
									sessionStorage.setItem("authUser", JSON.stringify(dta))
								}
							}
						}
					}
					xh.send()
				}
			}
		}
	}
	console.log(eveId, "here")
	var send = (Object.assign({}, {"event_id": eveId, "members": teamArr, "team_name": teamName}))
	// console.log(send)
	xhr.send(JSON.stringify(send))
}

document.getElementById('submit').addEventListener('click', onReg)