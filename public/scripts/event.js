app.controller('eventAll', function($scope, $firebaseArray, uibDateParser) {
	
	//references
	var firebaseRefEvent = firebase.database().ref("event");
	
	var list = $firebaseArray(firebaseRefEvent);
	//references end
	
	//other inits
	$scope.rel = {
		event: 'general'
	};
	
	$scope.eventNote = false;
	$scope.eventDesc = "";
	$scope.choose = {
		selectedEventId: "general"
	};
	
	//event relation to unit or club selection
	$scope.onEventRelSelect = function(selec)
	{
		$scope.sel = $firebaseArray(firebase.database().ref($scope.rel.event));
	};
	//other init end
	
	//date init start
	$scope.activeDate = null;
	$scope.selectedDates = [];
	$scope.eventDate = {};
	$scope.pickMode = "indi";
	
	$scope.dateOptions = {
		startingDay: 1,
		customClass: function(data) {
			if($scope.selectedDates.indexOf(data.date.setHours(0, 0, 0, 0)) > -1) {
				return 'selected';
			}
			return '';
		}
	};
	
	$scope.removeSelected = function(dt)
	{
		$scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
		$scope.activeDate = dt;
	};
	//date init end
	
	//timepicker init
	$scope.eventTime = new Date();
	$scope.eventTime2 = new Date();
	$scope.duration = false;
	
	$scope.toggleDuration = function()
	{
		$scope.duration = !$scope.duration;
	};
	
	//timepicker init end
	
	$scope.createEvent = function()
	{
		//var valid = true;
		
		//date to string
		
		/*
		var datetemp = $scope.eventDate.getFullYear().toString() + "-" + ($scope.eventDate.getMonth() + 1).toString() + "-" + $scope.eventDate.getDate().toString();
		
		$scope.eventDate = {
			[datetemp] : true
		};
		*/
		//time to string
		
		/*
		  *** eventDate need to get values from selectedDate everytime button is pressed
		  *** because eventDate needs to be reset because i dunno bit i feel that it is necessary
		  
		*/
		
		var tempO = "";
		var tempO2 = "";
		
		var time1 = $scope.eventTime;
		var time2 = $scope.eventTime2;
		
		if($scope.eventTime.getMinutes() < 10)
		{
			tempO = "0";
		}
		
		if($scope.duration)
		{
			
			if($scope.eventTime2.getHours() < $scope.eventTime.getHours())
			{
				valid = false;
			}
			
			if($scope.eventTime2.getMinutes() < 10)
			{
				tempO2 = "0";
			}
			
			$scope.eventTime = $scope.eventTime.getHours().toString() + ":" + tempO + $scope.eventTime.getMinutes().toString() + "-" + 
								$scope.eventTime2.getHours().toString() + ":" + tempO2 + $scope.eventTime2.getMinutes().toString();
			
		}
		else
		{
			$scope.eventTime = $scope.eventTime.getHours().toString() + ":" + tempO + $scope.eventTime.getMinutes().toString();
		}
		
		
		if(false)
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
			//window.alert("under construction do not send yet");
			console.log($scope.selectedDates);
		}
		
		$scope.eventDate = null;
		
		$scope.eventTime = time1;
		$scope.eventTime2 = time2;
		
	};
	
});