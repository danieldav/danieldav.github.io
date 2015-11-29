

function duplicate(ar) {
	console.log('initial array: ' + ar);
	console.log('duplicated array: ' + ar.concat(ar));
	return ar.concat(ar);
}

duplicate([1,2,3,4,5]);


// A self executing function / Anonymous closure
(function () {
	for(var i=1; i<=100; i++) {
		if(i % 3 === 0 && i % 5 !== 0) {
			console.log('iteration ' + i + ': fizz');
		}
		else if(i % 5 === 0 && i % 3 !== 0) {
			console.log('iteration ' + i + ': buzz');
		}
		else if(i % 3 === 0 && i % 5 === 0) {
			console.log('iteration ' + i + ': fizzbuzz');
		}
	}
})();








