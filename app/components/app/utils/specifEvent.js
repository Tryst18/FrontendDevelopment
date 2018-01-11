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
                document.getElementById()
            }
        }
    }
    xhr.send()});
}).call(this);