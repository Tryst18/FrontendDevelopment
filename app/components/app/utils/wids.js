(function() {
    "use strict";
    for (var x = 1; x<=3; x++) {
        console.log(x)
        document.getElementById('bub'+x).addEventListener('click', function(e){
            console.log(e.target.value)
            document.getElementById('b'+e.target.value).hidden = false
            
        })
    }

    document.getElementById('close').addEventListener('click', function(){
        for (var x = 1; x<=3; x++) {
            document.getElementById('b'+x).hidden = true
        }
    });
}).call(this);