(function() {
    "use strict";
    var url = "http://localhost:4000";

    var app$utils$speciEvent$$category = document.location.search.split("=")[1];
    document.getElementById('main').innerHTML = app$utils$speciEvent$$category;

    let app$utils$speciEvent$$xhr = new XMLHttpRequest();
    app$utils$speciEvent$$xhr.open("POST", url+"/api/events/view/"+app$utils$speciEvent$$category, true);
    app$utils$speciEvent$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    app$utils$speciEvent$$xhr.onreadystatechange = function () {
        if (app$utils$speciEvent$$xhr.readyState === 4){
            if (app$utils$speciEvent$$xhr.status === 200) {
                var json = JSON.parse(app$utils$speciEvent$$xhr.responseText);
                var arr = json.categories;              //this can be different
                var i = 0;
                var eve = ''
                for (var x in arr) {
                    if (i==0) {
                        eve += '<div class="row">'
                    }
                    eve += '<div class="col-md-4  animatedParent animateOnce" data-appear-top-offset="-200">'
                    eve += '<div class="team-member animated fadeInUp go">'
                    eve += '<div class="container">'
                    eve += '<img src="images/180.png" class="img-responsive img-circle" alt="">'
                    eve += '<button class="overlay" id="'+arr[x].name+'">'
                    eve += arr[x].name+'</button>'
                    eve += '</div>'
                    eve += '<h4>'+arr[x].name+'</h4>'
                    eve += '</div></div>'
                    i = (i+1)%3
                    if (i==0) {
                        eve += '</div>'
                    }
                }
            }
        }
    }
}).call(this);