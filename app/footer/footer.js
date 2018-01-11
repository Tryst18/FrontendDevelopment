$(document).ready(function(){
    $('.foot .hb-button').on('click', function(){
        $('nav.foot ul').toggleClass('show');
        $('nav.foot ul li a').toggleClass('colorflip');
        $('.foot .hb-button').css("transform", "rotate(180deg)");
    });
});