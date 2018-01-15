(function() {
    "use strict";
    const $$index$$url = "https://api.tryst-iitd.com";

    function $$index$$updateUser(rel) {
        console.log("this")
        var xh = new XMLHttpRequest();
        xh.open("GET", $$index$$url+"/api/user/view", true);
        xh.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
        xh.onreadystatechange = function () {
            if (xh.readyState === 4){
                if (xh.status === 200) {
                    var jon = JSON.parse(xh.responseText);
                    var dta = jon.data;
                    // console.log(xhr.responseText)
                    if (jon.error == false) {
                        console.log(dta)
                        console.log("this hap")
                        sessionStorage.setItem("authUser", JSON.stringify(dta))
                        if (rel) {
                            document.location.reload(true)
                        }
                    }
                }
            }
        }
        xh.send()
    }

    var app$utils$eventsList$$events = {}
    var app$utils$eventsList$$arrKey = [];
    var app$utils$eventsList$$user = JSON.parse(sessionStorage.getItem("authUser"));
    let app$utils$eventsList$$bool = document.location.search.split("?")[1];
    // console.log(bool == "1")
    let app$utils$eventsList$$xhr = new XMLHttpRequest();

    app$utils$eventsList$$xhr.open("GET", $$index$$url+"/api/event/getCategories", true);
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
                // console.log(arrKey);
                for (var x in app$utils$eventsList$$arrKey) {
                    $("#row").append(
                      '<div class="col-md-4 col-sm-6 col-xs-12 category-block  animatedParent animateOnce" data-appear-top-offset="-200">'+
                        '<div class="container">'+
                          '<img src='+'./images/'+app$utils$eventsList$$arrKey[x]+'.png'+' class="img-responsive img-circle oneeighty mx-auto category-img" alt="">'+
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
                    // console.log("__opened");
                    $("#eveList").empty();
                  }
                  var eveList = app$utils$eventsList$$events[e.target.id]
                  // console.log(eveList)
                  let str = ''
                  for (var x in eveList) {
                    if (app$utils$eventsList$$bool != "1") {
                      $("#eveList").append(
                        '<div class="col-md-4 col-sm-6 col-xs-12 event-container">'+
                        '<img src='+eveList[x].photos[0]+' class="img-responsive event-img">'+
                        '<p class="mx-auto">'+
                          '<a href=../specifEvent.html?'+eveList[x].id+'>'+eveList[x].name+'</a>'+
                        '</p>'+
                        '</div>'
                      );
                    } else {
                      console.log(app$utils$eventsList$$user.registration, "here")
                      // console.log(eveList[x].name != "bogus" && (eveList[x].id == user.registration[y].event_id || bool == "1"))
                      for (var y in app$utils$eventsList$$user.registration) {
                        if (eveList[x].name != "bogus" && (eveList[x].id == app$utils$eventsList$$user.registration[y].event_id)) {
                          console.log(eveList[x].name)
                          $("#eveList").append(
                            '<div class="col-md-4 col-sm-6 col-xs-12 event-container">'+
                            '<img src='+eveList[x].photos[0]+' class="img-responsive event-img">'+
                            '<p class="mx-auto">'+
                              '<a href=../specifEvent.html?'+eveList[x].id+'>'+eveList[x].name+'</a>'+
                            '</p>'+
                            '</div>'
                          );
                        }
                      }
                    }
                  }
                  $("#eveList").toggleClass("show");
                }



                var eventsButton = document.getElementsByClassName('category-block');
                var x = 0;
                // console.log(eventsButton);
                while (x < eventsButton.length) {

                    $(".category-block").click(function(){
                      // console.log("clicked");
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