(function() {
    "use strict";
    var url = "https://api.tryst-iitd.com";

    var app$utils$specifEvent$$category = document.location.search.split("?")[1];
    console.log(app$utils$specifEvent$$category);

    $(document).ready(function() {let xhr = new XMLHttpRequest();
    xhr.open("GET", url+"/api/event/view/"+app$utils$specifEvent$$category, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4){
            if (xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log(json)
                var data = json.data
                document.getElementById('description').innerText = data.description
                document.getElementById('probState').innerHTML = '<a href='+data.url+'>Problem Statement</a>'
                document.getElementById('prizes').innerText = data.prizes
    
                document.getElementById('register').innerHTML = '<form action="../register.html" method="POST"><input type="hidden" name="id" value='+data.id+'>'+'<input type="hidden" name="name" value='+data.name+'>'+'<input type="submit" value="Register"></form>'
                document.getElementById('poc').innerText = data.description
                document.getElementById('image').innerText = data.description
            }
        }
    }
    xhr.send()});
}).call(this);