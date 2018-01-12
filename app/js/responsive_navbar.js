$(document).ready(function(){
    $('.head .hb-button').on('click', function(e){
    	e.stopPropagation();
        $('nav.head ul').toggleClass('show');
        $('.init').toggle();
    });
    if (sessionStorage.getItem("authUser")) {
        var jso = JSON.parse(sessionStorage.getItem("authUser"));
        $('.login').html(jso.name);
        console.log('this happened');
    }
    
});

