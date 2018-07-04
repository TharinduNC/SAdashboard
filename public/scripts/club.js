app.controller('clubCreate', function($scope, $firebaseArray) {
	
	//check validity of input https://stackoverflow.com/questions/20054055/angularjs-check-if-form-is-valid-in-controller
	$scope.createClub = function(form)
	{
		if(form.$valid)
		{
			var firebaseRefClub = firebase.database().ref("club");
			
			var list = $firebaseArray(firebaseRefClub);
			
			list.$add({
				name: $scope.clubName
			}).then(function(ref) {
				var id = ref.key;
				//console.log("added record with id " + id);
				window.alert("added record with id " + id);
				list.$indexFor(id); // returns location in the array
				
				//try to clear the field after addition
			});
			
			//https://stackoverflow.com/questions/42194358/typeerror-ref-key-is-not-a-function
			//help for code comment above, for .key
			//can use .then to provide alert to indicate item added
		
			//firebaseRef.push().child("name").set($scope.clubName);
		}
		else
		{
			window.alert("empty");
		}
		
	};
});


app.controller('clubRead', function($scope, $firebaseArray) {
	//read more https://stackoverflow.com/questions/20181323/passing-data-between-controllers-in-angular-js
	var firebaseRefClub = firebase.database().ref("club");
	
	$scope.clubs = $firebaseArray(firebaseRefClub);
});


app.controller('clubEdit', function($scope, $firebaseArray) {
	
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


