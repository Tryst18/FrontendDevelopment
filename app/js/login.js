import "../utils/index.js";

function onSubmit() {
	// var url = "http://localhost:4000/"
	var xhr = new XMLHttpRequest();
	console.log("hiea")
	xhr.open("POST", url+"/api/user/create", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        var json = JSON.parse(xhr.responseText);
	        console.log(json.status);
	    }
	};
	var user = document.getElementById('userInfo')
	console.log(user.username)
	var data = JSON.stringify({"name": "hey@mail.com", "password": "101010"});
	xhr.send(data);
}

document.querySelector('#submit').addEventListener('click', onSubmit);