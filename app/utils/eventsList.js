import "./index.js"

var events = {}
var arrKey = []
// console.log("hi")
let xhr = new XMLHttpRequest();

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
                      '<img src='+'images/'+arrKey[x]+'.png'+' class="img-responsive img-circle oneeighty mx-auto category-img" alt="">'+
                      '<button class="overlay" id='+arrKey[x]+'>'+arrKey[x].toUpperCase()+'</button>'+
                      '<h4>'+arrKey[x].toUpperCase()+'</h4>'+
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
                var dataPass = e.target.id
                var eveList = events[e.target.id]
                let str = ''
                for (var x in eveList) {
                  if (eveList[x].name != "bogus")
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
