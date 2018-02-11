$(document).ready(function(){
    $('.head .hb-button').on('click', function(e){
    	e.stopPropagation();
        $('nav.head ul').toggleClass('show');
        // $('.init').toggle();
    });
    $(document).on('click', function(e){
        e.stopPropagation();
        $('nav.head ul.show').toggleClass('show');
        // $('.init').toggle();
    });
    $('.foot .hb-button').on('click', function(e){
        e.stopPropagation();
        $('nav.head ul.show').toggleClass('show');
        // $('.init').toggle();
    });
    
    if (sessionStorage.getItem("authUser")) {
        var jso = JSON.parse(sessionStorage.getItem("authUser"));
        $('.login').html("Logout");
        $('.login').attr("href", "../index.html");
        // console.log('this happened');
        $('.login').click(function (e) {
            console.log(e);
            sessionStorage.removeItem("authUser");
            sessionStorage.removeItem("token");
            // document.location.href = "../index.html"
        })
    }
    
});

