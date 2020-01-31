firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		var user = firebase.auth().currentUser;

		if (user != null) {

			var email_id = user.email;
		}

	} else {
		// No user is signed in.
		window.location.href = "index.html";
	}
});

function logout() {
	firebase.auth().signOut();
}
