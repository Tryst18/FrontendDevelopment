(function() {
    "use strict";
    var url = "http://localhost:4000";

    function app$utils$login$$onSubmit() {
        // var url = "http://localhost:4000/"
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url+"/api/user/login", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log(json);
            } else if (xhr.readyState === 4 && xhr.status === 400){
                var json = JSON.parse(xhr.responseText);
                console.log(json.error)
            }
        };
        var log = document.getElementById('logInfo')
        console.log(log.children);
        var req = "";
        for (var x in log.children) {
            if (x<log.children.length) {
                req = req + log.children[x].name + "=" + log.children[x].value + ((x<log.children.length-1)? "&":"");
            }
        }
        console.log(req, "here")
        xhr.send(req);
    }

    document.getElementById('submit').addEventListener('click', app$utils$login$$onSubmit);
}).call(this);