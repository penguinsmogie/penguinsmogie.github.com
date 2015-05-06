
function set(val) {
document.getElementById("display").value=val;
}
function append(val) {
document.getElementById("display").value+=val;
}
function e()  { 
	try { 
		set(eval(document.getElementById("display").value)) 
	} 
	catch(e) {
		set('Error') 
	} 
}