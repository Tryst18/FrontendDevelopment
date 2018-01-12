(function() {
    "use strict";
    var url = "https://api.tryst-iitd.com";

    var app$utils$register$$str = document.location.search;
    var app$utils$register$$bas = app$utils$register$$str.split("?");
    var app$utils$register$$ba = app$utils$register$$bas[1].split("=");
    var app$utils$register$$id = app$utils$register$$ba[0];
    var app$utils$register$$name = app$utils$register$$ba[1];

    document.getElementById('title').innerText = app$utils$register$$name;
    document.getElementById('loading').style.display = "none";


    if (app$utils$register$$ba.length == 3) {
        var app$utils$register$$form= '<input name="email" type="text" placeholder="Member">';
        document.getElementById('add').onclick= function () {
            document.getElementById('teamInfo').insertAdjacentHTML('beforeend', app$utils$register$$form);
        }
        document.getElementById('teamName').innerHTML = '<input id="tname" type="text" placeholder="Team Name">'
    }

    // var t = [1,2,3]
    // t.push(4)
    // console.log(t)

    function app$utils$register$$onReg() {
        var team = document.getElementById('teamInfo').children
        var teamArr = []
        if (sessionStorage.getItem("authUser")) {
            var user = JSON.parse(sessionStorage.getItem("authUser"))
            // console.log(user)
            var email = user.email 
            var teamArr = [{"email": email}]
        }
        for (var x in team) {
            if (x<team.length && (team[x].value != "")) {
                // console.log(user)
                teamArr.push({[team[x].name]: team[x].value})
            }
        }
        var teamName = document.getElementById('tname').value
        // console.log(teamName)
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url+"/api/register/register", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
        document.getElementById('loading').style.display = "inline";
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4){
                if (xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    var data = json.data;
                    // console.log(xhr.responseText)
                    if (json.error == false) {
                        document.getElementById('teamInfo').hidden = true
                        document.getElementById('add').hidden = true
                        document.getElementById('teamName').hidden = true
                        document.getElementById('submit').hidden = true
                        document.getElementById('loading').innerText = "Successful";
                    }
                } else if (xhr.status == 400) {
                    document.getElementById('loading').innerText = "All fields are necessary"
                } else if (xhr.status == 401) {
                    document.getElementById('loading').innerText = "Please login"
                } else {
                    document.getElementById('loading').innerText = "Server error, try later"
                }
            }
        }
        var send = (Object.assign({}, {"event_id": app$utils$register$$id, "members": teamArr, "team_name": teamName}))
        // console.log(send)
        xhr.send(JSON.stringify(send))
    }

    document.getElementById('submit').addEventListener('click', app$utils$register$$onReg);
}).call(this);