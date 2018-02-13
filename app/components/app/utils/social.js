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


    let app$utils$social$$xhr = new XMLHttpRequest();
    app$utils$social$$xhr.open("GET", $$index$$url + "/api/event/getCategories", true);
    app$utils$social$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    app$utils$social$$xhr.onreadystatechange = function () {
      if (app$utils$social$$xhr.readyState === 4) {
        console.log(app$utils$social$$xhr.responseText)
        if (app$utils$social$$xhr.status === 200) {
            var json = JSON.parse(app$utils$social$$xhr.responseText);
            let catEve = json.data["social"]
            // console.log(catEve)
            var eveList = catEve
            let uDict = {}
            $("#eveList").append('<div class="row">')
            for (var x in eveList) {
                let phot = (eveList[x].photos && eveList[x].photos.length) ? eveList[x].photos[0] : ''
                $("#eveList").append(  
                    '<div class="col-md-4 col-sm-6 col-xs-12 event-container">' +
                    '<div class="fixed mx-auto"><img src="' + $$index$$linkExtract(phot) + '" class="img-responsive event-img"></div>' +
                    '<p class="mx-auto center">' +
                    '<a href=../specifEvent.html?' + eveList[x].id + '>' + eveList[x].name + '</a>' +
                    '</p>' +
                    '</div>'
      
                );    
                if (x%3 == 1) {
                    $("#eveList").append('</div><div class="row">')
                }
    
            }
            $("#eveList").append('</div>')
    
            var images = Array.prototype.slice.call(document.getElementsByClassName('event-img'), 0)
            for (var x in images) {
              // console.log(images[x])
              // console.log(images[x].parentNode)
              images[x].onload = function () {
                this.parentNode.style.backgroundImage = "none"
              }
            }
          
    
    
    
    
        }
      }
    }
    app$utils$social$$xhr.send();
}).call(this);