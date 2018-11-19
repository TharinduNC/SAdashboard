app.controller('mapAll', function($scope, $firebaseArray) {
	
	$scope.name = 'Salah';
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
				descriptionheader: $scope.mapDescriptionheader,
				level: $scope.mapLevel,
				category: $scope.mapCategory,
				space: $scope.mapSpace
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
				$scope.currentMapLevel = currentMap.level;
				$scope.currentMapCategory = currentMap.category;
				$scope.currentMapSpace = currentMap.space;
			});
		}
		else
		{
			$scope.currentMapCode = "<>"
			$scope.currentMapName = "<no selection or too many selected>"
			$scope.currentMapDescription = "<>"
			$scope.currentMapDescriptionheader = "<>"
			$scope.currentMapLevel = "<>"
			$scope.currentMapCategory = "<>"
			$scope.currentMapSpace = "<>"

		}
	};
	
	$scope.newMapCode = "";
	$scope.newMapName = "";
	$scope.newMapDescription = "";
	$scope.newMapDescriptionheader = "";
	$scope.newMapLevel = "";
	$scope.newMapCategory = "";
	$scope.newMapSpace = "";
	
	
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
					descriptionheader: $scope.newMapDescriptionheader,
					level: $scope.newMapLevel,
					category: $scope.newMapCategory,
					space: $scope.newMapSpace
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

app.directive('filterList', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            
            var li = Array.prototype.slice.call(element[0].children);
            
            function filterBy(value) {
                li.forEach(function(el) {
                    el.className = el.textContent.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? '' : 'ng-hide';
                });
            }
            
            scope.$watch(attrs.filterList, function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    filterBy(newVal);
                }
            });
        }
    };
});

app.filter('htmlToPlaintext', function() {
      return function(text) {
         return String(text).replace(/<[^>]+>/gm, '');
      };
   }
);