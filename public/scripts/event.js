app.controller('eventAll', function($scope, $firebaseArray) {
	
	//references
	var firebaseRefEvent = firebase.database().ref("event");
	
	var list = $firebaseArray(firebaseRefEvent);
	//references end
	
	//create event
	
	//other inits
	$scope.eventTitle = "";
	
	$scope.rel = {
		event: 'general'
	};
	
	$scope.eventNote = false;
	$scope.eventDesc = "";
	$scope.eventLocation = "";
	$scope.choose = {
		selectedEventId: "general"
	};
	
	//event relation to unit or club selection
	$scope.onEventRelSelect = function(selec)
	{
		console.log($scope.activeDate);
		console.log(selec);
		if($scope.rel.event != "general" && $scope.rel.event != "gene" && selec != "gene" && $scope.rel.event != "general")
		{
			$scope.sel = $firebaseArray(firebase.database().ref($scope.rel.event));
		}
	};
	//other init end
	
	//guide init
	$scope.listGuide = $firebaseArray(firebase.database().ref("guides"));
	
	$scope.chooseGuide = {
		selectedGuideId: "none"	
	};
	
	//guide init
	
	//date init start
	$scope.activeDate = null;
	$scope.selectedDates = [];
	$scope.pickMode = "indi";
	
	$scope.eventDatealt = "";
	
	$scope.activeDate2 = null;
	$scope.selectedDates2 = [];
	$scope.pickMode2 = "indi";
	
	$scope.dateOptions = {
		startingDay: 1,
		customClass: function(data) {
			if($scope.selectedDates.indexOf(data.date.setHours(0)) > -1) {
				return 'selected';
			}
			return '';
		}
	}
	
	$scope.dateOptions2 = {
		customClass: function(data) {
			if($scope.selectedDates2.indexOf(data.date.setHours(0)) > -1) {
				return 'selected';
			}
			return '';
		}
	}
	
	
	$scope.removeSelected = function(dt)
	{
		$scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
		$scope.activeDate = dt;
	};
	
	$scope.removeSelected2 = function(dt)
	{
		$scope.selectedDates2.splice($scope.selectedDates2.indexOf(dt), 1);
		$scope.activeDate2 = dt;
	};
	
	//date init end
	
	//timepicker init
	
	$scope.eventTimeRange = {
		start: new Date(),
		end: new Date()
	};
	
	$scope.eventTimestart = {
		note: new Date()
	};
	
	$scope.duration = false;
	
	$scope.toggleDuration = function()
	{
		$scope.duration = !$scope.duration;
	};
	
	//timepicker init end
	
	$scope.chgMiliToDate = function(mili)
	{
		var d = new Date(mili);
		var date = new Date(d.getTime() - (d.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
		
		return date;
	};
	
	$scope.createEvent = function()
	{	
		var relrel = $scope.choose.selectedEventId.$id;
		var relrelguide = $scope.chooseGuide.selectedGuideId.$id;
		
		//needed for validation purposes
		var valid = true;
		var errMsg = "";
		
		if($scope.eventTitle == "")
		{
			valid = false;
			errMsg = errMsg + "missing title\n";
		}
		
		if($scope.rel.event == 'general' || $scope.rel.event == undefined || $scope.rel.event == null)
		{
			relrel = 'general';
		}
		
		if(relrel === undefined)
		{
			valid = false;
			errMsg = errMsg + "choose a related club or unit\n";
		}
		
		//changes array of date to object of dates
		//no point running this code if there is no date selected
		if($scope.selectedDates.length > 0)
		{
			var selectedDateStrRep = "{";
			var i;
			
			for(i in $scope.selectedDates)
			{
				if(!(i == $scope.selectedDates.length - 1))
				{
					selectedDateStrRep = selectedDateStrRep + '\"' + $scope.selectedDates[i] + '\"' + ':' + 'true,';
					$scope.eventDatealt = $scope.eventDatealt + $scope.chgMiliToDate($scope.selectedDates[i]) + ",";
				}
				else
				{
					selectedDateStrRep = selectedDateStrRep +'\"' + $scope.selectedDates[i] + '\"' + ':' + 'true';
					$scope.eventDatealt = $scope.eventDatealt + $scope.chgMiliToDate($scope.selectedDates[i]);
				}
			}
			
			selectedDateStrRep = selectedDateStrRep + '}';
			
			$scope.eventDate = JSON.parse(selectedDateStrRep);
			
		}
		else
		{
			valid = false;
			errMsg = errMsg + "date not selected\n";
		}
		
		
		//time to string
		//for addition of the 0 in time with minutes below 10
		var tempO = "";
		var tempO2 = "";
		
		//time reassignment later to keep the variable of type date time
		var timeStart = $scope.eventTimeRange.start;
		var timeEnd = $scope.eventTimeRange.end;
		
		if(!$scope.duration)
		{
			if(timeStart.getMinutes() < 10)
			{
				tempO = "0";
			}
			
			$scope.eventTime = timeStart.getHours().toString() + ":" + tempO + timeStart.getMinutes().toString();
		}
		else
		{
			errMsg = errMsg + timeStart + "\n" + timeEnd;
			
			if(timeEnd < timeStart)
			{
				valid = false;
				errMsg = errMsg + "end time cannot be earlier that start time\n";
			}
			
			if(timeEnd.getMinutes() < 10)
			{
				tempO2 = "0";
			}
			
			$scope.eventTime = timeStart.getHours().toString() + ":" + tempO + timeStart.getMinutes().toString() + "-" + 
								timeEnd.getHours().toString() + ":" + tempO2 + timeEnd.getMinutes().toString();
		}
		
		if($scope.eventLocation == "")
		{
			$scope.eventLocation = "<no location given>";
		}
		
		if($scope.eventDesc == "")
		{
			$scope.eventDesc = "<no description given>";
		}
		
		
		//check notification is checked
		if($scope.eventNote)
		{
			var tempO3 = "";
			var timeNote = $scope.eventTimestart.note;
			
			if(timeNote.getMinutes() < 10)
			{
				tempO3 = "0";
			}
			
			$scope.eventTimeNote = timeNote.getHours().toString() + ":" + tempO3 + timeNote.getMinutes().toString();
			
		}
		else
		{
			$scope.eventTimeNote = "00:01"
		}

		//check related guide is checked
		if($scope.gotGuide)
		{
			if(relrelguide == "none" || relrelguide == undefined || relrelguide == null)
			{
				errMsg = errMsg + "click on the related guide\n";
			}
		}
		else
		{
			relrelguide = "none";
		}
		
		
		if(valid)
		{
			list.$add({
				date: $scope.eventDate,
				datealt: $scope.eventDatealt,
				desc: $scope.eventDesc,
				guiderel: relrelguide,
				location: $scope.eventLocation,
				note: $scope.eventNote,
				relateTo: $scope.rel.event + "/" + relrel,
				time: $scope.eventTime,
				timenote: $scope.eventTimeNote,
				title: $scope.eventTitle
			}).then(function(ref) {
				var id = ref.key;
				//console.log("added record with id " + id);
				window.alert("added record with id " + id);
				list.$indexFor(id); // returns location in the array
				
			});
		}
		else
		{
			window.alert(errMsg);
			console.log($scope.selectedDates);
			console.log($scope.eventDate);
		}
		
		$scope.eventDate = null;
		$scope.eventDatealt = "";
	};
	
	
	//read event
	//https://stackoverflow.com/questions/42615092/angularjs-filter-in-nested-ng-repeats
	$scope.viewEvent = list;
	
	$scope.eventChecked = {
		events: []
	};
	
	//update event
	$scope.onEventEditClick = function()
	{
		if($scope.eventChecked.events.length == 1)
		{
			$scope.edit_notice = "";
			$scope.update_stat = "active";
			
			var eventRef = firebase.database().ref("event/" + $scope.eventChecked.events[0]);
			
			eventRef.on('value', function(snapshot) {
				var currentEvent = snapshot.val();
				
				$scope.currentEventDate = currentEvent.date;
				$scope.currentEventDatealt = currentEvent.datealt;
				$scope.currentEventDesc = currentEvent.desc;
				$scope.currentEventGuiderel = currentEvent.guiderel;
				$scope.currentEventLocation = currentEvent.location;
				$scope.currentEventNote = currentEvent.note;
				$scope.currentEventRelateTo = currentEvent.relateTo;
				$scope.currentEventTime = currentEvent.time;
				$scope.currentEventTimeNote = currentEvent.timenote;
				$scope.currentEventTitle = currentEvent.title;
				
				console.log(currentEvent);
			});
			
			$scope.rel.event = $scope.currentEventRelateTo.substring(0, 4);

			//$scope.onEventRelSelect($scope.rel.event);
			
			var strdate = $scope.currentEventDatealt.split(",");
			
			$scope.activeDate2 = new Date(strdate[0] + " 00:00").getTime();
			
			
			console.log($scope.activeDate2);
			for(var i = 0; i < strdate.length; i++)
			{
				var tt = new Date(strdate[i] + " 00:00").getTime();
				console.log(tt);
				$scope.selectedDates2.push(tt);
			}
			
			var strtime = $scope.currentEventTime.split("-");
			
			if(strtime[1] == null)
			{
				$scope.duration = false;
				
				var theDate = new Date("1970-01-02 " + strtime[0]);
				
				$scope.eventTimeRange.start = theDate;
				$scope.eventTimeRange.end = theDate;
				
				console.log($scope.eventTimeRange.start);
				console.log($scope.eventTimeRange.end);
			}
			else
			{
				$scope.duration = true;
				
				var theDate = new Date("1970-01-02 " + strtime[0]);
				var theDate2 = new Date("1970-01-02 " + strtime[1]);
				
				$scope.eventTimeRange.start = theDate;
				$scope.eventTimeRange.end = theDate2;
			}
			
			if($scope.currentEventNote)
			{
				var theDate = new Date("1970-01-02 " + $scope.currentEventTimeNote);
				console.log(theDate);
				$scope.eventTimestart.note = theDate;
			}
			
			if($scope.currentEventGuiderel == "none")
			{
				$scope.gotGuide = false;
			}
			else
			{
				$scope.gotGuide = true;
			}
			
		}
		else
		{
			$scope.currentEventDate = null;
			$scope.currentEventDatealt = "";
			$scope.currentEventDesc = "";
			$scope.currentEventGuiderel = "none";
			$scope.currentEventLocation = "";
			$scope.currentEventNote = false;
			$scope.currentEventRelateto = "general/general";
			$scope.currentEventTime = "";
			$scope.currentEventTimeNote = "00:01";
			$scope.currentEventTitle = "";
			
			$scope.edit_notice = " | editing would not work with no selection";
			$scope.update_stat = "disabled";
		}
	}
	
	$scope.updateEvent = function()
	{
		var relrel = $scope.choose.selectedEventId.$id;
		var relrelguide = $scope.chooseGuide.selectedGuideId.$id;
		
		//needed for validation purposes
		var valid = true;
		var errMsg = "";
		
		if($scope.currentEventTitle == "")
		{
			valid = false;
			errMsg = errMsg + "missing title\n";
		}
		
		if($scope.rel.event == 'general' || $scope.rel.event == undefined || $scope.rel.event == null)
		{
			relrel = 'general';
		}
		
		if(relrel === undefined && $scope.currentEventRelateTo.length > 10)
		{
			valid = false;
			errMsg = errMsg + "choose a related club or unit\n";
		}
		
		//changes array of date to object of dates
		//no point running this code if there is no date selected
		if($scope.selectedDates2.length > 0)
		{
			$scope.currentEventDatealt = "";
			var selectedDateStrRep = "{";
			var i;
			
			for(i in $scope.selectedDates2)
			{
				if(!(i == $scope.selectedDates2.length - 1))
				{
					selectedDateStrRep = selectedDateStrRep + '\"' + $scope.selectedDates2[i] + '\"' + ':' + 'true,';
					$scope.currentEventDatealt = $scope.currentEventDatealt + $scope.chgMiliToDate($scope.selectedDates2[i]) + ",";
				}
				else
				{
					selectedDateStrRep = selectedDateStrRep +'\"' + $scope.selectedDates2[i] + '\"' + ':' + 'true';
					$scope.currentEventDatealt = $scope.currentEventDatealt + $scope.chgMiliToDate($scope.selectedDates2[i]);
				}
			}
			
			selectedDateStrRep = selectedDateStrRep + '}';
			
			$scope.currentEventDate = JSON.parse(selectedDateStrRep);
			
		}
		else
		{
			valid = false;
			errMsg = errMsg + "date not selected\n";
		}
		
		
		//time to string
		//for addition of the 0 in time with minutes below 10
		var tempO = "";
		var tempO2 = "";
		
		//time reassignment later to keep the variable of type date time
		var timeStart = $scope.eventTimeRange.start;
		var timeEnd = $scope.eventTimeRange.end;
		
		if(!$scope.duration)
		{
			if(timeStart.getMinutes() < 10)
			{
				tempO = "0";
			}
			
			$scope.currentEventTime = timeStart.getHours().toString() + ":" + tempO + timeStart.getMinutes().toString();
		}
		else
		{
			errMsg = errMsg + timeStart + "\n" + timeEnd;
			
			if(timeEnd < timeStart)
			{
				valid = false;
				errMsg = errMsg + "end time cannot be earlier that start time\n";
			}
			
			if(timeEnd.getMinutes() < 10)
			{
				tempO2 = "0";
			}
			
			$scope.currentEventTime = timeStart.getHours().toString() + ":" + tempO + timeStart.getMinutes().toString() + "-" + 
								timeEnd.getHours().toString() + ":" + tempO2 + timeEnd.getMinutes().toString();
		}
		
		if($scope.currentEventLocation == "")
		{
			$scope.eventLocation = "<no location given>";
		}
		
		if($scope.currentEventDesc == "")
		{
			$scope.currentEventDesc = "<no description given>";
		}
		
		
		//check notification is checked
		if($scope.currentEventNote)
		{
			var tempO3 = "";
			var timeNote = $scope.eventTimestart.note;
			
			if(timeNote.getMinutes() < 10)
			{
				tempO3 = "0";
			}
			
			$scope.currentEventTimeNote = timeNote.getHours().toString() + ":" + tempO3 + timeNote.getMinutes().toString();
			
		}
		else
		{
			$scope.currentEventTimeNote = "00:01"
		}

		//check related guide is checked
		if($scope.gotGuide)
		{
			if(relrelguide == "none" || relrelguide == undefined || relrelguide == null)
			{
				errMsg = errMsg + "click on the related guide\n";
			}
		}
		else
		{
			relrelguide = "none";
		}
		
		if($scope.eventChecked.events.length == 1 && valid)
		{
			var updateEvent = {
				date: $scope.currentEventDate,
				datealt: $scope.currentEventDatealt,
				desc: $scope.currentEventDesc,
				guiderel: relrelguide,
				location: $scope.currentEventLocation,
				note: $scope.currentEventNote,
				relateTo: $scope.rel.event + "/" + relrel,
				time: $scope.currentEventTime,
				timenote: $scope.currentEventTimeNote,
				title: $scope.currentEventTitle
			};
			
			var updates = {};
			updates['event/' + $scope.eventChecked.events[0]] = updateEvent;
			firebase.database().ref().update(updates);
			
			$scope.currentEventDate = null;
			$scope.currentEventDatealt = "";
			$scope.currentEventDesc = "";
			$scope.currentEventGuiderel = "none";
			$scope.currentEventLocation = "";
			$scope.currentEventNote = false;
			$scope.currentEventRelateto = "general/general";
			$scope.currentEventTime = "";
			$scope.currentEventTimeNote = "00:01";
			$scope.currentEventTitle = "";
			
			$scope.eventChecked = {
				events: []
			};
			
			$scope.edit_notice = "editing would not work with no selection";
			$scope.update_stat = "disabled";
			window.alert("updated event");
		}
		else
		{
			window.alert(errMsg);
			console.log($scope.selectedDates);
			console.log($scope.eventDate);
		}
	};
	
	//delete event
	$scope.deleteEvent = function()
	{
		if($scope.eventChecked.events.length > 0)
		{
			var i;
		
			for(i = 0; i < $scope.eventChecked.events.length; i++)
			{
				firebase.database().ref().child("event/" + $scope.eventChecked.events[i]).remove();
			}
			
			$scope.eventChecked = {
				events: []
			};
		}
		else
		{
			window.alert("no selection");
		}
	};
	
});