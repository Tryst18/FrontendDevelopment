import "../utils/index.js";

function onSubmit() {
	// var url = "http://localhost:4000/"
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url+"/api/user/create", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
		
	    if (xhr.readyState === 4 && xhr.status === 200) {
	    	var json = JSON.parse(xhr.responseText);
	       	console.log(json);
	    } else if (xhr.readyState === 4 && xhr.status === 400){
	    	var json = JSON.parse(xhr.responseText);
	    	console.log(json.error)
	    }
	};
	var user = document.getElementById('userInfo')
	var req = "";
	var tar = "";
	for (var x in user.children) {
		if (x<user.children.length) {
			tar  = encodeURIComponent(user.children[x].value);
			req = req + user.children[x].name + "=" + tar + ((x<user.children.length-1)? "&":"");
		}
	}
	console.log(encodeURIComponent("Rish Mahe"));
	console.log(req)
	xhr.send(req);
}

document.getElementById('submit').addEventListener('click', onSubmit);