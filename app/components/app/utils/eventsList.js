(function() {
    "use strict";
    var url = "https://api.tryst-iitd.com";

    var app$utils$eventsList$$events = {}
    var app$utils$eventsList$$arrKey = [];
    console.log("hi");
    let app$utils$eventsList$$xhr = new XMLHttpRequest();

    app$utils$eventsList$$xhr.open("GET", url+"/api/event/getCategories", true);
    app$utils$eventsList$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    app$utils$eventsList$$xhr.onreadystatechange = function () {
        if (app$utils$eventsList$$xhr.readyState === 4){
            console.log(app$utils$eventsList$$xhr.responseText)
            if (app$utils$eventsList$$xhr.status === 200) {
                var json = JSON.parse(app$utils$eventsList$$xhr.responseText);
                app$utils$eventsList$$events = json.data;              //this can be different
                var i = 0;
                var eve = ''
                app$utils$eventsList$$arrKey = Object.keys(app$utils$eventsList$$events)
                for (var x in app$utils$eventsList$$arrKey) {
                    if (i==0) {
                        eve += '<div class="row">'
                    }
                    eve += '<div class="col-md-4  animatedParent animateOnce" data-appear-top-offset="-200">'
                    eve += '<div class="team-member animated fadeInUp go">'
                    eve += '<div class="container">'
                    eve += '<img src="images/180.png" class="img-responsive img-circle" alt="">'
                    eve += '<button class="overlay" id="'+app$utils$eventsList$$arrKey[x]+'">'
                    eve += app$utils$eventsList$$arrKey[x]+'</button>'
                    eve += '</div>'
                    eve += '<h4>'+app$utils$eventsList$$arrKey[x]+'</h4>'
                    eve += '</div></div>'
                    i = (i+1)%3
                    if (i==0) {
                        eve += '</div>'
                    }
                }
                document.getElementById('move').innerHTML = eve
    
                function onClick(e) {
                    var dataPass = e.target.id
                    var eveList = app$utils$eventsList$$events[e.target.id]
                    let str = ''
                    for (var x in eveList) {
                        str += '<p><a href=../specifEvent.html?'+eveList[x].id+'>'+eveList[x].name+'</a></p>'
                    }
                    document.getElementById('eveList').innerHTML = str
                    document.getElementById('eveList').className = 'show'
                }
                
                
                
                var eventsButton = document.getElementsByClassName('overlay');
                var x = 0;
                while (x < eventsButton.length) {
                    eventsButton[x].addEventListener('click', onClick);
                    x++;
                }
            }
        }
    }
    app$utils$eventsList$$xhr.send();

    // var hello = function(str) {
    //     console.log(str)

    //     var arr = [{"flagship":"john"},{"robotics":"jew"},{"name":"joe"}];        //this can be different
    //     console.log(Object.keys(arr[1]))
    //     var i = 0;
    //     var eve = ''
    //     for (var x in arr) {
    //         if (i==0) {
    //             eve += '<div class="row">'
    //         }
    //         eve += '<div class="col-md-4  animatedParent animateOnce" data-appear-top-offset="-200">'
    //         eve += '<div class="team-member animated fadeInUp go">'
    //         eve += '<div class="container">'
    //         eve += '<img src="images/180.png" class="img-responsive img-circle" alt="">'
    //         eve += '<button class="overlay" id="'+arr[x].name+'">'
    //         eve += arr[x].name+'</button>'
    //         eve += '</div>'
    //         eve += '<h4>'+arr[x].name+'</h4>'
    //         eve += '</div></div>'
    //         i = (i+1)%3
    //         if (i==0) {
    //             eve += '</div>'
    //         }
    //     }
    //     document.getElementById('move').innerHTML = eve
    // }


    // hello("hi")
    console.log(app$utils$eventsList$$events);
}).call(this);