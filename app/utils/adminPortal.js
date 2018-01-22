import {url} from "./index.js"

if (sessionStorage.getItem("token")) {
    console.log('hi')
    document.getElementById('buttons').hidden = false
}

document.getElementById('submit').addEventListener('click', function(){
    var xhr = new XMLHttpRequest();
	xhr.open("POST", url+"/api/user/login", true);
    xhr.setRequestHeader("Content-type", "application/json");
    document.getElementById('extra').innerText = 'loading'
	xhr.onreadystatechange = function () {
		
		// console.log(xhr.responseText + " " + xhr.status, "response");
	    if (xhr.readyState === 4){
            var json = JSON.parse(xhr.responseText);
            document.getElementById('extra').innerText = json.message
			if (xhr.status === 200) {				
				var data = json.data;
				if (json.error == false) {
                    sessionStorage.setItem("token", data.token);
                    document.getElementById('extra').innerText = json.message+', choose action'
					document.getElementById('buttons').hidden = false
                }
            }
        }
    }
    xhr.send(JSON.stringify({"email":document.getElementById('em').value, "password":document.getElementById('pa').value}))
})