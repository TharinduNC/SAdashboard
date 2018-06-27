var app = angular.module('myApp', ["firebase"]);

//check validity of input https://stackoverflow.com/questions/20054055/angularjs-check-if-form-is-valid-in-controller

app.controller('clubCreate', function($scope) {
	
	$scope.createClub = function(form)
	{
		if(form.$valid)
		{
			var firebaseRef = firebase.database().ref();
		
			firebaseRef.child("club").push().child("name").set($scope.clubName);
		}
		else
		{
			window.alert("empty");
		}
		
	};
});


app.controller('clubRead', function($scope, $firebaseArray) {
	
	var firebaseRefClub = firebase.database().ref("club");
	
	$scope.clubs = $firebaseArray(firebaseRefClub);
});


app.controller('clubEdit', function($scope, $firebaseArray) {
});



/*
****** if angular fire gets confusing, can use code below to get snapshot of club leaves ******

https://firebase.google.com/docs/database/web/lists-of-data


function readClub()
{	
	var firebaseRefClub = firebase.database().ref("club");
	
	firebaseRefClub.on("value", function(snapshot) {
		
		snapshot.forEach(function(childSnapshot) {
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			
			getClub(childData);
			//console.log(hello);
			
		});
		
	}, function(errorObject) {
		console.log("the read failed: " + errorObject.code);
		hello = errorObject;
	});
	
}
*/