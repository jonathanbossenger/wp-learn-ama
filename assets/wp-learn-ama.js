const greenBackground = '#d1e7dd';
const redBackground = '#f8d7da';

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

function clearForm(){
	document.getElementById( 'wp-learn-ama-title' ).value = '';
	document.getElementById( 'wp-learn-ama-content' ).value = '';
	document.getElementById( 'wp-learn-ama-email' ).value = '';
}

function postQuestion() {
	const applicationKey = getCookie('wp-learn-application');

	const responseElement = document.getElementById( 'wp-learn-ama-response' );

	let title = document.getElementById( 'wp-learn-ama-title' ).value;
	let content = document.getElementById( 'wp-learn-ama-content' ).value;
	let email = document.getElementById( 'wp-learn-ama-email' ).value;

	if ( ! title || ! content || ! email ) {
		responseElement.style.backgroundColor = redBackground;
		responseElement.innerHTML = 'Please fill out all fields';
		return;
	}

	content = '<!-- wp:paragraph -->' + content + '<!-- /wp:paragraph -->';

	axios.post( '/wp-json/wp/v2/question', {
			title: title,
			content: content,
			meta: {
				email: email,
			},
	}, {
		headers: { 'Authorization': applicationKey },
	} ).then( function( response ) {
		responseElement.style.backgroundColor = greenBackground;
		responseElement.innerHTML = 'Your question has been posted!';
		clearForm();
	} ).catch( function( error ) {
		responseElement.style.backgroundColor = redBackground;
		responseElement.innerHTML = 'Whoops, something went wrong, please try again';
	} );
}

const postQuestionButton = document.getElementById( 'wp-learn-ama-submit' );
if ( postQuestionButton ) {
	postQuestionButton.addEventListener( 'click', postQuestion );
}



