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

    // console.log("hi");
    var app$utils$login$$link = document.location.search;
    // console.log(link)



    function app$utils$login$$onSubmit() {
        // var url = "http://localhost:4000/"
        var xhr = new XMLHttpRequest();
        xhr.open("POST", $$index$$url+"/api/user/login", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        document.getElementById('loading').style.display = "inline";
        xhr.onreadystatechange = function () {
            
            // console.log(xhr.responseText + " " + xhr.status, "response");
            if (xhr.readyState === 4){
                var json = JSON.parse(xhr.responseText);
                document.getElementById('loading').innerText = json.message;
                if (xhr.status === 200) {				
                    var data = json.data;
                    // console.log(json.error == false)
                    if (json.error == false) {
                        sessionStorage.setItem("authUser", JSON.stringify(data.user));
                        sessionStorage.setItem("token", data.token);
                        // console.log("login")
                        
                        document.getElementById('loading').style.display = "none";
                        document.location.href = (app$utils$login$$link=="")? "../index.html": ("../register.html" + app$utils$login$$link)
                    }
                } else if (xhr.status === 401){
                    document.getElementById('errNoUser').style.display = "inline";
                } else if (xhr.status === 500){
                    // var json = JSON.parse(xhr.responseText);
                    // console.log(json, "json");
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
                // console.log(tar)
                if (tar == "") {
                    bool = false;
                } else {
                    bool = true;
                }
                req = req + log.children[x].name + "=" + tar + ((x<log.children.length-1)? "&":"");
            }
        }
        // console.log(log.children.length);
        // console.log(req);
        // console.log(bool);
        if (bool) {
            document.getElementById('errUser').style.display = "none";
            xhr.send(req);
        } else {
            document.getElementById('errUser').style.display = "inline";
        }
    }

    document.getElementById('submit').addEventListener('click', app$utils$login$$onSubmit);

    document.onkeyup = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 13) {
            app$utils$login$$onSubmit();
        }
    }
}).call(this);