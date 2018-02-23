import { url, linkExtract } from "./index.js"



var events = {}
var arrKey = []
var user = JSON.parse(sessionStorage.getItem("authUser"))
let bool = document.location.search.split("?")[1]
// console.log(bool)
let xhr = new XMLHttpRequest();
if (bool == '1') { document.getElementById('headTitle').innerHTML = '<h1>Registered Events</h1>'
  if (user.registration.length == 0){
    document.getElementById('headTitle').insertAdjacentHTML('beforeend', '<p>No registered events</p>')
    // console.log(user.registration)
  }
}
xhr.open("GET", url + "/api/event/getCategories", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    // console.log(xhr.responseText)
    if (xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      events = json.data;              //this can be different
      if (bool == "department" || bool == "club") {
        document.getElementById('back').hidden = false
        let catEve = json.data[bool]
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
        events = catDict
      }
      var i = 0;
      var eve = ''
      arrKey = Object.keys(events)
      let uDict = {}
      // console.log(arrKey);
      if (bool == "1") {
        uDict = JSON.parse(sessionStorage.getItem("useReg"))
        // console.log(uDict)
        // console.log(JSON.parse(sessionStorage.getItem("useReg")))
        let newEvents = {}
        for (var y in arrKey) {
          for (var ev in events[arrKey[y]]) {
            if (events[arrKey[y]][ev].id in uDict) {
              newEvents[arrKey[y]] = events[arrKey[y]]
              break
            }
          }
        }
        events = newEvents
        arrKey = Object.keys(events)
        // console.log(events)
      }
      // console.log(bool)
      for (var x in arrKey) {
        if ((arrKey[x]!="guest" && arrKey[x]!="social" && arrKey[x]!="pronite") || bool == "1") {
          // console.log(arrKey[x])
          $("#row").append(
            '<div class="'+((!bool)?'col-md-6':'col-md-4')+' col-sm-6 col-xs-12 category-block  animatedParent animateOnce" data-appear-top-offset="-200">' +
            '<div class="container">' +
            '<img src="' + './images/' + arrKey[x] + '.png"' + ' class="img-responsive oneeighty mx-auto category-img" alt="">' +
            '<button class="overlay" id="' + arrKey[x] + '"></button>' +
            '<h4>' + arrKey[x].toUpperCase() + '</h4>' +
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
        var eveList = events[e.target.id]
        // console.log(eveList)
        let str = ''
        var k=0;
        for (var x in eveList) {
          k++;
          let phot = (eveList[x].photos && eveList[x].photos.length) ? eveList[x].photos[0] : ''
          if (bool != "1") {
            // console.log(eveList[x].photos[0])

            // console.log(phot)
            $("#eveList").append(

              '<div class="col-md-4 col-sm-6 col-xs-12 event-container">' +
              '<div class="fixed mx-auto"><img src="' + linkExtract(phot) + '" class="img-responsive event-img"></div>' +
              '<p class="mx-auto">' +
              '<a href=../specifEvent.html?' + eveList[x].id + '>' + eveList[x].name + '</a>' +
              '</p>' +
              '</div>'

            );
          } else {
            // console.log(user.registration, "here")
            // console.log(eveList[x].name != "bogus" && (eveList[x].id == user.registration[y].event_id || bool == "1"))
            for (var y in user.registration) {
              if (eveList[x].name != "bogus" && (eveList[x].id in uDict)) {
                // console.log(eveList[x].name)
                $("#eveList").append(

                  '<div class="col-md-4 col-sm-6 col-xs-12 event-container">' +
                  '<div class="fixed mx-auto"><img src="' + linkExtract(phot) + '" class="img-responsive event-img"></div>' +
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
xhr.send();

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
// console.log(events)
