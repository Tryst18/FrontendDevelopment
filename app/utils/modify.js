import "../utils/index.js";

function onSubmit() {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url+"/api/user/modify", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("x-auth-token", localStorage.getItem("token"));
	// console.log(xhr.readyState, xhr.status);
	document.getElementById('loading').style.display = "inline";
	xhr.onreadystatechange = function () {
		// console.log(xhr.responseText, "response");
		document.getElementById('loading').style.display = "none";
	    
		if (xhr.readyState === 4){
			if (xhr.status === 200) {
				var json = JSON.parse(xhr.responseText);
				if (json.error == false) {
					document.getElementById('userInfo').innerHTML = '<p>Successful, go to <a href=index.html>Home</a></p>'
				} else {
					document.getElementById('errServ').style.display = "inline";
				}
			} else if (xhr.status === 401){
				document.getElementById('errNoUser').style.display = "inline";
			} else if (xhr.status === 500){
				console.log(xhr.responseText, "response");
				console.log(xhr.readyState, xhr.status);
				var json = JSON.parse(xhr.responseText);
				console.log(json);
				document.getElementById('errServ').style.display = "inline";
			}
		}
	};
	var user = document.getElementById('userInfo')
	var savUser = JSON.parse(localStorage.getItem("authUser"))
	var req = "";
	var tar = "";
	var bool = true;
	for (var x in user.children) {
		if (x<user.children.length) {
			tar  = encodeURIComponent(user.children[x].value);
			// console.log(tar)
			if (tar == "") {
				// bool = false;
			} else {
				req = req + user.children[x].name + "=" + tar + ((x<user.children.length-1)? "&":"");
			}
			
		}
	}
	// console.log(user.children.length);
	console.log(req);
	// console.log(bool);
	if (bool) {
		document.getElementById('errUser').style.display = "none";
		xhr.send(req);
	} else {
		document.getElementById('errUser').style.display = "inline";
	}
}

document.getElementById('submit').addEventListener('click', onSubmit);