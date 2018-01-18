import {url, linkExtract} from "./index.js"



var events = {}
var arrKey = []
var user = JSON.parse(sessionStorage.getItem("authUser"))
let bool = document.location.search.split("?")[1]
// console.log(bool == "1")
let xhr = new XMLHttpRequest();
if (bool=='1') {document.getElementById('headTitle').innerHTML = '<h1>Registered Events</h1>'}
xhr.open("GET", url+"/api/event/getCategories", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4){
        // console.log(xhr.responseText)
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            events = json.data;              //this can be different
            var i = 0;
            var eve = ''
            arrKey = Object.keys(events)
            // console.log(arrKey);
            for (var x in arrKey) {
                $("#row").append(
                  '<div class="col-md-4 col-sm-6 col-xs-12 category-block  animatedParent animateOnce" data-appear-top-offset="-200">'+
                    '<div class="container">'+
                      '<img src='+'./images/'+arrKey[x]+'.png'+' class="img-responsive img-circle oneeighty mx-auto category-img" alt="">'+
                      '<button class="overlay" id='+arrKey[x]+'>'+arrKey[x].toUpperCase()+'</button>'+
                      '<h4>'+arrKey[x].toUpperCase()+'</h4>'+
                      '<div class="description-block mx-auto container-fluid" id="'+x+'">'+
                        '<div class="row" id="eveList"></div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'
                );
            }

            function onClick(e, t) {
              var opened = $("#"+t).hasClass("active");
              // console.log(opened)
              // if( opened ){
              //   console.log("__opened");
                
              //   console.log($('#eveList').html())
              // }
              $("#eveList").empty();
              var eveList = events[e.target.id]
              // console.log(eveList)
              let str = ''
              
              for (var x in eveList) {
                let phot = (eveList[x].photos && eveList[x].photos.length)? eveList[x].photos[0]:''
                if (bool != "1") {
                  // console.log(eveList[x].photos[0])
                  
                  // console.log(phot)
                  $("#eveList").append(
                    '<div class="col-md-4 col-sm-6 col-xs-12 event-container">'+
                    '<img src="'+linkExtract(phot)+'" class="img-responsive event-img">'+
                    '<p class="mx-auto">'+
                      '<a href=../specifEvent.html?'+eveList[x].id+'>'+eveList[x].name+'</a>'+
                    '</p>'+
                    '</div>'
                  );
                } else {
                  // console.log(user.registration, "here")
                  // console.log(eveList[x].name != "bogus" && (eveList[x].id == user.registration[y].event_id || bool == "1"))
                  for (var y in user.registration) {
                    if (eveList[x].name != "bogus" && (eveList[x].id == user.registration[y].event_id)) {
                      // console.log(eveList[x].name)
                      $("#eveList").append(
                        '<div class="col-md-4 col-sm-6 col-xs-12 event-container">'+
                        '<img src="'+linkExtract(phot)+'" class="img-responsive event-img">'+
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

                // $(".category-block").click(function(e){
                //   console.log(e.target);
                    
                // });
                eventsButton[x].addEventListener('click', function(e) {
                  // console.log('hi')
                  $("#"+x).toggleClass("active");
                  onClick(e, x)
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
