export const url = "https://api.tryst-iitd.com"

export function updateUser(rel) {
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

export function linkExtract(str) {
    let arr = str.split('=')
    return 'https://drive.google.com/uc?id='+arr[1]+'&export=view'
}
