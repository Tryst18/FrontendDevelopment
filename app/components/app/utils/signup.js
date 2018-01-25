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

    function app$utils$signup$$onSubmit() {
        // var url = "http://localhost:4000/"
        var xhr = new XMLHttpRequest();
        xhr.open("POST", $$index$$url+"/api/user/create", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // console.log(xhr.readyState, xhr.status);
        document.getElementById('loading').style.display = "inline";
        xhr.onreadystatechange = function () {
            // console.log(xhr.responseText, "response");
            document.getElementById('loading').style.display = "none";
            
            if (xhr.readyState === 4){
                if (xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    if (json.error == true) {
                        document.getElementById('errServ').style.display = "inline";
                    } else {
                        document.getElementById('userInfo').innerHTML = '<p>Check your email for confirmation link</p>'
                    }
                } else if (xhr.status === 401){
                    document.getElementById('errNoUser').style.display = "inline";
                } else if (xhr.status === 500){
                    // console.log(xhr.responseText, "response");
                    // console.log("response");
                    // console.log(xhr.readyState, xhr.status);
                    var json = JSON.parse(xhr.responseText);
                    // console.log(json);
                    document.getElementById('errServ').style.display = "inline";
                }
            }
        };
        var user = document.getElementById('userInfo')
        var req = "";
        var tar = "";
        var bool = true;
        for (var x in user.children) {
            if (x<user.children.length) {
                tar  = encodeURIComponent(user.children[x].value);
                // console.log(tar)
                if (tar == "") {
                    bool = false;
                } else {
                    bool = true;
                }
                req = req + user.children[x].name + "=" + tar + ((x<user.children.length-1)? "&":"");
            }
        }
        // console.log(user.children.length);
        // console.log(req);
        // console.log(bool);
        if (bool) {
            document.getElementById('errUser').style.display = "none";
            xhr.send(req);
        } else {
            document.getElementById('errUser').style.display = "inline";
        }
    }

    document.getElementById('submit').addEventListener('click', app$utils$signup$$onSubmit);

    document.onkeyup = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 13) {
            app$utils$signup$$onSubmit();
        }
    }
}).call(this);