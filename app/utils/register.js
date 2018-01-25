import {url, updateUser} from "./index.js"

var str = document.location.search;
var bas = str.split("?")
var ba = bas[1].split("=")
var eveId = ba[0]
var name = ba[1]
var user = JSON.parse(sessionStorage.getItem("authUser"))
document.getElementById('title').innerText = decodeURIComponent(name)
document.getElementById('loading').style.display = "none";


var i = 10;
var j = 2;
$(document).ready(function(){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url+"/api/event/view/"+eveId, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	document.getElementById('form').hidden = true
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4){
			if (xhr.status === 200) {
				var json = JSON.parse(xhr.responseText);
				// console.log(json)
				var data = json.data
				j = data.reg_min_team_size
				i = data.reg_max_team_size - 1
				// console.log(i+" "+j)
				// console.log(i+" "+j)
				let memsA = 1;
				var id = 0
				for (var t = 0; t<j-1; t++) {
					var form = '<input name="email" type="text" id="mem'+id+'" placeholder="Member\'s registered email">';
					document.getElementById('teamInfo').insertAdjacentHTML('beforeend', form);
					memsA++;
					i--;
					id++;
				}

				document.getElementById('fir').value = user.email
				let del = document.getElementById('del')
				let add = document.getElementById('add')

				add.onclick= function () {
					if (i>0) {
						var form = '<input name="email" type="text" id="mem'+id+'" placeholder="Member\'s registered email">';
						document.getElementById('teamInfo').insertAdjacentHTML('beforeend', form);
						// console.log(id)
						memsA++;
						id++;
						i--;
						del.hidden = false
					}
					if (i==0) {
						add.hidden = true
					}
					// console.log(i)
				}
				// if ()
				document.getElementById('teamName').innerHTML = '<input id="tname" type="text" placeholder="Team Name">'
				document.getElementById('source').innerHTML = '<input id="src" type="text" placeholder="Source (Mention name if campus ambassador)">'
				if (data.rules!=""){document.getElementById('remD').innerHTML = '<input id="remark" type="text" placeholder="'+data.rules+'">'} else {document.getElementById('remD').hidden = true}
				if (data.subheading!=""){document.getElementById('warnD').innerHTML = '<input id="warn" type="text" value="'+data.subheading+'" disabled>'} else {document.getElementById('warnD').hidden = true}
				
				del.onclick=function () {
					// console.log(id)
					var rem = document.getElementById('mem'+(id-1))
					rem.parentNode.removeChild(rem)
					id--;
					memsA--;
					i++;
					add.hidden = false
					if (memsA==j) {
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
					console.log('this')
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
					var src = document.getElementById('src').value
					console.log(src)
					var xhr = new XMLHttpRequest();
					xhr.open("POST", url+"/api/register/register", true);
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
									document.getElementById('source').hidden = true
									if (data.rules=="") {document.getElementById('remark').hidden = true}
									document.getElementById('warn').hidden = true
									del.hidden = true
									document.getElementById('loading').innerText = json.message;
									updateUser(false)
								}
							}
						}
					}
					// console.log(eveId, "here")
					var send = (Object.assign({}, {"event_id": eveId, "members": teamArr, "team_name": teamName, "source": src, "remark":(data.rules=="")?'':document.getElementById('remark').value}))
					// console.log(send)
					xhr.send(JSON.stringify(send))
				}

				document.getElementById('submit').addEventListener('click', onReg)
			}
		}
	}
	xhr.send()
})