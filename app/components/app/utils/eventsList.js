(function() {
    "use strict";
<<<<<<< HEAD
    function onClick(e) {
        console.log(e.target);
        console.log(e);
=======
    var url = "https://api.tryst-iitd.com";



    let app$utils$eventsList$$xhr = new XMLHttpRequest();
    app$utils$eventsList$$xhr.open("POST", url+"/api/events/viewcategory", true);
    app$utils$eventsList$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    document.getElementById('loading').style.display = "inline";
    app$utils$eventsList$$xhr.onreadystatechange = function () {
        if (app$utils$eventsList$$xhr.readyState === 4){
            if (app$utils$eventsList$$xhr.status === 200) {
                var json = JSON.parse(app$utils$eventsList$$xhr.responseText);
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
                document.getElementById('move').innerHTML = eve
            }
        }
>>>>>>> c5777232ec298ab10793d87b5e5fda0a83726e82
    }
    // var hello = function(str) {
    //     console.log(str)

    //     var arr = [{"name":"john"},{"name":"jew"},{"name":"joe"}];        //this can be different
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
    // 
    // 
    // hello("hi")


    function app$utils$eventsList$$onClick(e) {
        var dataPass = e.target.id
        console.log(e)
        document.location.href = "../speciEvent.html?name="+e.target.id;
    }



    var app$utils$eventsList$$eventsButton = document.getElementsByClassName('overlay');
    var app$utils$eventsList$$x = 0;
    while (app$utils$eventsList$$x < app$utils$eventsList$$eventsButton.length) {
        app$utils$eventsList$$eventsButton[app$utils$eventsList$$x].addEventListener('click', app$utils$eventsList$$onClick);
        app$utils$eventsList$$x++;
    }
}).call(this);