app.controller('clubAll', function($scope, $firebaseArray) {
	
	//check validity of input https://stackoverflow.com/questions/20054055/angularjs-check-if-form-is-valid-in-controller
	
	var firebaseRefClub = firebase.database().ref("club");
	
	//create club
	$scope.createClub = function(form)
	{
		if(form.$valid)
		{
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
	
	//read club
	$scope.clubs = $firebaseArray(firebaseRefClub);
	
	$scope.clubChecked = {
		clubs: []
	};
	
	//delete club
	$scope.deleteClub = function() {	

		var i;
		
		for(i = 0; i < $scope.clubChecked.club.length; i++)
		{
			firebase.database().ref().child("club/" + $scope.clubChecked.clubs[i]).remove();
		}
		
		$scope.clubChecked = {
			clubs: []
		};
		
	};
	
	
});