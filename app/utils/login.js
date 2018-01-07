import "../utils/index.js";

console.log("hi");
function onSubmit() {
	// var url = "http://localhost:4000/"
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url+"/api/user/login", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	document.getElementById('loading').style.display = "inline";
	xhr.onreadystatechange = function () {
		document.getElementById('loading').style.display = "none";
		console.log(xhr.responseText + " " + xhr.status, "response");
	    if (xhr.readyState === 4){
			if (xhr.status === 200) {
				var json = JSON.parse(xhr.responseText);
				var data = json.data;
				if (json.error == "false") {
					localStorage.setItem("authUser", JSON.stringify(data.user));
					localStorage.setItem("sessKey", data.token);
					document.location.href = "../index.html";
				}
			} else if (xhr.status === 401){
				document.getElementById('errNoUser').style.display = "inline";
			} else if (xhr.status === 500){
				var json = JSON.parse(xhr.responseText);
				console.log(json, "json");
				document.getElementById('errServ').style.display = "inline";
			}
		}
	};
	var log = document.getElementById('logInfo')
	var req = "";
	var tar = "";
	var bool = true;
	for (var x in log.children) {
		if (x<log.children.length) {
			tar  = encodeURIComponent(log.children[x].value);
			console.log(tar)
			if (tar == "") {
				bool = false;
			} else {
				bool = true;
			}
			req = req + log.children[x].name + "=" + tar + ((x<log.children.length-1)? "&":"");
		}
	}
	console.log(log.children.length);
	console.log(req);
	console.log(bool);
	if (bool) {
		document.getElementById('errUser').style.display = "none";
		xhr.send(req);
	} else {
		document.getElementById('errUser').style.display = "inline";
	}
}

document.getElementById('submit').addEventListener('click', onSubmit);