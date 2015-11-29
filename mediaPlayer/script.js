
var audio = document.createElement('audio');
document.querySelector('body').appendChild(audio);

document.getElementById('player').addEventListener('click',function(e) {
	if(e.target.tagName === 'LI') {
		var currentSong = 'audio/' + audio.src.split('/').pop(),
			newSong = e.target.getAttribute('data-src');
			
		//console.log('\ncurrentSong = ' + currentSong);
		//console.log('\nnewSong = ' + newSong);	
		
		function playSong(elem,src) {
			var elemPlaying = document.getElementById('playing'),
				elemPaused = document.getElementById('paused');

			if(elemPlaying) {
				elemPlaying.id = '';
			}
			if(elemPaused) {
				elemPaused.id = '';
				//elem.id = 'playing';
				//audio.play();
				//return;
			}
			if(elem) {
				audio.src = src;
				elem.id = 'playing';
				audio.play();
			}
		}
		if(currentSong === newSong) {
		console.log("same song")
			if(document.getElementById('paused')) {
				playSong(e.target,newSong);
			}
			else {
				audio.pause();
				e.target.id = 'paused';
			}
		}	
		else {
			playSong(e.target,newSong);
		}
	}
}, false);