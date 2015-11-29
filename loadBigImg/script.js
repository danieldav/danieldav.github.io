document.getElementById('preview').addEventListener('click', function(e) {
	var overlay = document.getElementById('overlay'),
		bigImg = document.createElement('img'),
		spinner = document.createElement('img');
		
	overlay.style.display = 'block';
	bigImg.src = e.target.src.substr(0, e.target.src.length -7) + '.jpg';
	bigImg.className = 'bgImg';
	spinner.src = 'images/spinner.gif';
	spinner.className = 'spinner';
	console.log('preview src= ' + e.target.src + '\nbig img src= ' + bigImg.src);
	overlay.appendChild(bigImg);
	overlay.appendChild(spinner);
	bigImg.addEventListener('load', function(e) {
		spinner.parentNode.removeChild(spinner);
	}, false);

}, false);

