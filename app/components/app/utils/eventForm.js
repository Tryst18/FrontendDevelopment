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

    var app$utils$eventForm$$send = {}

    document.getElementById('reg_mode').addEventListener('change', function() {
        
    });
    // document.getElementById('dead').addEventListener('change')

    document.getElementById('launch').addEventListener('click', function() {
        let radios = document.getElementsByClassName('radioset')
        radios = (Array.prototype.slice.call( radios, 0 ))
        radios.map(t => {
                for (var x in t.children) {
                    if (x<t.children.length) {
                        if (t.children[x].checked) {
                            app$utils$eventForm$$send = Object.assign(app$utils$eventForm$$send, {[t.children[x].name]:t.children[x].value})
                            
                        }
                    }
                }
                
        })

        console.log(app$utils$eventForm$$send)
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

    });
}).call(this);