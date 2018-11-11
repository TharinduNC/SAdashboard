firebase.auth().onAuthStateChanged(function(user) {
	if(user) {
			// User is signed in.
			var user = firebase.auth().currentUser;

			if(user != null) {

				var email_id = user.email;
				window.alert(user.uid);
				window.location.href = "everything.html";
			}

	} else {
		// No user is signed in.
		window.alert("no sign");
	}
});

function login(){

	var userEmail = document.getElementById("email_field").value;
	var userPass = document.getElementById("password_field").value;
	window.alert("Hi");
	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
	var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}
