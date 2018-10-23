app.controller('eventAll', function($scope, $firebaseArray, uibDateParser) {
	
	var firebaseRefEvent = firebase.database().ref("event");
	
	var list = $firebaseArray(firebaseRefEvent);
	
	$scope.rel = {
		event: 'general'
	};
	
	$scope.eventNote = false;
	
	$scope.eventDesc = "";
	
	$scope.choose = {
		selectedEventId: "general"
	};
	
	//datepicker init start
	
	$scope.dateRegex = /\d{4}(\/\d{2}){2}/;
	
	$scope.dateOptions = {
		formatYear: 'yyyy',
		startingDay: 1
	};
	
	$scope.dateOpen = function() {
		$scope.popup.opened = true;
	};
	
	$scope.popup = {
		opened: false
	};
	
	//datepicker init end
	
	//timepicker init
	
	$scope.eventTime = new Date();
	
	
	//timepicker init end
	
	$scope.onEventRelSelect = function(selec)
	{
		$scope.sel = $firebaseArray(firebase.database().ref($scope.rel.event));
	};
	
	$scope.createEvent = function(form)
	{
		$scope.eventDate = $scope.eventDate.getFullYear().toString() + "/" + ($scope.eventDate.getMonth() + 1).toString() + "/" + $scope.eventDate.getDate().toString();
		$scope.eventTime = $scope.eventTime.getHours().toString() + ":" + $scope.eventTime.getMinutes().toString();
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
				relateTo: $scope.rel.event + "/" + $scope.choose.selectedEventId.$id,
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