for (var x = 1; x<=3; x++) {
    console.log(x)
    document.getElementById('bub'+x).addEventListener('click', function(e){
        document.getElementById('bubcon').hidden = false
        console.log(e.target.value)
        document.getElementById('b'+e.target.value).hidden = false
        
    })
}

document.getElementById('close').addEventListener('click', function(){
    document.getElementById('bubcon').hidden = true
    for (var x = 1; x<=3; x++) {
        document.getElementById('b'+x).hidden = true
    }
})

var images = Array.prototype.slice.call(document.getElementsByClassName('event-img'), 0)
for (var x in images) {
  images[x].onload = function () {
    this.parentNode.style.backgroundImage = "none"
    console.log('done')
  }
}