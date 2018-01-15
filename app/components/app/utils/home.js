(function() {
    "use strict";
    var url = "https://api.tryst-iitd.com";

    if (sessionStorage.getItem("authUser")) {
        console.log("this")
        var app$utils$home$$xh = new XMLHttpRequest();
        app$utils$home$$xh.open("GET", url+"/api/user/view", true);
        app$utils$home$$xh.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        app$utils$home$$xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
        app$utils$home$$xh.onreadystatechange = function () {
            if (app$utils$home$$xh.readyState === 4){
                if (app$utils$home$$xh.status === 200) {
                    var jon = JSON.parse(app$utils$home$$xh.responseText);
                    var dta = jon.data;
                    // console.log(xhr.responseText)
                    if (jon.error == false) {
                        sessionStorage.setItem("authUser", JSON.stringify(dta))
                    }
                }
            }
        }
        app$utils$home$$xh.send()
    }
}).call(this);