var form= '<input name="email" type="text" placeholder="Member">';
document.getElementById('submit').onclick= function () {
	document.getElementById('logInfo').insertAdjacentHTML('beforeend', form);
	// body...
}