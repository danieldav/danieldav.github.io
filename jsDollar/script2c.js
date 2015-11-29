

function $(e) {
	return document.querySelectorAll(e);
}
var $els = $(".test");
for(i in $els) {
	$els[i].innerHTML = "hello world";
}











