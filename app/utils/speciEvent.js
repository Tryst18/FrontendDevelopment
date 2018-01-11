import "./index.js"

var category = document.location.search.split("=")[1]
document.getElementById('main').innerHTML = category

let xhr = new XMLHttpRequest();
xhr.open("POST", url+"/api/events/view/"+category, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4){
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            var arr = json.categories;              //this can be different
            var i = 0;
            var eve = ''
            for (var x in arr) {
                if (i==0) {
                    eve += '<div class="row">'
                }
                eve += '<div class="col-md-4  animatedParent animateOnce" data-appear-top-offset="-200">'
                eve += '<div class="team-member animated fadeInUp go">'
                eve += '<div class="container">'
                eve += '<img src="images/180.png" class="img-responsive img-circle" alt="">'
                eve += '<button class="overlay" id="'+arr[x].name+'">'
                eve += arr[x].name+'</button>'
                eve += '</div>'
                eve += '<h4>'+arr[x].name+'</h4>'
                eve += '</div></div>'
                i = (i+1)%3
                if (i==0) {
                    eve += '</div>'
                }
            }
        }
    }
}