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
                            uDict[userReg[x].event_id] = 1
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


    let app$utils$guestLec$$xhr = new XMLHttpRequest();
    app$utils$guestLec$$xhr.open("GET", $$index$$url + "/api/event/getCategories", true);
    app$utils$guestLec$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log(sessionStorage.getItem('useReg'));
    app$utils$guestLec$$xhr.onreadystatechange = function () {
        if (app$utils$guestLec$$xhr.readyState === 4) {
            if (app$utils$guestLec$$xhr.status === 200) {
                let json = JSON.parse(app$utils$guestLec$$xhr.responseText)
                let guestLecs = json.data.guest
                console.log(guestLecs)
            }
        }
    }
    app$utils$guestLec$$xhr.send();
}).call(this);