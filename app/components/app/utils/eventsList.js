(function() {
    "use strict";
    const $$index$$url = "https://api.tryst-iitd.com";

    function $$index$$updateUser(rel) {
        // console.log("this")
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
                        // console.log(dta)
                        // console.log("this hap")
                        sessionStorage.setItem("authUser", JSON.stringify(dta))
                        let userReg = dta.registration
                        // console.log(dta)
                        let uDict = {}
                        for (var x in userReg) {
                            uDict[userReg[x].event_id] = userReg[x].reg_id
                        }
                        // console.log(uDict)
                        sessionStorage.setItem("useReg", JSON.stringify(uDict))
                        if (rel) {
                            document.location.reload(true)
                        }
                    }
                }
            }
        }
        xh.send()
    }

    function $$index$$linkExtract(str) {
        let arr = str.split('=')
        // console.log(arr[1])
        return 'https://drive.google.com/uc?id='+arr[1]+'&export=view'
    }



    var app$utils$eventsList$$events = {}
    var app$utils$eventsList$$arrKey = [];
    var app$utils$eventsList$$user = JSON.parse(sessionStorage.getItem("authUser"));
    let app$utils$eventsList$$bool = document.location.search.split("?")[1];
    // console.log(bool)
    let app$utils$eventsList$$xhr = new XMLHttpRequest();
    if (app$utils$eventsList$$bool == '1') { document.getElementById('headTitle').innerHTML = '<h1>Registered Events</h1>'
      if (app$utils$eventsList$$user.registration.length == 0){
        document.getElementById('headTitle').insertAdjacentHTML('beforeend', '<p>No registered events</p>')
        // console.log(user.registration)
      }
    }
    app$utils$eventsList$$xhr.open("GET", $$index$$url + "/api/event/getCategories", true);
    app$utils$eventsList$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    app$utils$eventsList$$xhr.onreadystatechange = function () {
      if (app$utils$eventsList$$xhr.readyState === 4) {
        // console.log(xhr.responseText)
        if (app$utils$eventsList$$xhr.status === 200) {
          var json = JSON.parse(app$utils$eventsList$$xhr.responseText);
          app$utils$eventsList$$events = json.data;              //this can be different
          if (app$utils$eventsList$$bool == "department" || app$utils$eventsList$$bool == "club") {
            document.getElementById('back').hidden = false
            let catEve = json.data[app$utils$eventsList$$bool]
            // console.log(catEve)
            let catDict = {}
            for (var x in catEve) {
              if (catEve[x].category_name in catDict) {
                catDict[catEve[x].category_name].push(catEve[x])
              } else {
                catDict[catEve[x].category_name] = [catEve[x]]
              }
            }
            // console.log(catDict)
            // console.log(events)
            app$utils$eventsList$$events = catDict
          }
          var i = 0;
          var eve = ''
          app$utils$eventsList$$arrKey = Object.keys(app$utils$eventsList$$events)
          let uDict = {}
          // console.log(arrKey);
          if (app$utils$eventsList$$bool == "1") {
            uDict = JSON.parse(sessionStorage.getItem("useReg"))
            // console.log(uDict)
            // console.log(JSON.parse(sessionStorage.getItem("useReg")))
            let newEvents = {}
            for (var y in app$utils$eventsList$$arrKey) {
              for (var ev in app$utils$eventsList$$events[app$utils$eventsList$$arrKey[y]]) {
                if (app$utils$eventsList$$events[app$utils$eventsList$$arrKey[y]][ev].id in uDict) {
                  newEvents[app$utils$eventsList$$arrKey[y]] = app$utils$eventsList$$events[app$utils$eventsList$$arrKey[y]]
                  break
                }
              }
            }
            app$utils$eventsList$$events = newEvents
            app$utils$eventsList$$arrKey = Object.keys(app$utils$eventsList$$events)
            // console.log(events)
          }
    
          for (var x in app$utils$eventsList$$arrKey) {
            if (app$utils$eventsList$$arrKey[x]!="guest" || app$utils$eventsList$$arrKey[x]!="social" || app$utils$eventsList$$bool == "1") {
              // console.log(arrKey[x])
              $("#row").append(
                '<div class="col-md-4 col-sm-6 col-xs-12 category-block  animatedParent animateOnce" data-appear-top-offset="-200">' +
                '<div class="container">' +
                '<img src="' + './images/' + app$utils$eventsList$$arrKey[x] + '.png"' + ' class="img-responsive oneeighty mx-auto category-img" alt="">' +
                '<button class="overlay" id="' + app$utils$eventsList$$arrKey[x] + '">' + app$utils$eventsList$$arrKey[x].toUpperCase() + '</button>' +
                '<h4>' + app$utils$eventsList$$arrKey[x].toUpperCase() + '</h4>' +
                '</div>' +
                '</div>'
              );
            }
          }
          $("#row").append(
            '<div class="description-block mx-auto container-fluid">' +
    
            '<div class="row" id="eveList">' +
            '</div>' +
            '</div>'
          )
    
          function onClick(e, t) {
            var opened = $("#" + t).hasClass("active");
            // console.log(opened)
            // if( opened ){
            //   console.log("__opened");
    
            //   console.log($('#eveList').html())
            // }
            $("#eveList").empty();
            $("#eveList").append(
              '<div id="cloBut"><input type="image" src="./images/close.png" id="close"></div>'
            )
            var eveList = app$utils$eventsList$$events[e.target.id]
            // console.log(eveList)
            let str = ''
            var k=0;
            for (var x in eveList) {
              k++;
              let phot = (eveList[x].photos && eveList[x].photos.length) ? eveList[x].photos[0] : ''
              if (app$utils$eventsList$$bool != "1") {
                // console.log(eveList[x].photos[0])
    
                // console.log(phot)
                $("#eveList").append(
    
                  '<div class="col-md-4 col-sm-6 col-xs-12 event-container">' +
                  '<div class="fixed mx-auto"><img src="' + $$index$$linkExtract(phot) + '" class="img-responsive event-img"></div>' +
                  '<p class="mx-auto">' +
                  '<a href=../specifEvent.html?' + eveList[x].id + '>' + eveList[x].name + '</a>' +
                  '</p>' +
                  '</div>'
    
                );
              } else {
                // console.log(user.registration, "here")
                // console.log(eveList[x].name != "bogus" && (eveList[x].id == user.registration[y].event_id || bool == "1"))
                for (var y in app$utils$eventsList$$user.registration) {
                  if (eveList[x].name != "bogus" && (eveList[x].id in uDict)) {
                    // console.log(eveList[x].name)
                    $("#eveList").append(
    
                      '<div class="col-md-4 col-sm-6 col-xs-12 event-container">' +
                      '<div class="fixed mx-auto"><img src="' + $$index$$linkExtract(phot) + '" class="img-responsive event-img"></div>' +
                      '<p class="mx-auto">' +
                      '<a href=../specifEvent.html?' + eveList[x].id + '>' + eveList[x].name + '</a>' +
                      '</p>' +
                      '</div>'
                      
                    );
                  }
                }
              }
    
            }
            if (k==2)
            {
              $("#eveList").append(
    
                  '<div class="col-md-4 col-sm-6 col-xs-12 event-container">' +
                  '<div class="extra"></div>' +
                  '</div>'
    
                );
            }
            else if(k==1)
            {
              $("#eveList").append(
    
                  '<div class="col-md-4 col-sm-6 col-xs-12 event-container">' +
                  '<div class="extra"></div>' +
                  '</div>'
    
                );
              $("#eveList").append(
    
                  '<div class="col-md-4 col-sm-6 col-xs-12 event-container">' +
                  '<div class="extra"></div>' +
                  '</div>'
    
                );
            }
            var images = Array.prototype.slice.call(document.getElementsByClassName('event-img'), 0)
            for (var x in images) {
              // console.log(images[x])
              // console.log(images[x].parentNode)
              images[x].onload = function () {
                this.parentNode.style.backgroundImage = "none"
              }
            }
            $("#eveList").toggleClass("show");
            document.getElementById('close').addEventListener('click', function(){
              $("#eveList").toggleClass("show");
            })
          }
    
    
    
          var eventsButton = document.getElementsByClassName('category-block');
          var x = 0;
          // console.log(eventsButton);
          while (x < eventsButton.length) {
    
            // $(".category-block").click(function(e){
            //   console.log(e.target);
    
            // });
            eventsButton[x].addEventListener('click', function (e) {
              // console.log('hi')
              let str = e.target.id
              // console.log(str, "this")
              if (str == "department" || str == "club") {
                document.location.href = "../events.html?"+str
              } else {
                $("#" + x).toggleClass("active");
                onClick(e, x)
              }
            });
            x++;
          }
        }
      }
    }
    app$utils$eventsList$$xhr.send();
}).call(this);