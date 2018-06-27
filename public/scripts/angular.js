var app = angular.module('myApp', ["firebase"]);

app.controller('clubRead', function($scope, $firebaseArray) {
	
	var firebaseRefClub = firebase.database().ref("club");
	
	$scope.clubs = $firebaseArray(firebaseRefClub);
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