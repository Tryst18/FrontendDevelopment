(function() {
    "use strict";
    const $$$utils$index$$url = "https://api.tryst-iitd.com";

    function $$$utils$index$$updateUser(rel) {
        // console.log("this")
        var xh = new XMLHttpRequest();
        xh.open("GET", $$$utils$index$$url+"/api/user/view", true);
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
                        if (rel) {
                            document.location.reload(true)
                        }
                    }
                }
            }
        }
        xh.send()
    }

    function $$$utils$index$$linkExtract(str) {
        let arr = str.split('=')
        // console.log(arr[1])
        return 'https://drive.google.com/uc?id='+arr[1]+'&export=view'
    }



    var app$utils$viewUser$$savUser = JSON.parse(sessionStorage.getItem("authUser"));
    document.getElementById('userInfo').innerHTML =  '<input name="name" type="text" value='+decodeURIComponent(app$utils$viewUser$$savUser.name)+'>'
    +'<input name="phone" type="text" value='+decodeURIComponent(app$utils$viewUser$$savUser.phone)+'>'
    +'<input name="university" type="text" value="'+decodeURIComponent(app$utils$viewUser$$savUser.university)+'">'
    +'<input name="address" type="text" value='+decodeURIComponent(app$utils$viewUser$$savUser.address)+'></div>';


    $("#userInfo").append(
        '<div class="col-md-4 col-sm-6 col-xs-12 event-container">'+
        '<img src='+'"../images/'+eveList[x].name+'.png"'+' class="img-responsive event-img">'+
        '<p class="mx-auto">'+
          '<a href=../specifEvent.html?'+eveList[x].id+'>'+eveList[x].name+'</a>'+
        '</p>'+
        '</div>'
      );
}).call(this);