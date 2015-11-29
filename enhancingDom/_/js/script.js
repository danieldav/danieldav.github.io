(function () {
  var list = document.querySelector('#artlist ul.group');
  list.addEventListener('click', function(e) {
    if(e.target.tagName === 'IMG') {
      var overlay = document.createElement('div');
      var overlayImg = document.createElement('img');
      overlay.className = 'overlay';
      overlayImg.className = 'overlayImg';
      overlayImg.src = e.target.src.substr(0,e.target.src.length -7) + '.jpg';
      overlay.appendChild(overlayImg);
      document.body.appendChild(overlay);
      overlayImg.addEventListener('load', function(){
        this.className += ' loaded';
      }, false);
      overlayImg.addEventListener('click', function() {
        overlay.parentNode.removeChild(overlay);
      }, false)
    }
  }, false);
})(); //self executing function
