(function() {
    "use strict";
    var url = "https://api.tryst-iitd.com";



    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", url+"/api/events/viewcategory", true);
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // document.getElementById('loading').style.display = "inline";
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4){
    //         if (xhr.status === 200) {
    //             var json = JSON.parse(xhr.responseText);
    //             var arr = json.categories;              //this can be different
    //             var i = 0;
    //             var eve = ''
    //             for (var x in arr) {
    //                 if (i==0) {
    //                     eve += '<div class="row">'
    //                 }
    //                 eve += '<div class="col-md-4  animatedParent animateOnce" data-appear-top-offset="-200">'
    //                 eve += '<div class="team-member animated fadeInUp go">'
    //                 eve += '<div class="container">'
    //                 eve += '<img src="images/180.png" class="img-responsive img-circle" alt="">'
    //                 eve += '<button class="overlay" id="'+arr[x].name+'">'
    //                 eve += arr[x].name+'</button>'
    //                 eve += '</div>'
    //                 eve += '<h4>'+arr[x].name+'</h4>'
    //                 eve += '</div></div>'
    //                 i = (i+1)%3
    //                 if (i==0) {
    //                     eve += '</div>'
    //                 }
    //             }
    //             document.getElementById('move').innerHTML = eve
    //         }
    //     }
    // }
    var app$utils$eventsList$$hello = function(str) {
        console.log(str)
        
        var arr = [{"flagship":"john"},{"robotics":"jew"},{"name":"joe"}];        //this can be different
        console.log(Object.keys(arr))
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
<<<<<<< HEAD


=======
    var app$utils$eventsList$$hello = function(str) {
        console.log(str)
        
        var arr = [{"name":"john"},{"name":"jew"},{"name":"joe"}];        //this can be different
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


>>>>>>> a513bf68bb36ce1ad99a920c6f6687137182a3a0
    app$utils$eventsList$$hello("hi");


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