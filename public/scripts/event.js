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
		
		/*
		
		** date from miliseconds to string to object
		
		*** eventDate need to get values from selectedDate everytime button is pressed
		*** because eventDate needs to be reset just in case, it will be reassigned anyways
		  
		*/
		
		//no point runnint this code if there is no date selected
		if($scope.selectedDates.length > 0)
		{
			var selectedDateStrRep = "{";
			
			var i;
			
			for(i in $scope.selectedDates)
			{
				var tempDate = new Date($scope.selectedDates[i]);
				
				var tempStrDate = tempDate.getFullYear().toString() + "-" + (tempDate.getMonth() + 1).toString() + "-" + tempDate.getDate().toString();
				
				if(!(i == $scope.selectedDates.length - 1))
				{
					selectedDateStrRep = selectedDateStrRep + '\"' + tempStrDate + '\"' + ':' + 'true,';
				}
				else
				{
					selectedDateStrRep = selectedDateStrRep +'\"' + tempStrDate + '\"' + ':' + 'true';
				}
				
			}
			
			selectedDateStrRep = selectedDateStrRep + '}';
			
			$scope.eventDate = JSON.parse(selectedDateStrRep);
			
		}
		
		
		
		/*
		var datetemp = $scope.eventDate.getFullYear().toString() + "-" + ($scope.eventDate.getMonth() + 1).toString() + "-" + $scope.eventDate.getDate().toString();
		
		$scope.eventDate = {
			[datetemp] : true
		};
		*/
		//time to string
		
		
		//for addition of the 0 in time with minutes below 10
		var tempO = "";
		var tempO2 = "";
		
		//time reassignment later to keep the variable of type date time
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
			console.log($scope.eventDate);
			
		}
		
		$scope.eventDate = null;
		
		$scope.eventTime = time1;
		$scope.eventTime2 = time2;
		
	};
	
});