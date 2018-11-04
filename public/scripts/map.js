app.controller('mapAll', function($scope, $firebaseArray) {
  $scope.schema = {
    "type": "object",
    "properties": {
      "image": {
        "title": "Image file",
        "type": "string",
        "format": "base64",
        "maxSize": "500000"
      }
    }
  }

  $scope.form = [
    {
      "key": "image",
      "placeholder": "Click here or drop files to upload"
    }
  ]
  
  $scope.model = {};
	
	var firebaseRefGuide = firebase.database().ref("map");
	
	var list = $firebaseArray(firebaseRefGuide);
	
	//create guide
	$scope.onSubmit = function(form)
	{
    // First we broadcast an event so all fields validate themselves
    $scope.$broadcast('schemaFormValidate');
    
    // Then we check if the form is valid
		if(form.$valid)
		{
			list.$add({
        
			}).then(function(ref) {
				var id = ref.key;
				window.alert("added record with id " + id);
				list.$indexFor(id); // returns location in the array
        
        firebase.database().ref('guides/' + id).set($scope.model);
			});
		}
		else
		{
      console.log($scope.model);
			window.alert("empty");
		}
		
	};
	
	//read guide
	$scope.guides = list;
	
	$scope.guideChecked = {
		guides: []
	};
	
});