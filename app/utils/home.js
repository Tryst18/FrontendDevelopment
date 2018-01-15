import "./index.js"

if (sessionStorage.getItem("authUser")) {
    console.log("this")
    var xh = new XMLHttpRequest();
    xh.open("GET", url+"/api/user/view", true);
    xh.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
    xh.onreadystatechange = function () {
        if (xh.readyState === 4){
            if (xh.status === 200) {
                var jon = JSON.parse(xh.responseText);
                var dta = jon.data;
                // console.log(xhr.responseText)
                if (jon.error == false) {
                    sessionStorage.setItem("authUser", JSON.stringify(dta))
                }
            }
        }
    }
    xh.send()
}