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
                        let userReg = dta.registration
                        // console.log(dta)
                        let uDict = {}
                        for (var x in userReg) {
                            uDict[userReg[x].event_id] = userReg[x].reg_id
                        }
                        // console.log(uDict)
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

    var app$utils$verify$$token = document.location.search.split("?")[1];

    let app$utils$verify$$xhr = new XMLHttpRequest();
    app$utils$verify$$xhr.open("GET", $$index$$url+"/api/user/verify_registration/"+app$utils$verify$$token, true);
    app$utils$verify$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // document.getElementById('veri').hidden = true
    app$utils$verify$$xhr.onreadystatechange = function () {
        if (app$utils$verify$$xhr.readyState === 4){
            document.getElementById('veri').hidden = false
            document.getElementById('veri').innerHTML = JSON.parse(app$utils$verify$$xhr.responseText).message    
            if (app$utils$verify$$xhr.status === 200) {
                document.getElementById('veri').innerHTML = JSON.parse(app$utils$verify$$xhr.responseText).message    
            }
        }
    }
    app$utils$verify$$xhr.send();
}).call(this);