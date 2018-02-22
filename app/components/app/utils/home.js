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

    $$index$$updateUser(false);

    // Set the date we're counting down to
    var app$utils$home$$countDownDate = new Date("Feb 23, 2018 18:45:00").getTime();

    // Update the count down every 1 second
    var app$utils$home$$x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();
        
        // Find the distance between now an the count down date
        var distance = app$utils$home$$countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Output the result in an element with id="demo"
        document.getElementById("date").innerHTML = "<b>"+days+"</b>" + " day"+((days==1)?"":"s")+ " " + "<b>"+hours+"</b>" + " hour"+((hours==1)?" ":"s ")
        + "<b>"+minutes+"</b>" + " min"+((minutes==1)?" ":"s ") + "<b>"+seconds+"</b>" + " s remaining";
        // console.log("hello"+1)
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(app$utils$home$$x);
            document.getElementById("date").innerHTML = "To Infinity and Beyond";
        }
    }, 1000);
}).call(this);