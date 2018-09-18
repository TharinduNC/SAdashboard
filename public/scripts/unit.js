app.controller('unitAll', function($scope, $firebaseArray) {
	
	var firebaseRefUnit = firebase.database().ref("unit");
	
	//create unit
	$scope.createUnit = function(form)
	{
		
		if(form.$valid)
		{	
			var list = $firebaseArray(firebaseRefUnit);
			
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
	
});