firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in.
		var user = firebase.auth().currentUser;

		if(user != null) {

			var email_id = user.email;
			window.alert(user.uid);
		}

	} else {
		// No user is signed in.
		window.alert("no sign");
		window.location.href = "index.html";
	}
});

function logout(){
  firebase.auth().signOut();
}