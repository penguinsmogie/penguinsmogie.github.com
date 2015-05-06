
function set(val) {
document.getElementById("display").value=val;
}
function append(val) {
document.getElementById("display").value+=val;
}
function eq()  { 
	try { 
		set(eval(document.getElementById("display").value)) 
	} 
	catch(eq) {
		set('Error') 
	} 
}