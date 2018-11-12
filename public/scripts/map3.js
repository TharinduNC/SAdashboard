app.controller('mapAll', function($scope, $firebaseArray) {
	
	var firebaseRefMap = firebase.database().ref("map");
	
	var list = $firebaseArray(firebaseRefMap);
	
	//create map
	$scope.createMap = function(form)
	{
		
		if(form.$valid)
		{	
			list.$add({
				code: $scope.mapCode,
				name: $scope.mapName,
				description: $scope.mapDescription,
				descriptionheader: $scope.mapDescriptionheader
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
	
	
	//read map
	$scope.maps = list;
	
	$scope.mapChecked = {
		maps: []
	};
	
	//update map
	
	$scope.onMapEditClick = function() {
		if($scope.mapChecked.maps.length == 1)
		{
			var mapRef = firebase.database().ref("map/" + $scope.mapChecked.maps[0]);
		
			mapRef.on('value', function(snapshot) {
				var currentMap = snapshot.val();
				$scope.currentMapCode = currentMap.code;
				$scope.currentMapName = currentMap.name;
				$scope.currentMapDescription = currentMap.description;
				$scope.currentMapDescriptionheader = currentMap.descriptionheader;
			});
		}
		else
		{
			$scope.currentMapCode = "<>"
			$scope.currentMapName = "<no selection or too many selected>"
			$scope.currentMapDescription = "<>"
			$scope.currentMapDescriptionheader = "<>"
		}
	};
	
	$scope.newMapCode = "";
	$scope.newMapName = "";
	$scope.newMapDescription = "";
	$scope.newMapDescriptionheader = "";
	
	
	//only one selection is allowed when updating the map
	$scope.updateMap = function() {
		
		if($scope.mapChecked.maps.length == 1)
		{
			if($scope.newMapName.length > 0 && $scope.newMapCode.length > 0)
			{
				window.alert($scope.newMapCode + " " + $scope.newMapName);
			
				var updatedMap = {
					code: $scope.newMapCode,
					name: $scope.newMapName,
					description: $scope.newMapDescription,
					descriptionheader: $scope.newMapDescriptionheader
				};
				
				var updates = {};
				updates['map/' + $scope.mapChecked.maps[0]] = updatedMap;
				
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
	
	//delete map
	$scope.deleteMap = function() {
		
		if($scope.mapChecked.maps.length > 0)
		{
			var i;
		
			for(i = 0; i < $scope.mapChecked.maps.length; i++)
			{
				firebase.database().ref().child("map/" + $scope.mapChecked.maps[i]).remove();
			}
			
			$scope.mapChecked = {
				maps: []
			};
		}
		else
		{
			window.alert("no selection");
		}
	};
	
});