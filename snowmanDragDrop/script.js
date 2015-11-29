
var dragdrop = (function(){

	var myX, myY, whichArt;
	function resetZ() {
		var elems = document.querySelectorAll('img');
		for(var i=0; i< elems.length; i++) {
			elems[i].style.zIndex = 5;
		}
	}
	function moveStart(e) {
		whichArt = e.target;
		myX = e.targetX === undefined ? e.layerX : e.targetX;
		myY = e.targetY === undefined ? e.layerY : e.targetY;
		resetZ();
		whichArt.style.zIndex = 10;
	}
	function moveDragOver(e) {
		e.preventDefault();
	}
	function moveDrop(e) {
		e.preventDefault();
		whichArt.style.left = e.pageX - myX + 'px';
		whichArt.style.top = e.pageY - myY + 'px';
	}
	document.querySelector('body').addEventListener ('dragstart', moveStart, false);
	document.querySelector('body').addEventListener ('dragover', moveDragOver, false);
	document.querySelector('body').addEventListener ('drop', moveDrop, false);
})();

