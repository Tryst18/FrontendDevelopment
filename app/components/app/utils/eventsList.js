(function() {
    "use strict";
    var url = "https://api.tryst-iitd.com";

    var app$utils$eventsList$$events = {}
    var app$utils$eventsList$$arrKey = [];
    // console.log("hi")
    let app$utils$eventsList$$xhr = new XMLHttpRequest();

    app$utils$eventsList$$xhr.open("GET", url+"/api/event/getCategories", true);
    app$utils$eventsList$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    app$utils$eventsList$$xhr.onreadystatechange = function () {
        if (app$utils$eventsList$$xhr.readyState === 4){
            // console.log(xhr.responseText)
            if (app$utils$eventsList$$xhr.status === 200) {
                var json = JSON.parse(app$utils$eventsList$$xhr.responseText);
                app$utils$eventsList$$events = json.data;              //this can be different
                var i = 0;
                var eve = ''
                app$utils$eventsList$$arrKey = Object.keys(app$utils$eventsList$$events)
                console.log(app$utils$eventsList$$arrKey);
                for (var x in app$utils$eventsList$$arrKey) {
                    $("#row").append(
                      '<div class="col-md-4 col-sm-6 col-xs-12 category-block  animatedParent animateOnce" data-appear-top-offset="-200">'+
                        '<div class="container">'+
                          '<img src='+'images/'+app$utils$eventsList$$arrKey[x]+'.png'+' class="img-responsive img-circle oneeighty mx-auto category-img" alt="">'+
                          '<button class="overlay" id='+app$utils$eventsList$$arrKey[x]+'>'+app$utils$eventsList$$arrKey[x].toUpperCase()+'</button>'+
                          '<h4>'+app$utils$eventsList$$arrKey[x].toUpperCase()+'</h4>'+
                          '<div class="description-block mx-auto container-fluid">'+
                            '<div class="row" id="eveList"></div>'+
                          '</div>'+
                        '</div>'+
                      '</div>'
                    );
                }

                function onClick(e) {
                  var opened = $(".description-block").hasClass("active");
                  if( opened ){
                    console.log("__opened");
                    $("#eveList").empty();
                  }
                    var dataPass = e.target.id
                    var eveList = app$utils$eventsList$$events[e.target.id]
                    let str = ''
                    for (var x in eveList) {
                      $("#eveList").append(
                        '<div class="col-md-4 col-sm-6 col-xs-12 event-container">'+
                        '<img src='+'"../images/'+eveList[x].name+'.png"'+' class="img-responsive event-img">'+
                        '<p class="mx-auto">'+
                          '<a href=../specifEvent.html?'+eveList[x].id+'>'+eveList[x].name+'</a>'+
                        '</p>'+
                        '</div>'
                      );
                    }
                    $("#eveList").toggleClass("show");
                }



                var eventsButton = document.getElementsByClassName('category-block');
                var x = 0;
                console.log(eventsButton);
                while (x < eventsButton.length) {

                    $(".category-block").click(function(){
                      console.log("clicked");
                      $(".description-block").toggleClass("active");
                    });
                    eventsButton[x].addEventListener('click', onClick);
                    x++;
                }
            }
        }
    }
    app$utils$eventsList$$xhr.send();
}).call(this);