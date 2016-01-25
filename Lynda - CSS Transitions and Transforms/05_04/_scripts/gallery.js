    var transformProp = Modernizr.prefixed('transform');
  
    function Carousel3D ( el ) {
      this.element = el;

      this.rotation = 0;
      this.panelCount = 0;
      this.totalPanelCount = this.element.children.length;
      this.theta = 0;

      this.isHorizontal = true;

    }

    Carousel3D.prototype.modify = function() {

      var panel, angle, i;

      this.panelSize = this.element[ this.isHorizontal ? 'offsetWidth' : 'offsetHeight' ];
      this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
      this.theta = 360 / this.panelCount;

      this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

      for ( i = 0; i < this.panelCount; i++ ) {
        panel = this.element.children[i];
        angle = this.theta * i;
        panel.style.opacity = 1;
        panel.style[ transformProp ] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
      }

      for (  ; i < this.totalPanelCount; i++ ) {
        panel = this.element.children[i];
        panel.style.opacity = 0;
        panel.style[ transformProp ] = 'none';
      }

      this.rotation = Math.round( this.rotation / this.theta ) * this.theta;

      this.transform();

    };

    Carousel3D.prototype.transform = function() {
      this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
	  
    };

    var init = function() {
      var carousel = new Carousel3D( document.getElementById('carousel') ),
          panelCountInput = document.getElementById('panel-count'),
          axisButton = document.getElementById('toggle-axis'),
          navButtons = document.querySelectorAll('#navigation button'),

          onNavButtonClick = function( event ){
            var increment = parseInt( event.target.getAttribute('data-increment') );
            carousel.rotation += carousel.theta * increment * -1;
            carousel.transform();
          };
      carousel.panelCount = parseInt( panelCountInput.value, 10);
      carousel.modify();

      axisButton.addEventListener( 'click', function(){
        carousel.isHorizontal = !carousel.isHorizontal;
        carousel.modify();
      }, false);

      for (var i=0; i < 2; i++) {
        navButtons[i].addEventListener( 'click', onNavButtonClick, false);
      }
      setTimeout( function(){
        document.body.addClassName('ready');
      }, 0);

    };

    window.addEventListener( 'DOMContentLoaded', init, false);
