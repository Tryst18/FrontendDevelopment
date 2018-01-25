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
                        let userReg = dta.registrations
                        let uDict = {}
                        for (var x in userReg) {
                            uDict[userReg[x].event_id] = 1
                        }
                        sessionStorage.setItem("useReg", JSON.stringify(uDict))
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

    if (sessionStorage.getItem("token")) {
        console.log('hi')
        document.getElementById('buttons').hidden = false
    }

    document.getElementById('submit').addEventListener('click', function(){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", $$index$$url+"/api/user/login", true);
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
    });
}).call(this);