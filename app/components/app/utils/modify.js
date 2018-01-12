(function() {
    "use strict";
    var url = "https://api.tryst-iitd.com";



    var app$utils$modify$$savUser = JSON.parse(sessionStorage.getItem("authUser"));
    document.getElementById('userInfo').innerHTML =  '<input name="name" type="text" placeholder='+decodeURIComponent(app$utils$modify$$savUser.name)+'>'
    +'<input name="phone" type="text" placeholder='+decodeURIComponent(app$utils$modify$$savUser.phone)+'>'
    +'<input name="university" type="text" placeholder="'+decodeURIComponent(app$utils$modify$$savUser.university)+'">'
    +'<input name="address" type="text" placeholder='+decodeURIComponent(app$utils$modify$$savUser.address)+'></div>';

    function app$utils$modify$$onSubmit() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url+"/api/user/modify", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("x-auth-token", sessionStorage.getItem("token"));
        // console.log(xhr.readyState, xhr.status);
        document.getElementById('loading').style.display = "inline";
        xhr.onreadystatechange = function () {
            // console.log(xhr.responseText, "response");
            document.getElementById('loading').style.display = "none";
            
            if (xhr.readyState === 4){
                if (xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    if (json.error == false) {
                        document.getElementById('userInfo').innerHTML = '<p>Successful, go to <a href=index.html>Home</a></p>'
                        sessionStorage.setItem("authUser", JSON.stringify(app$utils$modify$$savUser))
                    } else {
                        document.getElementById('errServ').style.display = "inline";
                    }
                } else if (xhr.status === 401){
                    document.getElementById('errNoUser').style.display = "inline";
                } else if (xhr.status === 500){
                    console.log(xhr.responseText, "response");
                    console.log(xhr.readyState, xhr.status);
                    var json = JSON.parse(xhr.responseText);
                    console.log(json);
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
                    // bool = false;
                } else {
                    app$utils$modify$$savUser = Object.assign(app$utils$modify$$savUser, {[user.children[x].name]:tar})
                    req = req + user.children[x].name + "=" + tar + ((x<user.children.length-1)? "&":"");
                }
            }
        }
        console.log(app$utils$modify$$savUser)
        // console.log(user.children.length);
        console.log(req);
        // console.log(bool);
        if (bool) {
            document.getElementById('errUser').style.display = "none";
            xhr.send(req);
        } else {
            document.getElementById('errUser').style.display = "inline";
        }
    }

    document.getElementById('submit').addEventListener('click', app$utils$modify$$onSubmit);
}).call(this);