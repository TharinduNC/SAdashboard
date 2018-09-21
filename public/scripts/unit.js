app.controller('unitAll', function($scope, $firebaseArray) {
	
	var firebaseRefUnit = firebase.database().ref("unit");
	
	var list = $firebaseArray(firebaseRefUnit);
	
	//create unit
	$scope.createUnit = function(form)
	{
		
		if(form.$valid)
		{	
			list.$add({
				code: $scope.unitCode,
				name: $scope.unitName
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
	
	
	//read unit
	$scope.units = list;
	
	$scope.unitChecked = {
		units: []
	};
	
	//update unit
	
	$scope.onUnitEditClick = function() {
		if($scope.unitChecked.units.length == 1)
		{
			var unitRef = firebase.database().ref("unit/" + $scope.unitChecked.units[0]);
		
			unitRef.on('value', function(snapshot) {
				var currentUnit = snapshot.val();
				$scope.currentUnitCode = currentUnit.code;
				$scope.currentUnitName = currentUnit.name;
			});
		}
		else
		{
			$scope.currentUnitCode = "<>"
			$scope.currentUnitName = "<no selection or too many selected>";
		}
	};
	
	$scope.newUnitCode = "";
	$scope.newUnitName = "";
	
	
	//only one selection is allowed when updating the unit
	$scope.updateUnit = function() {
		
		if($scope.unitChecked.units.length == 1)
		{
			if($scope.newUnitName.length > 0 && $scope.newUnitCode.length > 0)
			{
				window.alert($scope.newUnitCode + " " + $scope.newUnitName);
			
				var updatedUnit = {
					code: $scope.newUnitCode,
					name: $scope.newUnitName
				};
				
				var updates = {};
				updates['unit/' + $scope.unitChecked.units[0]] = updatedUnit;
				
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
	
	//delete unit
	$scope.deleteUnit = function() {
		
		if($scope.unitChecked.units.length > 0)
		{
			var i;
		
			for(i = 0; i < $scope.unitChecked.units.length; i++)
			{
				firebase.database().ref().child("unit/" + $scope.unitChecked.units[i]).remove();
			}
			
			$scope.unitChecked = {
				units: []
			};
		}
		else
		{
			window.alert("no selection");
		}
	};
	
});