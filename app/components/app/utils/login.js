(function() {
    "use strict";
    var url = "https://api.tryst-iitd.com";

    console.log("hi");

    if (sessionStorage.getItem("authUser")) {
        sessionStorage.removeItem("authUser")
        sessionStorage.removeItem("token")
    }

    function app$utils$login$$onSubmit() {
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
                    // console.log(json.error == false)
                    if (json.error == false) {
                        sessionStorage.setItem("authUser", JSON.stringify(data.user));
                        sessionStorage.setItem("token", data.token);
                        console.log("login")
                        var xh = new XMLHttpRequest();
                        xh.open("GET", url+"/api/user/view", true);
                        xh.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"));
                        xh.onreadystatechange = function () {
                            if (xh.readyState === 4){
                                if (xh.status === 200) {
                                    // console.log(xh.responseText)
                                    var jso = JSON.parse(xh.responseText);
                                    var dat = jso.data;
                                    console.log(dat)
                                    if (jso.error == false) {
                                        sessionStorage.setItem("authUser", JSON.stringify(dat));
                                    }
                                }
                            }
                        }
                        xh.send()
                        // document.location.href = "../index.html";
                        
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

    document.getElementById('submit').addEventListener('click', app$utils$login$$onSubmit);
}).call(this);