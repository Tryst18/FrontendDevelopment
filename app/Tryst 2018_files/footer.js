$(document).ready(function(){
    $('.foot .hb-button').on('click', function(e){
    	e.stopPropagation();
        $('nav.foot ul').toggleClass('show');
        $('nav.foot ul li a').toggleClass('colorflip');
        $('.foot .hb-button').css("transform", "rotate(180deg)");
    });
    $(document).on('click', function(){
        $('nav.foot ul.show').toggleClass('show');
        $('nav.foot ul li a').toggleClass('colorflip');
        $('.foot .hb-button').css("transform", "rotate(180deg)");
    });
    $('.head .hb-button').on('click', function(e){
        e.stopPropagation();
        $('nav.foot ul.show').toggleClass('show');
        // $('.init').toggle();
    });
    // $(document).on('click', function(){
       
    //     $('nav.head ul.show').toggleClass('show');
    //     // $('.init').toggle();
    // });
});