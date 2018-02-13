import {url, linkExtract} from "./index.js"


let xhr = new XMLHttpRequest();
xhr.open("GET", url + "/api/event/getCategories", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    console.log(xhr.responseText)
    if (xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        let catEve = json.data["social"]
        // console.log(catEve)
        var eveList = catEve
        let uDict = {}
        $("#eveList").append('<div class="row">')
        for (var x in eveList) {
            let phot = (eveList[x].photos && eveList[x].photos.length) ? eveList[x].photos[0] : ''
            $("#eveList").append(  
                '<div class="col-md-4 col-sm-6 col-xs-12 event-container">' +
                '<div class="fixed mx-auto"><img src="' + linkExtract(phot) + '" class="img-responsive event-img"></div>' +
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
xhr.send();