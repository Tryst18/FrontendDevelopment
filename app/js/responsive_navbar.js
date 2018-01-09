$(document).ready(function(){
    $('.head .hb-button').on('click', function(e){
    	e.stopPropagation();
        $('nav.head ul').toggleClass('show');
    });
});

$(document).click(function() {
	// $(document).on('click', function(){
 //        $('nav.head ul').toggleClass('show');
 //    });
});