import {url} from "./index.js"

var send = {}

document.getElementById('reg_mode').addEventListener('change', function() {
    
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
                        
                    }
                }
            }
            
    })

    console.log(send)
    // var xhr = new XMLHttpRequest();
	// xhr.open("POST", url+"/api/user/login", true);
	// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// document.getElementById('loading').style.display = "inline";
	// xhr.onreadystatechange = function () {
    //     var json = JSON.parse(xhr.responseText);
	// 	document.write(json.message)
	// 	// console.log(xhr.responseText + " " + xhr.status, "response");
	//     if (xhr.readyState === 4){
			
	// 		document.getElementById('loading').innerText = json.message;
	// 		if (xhr.status === 200) {				
	// 			var data = json.data;
	// 			// console.log(json.error == false)
	// 			if (json.error == false) {
	// 				sessionStorage.setItem("authUser", JSON.stringify(data.user));
	// 				sessionStorage.setItem("token", data.token);
	// 				// console.log("login")
	// 				document.getElementById('loading').style.display = "none";
	// 				document.location.href = (link=="")? "../index.html": ("../register.html" + link)
	// 			}
    //         }
    //     }
    // }

})