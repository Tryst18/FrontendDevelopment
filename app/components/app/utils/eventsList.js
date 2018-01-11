(function() {
    "use strict";
    function onClick(e) {
        console.log(e.target);
        console.log(e);
    }

    var eventsButton = document.getElementsByClassName('container');
    var x = 0;
    while (x < eventsButton.length) {
        console.log(eventsButton[x]);
        eventsButton[x].addEventListener('click', onClick);
        x++;
    }
}).call(this);