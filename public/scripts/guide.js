app.controller('guideAll', function($scope, $firebaseArray) {
	
	//check validity of input https://stackoverflow.com/questions/20054055/angularjs-check-if-form-is-valid-in-controller
	
	var firebaseRefGuide = firebase.database().ref("guides");
	
	var list = $firebaseArray(firebaseRefGuide);
	
	//create guide
	$scope.createGuide = function(form)
	{
		if(form.$valid)
		{
			list.$add({
				name: $scope.guideName
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
		
			//firebaseRef.push().child("name").set($scope.guideName);
		}
		else
		{
			window.alert("empty");
		}
		
	};
	
	//read guide
	$scope.guides = list;
	
	$scope.guideChecked = {
		guides: []
	};
	
	//update guide
	// this refreshes the selection on when the pill is clicked
	$scope.onGuideEditClick = function() {
		if($scope.guideChecked.guides.length == 1)
		{
			var guideNameRef = firebase.database().ref("guides/" + $scope.guideChecked.guides[0] + "/name");
		
			guideNameRef.on('value', function(snapshot) {
				$scope.currentGuideName = snapshot.val();
			});
		}
		else
		{
			$scope.currentGuideName = "<no selection or too many selected>";
		}
	};
	
	$scope.newGuideName = "";
	
	//only one selection is allowed when updating the guide
	$scope.updateGuide = function() {
		
		if($scope.guideChecked.guides.length == 1)
		{
			if($scope.newGuideName.length > 0)
			{
				window.alert($scope.newGuideName);
			
				var updatedName = {
					name: $scope.newGuideName
				};
				
				var updates = {};
				updates['guides/' + $scope.guideChecked.guides[0]] = updatedName;
				
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
	
	//delete guide
	$scope.deleteGuide = function() {
		
		if($scope.guideChecked.guides.length > 0)
		{
			var i;
		
			for(i = 0; i < $scope.guideChecked.guides.length; i++)
			{
				firebase.database().ref().child("guides/" + $scope.guideChecked.guides[i]).remove();
			}
			
			$scope.guideChecked = {
				guides: []
			};
		}
		else
		{
			window.alert("no selection");
		}
	};
	
});