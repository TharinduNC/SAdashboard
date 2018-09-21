app.controller('clubAll', function($scope, $firebaseArray) {
	
	//check validity of input https://stackoverflow.com/questions/20054055/angularjs-check-if-form-is-valid-in-controller
	
	var firebaseRefClub = firebase.database().ref("club");
	
	var list = $firebaseArray(firebaseRefClub);
	
	//create club
	$scope.createClub = function(form)
	{
		if(form.$valid)
		{
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
	$scope.clubs = list;
	
	$scope.clubChecked = {
		clubs: []
	};
	
	//update club
	// this refreshes the selection on when the pill is clicked
	$scope.onClubEditClick = function() {
		if($scope.clubChecked.clubs.length == 1)
		{
			var clubNameRef = firebase.database().ref("club/" + $scope.clubChecked.clubs[0] + "/name");
		
			clubNameRef.on('value', function(snapshot) {
				$scope.currentClubName = snapshot.val();
			});
		}
		else
		{
			$scope.currentClubName = "<no selection or too many selected>";
		}
	};
	
	$scope.newClubName = "";
	
	//only one selection is allowed when updating the club
	$scope.updateClub = function() {
		
		if($scope.clubChecked.clubs.length == 1)
		{
			if($scope.newClubName.length > 0)
			{
				window.alert($scope.newClubName);
			
				var updatedName = {
					name: $scope.newClubName
				};
				
				var updates = {};
				updates['club/' + $scope.clubChecked.clubs[0]] = updatedName;
				
				firebase.database().ref().update(updates);
			}
			else
			{
				window.alert("empty");
			}
		}
		else
		{
			window.alert("no selection");
		}
	};
	
	//delete club
	$scope.deleteClub = function() {
		
		if($scope.clubChecked.clubs.length > 0)
		{
			var i;
		
			for(i = 0; i < $scope.clubChecked.clubs.length; i++)
			{
				firebase.database().ref().child("club/" + $scope.clubChecked.clubs[i]).remove();
			}
			
			$scope.clubChecked = {
				clubs: []
			};
		}
		else
		{
			window.alert("no selection");
		}
	};
	
});