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
                        let userReg = dta.registrations
                        let uDict = {}
                        for (var x in userReg) {
                            uDict[userReg[x].event_id] = 1
                        }
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

    let app$utils$eventsCSVgen$$xhr = new XMLHttpRequest();
    app$utils$eventsCSVgen$$xhr.open("GET", $$index$$url + "/api/event/getCategories", true);
    app$utils$eventsCSVgen$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    app$utils$eventsCSVgen$$xhr.onreadystatechange = function () {
        main.innerText = 'loading...'
        if (app$utils$eventsCSVgen$$xhr.readyState === 4) {
            let json = JSON.parse(app$utils$eventsCSVgen$$xhr.responseText)
            let main = document.getElementById('main')
            main.innerText = json.message
            if (app$utils$eventsCSVgen$$xhr.status === 200) {
                let events = json.data
                let keyArr = Object.keys(json.data)
                for (var x in keyArr) {
                    main.insertAdjacentHTML('beforeend', '<h1>'+keyArr[x]+'</h1>')
                    let speCat = events[keyArr[x]]
                    for (var y in speCat) {
                        main.insertAdjacentHTML('beforeend', '<a href="csvPage.html?'+speCat[y].id+'">'+speCat[y].name+'</a>, ')
                    }
                }
            }
        }
    }
    app$utils$eventsCSVgen$$xhr.send();
}).call(this);