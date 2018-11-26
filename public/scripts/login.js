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
		myFunction();
	}
});

function login(){

	var userEmail = document.getElementById("email_field").value;
	var userPass = document.getElementById("password_field").value;
	firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
			.catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode === 'auth/wrong-password') {
			alert('Wrong password.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
	});

}

function myFunction() {
    var txt;
    //var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
	var encrypted = "U2FsdGVkX1/rpFGEW2yPNNxX+luH8+lR6WOyL+K3oQU=";
   
   var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
   var authKey = decrypted.toString(CryptoJS.enc.Utf8);
    var keyInput = prompt("Please enter authentication key:", "");
    if (keyInput == null || keyInput == "") {
        myFunction();
    } else if(keyInput == authKey) {
        txt = "Hello! How are you today?";
    }
    else
    {
      myFunction();
    }
}