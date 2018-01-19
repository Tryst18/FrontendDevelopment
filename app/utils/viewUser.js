import {url} from "./index.js";



var savUser = JSON.parse(sessionStorage.getItem("authUser"))
document.getElementById('userInfo').innerHTML =  '<input name="name" type="text" value='+decodeURIComponent(savUser.name)+'>'
+'<input name="phone" type="text" value='+decodeURIComponent(savUser.phone)+'>'
+'<input name="university" type="text" value="'+decodeURIComponent(savUser.university)+'">'
+'<input name="address" type="text" value='+decodeURIComponent(savUser.address)+'></div>'


$("#userInfo").append(
    '<div class="col-md-4 col-sm-6 col-xs-12 event-container">'+
    '<img src='+'"../images/'+eveList[x].name+'.png"'+' class="img-responsive event-img">'+
    '<p class="mx-auto">'+
      '<a href=../specifEvent.html?'+eveList[x].id+'>'+eveList[x].name+'</a>'+
    '</p>'+
    '</div>'
  );
