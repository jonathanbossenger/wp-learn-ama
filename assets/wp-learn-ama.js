function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function getUserName(){
	const encoded = getCookie('wp-learn-application');
	const decoded = atob(encoded);
	const application = decoded.split(':');
	const user = application[0];
	return user;
}

function getPassword(){
	const encoded = getCookie('wp-learn-application');
	const decoded = atob(encoded);
	const application = decoded.split(':');
	const password = application[1];
	return password;
}



