import "../utils/index.js";

function onSubmit() {
	// var url = "http://localhost:4000/"
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url+"/api/user/create", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// console.log(xhr.readyState, xhr.status);
	xhr.onreadystatechange = function () {
		// console.log(xhr.responseText, "response");
	    if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			if (json.error == "false") {
				document.getElementById('errServ').style.display = "inline";
			}
	    } else if (xhr.readyState === 4 && xhr.status === 0){
			// console.log(xhr.responseText, "response");
			// console.log("response");
			var json = JSON.parse(xhr.responseText);
			// console.log(json);
			document.getElementById('errServ').style.display = "inline";
	    }
	};
	var user = document.getElementById('userInfo')
	var req = "";
	var tar = "";
	var bool = true;
	for (var x in user.children) {
		if (x<user.children.length-1) {
			tar  = encodeURIComponent(user.children[x].value);
			// console.log(tar)
			if (tar == "") {
				bool = false;
			} else {
				bool = true;
			}
			req = req + user.children[x].name + "=" + tar + ((x<user.children.length-1)? "&":"");
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