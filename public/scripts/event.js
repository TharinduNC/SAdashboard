app.controller('eventAll', function($scope, $firebaseArray) {
	
	var firebaseRefEvent = firebase.database().ref("event");
	
	var list = $firebaseArray(firebaseRefEvent);
	
	$scope.eventNote = false;
	
	$scope.eventDesc = "";
	
	$scope.createEvent = function(form)
	{
		
		if(form.$valid)
		{
			if($scope.eventDesc == "")
			{
				$scope.eventDesc = "<no description given>";
			}
			
			list.$add({
				date: $scope.eventDate,
				desc: $scope.eventDesc,
				location: $scope.eventLocation,
				note: $scope.eventNote,
				relateTo: "<unit/club>/uid",
				time: $scope.eventTime,
				title: $scope.eventTitle
			}).then(function(ref) {
				var id = ref.key;
				//console.log("added record with id " + id);
				window.alert("added record with id " + id);
				list.$indexFor(id); // returns location in the array
				
				//try to clear the field after addition
			});
		}
		else
		{
			window.alert("empty");
		}
	};
	
});