$(document).ready(function(){
    $('.head .hb-button').on('click', function(e){
    	e.stopPropagation();
        $('nav.head ul').toggleClass('show');
    });
    if (sessionStorage.getItem("authUser")) {
        $('.login').html("Logout")
        console.log('this happened')
        $('.login').on('click', function(){
            sessionStorage.removeItem("authUser")
            sessionStorage.removeItem("token")
        });
    }
});



});

$(document).click(function() {
	// $(document).on('click', function(){
 //        $('nav.head ul').toggleClass('show');
 //    });
});
